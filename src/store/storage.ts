/**
 * Time-Kerchief Core MVP v3.0 - Local Persistence & Progress State Adapter
 * Storage Key: tk-core-v3
 * Safe hydration, schema migration, in-memory fallback on denial/quota.
 */

import { ProductId, QuizAnswer, QuizRun, UserProgressState } from '../types/content';

const STORAGE_KEY = 'tk-core-v3';
export const CURRENT_SCHEMA_VERSION = 3;
export const CURRENT_CONTENT_VERSION = 'v3.0-curated';

function generateRandomId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 7)}`;
}

export const INITIAL_PROGRESS_STATE: UserProgressState = {
  schemaVersion: CURRENT_SCHEMA_VERSION,
  contentVersion: CURRENT_CONTENT_VERSION,
  sessionId: generateRandomId('ses'),
  activeProductId: 'cotton-garment',
  stageByProduct: {
    'cotton-garment': 8, // Initial start at terminal stage (Stage 8 of 8)
    'packaged-biscuit': 7, // Initial start at terminal stage (Stage 7 of 7)
  },
  cycles: [
    {
      id: generateRandomId('cyc-c'),
      productId: 'cotton-garment',
      contentVersion: CURRENT_CONTENT_VERSION,
    },
    {
      id: generateRandomId('cyc-b'),
      productId: 'packaged-biscuit',
      contentVersion: CURRENT_CONTENT_VERSION,
    },
  ],
  runs: [],
  answers: [],
};

let inMemoryFallbackState: UserProgressState | null = null;
let isStorageAvailable: boolean | null = null;

export function checkStorageAvailability(): boolean {
  if (isStorageAvailable !== null) return isStorageAvailable;
  try {
    const testKey = '__tk_storage_test__';
    localStorage.setItem(testKey, '1');
    localStorage.removeItem(testKey);
    isStorageAvailable = true;
  } catch {
    isStorageAvailable = false;
  }
  return isStorageAvailable;
}

export function loadUserProgress(): UserProgressState {
  if (!checkStorageAvailability()) {
    if (!inMemoryFallbackState) {
      inMemoryFallbackState = { ...INITIAL_PROGRESS_STATE };
    }
    return inMemoryFallbackState;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveUserProgress(INITIAL_PROGRESS_STATE);
      return { ...INITIAL_PROGRESS_STATE };
    }

    const parsed = JSON.parse(raw) as Partial<UserProgressState>;

    // Schema version check and migration / safe fallback
    if (parsed.schemaVersion !== CURRENT_SCHEMA_VERSION) {
      console.warn('Incompatible schema version detected. Resetting to clean state.');
      const fresh = { ...INITIAL_PROGRESS_STATE };
      saveUserProgress(fresh);
      return fresh;
    }

    // Ensure all required fields exist
    const state: UserProgressState = {
      schemaVersion: CURRENT_SCHEMA_VERSION,
      contentVersion: CURRENT_CONTENT_VERSION,
      sessionId: parsed.sessionId || generateRandomId('ses'),
      activeProductId: parsed.activeProductId === 'packaged-biscuit' ? 'packaged-biscuit' : 'cotton-garment',
      stageByProduct: {
        'cotton-garment': parsed.stageByProduct?.['cotton-garment'] ?? 8,
        'packaged-biscuit': parsed.stageByProduct?.['packaged-biscuit'] ?? 7,
      },
      cycles: Array.isArray(parsed.cycles) ? parsed.cycles : [...INITIAL_PROGRESS_STATE.cycles],
      runs: Array.isArray(parsed.runs) ? parsed.runs : [],
      answers: Array.isArray(parsed.answers) ? parsed.answers : [],
    };

    return state;
  } catch (err) {
    console.error('Failed to parse localStorage state:', err);
    return { ...INITIAL_PROGRESS_STATE };
  }
}

export function saveUserProgress(state: UserProgressState): void {
  if (!checkStorageAvailability()) {
    inMemoryFallbackState = { ...state };
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.warn('Quota exceeded or storage denied, saving to in-memory fallback:', err);
    inMemoryFallbackState = { ...state };
  }
}

export function resetAllUserProgress(): UserProgressState {
  const fresh: UserProgressState = {
    ...INITIAL_PROGRESS_STATE,
    sessionId: generateRandomId('ses'),
    cycles: [
      {
        id: generateRandomId('cyc-c'),
        productId: 'cotton-garment',
        contentVersion: CURRENT_CONTENT_VERSION,
      },
      {
        id: generateRandomId('cyc-b'),
        productId: 'packaged-biscuit',
        contentVersion: CURRENT_CONTENT_VERSION,
      },
    ],
    runs: [],
    answers: [],
  };

  saveUserProgress(fresh);
  return fresh;
}

export function saveStagePosition(productId: ProductId, stage: number): UserProgressState {
  const state = loadUserProgress();
  state.stageByProduct[productId] = stage;
  state.activeProductId = productId;
  saveUserProgress(state);
  return state;
}

export function saveQuizAnswer(answer: QuizAnswer): UserProgressState {
  const state = loadUserProgress();
  // Filter out any previous answer to this question in this run
  state.answers = state.answers.filter(
    (a) => !(a.runId === answer.runId && a.questionId === answer.questionId)
  );
  state.answers.push(answer);
  saveUserProgress(state);
  return state;
}

export function completeQuizRun(completedRun: QuizRun): UserProgressState {
  const state = loadUserProgress();
  const existingIdx = state.runs.findIndex((r) => r.id === completedRun.id);
  if (existingIdx >= 0) {
    state.runs[existingIdx] = completedRun;
  } else {
    state.runs.push(completedRun);
  }

  // Update cycle link if pre or post
  const cycle = state.cycles.find((c) => c.id === completedRun.cycleId);
  if (cycle) {
    if (completedRun.mode === 'pre') cycle.preRunId = completedRun.id;
    if (completedRun.mode === 'post') cycle.postRunId = completedRun.id;
  }

  saveUserProgress(state);
  return state;
}

export function startNewLearningCycle(productId: ProductId): { cycleId: string; state: UserProgressState } {
  const state = loadUserProgress();
  const newCycleId = generateRandomId(`cyc-${productId.charAt(0)}`);
  state.cycles.push({
    id: newCycleId,
    productId,
    contentVersion: CURRENT_CONTENT_VERSION,
  });
  saveUserProgress(state);
  return { cycleId: newCycleId, state };
}
