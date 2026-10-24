/**
 * Time-Kerchief Core MVP v3.0 - Learning Check & Scoring Engine
 * 4-Pillar Topic Assessment, Run Isolation, and Paired Pre/Post Evaluation
 */

import { Question, QuestionTopic, QuizAnswer, QuizRun } from '../types/content';

export interface ScoreResult {
  score: number;
  total: number;
  percentage: number;
  topicBreakdown: Record<
    QuestionTopic,
    {
      correct: boolean;
      questionPrompt: string;
      selectedOptionText: string;
      correctOptionText: string;
      explanation: string;
    }
  >;
}

export interface CycleComparison {
  productId: string;
  cycleId: string;
  hasPreCheck: boolean;
  preScore: number | null;
  preTotal: number | null;
  postScore: number | null;
  postTotal: number | null;
  gain: number | null; // null if pre check was skipped
  isComplete: boolean;
}

/**
 * Calculates real score from submitted answers for a specific QuizRun.
 * Ensures each question is counted exactly once by using the latest answer per questionId.
 */
export function calculateRunScore(
  run: QuizRun,
  questions: Question[],
  answers: QuizAnswer[]
): ScoreResult {
  const questionMap = new Map<string, Question>();
  questions.forEach((q) => questionMap.set(q.id, q));

  // Deduplicate answers for this run: latest answer per questionId
  const latestAnswerMap = new Map<string, QuizAnswer>();
  answers
    .filter((a) => a.runId === run.id)
    .forEach((a) => latestAnswerMap.set(a.questionId, a));

  let score = 0;
  const total = run.questionIds.length;

  const topicBreakdown = {} as Record<
    QuestionTopic,
    {
      correct: boolean;
      questionPrompt: string;
      selectedOptionText: string;
      correctOptionText: string;
      explanation: string;
    }
  >;

  for (const qId of run.questionIds) {
    const question = questionMap.get(qId);
    if (!question) continue;

    const answer = latestAnswerMap.get(qId);
    const selectedId = answer?.selectedOptionId;
    const isCorrect = selectedId === question.correctOptionId;

    if (isCorrect) {
      score += 1;
    }

    const selectedOption = question.options.find((o) => o.id === selectedId);
    const correctOption = question.options.find((o) => o.id === question.correctOptionId);

    topicBreakdown[question.topic] = {
      correct: isCorrect,
      questionPrompt: question.prompt,
      selectedOptionText: selectedOption?.text || 'No answer submitted',
      correctOptionText: correctOption?.text || '',
      explanation: question.explanation,
    };
  }

  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  return {
    score,
    total,
    percentage,
    topicBreakdown,
  };
}

/**
 * Evaluates paired pre/post learning gain for a given learning cycle.
 * Respects skipped pre-check: returns gain = null rather than a fabricated gain!
 */
export function evaluateLearningCycle(
  cycleId: string,
  runs: QuizRun[]
): CycleComparison | null {
  const cycleRuns = runs.filter((r) => r.cycleId === cycleId);
  const preRun = cycleRuns.find((r) => r.mode === 'pre' && r.completedAt);
  const postRun = cycleRuns.find((r) => r.mode === 'post' && r.completedAt);

  if (!preRun && !postRun) {
    return null;
  }

  const productId = (preRun || postRun)!.productId;
  const hasPreCheck = Boolean(preRun);

  const preScore = preRun?.score ?? null;
  const preTotal = preRun?.total ?? null;
  const postScore = postRun?.score ?? null;
  const postTotal = postRun?.total ?? null;

  let gain: number | null = null;
  if (preScore !== null && postScore !== null && preTotal && postTotal) {
    const prePct = (preScore / preTotal) * 100;
    const postPct = (postScore / postTotal) * 100;
    gain = Math.round(postPct - prePct);
  }

  return {
    productId,
    cycleId,
    hasPreCheck,
    preScore,
    preTotal,
    postScore,
    postTotal,
    gain,
    isComplete: Boolean(postRun),
  };
}
