/**
 * Time-Kerchief Core MVP v3.0 - 4-Pillar Learning Check (QuizView)
 * Covers: Transformation, Label Literacy, Workers & Skills (SDG 8), and Industry & Technology (SDG 9).
 * Modes: Pre-Check (blind baseline), Post-Check (feedback on submit), and Practice Mode.
 */

import React, { useState } from 'react';
import { calculateRunScore } from '../engine/scoring';
import { completeQuizRun, loadUserProgress, saveQuizAnswer } from '../store/storage';
import { Product, Question, QuestionTopic, QuizAnswer, QuizRun } from '../types/content';

interface QuizViewProps {
  product: Product;
}

export const QuizView: React.FC<QuizViewProps> = ({ product }) => {
  const [activeMode, setActiveMode] = useState<'pre' | 'post' | 'practice'>('pre');
  const [currentRun, setCurrentRun] = useState<QuizRun | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [submittedRunResult, setSubmittedRunResult] = useState<ReturnType<typeof calculateRunScore> | null>(null);

  // Filter questions for active product & mode
  const currentQuestions = product.questions.filter((q) => q.form === activeMode);

  // Start / Reset Quiz Run
  const startNewRun = (mode: 'pre' | 'post' | 'practice') => {
    setActiveMode(mode);
    const questionsForMode = product.questions.filter((q) => q.form === mode);
    const progress = loadUserProgress();
    const cycle = progress.cycles.find((c) => c.productId === product.id) || progress.cycles[0];

    const runId = `run-${mode}-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
    const newRun: QuizRun = {
      id: runId,
      cycleId: cycle?.id || 'cyc-default',
      productId: product.id,
      mode,
      contentVersion: progress.contentVersion,
      questionIds: questionsForMode.map((q) => q.id),
      startedAt: new Date().toISOString(),
    };

    setCurrentRun(newRun);
    setSelectedAnswers({});
    setSubmittedRunResult(null);
  };

  // Initialize on mount if not started
  React.useEffect(() => {
    startNewRun(activeMode);
  }, [product.id, activeMode]);

  // Handle Option Select
  const handleSelectOption = (questionId: string, optionId: string) => {
    if (!currentRun || submittedRunResult) return;

    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));

    const answerRecord: QuizAnswer = {
      runId: currentRun.id,
      questionId,
      selectedOptionId: optionId,
      answeredAt: new Date().toISOString(),
    };

    saveQuizAnswer(answerRecord);
  };

  // Handle Run Submission
  const handleSubmitRun = () => {
    if (!currentRun) return;

    const progress = loadUserProgress();
    const scoreResult = calculateRunScore(currentRun, currentQuestions, progress.answers);

    const completedRunRecord: QuizRun = {
      ...currentRun,
      completedAt: new Date().toISOString(),
      score: scoreResult.score,
      total: scoreResult.total,
    };

    completeQuizRun(completedRunRecord);
    setSubmittedRunResult(scoreResult);
  };

  const allAnswered = currentQuestions.length > 0 && currentQuestions.every((q) => selectedAnswers[q.id]);

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e4e2df] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#b80035] text-[24px]">quiz</span>
            <span className="font-mono-epoch text-xs text-[#b80035] font-bold uppercase tracking-wider">
              Educational Assessment
            </span>
          </div>
          <h2 className="font-headline text-2xl sm:text-3xl font-bold text-[#1b1c1a] mt-1">
            4-Pillar Learning Check: {product.name}
          </h2>
          <p className="font-body text-sm text-[#5c3f40] mt-1 max-w-2xl">
            Evaluate your understanding across 4 foundational pillars: physical metamorphosis, label literacy, worker competencies (SDG 8), and industrial technology (SDG 9).
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#efeeeb] rounded-xl self-start md:self-auto border border-[#e4e2df]">
          <button
            type="button"
            onClick={() => startNewRun('pre')}
            className={`px-3 py-1.5 rounded-lg text-xs font-headline font-bold transition-all ${
              activeMode === 'pre'
                ? 'bg-[#e11d48] text-white shadow-sm'
                : 'text-[#565e74] hover:text-[#1b1c1a]'
            }`}
          >
            Pre-Check
          </button>
          <button
            type="button"
            onClick={() => startNewRun('post')}
            className={`px-3 py-1.5 rounded-lg text-xs font-headline font-bold transition-all ${
              activeMode === 'post'
                ? 'bg-[#e11d48] text-white shadow-sm'
                : 'text-[#565e74] hover:text-[#1b1c1a]'
            }`}
          >
            Post-Check
          </button>
          <button
            type="button"
            onClick={() => startNewRun('practice')}
            className={`px-3 py-1.5 rounded-lg text-xs font-headline font-bold transition-all ${
              activeMode === 'practice'
                ? 'bg-[#e11d48] text-white shadow-sm'
                : 'text-[#565e74] hover:text-[#1b1c1a]'
            }`}
          >
            Practice
          </button>
        </div>
      </div>

      {/* Mode Info Callout */}
      <div className="p-4 rounded-xl bg-[#f5f3f0] border border-[#e4e2df] flex items-center justify-between text-xs text-[#5c3f40]">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-[#006093]">info</span>
          <span>
            {activeMode === 'pre' && 'Baseline Mode: Answers and explanations are recorded without immediate reveals.'}
            {activeMode === 'post' && 'Evaluation Mode: Explanations and topic breakdowns are revealed upon submission.'}
            {activeMode === 'practice' && 'Practice Mode: Try questions and review your answers freely.'}
          </span>
        </div>
        <span className="font-mono-epoch font-bold uppercase text-[#1b1c1a]">
          {currentQuestions.length} Questions
        </span>
      </div>

      {/* Questions Stack */}
      <div className="flex flex-col gap-5">
        {currentQuestions.map((q, qIndex) => {
          const selectedOption = selectedAnswers[q.id];
          const hasSubmitted = Boolean(submittedRunResult);
          const isCorrect = selectedOption === q.correctOptionId;

          return (
            <div
              key={q.id}
              className={`p-6 rounded-2xl border transition-all ${
                hasSubmitted
                  ? isCorrect
                    ? 'bg-white border-emerald-300 ring-1 ring-emerald-200'
                    : 'bg-white border-rose-300 ring-1 ring-rose-200'
                  : 'bg-white border-[#e4e2df] shadow-sm'
              }`}
            >
              {/* Question Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#eae8e5] pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#1b1c1a] text-white font-mono-epoch text-xs font-bold flex items-center justify-center">
                    {qIndex + 1}
                  </span>
                  <span className="font-mono-epoch text-[11px] text-[#006093] font-bold uppercase tracking-wider">
                    {q.topicTitle}
                  </span>
                </div>
                <span className="text-[10px] text-[#565e74] font-mono-epoch uppercase font-medium">
                  ID: #{q.id}
                </span>
              </div>

              {/* Question Prompt */}
              <h3 className="font-headline text-base sm:text-lg font-bold text-[#1b1c1a] mb-4">
                {q.prompt}
              </h3>

              {/* Options */}
              <div className="flex flex-col gap-2.5">
                {q.options.map((opt) => {
                  const isThisSelected = selectedOption === opt.id;
                  const isThisCorrect = opt.id === q.correctOptionId;

                  let optionStyle = 'bg-[#fbf9f6] border-[#e4e2df] text-[#1b1c1a] hover:bg-[#efeeeb]';
                  if (hasSubmitted) {
                    if (isThisCorrect) {
                      optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold';
                    } else if (isThisSelected && !isThisCorrect) {
                      optionStyle = 'bg-rose-50 border-rose-500 text-rose-900 line-through';
                    } else {
                      optionStyle = 'bg-[#fbf9f6] border-[#eae8e5] text-[#906f70] opacity-60';
                    }
                  } else if (isThisSelected) {
                    optionStyle = 'bg-[#ffdada] border-[#b80035] text-[#40000c] font-semibold ring-2 ring-[#b80035]/30';
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={hasSubmitted}
                      onClick={() => handleSelectOption(q.id, opt.id)}
                      className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3 ${optionStyle}`}
                    >
                      <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono-epoch font-bold">
                        {opt.id.split('-')[1]?.toUpperCase() || '•'}
                      </span>
                      <span className="leading-snug">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Post-Submission Explanation */}
              {hasSubmitted && (
                <div
                  className={`mt-4 p-4 rounded-xl border text-xs leading-relaxed ${
                    isCorrect
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                      : 'bg-rose-50 border-rose-200 text-rose-950'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold mb-1">
                    <span className="material-symbols-outlined text-[16px]">
                      {isCorrect ? 'check_circle' : 'cancel'}
                    </span>
                    <span>{isCorrect ? 'Correct Answer' : 'Explanation & Review'}</span>
                  </div>
                  <p>{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action / Results Bar */}
      {!submittedRunResult ? (
        <div className="p-6 rounded-2xl bg-white border border-[#e4e2df] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#5c3f40]">
            <span className="font-bold text-[#1b1c1a]">
              {Object.keys(selectedAnswers).length} of {currentQuestions.length} answered
            </span>
            {!allAnswered && <span className="ml-2 text-[#b80035] font-medium">— Select all options to submit</span>}
          </div>

          <button
            type="button"
            disabled={!allAnswered}
            onClick={handleSubmitRun}
            className={`px-6 py-3 rounded-xl font-headline text-sm font-bold shadow-md transition-all ${
              allAnswered
                ? 'bg-[#e11d48] hover:bg-[#b80035] text-white active:scale-95'
                : 'bg-[#efeeeb] text-[#906f70] opacity-60 cursor-not-allowed'
            }`}
          >
            Submit Learning Check
          </button>
        </div>
      ) : (
        /* Results Card */
        <div className="p-6 sm:p-8 rounded-2xl bg-white border-2 border-[#b80035] shadow-lg flex flex-col gap-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#eae8e5] pb-4">
            <div>
              <span className="font-mono-epoch text-xs text-[#006093] font-bold uppercase tracking-wider">
                Assessment Results
              </span>
              <h3 className="font-headline text-2xl font-bold text-[#1b1c1a]">
                Performance Score: {submittedRunResult.score} / {submittedRunResult.total}
              </h3>
              <p className="text-xs text-[#5c3f40] mt-0.5">
                Calculated strictly from submitted answers in run #{currentRun?.id}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 px-5 rounded-2xl bg-[#ffdada] text-[#40000c] text-center">
                <span className="font-mono-epoch text-3xl font-black">{submittedRunResult.percentage}%</span>
                <span className="block text-[10px] font-mono-epoch uppercase font-bold">Accuracy</span>
              </div>
              <button
                type="button"
                onClick={() => startNewRun(activeMode)}
                className="px-4 py-2.5 rounded-xl bg-[#efeeeb] hover:bg-[#eae8e5] text-[#1b1c1a] text-xs font-bold transition-colors"
              >
                Retake Form
              </button>
            </div>
          </div>

          {/* 4-Pillar Topic Performance Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {Object.entries(submittedRunResult.topicBreakdown).map(([topic, details]) => (
              <div
                key={topic}
                className={`p-3.5 rounded-xl border flex flex-col gap-1 ${
                  details.correct ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono-epoch text-[10px] font-bold uppercase text-[#565e74]">
                    {topic}
                  </span>
                  <span
                    className={`material-symbols-outlined text-[16px] ${
                      details.correct ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {details.correct ? 'check_circle' : 'cancel'}
                  </span>
                </div>
                <span className="font-headline text-xs font-bold text-[#1b1c1a]">
                  {details.correct ? 'Mastered' : 'Needs Review'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
