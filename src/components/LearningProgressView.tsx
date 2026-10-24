/**
 * Time-Kerchief Core MVP v3.0 - Learning Progress & Pre/Post Gain Analysis
 */

import React, { useState } from 'react';
import { ALL_PRODUCTS } from '../content/catalogue';
import { evaluateLearningCycle } from '../engine/scoring';
import { loadUserProgress, resetAllUserProgress } from '../store/storage';
import { ProductId } from '../types/content';

interface LearningProgressViewProps {
  onSelectProductAndQuiz: (productId: ProductId) => void;
  onRefresh: () => void;
}

export const LearningProgressView: React.FC<LearningProgressViewProps> = ({
  onSelectProductAndQuiz,
  onRefresh,
}) => {
  const [progress, setProgress] = useState(loadUserProgress());
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleReset = () => {
    const fresh = resetAllUserProgress();
    setProgress(fresh);
    setShowResetConfirm(false);
    onRefresh();
  };

  const cycleEvaluations = progress.cycles
    .map((cycle) => evaluateLearningCycle(cycle.id, progress.runs))
    .filter(Boolean);

  return (
    <div className="w-full flex flex-col gap-8 animate-in fade-in">
      {/* Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e4e2df] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#b80035] text-[24px]">trending_up</span>
            <span className="font-mono-epoch text-xs text-[#b80035] font-bold uppercase tracking-wider">
              Student Competency Analytics
            </span>
          </div>
          <h2 className="font-headline text-2xl sm:text-3xl font-bold text-[#1b1c1a] mt-1">
            Learning Progress & Pre/Post Comparison
          </h2>
          <p className="font-body text-sm text-[#5c3f40] mt-1 max-w-2xl">
            Locally calculated assessment records comparing pre-check baselines with post-check evaluations. Zero personal data leaves this device.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowResetConfirm(true)}
          className="self-start md:self-auto inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#efeeeb] hover:bg-rose-50 hover:text-rose-700 text-[#5c3f40] font-headline text-xs font-bold transition-colors border border-[#e4e2df]"
        >
          <span className="material-symbols-outlined text-[16px]">restart_alt</span>
          <span>Reset All Progress</span>
        </button>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white p-6 rounded-2xl max-w-sm w-full border border-[#e4e2df] shadow-2xl flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[#b80035]">
              <span className="material-symbols-outlined text-[24px]">warning</span>
              <h3 className="font-headline text-lg font-bold text-[#1b1c1a]">Reset Progress?</h3>
            </div>
            <p className="text-xs text-[#5c3f40] leading-relaxed">
              This will clear all local quiz attempts, pre/post cycle pairings, and return all time-dials to Stage 1. This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-[#565e74] hover:bg-[#efeeeb]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 rounded-xl bg-[#b80035] text-white text-xs font-bold hover:bg-rose-700 shadow-sm"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Progress Cards Per Product */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {ALL_PRODUCTS.map((prod) => {
          const productRuns = progress.runs.filter((r) => r.productId === prod.id && r.completedAt);
          const evaluation = cycleEvaluations.find((ev) => ev?.productId === prod.id);

          return (
            <div
              key={prod.id}
              className="bg-white p-6 rounded-2xl border border-[#e4e2df] shadow-sm flex flex-col justify-between gap-6"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-[#eae8e5] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-headline text-lg font-bold text-[#1b1c1a]">{prod.name}</span>
                    <span className="font-mono-epoch text-[11px] px-2.5 py-0.5 rounded-full bg-[#efeeeb] text-[#565e74] font-semibold">
                      {prod.category}
                    </span>
                  </div>
                  <span className="font-mono-epoch text-xs text-[#006093] font-bold">
                    {productRuns.length} Runs Completed
                  </span>
                </div>

                {/* Pre / Post Comparative Gauge */}
                {evaluation ? (
                  <div className="p-4 rounded-xl bg-[#f5f3f0] border border-[#e4e2df] flex flex-col gap-3">
                    <span className="font-mono-epoch text-[10px] text-[#565e74] uppercase font-bold tracking-wider">
                      Paired Learning Cycle #{evaluation.cycleId.slice(0, 8)}
                    </span>

                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-3 rounded-lg bg-white border border-[#e4e2df]">
                        <span className="text-[10px] text-[#565e74] uppercase block font-mono-epoch">Pre-Check</span>
                        <span className="font-mono-epoch text-lg font-bold text-[#1b1c1a]">
                          {evaluation.preScore !== null
                            ? `${evaluation.preScore} / ${evaluation.preTotal}`
                            : 'Skipped'}
                        </span>
                      </div>

                      <div className="p-3 rounded-lg bg-white border border-[#e4e2df]">
                        <span className="text-[10px] text-[#565e74] uppercase block font-mono-epoch">Post-Check</span>
                        <span className="font-mono-epoch text-lg font-bold text-[#b80035]">
                          {evaluation.postScore !== null
                            ? `${evaluation.postScore} / ${evaluation.postTotal}`
                            : 'Pending'}
                        </span>
                      </div>

                      <div className="p-3 rounded-lg bg-[#dae2fd] text-[#131b2e]">
                        <span className="text-[10px] uppercase block font-mono-epoch font-bold">Net Gain</span>
                        <span className="font-mono-epoch text-lg font-black">
                          {evaluation.gain !== null
                            ? `${evaluation.gain >= 0 ? '+' : ''}${evaluation.gain}%`
                            : '—'}
                        </span>
                      </div>
                    </div>

                    {!evaluation.hasPreCheck && (
                      <p className="text-[11px] text-[#5c3f40] italic leading-tight">
                        * Pre-check was bypassed for exploratory inquiry; displaying honest post-check score without simulated gain.
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="p-6 rounded-xl bg-[#fbf9f6] border border-dashed border-[#e4e2df] text-center flex flex-col items-center gap-2">
                    <span className="material-symbols-outlined text-3xl text-[#906f70]">school</span>
                    <p className="text-xs text-[#5c3f40]">No quiz runs recorded yet for this product.</p>
                  </div>
                )}
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-[#eae8e5]">
                <span className="text-xs text-[#565e74]">
                  Current Dial Position: Stage {progress.stageByProduct[prod.id]} / {prod.stagesTotal}
                </span>
                <button
                  type="button"
                  onClick={() => onSelectProductAndQuiz(prod.id)}
                  className="px-4 py-2 rounded-xl bg-[#e11d48] text-white text-xs font-bold hover:bg-[#b80035] shadow-sm transition-all"
                >
                  Take 4-Pillar Check
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
