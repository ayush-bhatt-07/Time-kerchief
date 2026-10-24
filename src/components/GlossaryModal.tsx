/**
 * Time-Kerchief Core MVP v3.0 - Domain Glossary Modal
 */

import React, { useEffect } from 'react';
import { GLOSSARY_DICTIONARY } from '../content/catalogue';

interface GlossaryModalProps {
  term: string;
  onClose: () => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ term, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const entry = GLOSSARY_DICTIONARY[term] || {
    term,
    definition: 'Domain-specific industrial term curated for educational reverse-engineering study.',
    category: 'General Industrial Technology',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="glossary-term-title"
    >
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#e4e2df] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="font-mono-epoch text-[11px] px-2.5 py-0.5 rounded bg-[#dae2fd] text-[#131b2e] font-bold uppercase tracking-wider">
            {entry.category}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#efeeeb] hover:bg-[#eae8e5] flex items-center justify-center text-[#5c3f40] transition-colors"
            aria-label="Close glossary"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>

        <h3 id="glossary-term-title" className="font-headline text-xl font-bold text-[#1b1c1a]">
          {entry.term}
        </h3>

        <p className="text-sm text-[#5c3f40] leading-relaxed bg-[#fbf9f6] p-4 rounded-xl border border-[#eae8e5]">
          {entry.definition}
        </p>

        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#b80035] text-white text-xs font-semibold hover:bg-[#e11d48] transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
