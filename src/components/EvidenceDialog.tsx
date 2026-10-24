/**
 * Time-Kerchief Core MVP v3.0 - Evidence & Verification Source Dialog
 */

import React, { useEffect } from 'react';
import { Source } from '../types/content';

interface EvidenceDialogProps {
  sources: Source[];
  onClose: () => void;
}

export const EvidenceDialog: React.FC<EvidenceDialogProps> = ({ sources, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="evidence-dialog-title"
    >
      <div className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-[#e4e2df] flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-[#eae8e5] flex items-center justify-between bg-[#fbf9f6]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006093] text-[22px]">policy</span>
            <h3 id="evidence-dialog-title" className="font-headline text-[17px] font-bold text-[#1b1c1a]">
              Verified Educational Evidence & Standards
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#efeeeb] hover:bg-[#eae8e5] flex items-center justify-center text-[#5c3f40] transition-colors"
            aria-label="Close evidence dialog"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex flex-col gap-4">
          <p className="text-xs text-[#5c3f40] leading-relaxed">
            All manufacturing transformations, worker skill contexts, and label decoders are cross-referenced with reviewed educational sources and photographed physical artifact specimens.
          </p>

          <div className="flex flex-col gap-3">
            {sources.map((src) => (
              <div key={src.id} className="p-4 rounded-xl bg-[#fbf9f6] border border-[#e4e2df] flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-headline text-sm font-bold text-[#1b1c1a]">{src.title}</span>
                  <span className="font-mono-epoch text-[10px] px-2 py-0.5 rounded bg-[#dae2fd] text-[#131b2e] font-semibold shrink-0 uppercase">
                    {src.kind === 'label-photo' ? 'Label Photo' : 'Reference'}
                  </span>
                </div>

                {src.publisher && (
                  <p className="text-xs text-[#565e74]">
                    <span className="font-semibold">Publisher:</span> {src.publisher}
                  </p>
                )}

                <div className="flex flex-wrap items-center justify-between text-[11px] text-[#5c3f40] pt-1 border-t border-[#eae8e5]">
                  <span>Verified: {src.verifiedAt}</span>
                  <span className="font-medium text-[#006093]">Reviewer: {src.reviewer}</span>
                </div>

                {src.url && (
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#b80035] font-semibold hover:underline mt-1"
                  >
                    <span>Inspect Authority Record</span>
                    <span className="material-symbols-outlined text-[13px]">launch</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 py-3 bg-[#f5f3f0] border-t border-[#eae8e5] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#1b1c1a] text-white text-xs font-semibold hover:bg-black transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
