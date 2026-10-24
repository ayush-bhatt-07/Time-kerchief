/**
 * Time-Kerchief Core MVP v3.0 - Metamorphosis Flow & Inputs/Outputs Matrix
 */

import React from 'react';
import { Stage } from '../types/content';

interface MetamorphosisFlowProps {
  stage: Stage;
  onOpenVideo?: () => void;
  onOpenLabelDecoder?: () => void;
  onOpenEvidence?: () => void;
  onSelectGlossaryTerm: (term: string) => void;
}

export const MetamorphosisFlow: React.FC<MetamorphosisFlowProps> = ({
  stage,
  onOpenVideo,
  onOpenLabelDecoder,
  onOpenEvidence,
  onSelectGlossaryTerm,
}) => {
  return (
    <div className="flex flex-col gap-5">
      {/* Before -> Transformation -> After Process Stepper Card */}
      <div className="bg-[#f5f3f0] p-5 sm:p-6 rounded-2xl shadow-sm border border-[#e4e2df] flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#b80035] text-[20px]">sync_alt</span>
            <span className="font-headline text-[18px] font-bold text-[#1b1c1a]">Physical State Metamorphosis</span>
          </div>
          <span className="font-mono-epoch text-[11px] text-[#565e74] font-bold uppercase tracking-wider">
            DELTA FLOW
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
          {/* Before State */}
          <div className="p-4 rounded-xl bg-white border border-[#e5bdbe]/40 shadow-sm flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5 text-[#5c3f40]">
              <span className="material-symbols-outlined text-[16px]">indeterminate_check_box</span>
              <span className="font-mono-epoch text-[11px] uppercase tracking-wider font-bold">01 • Before</span>
            </div>
            <p className="font-body text-[13px] text-[#1b1c1a] font-medium leading-snug">
              {stage.before}
            </p>
          </div>

          {/* Transformation State */}
          <div className="p-4 rounded-xl bg-[#dae2fd]/50 border border-[#bec6e0]/60 shadow-sm flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5 text-[#006093]">
              <span className="material-symbols-outlined text-[16px]">transform</span>
              <span className="font-mono-epoch text-[11px] uppercase tracking-wider font-bold">02 • Transformation</span>
            </div>
            <p className="font-body text-[13px] text-[#131b2e] font-semibold leading-snug">
              {stage.transformation}
            </p>
          </div>

          {/* After State */}
          <div className="p-4 rounded-xl bg-[#e11d48] text-white shadow-sm flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5 text-[#ffdada]">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              <span className="font-mono-epoch text-[11px] uppercase tracking-wider font-bold text-[#ffdada]">
                03 • After
              </span>
            </div>
            <p className="font-body text-[13px] text-white font-medium leading-snug">
              {stage.after}
            </p>
          </div>
        </div>
      </div>

      {/* Inputs & Outputs Technical Balance Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Inputs Box */}
        <div className="p-5 rounded-2xl bg-[#efeeeb] border border-[#e4e2df] flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[#006093]">
            <span className="material-symbols-outlined text-[18px]">input</span>
            <span className="font-headline text-[15px] font-bold text-[#1b1c1a]">Material & Tool Inputs</span>
          </div>
          <p className="font-body text-[13px] text-[#1b1c1a] leading-relaxed">
            {stage.inputs}
          </p>
        </div>

        {/* Outputs Box */}
        <div className="p-5 rounded-2xl bg-[#efeeeb] border border-[#e4e2df] flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[#b80035]">
            <span className="material-symbols-outlined text-[18px]">output</span>
            <span className="font-headline text-[15px] font-bold text-[#1b1c1a]">Final Stage Outputs</span>
          </div>
          <p className="font-body text-[13px] text-[#1b1c1a] leading-relaxed">
            {stage.outputs}
          </p>
        </div>
      </div>

      {/* Action Bar (Video & Label Decoder) */}
      <div className="flex flex-col gap-2 pt-1">
        <div className="flex flex-wrap items-center gap-3">
          {stage.video && (
            <button
              type="button"
              onClick={onOpenVideo}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#e11d48] hover:bg-[#b80035] text-white font-headline text-[13px] font-semibold shadow-md transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[19px]">play_circle</span>
              <span>Watch Process Clip {stage.video.duration ? `(${stage.video.duration})` : ''}</span>
            </button>
          )}

          {onOpenLabelDecoder && (
            <button
              type="button"
              onClick={onOpenLabelDecoder}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#efeeeb] hover:bg-[#eae8e5] border border-[#e4e2df] text-[#1b1c1a] font-headline text-[13px] font-semibold shadow-sm transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[19px] text-[#006093]">qr_code_scanner</span>
              <span>Inspect Attached Label →</span>
            </button>
          )}

          {onOpenEvidence && (
            <button
              type="button"
              onClick={onOpenEvidence}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-[#fbf9f6] border border-[#e4e2df] text-[#565e74] text-xs font-semibold shadow-sm transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>Evidence Sources ({stage.sources.length})</span>
            </button>
          )}
        </div>

        <p className="font-body text-[12px] text-[#5c3f40] flex items-center gap-1.5 mt-1">
          <span className="material-symbols-outlined text-[14px] text-[#906f70]">info</span>
          <span>Open Educational Manufacturing Archive (CC-BY). Typical industrial model for classroom study.</span>
        </p>
      </div>

      {/* Domain Glossary Chips */}
      {stage.glossary.length > 0 && (
        <div className="flex flex-col gap-2 pt-2 border-t border-[#eae8e5]">
          <span className="font-mono-epoch text-[11px] text-[#5c3f40] uppercase tracking-wider font-bold">
            Domain Glossary Lexicon (Tap to Explain)
          </span>
          <div className="flex flex-wrap gap-2">
            {stage.glossary.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => onSelectGlossaryTerm(term)}
                className="px-3 py-1 rounded-full bg-[#efeeeb] hover:bg-[#e4e2df] border border-[#e5bdbe]/40 text-[#1b1c1a] font-mono-epoch text-[11px] font-semibold shadow-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-1"
              >
                <span>{term}</span>
                <span className="material-symbols-outlined text-[13px] text-[#006093]">help_outline</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
