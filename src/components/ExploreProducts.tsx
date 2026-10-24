/**
 * Time-Kerchief Core MVP v3.0 - Explore Products (Home / Catalogue View)
 * Displays Curricular Crosswalk, Hero Section with animated dial centerpiece,
 * Five Steps of Reverse Engineering, and Bento cards for both industrial lines.
 */

import React, { useEffect, useState } from 'react';
import { ALL_PRODUCTS } from '../content/catalogue';
import { ProductId } from '../types/content';

interface ExploreProductsProps {
  onStartRewind: (productId: ProductId) => void;
  onStartDecode: (productId: ProductId) => void;
  onStartQuiz: (productId: ProductId) => void;
  onOpenHowItWorks: () => void;
  onOpenMethodology: () => void;
}

export const ExploreProducts: React.FC<ExploreProductsProps> = ({
  onStartRewind,
  onStartDecode,
  onStartQuiz,
  onOpenHowItWorks,
  onOpenMethodology,
}) => {
  // Kinetic Hero Dial Auto-Rotate State
  const [heroDialIndex, setHeroDialIndex] = useState(0);

  const heroDialStages = [
    { label: 'STAGE -01', title: 'Nitrogen Pack → Oven', deg: 45, displacement: '-1 Hour' },
    { label: 'STAGE -03', title: 'Tunnel Oven → Cutter', deg: 120, displacement: '-24 Hours' },
    { label: 'STAGE -05', title: 'Rotary Cutter → Dough', deg: 210, displacement: '-36 Hours' },
    { label: 'STAGE -07', title: 'Flour Silo → Wheat Field', deg: 290, displacement: '-120 Days' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroDialIndex((prev) => (prev + 1) % heroDialStages.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [heroDialStages.length]);

  const activeHeroStage = heroDialStages[heroDialIndex];

  return (
    <div className="flex flex-col w-full animate-in fade-in">
      {/* Educational Alignment Ticker */}
      <section className="w-full bg-[#eae8e5] py-2.5 px-6 lg:px-12 border-b border-[#e4e2df]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#b80035] text-white">
              <span className="material-symbols-outlined text-[13px]">verified</span>
            </span>
            <span className="font-mono-epoch text-[11px] text-[#1b1c1a] uppercase tracking-wider font-bold">
              Curricular Crosswalk (2024–25)
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-body text-xs text-[#5c3f40]">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e11d48]"></span>
              CBSE & ICSE Grades 8–12 Science & Economics
            </span>
            <span className="hidden md:inline text-[#e5bdbe]">•</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006093]"></span>
              Vocational Skills & Applied Technology
            </span>
            <span className="hidden md:inline text-[#e5bdbe]">•</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#565e74]"></span>
              UN SDGs: Goal 8 (Decent Work) & Goal 9 (Industry Innovation)
            </span>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative w-full px-6 lg:px-12 pt-12 pb-16 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-[#ffb3b6]/20 blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 -right-32 w-[32rem] h-[32rem] rounded-full bg-[#dae2fd]/40 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-12 items-center relative z-10">
          {/* Left Column (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-4">
            {/* Tagline Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#efeeeb] text-[#5c3f40] shadow-sm border border-[#e4e2df]">
              <span className="inline-block w-2 h-2 rounded-full bg-[#b80035] animate-pulse"></span>
              <span className="font-mono-epoch text-xs uppercase tracking-wider text-[#b80035] font-bold">
                Team Doraemon
              </span>
              <span className="text-[#906f70]">•</span>
              <span className="font-body text-xs text-[#1b1c1a] font-medium">
                Every product has a past. Rewind to discover it.
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl text-[#1b1c1a] tracking-tight font-extrabold leading-[1.1]">
              What if you could <span className="text-[#b80035] italic">rewind</span> anything?
            </h1>

            {/* Editorial Subtitle */}
            <p className="font-body text-base sm:text-lg text-[#5c3f40] max-w-2xl leading-relaxed">
              Travel backward through everyday products. Discover their raw agricultural origins, industrial transformations, the hands of skilled workers, and automated factory technologies.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#product-archive"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#e11d48] text-white font-headline text-sm font-bold shadow-md hover:bg-[#b80035] transition-all hover:-translate-y-0.5 active:scale-95"
              >
                <span className="material-symbols-outlined text-[20px]">history</span>
                <span>Start Exploring</span>
              </a>
              <button
                type="button"
                onClick={onOpenHowItWorks}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#efeeeb] text-[#1b1c1a] font-headline text-sm font-bold shadow-sm hover:bg-[#eae8e5] border border-[#e4e2df] transition-all"
              >
                <span className="material-symbols-outlined text-[20px] text-[#006093]">explore</span>
                <span>How It Works</span>
              </button>
            </div>

            {/* Metric Badges Row */}
            <div className="grid grid-cols-3 gap-4 pt-4 w-full max-w-lg">
              <div className="p-4 rounded-xl bg-white border border-[#e4e2df] shadow-sm flex flex-col">
                <span className="font-mono-epoch text-xs text-[#b80035] font-bold uppercase">Stages</span>
                <span className="font-headline text-xl sm:text-2xl font-black text-[#1b1c1a] mt-0.5">15 Total</span>
                <span className="font-body text-[11px] text-[#565e74]">2 core pilot tracks</span>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#e4e2df] shadow-sm flex flex-col">
                <span className="font-mono-epoch text-xs text-[#006093] font-bold uppercase">Curriculum</span>
                <span className="font-headline text-xl sm:text-2xl font-black text-[#1b1c1a] mt-0.5">Grades 8–12</span>
                <span className="font-body text-[11px] text-[#565e74]">Classroom tested</span>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#e4e2df] shadow-sm flex flex-col">
                <span className="font-mono-epoch text-xs text-[#565e74] font-bold uppercase">Integrity</span>
                <span className="font-headline text-xl sm:text-2xl font-black text-[#1b1c1a] mt-0.5">100% Open</span>
                <span className="font-body text-[11px] text-[#565e74]">Verified museum data</span>
              </div>
            </div>
          </div>

          {/* Right Column: Kinetic Temporal Rewind Instrument Centerpiece (5 Cols) */}
          <div className="lg:col-span-5 flex justify-center items-center relative py-6">
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-[#f5f3f0] shadow-xl p-6 flex items-center justify-center select-none border border-[#e4e2df]">
              {/* Outer 270-degree Calibration Ring SVG */}
              <svg className="absolute inset-0 w-full h-full transform -rotate-135 pointer-events-none" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="2.5"
                  strokeDasharray="207.3"
                  strokeDashoffset="69.1"
                  strokeLinecap="round"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="#E11D48"
                  strokeWidth="3.2"
                  strokeDasharray="207.3"
                  strokeDashoffset="120"
                  strokeLinecap="round"
                />
              </svg>

              {/* Middle Dial Surface */}
              <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-white shadow-md flex flex-col items-center justify-center p-6 text-center relative border border-[#e4e2df]">
                {/* Crosshairs */}
                <div className="absolute inset-x-8 top-1/2 h-px bg-[#eae8e5] pointer-events-none"></div>
                <div className="absolute inset-y-8 left-1/2 w-px bg-[#eae8e5] pointer-events-none"></div>

                {/* Central Hub Disc */}
                <div className="relative z-10 w-24 h-24 rounded-full bg-[#f5f3f0] flex flex-col items-center justify-center shadow-inner border border-[#e4e2df]">
                  <span
                    className="material-symbols-outlined text-[28px] text-[#b80035] transition-transform duration-700 ease-out"
                    style={{ transform: `rotate(-${activeHeroStage.deg}deg)` }}
                  >
                    restart_alt
                  </span>
                  <span className="font-mono-epoch text-[11px] text-[#1b1c1a] uppercase tracking-wider font-bold mt-1">
                    {activeHeroStage.label}
                  </span>
                </div>

                {/* Curatorial Status Label */}
                <div className="relative z-10 mt-3 flex flex-col items-center">
                  <span className="font-headline text-[15px] leading-tight text-[#1b1c1a] font-bold">
                    {activeHeroStage.title}
                  </span>
                  <span className="font-mono-epoch text-[11px] text-[#5c3f40] mt-0.5 font-semibold">
                    Displacement: {activeHeroStage.displacement}
                  </span>
                </div>

                {/* Scrub Notches */}
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#e11d48]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#eae8e5]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#eae8e5]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#eae8e5]"></span>
                </div>
              </div>

              {/* Orbiting Satellite Badges */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 -translate-y-2 bg-white px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 border border-[#e4e2df]">
                <span className="material-symbols-outlined text-[16px] text-[#b80035]">cookie</span>
                <span className="font-headline text-xs font-bold text-[#1b1c1a]">Golden Biscuit</span>
              </div>
              <div className="absolute top-1/3 -left-3 -translate-y-1/2 bg-white px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 border border-[#e4e2df]">
                <span className="material-symbols-outlined text-[16px] text-[#006093]">agriculture</span>
                <span className="font-headline text-xs font-bold text-[#1b1c1a]">Wheat Sheaf</span>
              </div>
              <div className="absolute top-1/3 -right-4 -translate-y-1/2 bg-white px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 border border-[#e4e2df]">
                <span className="material-symbols-outlined text-[16px] text-[#565e74]">line_weight</span>
                <span className="font-headline text-xs font-bold text-[#1b1c1a]">Spun Yarn</span>
              </div>
              <div className="absolute bottom-6 left-8 bg-white px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 border border-[#e4e2df]">
                <span className="material-symbols-outlined text-[16px] text-[#b80035]">dry_cleaning</span>
                <span className="font-headline text-xs font-bold text-[#1b1c1a]">Kerchief</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Five Steps of Reverse-Engineering Framework */}
      <section className="w-full bg-[#f5f3f0] py-16 px-6 lg:px-12 border-y border-[#eae8e5]" id="how-it-works">
        <div className="max-w-7xl mx-auto flex flex-col space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-mono-epoch text-xs uppercase tracking-wider text-[#b80035] font-bold">
                Pedagogical Framework
              </span>
              <h2 className="font-headline text-3xl font-extrabold text-[#1b1c1a] tracking-tight mt-1">
                Five Steps of Reverse-Engineering
              </h2>
            </div>
            <p className="font-body text-xs sm:text-sm text-[#5c3f40] max-w-md">
              A structured scientific inquiry model designed to develop system-thinking and industrial literacy across Classes 8–12.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Step 1 */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#e4e2df] flex flex-col justify-between group hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between text-[#5c3f40]">
                  <span className="font-mono-epoch text-xs font-bold text-[#b80035]">01 // SELECT</span>
                  <span className="material-symbols-outlined text-[20px] text-[#565e74]">category</span>
                </div>
                <h3 className="font-headline text-[16px] text-[#1b1c1a] font-bold mt-2">Choose Product</h3>
                <p className="font-body text-xs text-[#5c3f40] mt-1.5 leading-relaxed">
                  Select a ubiquitous manufactured artifact from everyday modern life.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#eae8e5] flex items-center gap-1.5 text-[#006093] font-headline text-xs font-bold">
                <span>Staple Artifacts</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#e4e2df] flex flex-col justify-between group hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between text-[#5c3f40]">
                  <span className="font-mono-epoch text-xs font-bold text-[#b80035]">02 // SCRUB</span>
                  <span className="material-symbols-outlined text-[20px] text-[#565e74]">fast_rewind</span>
                </div>
                <h3 className="font-headline text-[16px] text-[#1b1c1a] font-bold mt-2">Rewind the Dial</h3>
                <p className="font-body text-xs text-[#5c3f40] mt-1.5 leading-relaxed">
                  Manipulate the temporal scrubber to unpack historical and mechanical assembly stages.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#eae8e5] flex items-center gap-1.5 text-[#006093] font-headline text-xs font-bold">
                <span>Non-Linear Scrub</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#e4e2df] flex flex-col justify-between group hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between text-[#5c3f40]">
                  <span className="font-mono-epoch text-xs font-bold text-[#b80035]">03 // ANALYZE</span>
                  <span className="material-symbols-outlined text-[20px] text-[#565e74]">compare_arrows</span>
                </div>
                <h3 className="font-headline text-[16px] text-[#1b1c1a] font-bold mt-2">Observe Shifts</h3>
                <p className="font-body text-xs text-[#5c3f40] mt-1.5 leading-relaxed">
                  Compare upstream raw state with downstream processed outputs side-by-side.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#eae8e5] flex items-center gap-1.5 text-[#006093] font-headline text-xs font-bold">
                <span>State Differential</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#e4e2df] flex flex-col justify-between group hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between text-[#5c3f40]">
                  <span className="font-mono-epoch text-xs font-bold text-[#b80035]">04 // DECODE</span>
                  <span className="material-symbols-outlined text-[20px] text-[#565e74]">document_scanner</span>
                </div>
                <h3 className="font-headline text-[16px] text-[#1b1c1a] font-bold mt-2">Decode Artifacts</h3>
                <p className="font-body text-xs text-[#5c3f40] mt-1.5 leading-relaxed">
                  Read real-world nutritional ingredient facts, wash tags, and metallurgical stamps.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#eae8e5] flex items-center gap-1.5 text-[#006093] font-headline text-xs font-bold">
                <span>Verified Data</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </div>
            </div>

            {/* Step 5 */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#e4e2df] flex flex-col justify-between group hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between text-[#5c3f40]">
                  <span className="font-mono-epoch text-xs font-bold text-[#b80035]">05 // EVALUATE</span>
                  <span className="material-symbols-outlined text-[20px] text-[#565e74]">quiz</span>
                </div>
                <h3 className="font-headline text-[16px] text-[#1b1c1a] font-bold mt-2">Check Learning</h3>
                <p className="font-body text-xs text-[#5c3f40] mt-1.5 leading-relaxed">
                  Reinforce takeaways across science, labor economics, and industrial equipment.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#eae8e5] flex items-center gap-1.5 text-[#006093] font-headline text-xs font-bold">
                <span>4-Pillar Quiz</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Product Catalog Section */}
      <section className="w-full px-6 lg:px-12 py-16" id="product-archive">
        <div className="max-w-7xl mx-auto flex flex-col space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-mono-epoch text-xs uppercase tracking-wider text-[#b80035] font-bold">
                Active Interactive Modules
              </span>
              <h2 className="font-headline text-3xl font-extrabold text-[#1b1c1a] tracking-tight mt-1">
                Select an Industrial Line to Rewind
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#dae2fd] text-[#131b2e] font-mono-epoch text-xs font-bold">
                Pilot Cohort V3.0
              </span>
              <span className="font-body text-xs text-[#5c3f40]">Showing 2 Complete Pipelines</span>
            </div>
          </div>

          {/* 2 Primary Bento Product Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {ALL_PRODUCTS.map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-3xl border border-[#e4e2df] shadow-md p-6 sm:p-8 flex flex-col justify-between hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col space-y-4">
                  {/* Category Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#efeeeb] font-mono-epoch text-xs uppercase tracking-wider text-[#1b1c1a] font-bold">
                      {prod.category}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#dae2fd] text-[#131b2e] text-xs font-semibold flex items-center gap-1 font-mono-epoch">
                      <span className="material-symbols-outlined text-[15px] text-[#006093]">timelapse</span>
                      <span>{prod.categoryLabel}</span>
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="font-headline text-2xl sm:text-3xl font-bold text-[#1b1c1a] tracking-tight">
                      {prod.name}
                    </h3>
                    <p className="font-body text-xs sm:text-sm text-[#5c3f40] mt-2 leading-relaxed">
                      {prod.subtitle}
                    </p>
                  </div>

                  {/* Visual Image Viewport */}
                  <div className="relative w-full h-56 rounded-2xl overflow-hidden bg-[#f5f3f0] shadow-inner flex items-center justify-center">
                    <img
                      src={prod.heroImage}
                      alt={prod.heroAlt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-3 inset-x-3 bg-white/90 backdrop-blur-md rounded-xl p-2.5 shadow-sm flex items-center justify-between border border-white/80">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#b80035] animate-pulse"></span>
                        <span className="font-mono-epoch text-[11px] text-[#1b1c1a] font-bold uppercase truncate max-w-[200px] sm:max-w-xs">
                          {prod.milestoneTitle}
                        </span>
                      </div>
                      <span className="font-mono-epoch text-[11px] text-[#b80035] font-bold">
                        {prod.milestoneStage}
                      </span>
                    </div>
                  </div>

                  {/* SDG Badges */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-3 rounded-xl bg-[#f5f3f0] border border-[#e4e2df] flex items-start gap-2">
                      <span className="material-symbols-outlined text-[18px] text-[#b80035] mt-0.5">group</span>
                      <div className="flex flex-col">
                        <span className="font-mono-epoch text-[10px] uppercase tracking-wider text-[#565e74] font-bold">
                          SDG 8: Decent Work
                        </span>
                        <span className="font-body text-xs text-[#1b1c1a] font-semibold">
                          {prod.sdg8Summary}
                        </span>
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-[#f5f3f0] border border-[#e4e2df] flex items-start gap-2">
                      <span className="material-symbols-outlined text-[18px] text-[#006093] mt-0.5">precision_manufacturing</span>
                      <div className="flex flex-col">
                        <span className="font-mono-epoch text-[10px] uppercase tracking-wider text-[#565e74] font-bold">
                          SDG 9: Industry
                        </span>
                        <span className="font-body text-xs text-[#1b1c1a] font-semibold">
                          {prod.sdg9Summary}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Cluster */}
                <div className="pt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#eae8e5] mt-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onStartRewind(prod.id)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#e11d48] text-white font-headline text-xs font-bold shadow-md hover:bg-[#b80035] transition-all active:scale-95"
                    >
                      <span>Rewind Journey</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onStartDecode(prod.id)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#efeeeb] hover:bg-[#eae8e5] text-[#1b1c1a] font-headline text-xs font-bold transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px]">sell</span>
                      <span>Decode</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onStartQuiz(prod.id)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#efeeeb] hover:bg-[#eae8e5] text-[#1b1c1a] font-headline text-xs font-bold transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px]">quiz</span>
                      <span>Quiz</span>
                    </button>
                  </div>

                  <span className="font-mono-epoch text-[11px] text-[#5c3f40] uppercase font-bold">
                    {prod.durationEst}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Educational Integrity & Non-Commercial Standard Callout */}
      <section className="w-full px-6 lg:px-12 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#efeeeb] p-6 lg:p-8 rounded-2xl border border-[#e4e2df] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4 max-w-3xl">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#b80035] shadow-sm shrink-0">
                <span className="material-symbols-outlined text-[26px]">policy</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="font-mono-epoch text-xs uppercase tracking-wider text-[#1b1c1a] font-bold">
                  Curated Educational Reference • Non-Commercial Standard
                </span>
                <p className="font-body text-xs sm:text-sm text-[#5c3f40] leading-relaxed">
                  <strong>Curated Educational Experience:</strong> Distinct from commercial barcode scanners or video game factory simulators. Verified package facts (nutrition formulas, certified wash icons) are strictly segregated from standardized educational workflows representing typical industrial mass production.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenMethodology}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#1b1c1a] font-headline text-xs font-bold shadow-sm hover:bg-[#fbf9f6] border border-[#e4e2df] transition-all shrink-0"
            >
              <span className="material-symbols-outlined text-[16px] text-[#006093]">menu_book</span>
              <span>View Fact Verification Methods</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
