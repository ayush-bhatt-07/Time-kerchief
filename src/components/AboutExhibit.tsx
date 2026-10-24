/**
 * Time-Kerchief Core MVP v3.0 - About Exhibit & Methodology
 */

import React from 'react';

export const AboutExhibit: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-8 animate-in fade-in max-w-5xl mx-auto">
      {/* Exhibit Overview */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#e4e2df] shadow-sm flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#b80035] text-[24px]">museum</span>
            <span className="font-mono-epoch text-xs text-[#b80035] font-bold uppercase tracking-wider">
              Curatorial Statement • Educational Exhibit
            </span>
          </div>
          <h2 className="font-headline text-3xl sm:text-4xl font-extrabold text-[#1b1c1a] tracking-tight">
            About the Time-Kerchief Exhibit
          </h2>
          <p className="font-body text-base text-[#5c3f40] leading-relaxed">
            Time-Kerchief transforms everyday manufactured artifacts into interactive reverse-engineering lessons for secondary school students (Classes 8–12). By rewinding through physical transformations, students uncover the raw botanical and agricultural origins, the hands of skilled craftspeople, and the industrial infrastructure that power modern civilization.
          </p>
        </div>

        {/* Curatorial Focus */}
        <div className="p-5 rounded-2xl bg-[#f5f3f0] border border-[#e4e2df] flex flex-col gap-3">
          <span className="font-mono-epoch text-xs font-bold text-[#1b1c1a] uppercase tracking-wider">
            Exhibit Scope & Core Learning Pillars
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-white border border-[#e4e2df]">
              <span className="font-bold text-[#1b1c1a] block">Botanical & Farm Origins</span>
              <span className="text-[#565e74]">Agricultural cultivation & harvesting biology</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-[#e4e2df]">
              <span className="font-bold text-[#1b1c1a] block">Human Craftsmanship</span>
              <span className="text-[#565e74]">Occupational health, skills & dignity of labor</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-[#e4e2df]">
              <span className="font-bold text-[#1b1c1a] block">Industrial Machinery</span>
              <span className="text-[#565e74]">Mechanical workflows & resource efficiency</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-[#e4e2df]">
              <span className="font-bold text-[#1b1c1a] block">Scientific Standards</span>
              <span className="text-[#565e74]">Verified physical label & lab monograph data</span>
            </div>
          </div>
        </div>

        {/* Curricular Framework & SDG Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="p-6 rounded-2xl bg-[#ffdada]/30 border border-[#e5bdbe] flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[#b80035]">
              <span className="material-symbols-outlined text-[22px]">engineering</span>
              <h3 className="font-headline text-base font-bold">UN SDG 8: Decent Work & Economic Growth</h3>
            </div>
            <p className="text-xs text-[#5c3f40] leading-relaxed">
              Every production stage highlights human craftsmanship, daily tasks, vocational competencies, and occupational health considerations (e.g. anti-fatigue flooring, ergonomic feed mechanisms, repetitive strain intervals). We celebrate the dignity of labor without implying third-party brand compliance.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#dae2fd]/40 border border-[#bec6e0] flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[#006093]">
              <span className="material-symbols-outlined text-[22px]">precision_manufacturing</span>
              <h3 className="font-headline text-base font-bold">UN SDG 9: Industry, Innovation & Infrastructure</h3>
            </div>
            <p className="text-xs text-[#131b2e] leading-relaxed">
              Industrial technology is examined through mechanical mechanisms, automation advances, and qualitative resource efficiency (e.g. low-liquor jet dyeing water savings, exhaust heat recovery on tunnel ovens, zero-waste rotary dough web return).
            </p>
          </div>
        </div>

        {/* Fact Verification Methodology */}
        <div className="p-6 rounded-2xl bg-[#fbf9f6] border border-[#e4e2df] flex flex-col gap-3">
          <div className="flex items-center gap-2 text-[#1b1c1a]">
            <span className="material-symbols-outlined text-[20px] text-[#006093]">verified</span>
            <h3 className="font-headline text-sm font-bold uppercase tracking-wider">
              Fact Verification Standard
            </h3>
          </div>
          <p className="text-xs text-[#5c3f40] leading-relaxed">
            All stage narratives, machine specifications, and chemical transformations are verified against peer-reviewed technical monographs (CFTRI, NCERT, ISO, FSSAI). Real physical package labels are photographed and transcribed with 100% adherence to printed text: undeclared facts remain explicitly unverified, and generic footage is never misrepresented as a specific brand's proprietary factory.
          </p>
        </div>
      </div>
    </div>
  );
};
