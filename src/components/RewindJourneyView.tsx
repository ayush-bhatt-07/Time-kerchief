/**
 * Time-Kerchief Core MVP v3.0 - Rewind Journey Primary View
 * Synchronizes TimeDial, StageHero, MetamorphosisFlow, and SDG Panels.
 * Halts and unmounts active video player immediately on stage navigation.
 */

import React, { useState } from 'react';
import { Product, Stage } from '../types/content';
import { EvidenceDialog } from './EvidenceDialog';
import { GlossaryModal } from './GlossaryModal';
import { MetamorphosisFlow } from './MetamorphosisFlow';
import { SDGPanels } from './SDGPanels';
import { StageHero } from './StageHero';
import { TimeDial } from './TimeDial';
import { VideoModal } from './VideoModal';

interface RewindJourneyViewProps {
  product: Product;
  currentStageNumber: number;
  onStageChange: (newStage: number) => void;
  onNavigateToDecode: () => void;
  onNavigateToQuiz: () => void;
  onNavigateHome: () => void;
}

export const RewindJourneyView: React.FC<RewindJourneyViewProps> = ({
  product,
  currentStageNumber,
  onStageChange,
  onNavigateToDecode,
  onNavigateToQuiz,
  onNavigateHome,
}) => {
  const [activeVideoStage, setActiveVideoStage] = useState<Stage | null>(null);
  const [showEvidence, setShowEvidence] = useState(false);
  const [selectedGlossaryTerm, setSelectedGlossaryTerm] = useState<string | null>(null);

  const currentStage =
    product.stages.find((s) => s.number === currentStageNumber) ||
    product.stages[product.stages.length - 1];

  // Intercept stage changes to immediately stop and unmount any playing video!
  const handleStageSelect = (stageNum: number) => {
    setActiveVideoStage(null); // Cleanly stop and unmount video player!
    onStageChange(stageNum);
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in">
      {/* Sub-navigation & Breadcrumb Bar */}
      <section className="w-full bg-[#f5f3f0] py-3 px-6 lg:px-12 rounded-2xl border border-[#e4e2df] shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Breadcrumb Hierarchy */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 overflow-x-auto min-w-0">
            <button
              type="button"
              onClick={onNavigateHome}
              className="font-headline text-xs font-semibold text-[#5c3f40] hover:text-[#b80035] transition-colors flex items-center gap-1 shrink-0"
            >
              <span className="material-symbols-outlined text-[16px]">travel_explore</span>
              <span>Explore Products</span>
            </button>
            <span className="material-symbols-outlined text-[14px] text-[#906f70]">chevron_right</span>
            <span className="font-headline text-xs font-semibold text-[#565e74] truncate shrink-0">
              {product.name}
            </span>
            <span className="material-symbols-outlined text-[14px] text-[#906f70]">chevron_right</span>
            <span className="font-headline text-xs text-[#b80035] font-bold shrink-0">
              Rewind Journey
            </span>
          </nav>

          {/* View Selector Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#efeeeb] rounded-xl self-start md:self-auto border border-[#e4e2df]">
            <button
              type="button"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#e11d48] text-white font-headline text-xs font-bold shadow-sm transition-all"
            >
              <span className="material-symbols-outlined text-[17px]">history</span>
              <span>Rewind Journey</span>
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            </button>
            <button
              type="button"
              onClick={onNavigateToDecode}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[#565e74] hover:text-[#1b1c1a] font-headline text-xs font-bold transition-colors"
            >
              <span className="material-symbols-outlined text-[17px]">sell</span>
              <span>Decode Label</span>
            </button>
            <button
              type="button"
              onClick={onNavigateToQuiz}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[#565e74] hover:text-[#1b1c1a] font-headline text-xs font-bold transition-colors"
            >
              <span className="material-symbols-outlined text-[17px]">quiz</span>
              <span>Check Learning</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Temporal Stage Grid */}
      <section className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Signature Chrono-Kerchief Dial (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <TimeDial
              stages={product.stages}
              currentStageNumber={currentStageNumber}
              onStageChange={handleStageSelect}
              productTitle={product.name}
            />

            {/* Curricular Metadata Snapshot Card */}
            <div className="bg-[#f5f3f0] p-6 rounded-2xl border border-[#e4e2df] shadow-sm flex flex-col gap-3">
              <div className="flex items-center gap-2 text-[#565e74]">
                <span className="material-symbols-outlined text-[20px] text-[#b80035]">science</span>
                <span className="font-headline text-xs font-bold uppercase tracking-wider text-[#1b1c1a]">
                  Curriculum Alignment Context
                </span>
              </div>
              <p className="font-body text-xs text-[#5c3f40] leading-relaxed">
                Class 8–10 Science and Class 11–12 Vocational Technology. Traces post-consumer and finished retail goods backward through standardized industrial manufacturing units to raw agricultural origins.
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="px-2.5 py-1 rounded-full bg-[#dae2fd] text-[#131b2e] font-mono-epoch text-[11px] font-bold">
                  CBSE / ICSE Aligned
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white text-[#1b1c1a] font-mono-epoch text-[11px] font-bold border border-[#e4e2df]">
                  IS 10014 Verified
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#ffdada] text-[#40000c] font-mono-epoch text-[11px] font-bold">
                  SDG 8 & 9 Standard
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Stage Visualization & Learning Content (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Primary Dossier Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e4e2df] shadow-sm flex flex-col gap-6">
              <StageHero stage={currentStage} totalStages={product.stages.length} />

              <MetamorphosisFlow
                stage={currentStage}
                onOpenVideo={currentStage.video ? () => setActiveVideoStage(currentStage) : undefined}
                onOpenLabelDecoder={onNavigateToDecode}
                onOpenEvidence={() => setShowEvidence(true)}
                onSelectGlossaryTerm={(term) => setSelectedGlossaryTerm(term)}
              />
            </div>

            {/* SDG 8 & SDG 9 Dual Curricular Panels */}
            <SDGPanels worker={currentStage.worker} technology={currentStage.technology} />
          </div>
        </div>
      </section>

      {/* Video Modal with Strict Unmount */}
      {activeVideoStage?.video && (
        <VideoModal
          video={activeVideoStage.video}
          stageTitle={activeVideoStage.title}
          onClose={() => setActiveVideoStage(null)}
        />
      )}

      {/* Evidence Dialog */}
      {showEvidence && (
        <EvidenceDialog sources={currentStage.sources} onClose={() => setShowEvidence(false)} />
      )}

      {/* Glossary Modal */}
      {selectedGlossaryTerm && (
        <GlossaryModal
          term={selectedGlossaryTerm}
          onClose={() => setSelectedGlossaryTerm(null)}
        />
      )}
    </div>
  );
};
