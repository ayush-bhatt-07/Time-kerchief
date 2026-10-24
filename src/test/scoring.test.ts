import { describe, expect, it } from 'vitest';
import { calculateRunScore, evaluateLearningCycle } from '../engine/scoring';
import { Question, QuizAnswer, QuizRun } from '../types/content';

const mockQuestions: Question[] = [
  {
    id: 'q1',
    productId: 'cotton-garment',
    form: 'post',
    topic: 'transformation',
    topicTitle: 'Material Metamorphosis',
    prompt: 'What happens in spinning?',
    options: [
      { id: 'opt1', text: 'Fibres are drawn and twisted into continuous yarn' },
      { id: 'opt2', text: 'Seeds are removed from bolls' },
    ],
    correctOptionId: 'opt1',
    explanation: 'Spinning drafts and inserts twist into roving.',
    sourceIds: ['s1'],
  },
  {
    id: 'q2',
    productId: 'cotton-garment',
    form: 'post',
    topic: 'label',
    topicTitle: 'Label Literacy',
    prompt: 'What does the washtub symbol with 30°C mean?',
    options: [
      { id: 'opt3', text: 'Machine wash warm at 60°C' },
      { id: 'opt4', text: 'Machine wash cold at or below 30°C' },
    ],
    correctOptionId: 'opt4',
    explanation: 'ISO 3758 specifies wash tub temperature digits.',
    sourceIds: ['s2'],
  },
  {
    id: 'q3',
    productId: 'cotton-garment',
    form: 'post',
    topic: 'workers',
    topicTitle: 'Workers & Human Craftsmanship',
    prompt: 'Which role operates the ring spinning frame?',
    options: [
      { id: 'opt5', text: 'Ring Frame Spinner' },
      { id: 'opt6', text: 'Pattern Grader' },
    ],
    correctOptionId: 'opt5',
    explanation: 'The Ring Frame Spinner monitors broken ends and piecing.',
    sourceIds: ['s3'],
  },
  {
    id: 'q4',
    productId: 'cotton-garment',
    form: 'post',
    topic: 'industry',
    topicTitle: 'Industrial Technology & Energy',
    prompt: 'What mechanism binds interlocking loops in knitting?',
    options: [
      { id: 'opt7', text: 'Warp beams and shuttles' },
      { id: 'opt8', text: 'Circular knitting needles and sinkers' },
    ],
    correctOptionId: 'opt8',
    explanation: 'Circular single-jersey machines use latch needles and sinkers.',
    sourceIds: ['s4'],
  },
];

