/**
 * Time-Kerchief Core MVP v3.0 - How It Works (Pedagogical Framework)
 */

import React from 'react';
import { ProductId } from '../types/content';

interface HowItWorksViewProps {
  onStartRewind: (productId: ProductId) => void;
}

export const HowItWorksView: React.FC<HowItWorksViewProps> = ({ onStartRewind }) => {
  const steps = [
    {
      num: '01',
      phase: 'SELECT',
      title: 'Choose a Ubiquitous Artifact',
      icon: 'category',
      summary:
        'Select a manufactured product from everyday modern life — like an everyday organic cotton t-shirt or a sealed packaged biscuit. Start at the finished consumer stage.',
    },
    {
      num: '02',
      phase: 'SCRUB',
      title: 'Rewind the Chrono-Kerchief Dial',
      icon: 'fast_rewind',
      summary:
        'Rotate the bounded 270-degree dial counter-clockwise to travel backward through assembly epochs. The needle sweeps across calibrated degrees with an intentional 90° mechanical gap enforcing real history.',
    },
    {
      num: '03',
      phase: 'ANALYZE',
      title: 'Observe State Metamorphosis',
      icon: 'compare_arrows',
      summary:
        'Contrast the upstream raw inputs with downstream processed outputs side-by-side. Unpack the mechanical, biological, and thermal transformations taking place at each node.',
    },
    {
      num: '04',
      phase: 'DECODE',
      title: 'Decipher Packaging & Physical Labels',
      icon: 'document_scanner',
      summary:
        'Inspect photographed label tags, descending ingredient percentages, ISO 3758 wash symbols, and nutrition facts. Distinguish verified evidence from typical mass-production workflows.',
    },
    {
      num: '05',
      phase: 'EVALUATE',
      title: '4-Pillar Learning Check',
      icon: 'quiz',
      summary:
        'Test your retention with paired pre-check and post-check evaluations covering physical transformations, label literacy, worker roles (SDG 8), and industrial technology (SDG 9).',
    },
  ];

  return (
    <div className="w-full flex flex-col gap-8 animate-in fade-in max-w-5xl mx-auto">
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#e4e2df] shadow-sm flex flex-col gap-8">
        <div>
          <span className="font-mono-epoch text-xs text-[#b80035] font-bold uppercase tracking-wider">
            Pedagogical Architecture
          </span>
          <h2 className="font-headline text-3xl sm:text-4xl font-extrabold text-[#1b1c1a] tracking-tight mt-1">
            Five Steps of Reverse-Engineering
          </h2>
          <p className="font-body text-base text-[#5c3f40] mt-2 max-w-2xl leading-relaxed">
            Time-Kerchief replaces passive video watching with active, hands-on chronometric navigation. Here is how the scientific inquiry loop operates:
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {steps.map((st) => (
            <div
              key={st.num}
              className="p-6 rounded-2xl bg-[#fbf9f6] border border-[#e4e2df] flex flex-col sm:flex-row items-start sm:items-center gap-5 hover:border-[#b80035]/40 transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#dae2fd] text-[#006093] flex items-center justify-center shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-[24px]">{st.icon}</span>
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono-epoch text-xs font-bold text-[#b80035] uppercase">
                    {st.num} // {st.phase}
                  </span>
                  <span className="text-[#906f70]">•</span>
                  <h3 className="font-headline text-base font-bold text-[#1b1c1a]">{st.title}</h3>
                </div>
                <p className="font-body text-xs sm:text-sm text-[#5c3f40] leading-relaxed">
                  {st.summary}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 rounded-2xl bg-[#f5f3f0] border border-[#e4e2df] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#5c3f40]">
            Ready to test the engine? Choose a product line to rewind.
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onStartRewind('cotton-garment')}
              className="px-4 py-2 rounded-xl bg-[#e11d48] text-white text-xs font-bold hover:bg-[#b80035] transition-all shadow-sm"
            >
              Rewind Cotton Garment
            </button>
            <button
              type="button"
              onClick={() => onStartRewind('packaged-biscuit')}
              className="px-4 py-2 rounded-xl bg-[#1b1c1a] text-white text-xs font-bold hover:bg-black transition-all shadow-sm"
            >
              Rewind Packaged Biscuit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
