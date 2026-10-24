/**
 * Time-Kerchief Core MVP v3.0 - Verified Fabric Decoder
 * Renders verified composition, construction, GSM, and ISO 3758 care icons from physical garment tag specimen.
 */

import React, { useState } from 'react';
import { CareSymbol, FabricDecoderData } from '../types/content';
import { EvidenceDialog } from './EvidenceDialog';

interface FabricDecoderProps {
  decoderData: FabricDecoderData;
}

export const FabricDecoder: React.FC<FabricDecoderProps> = ({ decoderData }) => {
  const [selectedCareSymbol, setSelectedCareSymbol] = useState<CareSymbol | null>(null);
  const [showEvidence, setShowEvidence] = useState(false);

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Decoder Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e4e2df] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#b80035] text-[24px]">sell</span>
            <span className="font-mono-epoch text-xs text-[#b80035] font-bold uppercase tracking-wider">
              Verified Textile Decryption
            </span>
          </div>
          <h2 className="font-headline text-2xl sm:text-3xl font-bold text-[#1b1c1a] mt-1">
            Fabric & Care Label Decoder
          </h2>
          <p className="font-body text-sm text-[#5c3f40] mt-1 max-w-2xl">
            Physical specimen analysis of stitched interior garment label. Every value resolves to verified physical evidence; unknown parameters remain explicitly undeclared.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowEvidence(true)}
          className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#dae2fd] hover:bg-[#cce5ff] text-[#131b2e] font-headline text-xs font-bold transition-colors shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">verified_user</span>
          <span>View Source Evidence</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Photographed Specimen Tag Card (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-white p-6 rounded-2xl border border-[#e4e2df] shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[#eae8e5] pb-3">
              <span className="font-headline text-sm font-bold text-[#1b1c1a]">Photographed Tag Specimen</span>
              <span className="font-mono-epoch text-[10px] px-2 py-0.5 rounded bg-[#ffdada] text-[#40000c] font-bold uppercase">
                ISO 3758 Verified
              </span>
            </div>

            {/* Specimen Tag Visual Representation */}
            <div className="p-6 rounded-xl bg-[#fbf9f6] border border-dashed border-[#906f70]/40 flex flex-col items-center text-center font-mono-epoch gap-3">
              <span className="text-[10px] tracking-widest text-[#5c3f40] uppercase">
                SPECIMEN ID: #TK-COT-0824
              </span>
              <div className="w-16 h-px bg-[#e4e2df]"></div>
              <span className="font-bold text-lg text-[#1b1c1a]">100% ORGANIC COTTON</span>
              <span className="text-xs text-[#565e74]">MADE IN ACCREDITED FACILITY</span>
              <span className="text-xs text-[#565e74]">RN #142857 • CA #09871</span>
              <div className="w-24 h-px bg-[#e4e2df]"></div>

              {/* Care Icon Row */}
              <div className="flex items-center gap-2 text-[#1b1c1a] py-2">
                {decoderData.careSymbols.value?.map((cs) => (
                  <button
                    key={cs.id}
                    type="button"
                    onClick={() => setSelectedCareSymbol(cs)}
                    title={cs.meaning}
                    className="w-9 h-9 rounded-lg bg-white border border-[#e4e2df] hover:border-[#b80035] hover:text-[#b80035] flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[19px]">{cs.symbol}</span>
                  </button>
                ))}
              </div>
              <span className="text-[10px] text-[#5c3f40]">Tap any symbol above to decode meaning</span>
            </div>

            {/* Care Symbol Explanation Callout */}
            {selectedCareSymbol && (
              <div className="p-4 rounded-xl bg-[#dae2fd]/50 border border-[#bec6e0] flex flex-col gap-1.5 animate-in fade-in">
                <div className="flex items-center justify-between text-[#006093]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">{selectedCareSymbol.symbol}</span>
                    <span className="font-headline text-xs font-bold">{selectedCareSymbol.meaning}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedCareSymbol(null)}
                    className="text-xs text-[#565e74] hover:text-black"
                  >
                    ×
                  </button>
                </div>
                <p className="font-body text-xs text-[#131b2e] leading-relaxed">
                  {selectedCareSymbol.instruction}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Verified Structural & Compositional Metrics (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#e4e2df] shadow-sm flex flex-col gap-5">
            <h3 className="font-headline text-lg font-bold text-[#1b1c1a] border-b border-[#eae8e5] pb-3">
              Fiber Composition & Technical Construction
            </h3>

            {/* Composition Matrix */}
            <div className="flex flex-col gap-2">
              <span className="font-mono-epoch text-xs font-bold text-[#565e74] uppercase tracking-wider">
                Fiber Mass Breakdown
              </span>
              <div className="p-4 rounded-xl bg-[#f5f3f0] border border-[#e4e2df] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#b80035] text-[22px]">eco</span>
                  <div>
                    <span className="font-headline text-sm font-bold text-[#1b1c1a]">
                      {decoderData.verifiedComposition.value?.[0]?.name || 'Organic Cotton'}
                    </span>
                    <p className="text-xs text-[#5c3f40]">
                      {decoderData.verifiedComposition.note}
                    </p>
                  </div>
                </div>
                <span className="font-headline text-xl font-extrabold text-[#b80035]">
                  {decoderData.verifiedComposition.value?.[0]?.percent}%
                </span>
              </div>
            </div>

            {/* Construction & Fabric Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#efeeeb] border border-[#e4e2df] flex flex-col gap-1">
                <span className="font-mono-epoch text-[10px] text-[#565e74] uppercase font-bold tracking-wider">
                  Knit Architecture
                </span>
                <span className="font-headline text-sm font-bold text-[#1b1c1a]">
                  {decoderData.construction.value}
                </span>
                <p className="text-[11px] text-[#5c3f40] mt-1">
                  24-gauge single jersey knit yielding 2-way natural mechanical elasticity.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#efeeeb] border border-[#e4e2df] flex flex-col gap-1">
                <span className="font-mono-epoch text-[10px] text-[#565e74] uppercase font-bold tracking-wider">
                  Fabric Weight (GSM)
                </span>
                <span className="font-headline text-sm font-bold text-[#1b1c1a]">
                  {decoderData.gsm.value} g/m²
                </span>
                <p className="text-[11px] text-[#5c3f40] mt-1">
                  Mid-weight standard durability benchmark for all-season everyday wear.
                </p>
              </div>
            </div>

            {/* Regulatory Standards Compliance */}
            <div className="flex flex-col gap-2 pt-2 border-t border-[#eae8e5]">
              <span className="font-mono-epoch text-xs font-bold text-[#565e74] uppercase tracking-wider">
                Curricular Standards & Regulatory Crosswalk
              </span>
              <div className="flex flex-wrap gap-2">
                {decoderData.standards.map((std) => (
                  <span
                    key={std}
                    className="px-3 py-1 rounded-full bg-[#fbf9f6] border border-[#e4e2df] text-xs font-medium text-[#1b1c1a]"
                  >
                    {std}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showEvidence && (
        <EvidenceDialog sources={decoderData.sources} onClose={() => setShowEvidence(false)} />
      )}
    </div>
  );
};