describe('Learning Check & Scoring Engine', () => {
  const mockRun: QuizRun = {
    id: 'run-123',
    productId: 'cotton-garment',
    cycleId: 'cycle-1',
    mode: 'post',
    contentVersion: '1.0.0',
    startedAt: '2026-03-01T10:00:00.000Z',
    questionIds: ['q1', 'q2', 'q3', 'q4'],
  };

  it('calculates 100% score for all correct answers', () => {
    const answers: QuizAnswer[] = [
      { runId: 'run-123', questionId: 'q1', selectedOptionId: 'opt1', answeredAt: '2026-03-01T10:01:00.000Z' },
      { runId: 'run-123', questionId: 'q2', selectedOptionId: 'opt4', answeredAt: '2026-03-01T10:02:00.000Z' },
      { runId: 'run-123', questionId: 'q3', selectedOptionId: 'opt5', answeredAt: '2026-03-01T10:03:00.000Z' },
      { runId: 'run-123', questionId: 'q4', selectedOptionId: 'opt8', answeredAt: '2026-03-01T10:04:00.000Z' },
    ];

    const result = calculateRunScore(mockRun, mockQuestions, answers);
    expect(result.score).toBe(4);
    expect(result.total).toBe(4);
    expect(result.percentage).toBe(100);
    expect(result.topicBreakdown.transformation.correct).toBe(true);
    expect(result.topicBreakdown.label.correct).toBe(true);
    expect(result.topicBreakdown.workers.correct).toBe(true);
    expect(result.topicBreakdown.industry.correct).toBe(true);
  });

  it('calculates fractional score and marks individual topics', () => {
    const answers: QuizAnswer[] = [
      { runId: 'run-123', questionId: 'q1', selectedOptionId: 'opt1', answeredAt: '2026-03-01T10:01:00.000Z' },
      { runId: 'run-123', questionId: 'q2', selectedOptionId: 'opt3', answeredAt: '2026-03-01T10:02:00.000Z' }, // wrong
      { runId: 'run-123', questionId: 'q3', selectedOptionId: 'opt5', answeredAt: '2026-03-01T10:03:00.000Z' },
      { runId: 'run-123', questionId: 'q4', selectedOptionId: 'opt7', answeredAt: '2026-03-01T10:04:00.000Z' }, // wrong
    ];

    const result = calculateRunScore(mockRun, mockQuestions, answers);
    expect(result.score).toBe(2);
    expect(result.total).toBe(4);
    expect(result.percentage).toBe(50);
    expect(result.topicBreakdown.transformation.correct).toBe(true);
    expect(result.topicBreakdown.label.correct).toBe(false);
  });

  it('uses the latest answer if multiple submissions occur for a question', () => {
    const answers: QuizAnswer[] = [
      { runId: 'run-123', questionId: 'q1', selectedOptionId: 'opt2', answeredAt: '2026-03-01T10:01:00.000Z' }, // originally wrong
      { runId: 'run-123', questionId: 'q1', selectedOptionId: 'opt1', answeredAt: '2026-03-01T10:05:00.000Z' }, // updated to correct
      { runId: 'run-123', questionId: 'q2', selectedOptionId: 'opt4', answeredAt: '2026-03-01T10:02:00.000Z' },
      { runId: 'run-123', questionId: 'q3', selectedOptionId: 'opt5', answeredAt: '2026-03-01T10:03:00.000Z' },
      { runId: 'run-123', questionId: 'q4', selectedOptionId: 'opt8', answeredAt: '2026-03-01T10:04:00.000Z' },
    ];

    const result = calculateRunScore(mockRun, mockQuestions, answers);
    expect(result.score).toBe(4);
    expect(result.percentage).toBe(100);
  });

  it('evaluates pre/post learning gain properly', () => {
    const preRun: QuizRun = {
      id: 'pre-1',
      productId: 'cotton-garment',
      cycleId: 'cycle-a',
      mode: 'pre',
      contentVersion: '1.0.0',
      startedAt: '2026-03-01T10:00:00.000Z',
      completedAt: '2026-03-01T10:05:00.000Z',
      questionIds: ['q1', 'q2', 'q3', 'q4'],
      score: 1,
      total: 4,
    };

    const postRun: QuizRun = {
      id: 'post-1',
      productId: 'cotton-garment',
      cycleId: 'cycle-a',
      mode: 'post',
      contentVersion: '1.0.0',
      startedAt: '2026-03-01T11:00:00.000Z',
      completedAt: '2026-03-01T11:05:00.000Z',
      questionIds: ['q1', 'q2', 'q3', 'q4'],
      score: 4,
      total: 4,
    };

    const comparison = evaluateLearningCycle('cycle-a', [preRun, postRun]);
    expect(comparison).not.toBeNull();
    expect(comparison?.hasPreCheck).toBe(true);
    expect(comparison?.preScore).toBe(1);
    expect(comparison?.postScore).toBe(4);
    expect(comparison?.gain).toBe(75);
    expect(comparison?.isComplete).toBe(true);
  });

  it('returns gain = null if pre-check was skipped instead of inventing false gain', () => {
    const postOnlyRun: QuizRun = {
      id: 'post-2',
      productId: 'cotton-garment',
      cycleId: 'cycle-b',
      mode: 'post',
      contentVersion: '1.0.0',
      startedAt: '2026-03-01T11:00:00.000Z',
      completedAt: '2026-03-01T11:05:00.000Z',
      questionIds: ['q1', 'q2', 'q3', 'q4'],
      score: 3,
      total: 4,
    };

    const comparison = evaluateLearningCycle('cycle-b', [postOnlyRun]);
    expect(comparison).not.toBeNull();
    expect(comparison?.hasPreCheck).toBe(false);
    expect(comparison?.preScore).toBeNull();
    expect(comparison?.gain).toBeNull();
  });
});
