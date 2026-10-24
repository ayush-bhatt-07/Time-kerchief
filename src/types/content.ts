/**
 * Time-Kerchief Core MVP v3.0 - Type Definitions
 * Pedagogical reverse-engineering manufacturing explorer
 */

export type ProductId = 'cotton-garment' | 'packaged-biscuit';

export type ProductVisibility = 'primary' | 'supporting';

export interface Source {
  id: string;
  kind: 'label-photo' | 'reference';
  title: string;
  url?: string;
  assetPath?: string;
  publisher?: string;
  verifiedAt: string;
  reviewer: string;
}

export type EvidenceStatus = 'verified' | 'not-declared' | 'not-verified';

export interface EvidenceValue<T> {
  status: EvidenceStatus;
  value: T | null;
  sourceIds: string[];
  note?: string;
}

export interface MediaAsset {
  id: string;
  type: 'image' | 'video';
  sourceId: string;
  creator: string;
  rightsBasis: string;
  reviewedAt: string;
  caption: string;
  altText: string;
  url: string;
  embedUrl?: string;
  playback: 'bundled-image' | 'embed' | 'external';
  provider?: string;
  duration?: string;
  startSeconds?: number;
  endSeconds?: number;
  transcriptSummary?: string;
}

export interface CalloutPin {
  id: string;
  number: number;
  label: string;
  description: string;
  xPercent: number;
  yPercent: number;
  badgeColor?: 'primary' | 'tertiary';
}

export interface WorkerInfo {
  role: string;
  tasks: string;
  skills: string;
  sourceIds?: string[];
}

export interface TechnologyInfo {
  machinery: string;
  process: string;
  metric: string;
  sourceIds?: string[];
}

export interface Stage {
  id: string;
  number: number;
  title: string;
  badge: string;
  description: string;
  before: string;
  transformation: string;
  after: string;
  inputs: string;
  outputs: string;
  displacement: string;
  centerEra: string;
  needleAngle: number; // degrees for needle
  degreesText: string; // e.g. "270° / 270°"
  image: MediaAsset;
  video?: MediaAsset;
  calloutPins?: CalloutPin[];
  worker: WorkerInfo;
  technology: TechnologyInfo;
  glossary: string[];
  sources: Source[];
}

export interface CareSymbol {
  id: string;
  symbol: string;
  meaning: string;
  instruction: string;
}

export interface FabricDecoderData {
  productTitle: string;
  specimenPhoto: string;
  verifiedComposition: EvidenceValue<{ name: string; percent: number }[]>;
  construction: EvidenceValue<string>;
  gsm: EvidenceValue<number>;
  careSymbols: EvidenceValue<CareSymbol[]>;
  standards: string[];
  sources: Source[];
}

export interface NutrientItem {
  name: string;
  amount: EvidenceValue<number | string>;
  unit: string;
  basis: string; // "per 100g"
}

export interface AdditiveExplanation {
  code: string;
  name: string;
  purpose: string;
  regulatoryStatus: string;
}

export interface FoodDecoderData {
  productTitle: string;
  specimenPhoto: string;
  ingredients: EvidenceValue<string[]>;
  nutrients: NutrientItem[];
  allergens: EvidenceValue<string[]>;
  additives: AdditiveExplanation[];
  standards: string[];
  sources: Source[];
}

export type QuestionTopic = 'transformation' | 'label' | 'workers' | 'industry';

export interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  productId: ProductId;
  form: 'pre' | 'post' | 'practice';
  topic: QuestionTopic;
  topicTitle: string;
  prompt: string;
  options: QuestionOption[];
  correctOptionId: string;
  explanation: string;
  sourceIds: string[];
}

export interface Product {
  id: ProductId;
  name: string;
  category: 'Textile Manufacturing' | 'Food Manufacturing';
  categoryLabel: string;
  subtitle: string;
  heroImage: string;
  heroAlt: string;
  stageBadge: string;
  stagesTotal: number;
  durationEst: string;
  milestoneTitle: string;
  milestoneStage: string;
  sdg8Summary: string;
  sdg9Summary: string;
  stages: Stage[];
  fabricDecoder?: FabricDecoderData;
  foodDecoder?: FoodDecoderData;
  questions: Question[];
}

export interface QuizAnswer {
  runId: string;
  questionId: string;
  selectedOptionId: string;
  answeredAt: string;
}

export interface QuizRun {
  id: string;
  cycleId: string;
  productId: ProductId;
  mode: 'pre' | 'post' | 'practice';
  contentVersion: string;
  questionIds: string[];
  startedAt: string;
  completedAt?: string;
  score?: number;
  total?: number;
  topicScores?: Record<QuestionTopic, { correct: boolean; questionId: string }>;
}

export interface LearningCycle {
  id: string;
  productId: ProductId;
  contentVersion: string;
  preRunId?: string;
  postRunId?: string;
}

export interface UserProgressState {
  schemaVersion: number;
  contentVersion: string;
  sessionId: string;
  activeProductId: ProductId;
  stageByProduct: Record<ProductId, number>;
  cycles: LearningCycle[];
  runs: QuizRun[];
  answers: QuizAnswer[];
}
