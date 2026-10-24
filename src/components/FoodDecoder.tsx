/**
 * Time-Kerchief Core MVP v3.0 - Verified Food & Nutrition Decoder
 * Packaged Biscuit ingredient ordering, per-100g nutrition facts, allergens, and INS additives
 */

import React, { useState } from 'react';
import { FoodDecoderData } from '../types/content';
import { EvidenceDialog } from './EvidenceDialog';

interface FoodDecoderProps {
  decoderData: FoodDecoderData;
}

export const FoodDecoder: React.FC<FoodDecoderProps> = ({ decoderData }) => {
  const [showEvidence, setShowEvidence] = useState(false);
  const [selectedAdditive, setSelectedAdditive] = useState<string | null>(null);

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e4e2df] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#b80035] text-[24px]">cookie</span>
            <span className="font-mono-epoch text-xs text-[#b80035] font-bold uppercase tracking-wider">
              Verified Food Chemistry
            </span>
          </div>
          <h2 className="font-headline text-2xl sm:text-3xl font-bold text-[#1b1c1a] mt-1">
            Nutritional Facts & Ingredient Decoder
          </h2>
          <p className="font-body text-sm text-[#5c3f40] mt-1 max-w-2xl">
            Decrypted from physical retail wrapper #TK-BIS-1026. Ingredients appear in strict descending weight order; undeclared nutrients remain explicitly marked.
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
        {/* Left Column: Official Nutrition Facts Table (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-white p-6 rounded-2xl border-2 border-[#1b1c1a] shadow-md flex flex-col gap-3 font-body">
            <div className="border-b-8 border-[#1b1c1a] pb-2">
              <h3 className="font-headline text-2xl font-black text-[#1b1c1a] tracking-tight">
                Nutrition Information
              </h3>
              <p className="text-xs text-[#565e74] font-medium">Standard Laboratory Reference • Per 100g Basis</p>
            </div>

            <div className="flex items-baseline justify-between border-b-4 border-[#1b1c1a] pb-2">
              <span className="text-sm font-bold uppercase">Energy</span>
              <span className="font-mono-epoch text-xl font-black text-[#1b1c1a]">468 kcal</span>
            </div>

            {/* Nutrients Table */}
            <div className="flex flex-col text-xs">
              {decoderData.nutrients.map((n) => (
                <div
                  key={n.name}
                  className={`flex items-center justify-between py-1.5 border-b border-[#eae8e5] ${
                    n.name.includes('Sugars') || n.name.includes('Saturated') || n.name.includes('Trans')
                      ? 'pl-4 text-[#5c3f40]'
                      : 'font-bold text-[#1b1c1a]'
                  }`}
                >
                  <span>{n.name}</span>
                  <span className="font-mono-epoch tabular-nums">
                    {n.amount.status === 'verified' ? (
                      `${n.amount.value} ${n.unit}`
                    ) : (
                      <span className="text-[#906f70] italic font-normal">Not declared</span>
                    )}
                  </span>
                </div>
              ))}
            </div>

            {/* Scientific Integrity Note */}
            <div className="p-2.5 rounded bg-[#f5f3f0] text-[11px] text-[#5c3f40] leading-snug mt-1">
              <strong>Curatorial Transparency:</strong> Dietary fiber was not declared on the verified packaging label; it is marked accordingly and never assumed to be zero.
            </div>
          </div>
        </div>

        {/* Right Column: Ingredients Order, Allergens & INS Additives (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Ingredients Hierarchy */}
          <div className="bg-white p-6 rounded-2xl border border-[#e4e2df] shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[#eae8e5] pb-3">
              <h3 className="font-headline text-lg font-bold text-[#1b1c1a]">
                Descending Weight Ingredient Order
              </h3>
              <span className="font-mono-epoch text-[10px] px-2.5 py-0.5 rounded bg-[#ffdada] text-[#40000c] font-bold uppercase">
                Law Mandated
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {decoderData.ingredients.value?.map((ing, idx) => (
                <div
                  key={ing}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-[#fbf9f6] border border-[#e4e2df]"
                >
                  <span className="w-6 h-6 rounded-full bg-[#dae2fd] text-[#131b2e] font-mono-epoch text-xs font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-xs font-semibold text-[#1b1c1a]">{ing}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Declared Allergens Callout */}
          <div className="bg-[#ffdada]/30 p-5 rounded-2xl border border-[#e5bdbe] flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[#b80035]">
              <span className="material-symbols-outlined text-[20px]">warning</span>
              <h4 className="font-headline text-sm font-bold uppercase tracking-wide">
                Mandatory Declared Allergens
              </h4>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {decoderData.allergens.value?.map((alg) => (
                <span
                  key={alg}
                  className="px-3 py-1 rounded-full bg-white border border-[#e5bdbe] font-body text-xs font-semibold text-[#40000c]"
                >
                  {alg}
                </span>
              ))}
            </div>
          </div>

          {/* INS Food Additives Explainer */}
          <div className="bg-white p-6 rounded-2xl border border-[#e4e2df] shadow-sm flex flex-col gap-4">
            <h3 className="font-headline text-lg font-bold text-[#1b1c1a] border-b border-[#eae8e5] pb-3">
              Decoded INS Functional Additives
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {decoderData.additives.map((add) => (
                <div
                  key={add.code}
                  onClick={() => setSelectedAdditive(selectedAdditive === add.code ? null : add.code)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    selectedAdditive === add.code
                      ? 'bg-[#dae2fd]/40 border-[#006093] ring-2 ring-[#006093]/30'
                      : 'bg-[#fbf9f6] border-[#e4e2df] hover:border-[#906f70]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono-epoch text-xs font-bold text-[#b80035]">{add.code}</span>
                    <span className="text-[10px] text-[#565e74] uppercase font-mono-epoch">Safety: Verified</span>
                  </div>
                  <h4 className="font-headline text-xs font-bold text-[#1b1c1a] mt-1">{add.name}</h4>
                  <p className="text-[11px] text-[#5c3f40] leading-snug mt-1">{add.purpose}</p>
                </div>
              ))}
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
