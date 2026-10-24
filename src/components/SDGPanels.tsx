/**
 * Time-Kerchief Core MVP v3.0 - SDG 8 & SDG 9 Dual Curricular Panels
 * SDG 8: Decent Work & Human Craftsmanship
 * SDG 9: Industry, Innovation & Infrastructure
 */

import React from 'react';
import { WorkerInfo, TechnologyInfo } from '../types/content';

interface SDGPanelsProps {
  worker: WorkerInfo;
  technology: TechnologyInfo;
}

export const SDGPanels: React.FC<SDGPanelsProps> = ({ worker, technology }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* SDG 8: Decent Work & Human Craftsmanship */}
      <div className="bg-white p-6 rounded-2xl border border-[#e4e2df] shadow-sm flex flex-col gap-4 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#b80035]">
            <span className="material-symbols-outlined text-[22px]">engineering</span>
            <span className="font-headline text-[18px] font-bold text-[#1b1c1a]">People Behind Process</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#ffdada] text-[#40000c] font-mono-epoch text-[11px] font-bold">
            SDG 8: Decent Work
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-mono-epoch text-[10px] text-[#565e74] uppercase tracking-wider font-bold">
            Primary Vocational Role
          </span>
          <p className="font-headline text-[16px] text-[#1b1c1a] font-bold">
            {worker.role}
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-mono-epoch text-[10px] text-[#565e74] uppercase tracking-wider font-bold">
            Core Daily Tasks
          </span>
          <p className="font-body text-[13px] text-[#5c3f40] leading-relaxed">
            {worker.tasks}
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-[#f5f3f0] border border-[#e5bdbe]/30 flex flex-col gap-1 mt-auto">
          <span className="font-mono-epoch text-[10px] text-[#006093] uppercase font-bold tracking-wider">
            Human Competencies & Safe-Work Standards
          </span>
          <p className="font-body text-[12px] text-[#1b1c1a] font-medium leading-snug">
            {worker.skills}
          </p>
        </div>
      </div>

      {/* SDG 9: Industry, Innovation & Infrastructure */}
      <div className="bg-white p-6 rounded-2xl border border-[#e4e2df] shadow-sm flex flex-col gap-4 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#006093]">
            <span className="material-symbols-outlined text-[22px]">precision_manufacturing</span>
            <span className="font-headline text-[18px] font-bold text-[#1b1c1a]">Industry & Technology</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#dae2fd] text-[#131b2e] font-mono-epoch text-[11px] font-bold">
            SDG 9: Innovation
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-mono-epoch text-[10px] text-[#565e74] uppercase tracking-wider font-bold">
            Key Machinery & Apparatus
          </span>
          <p className="font-headline text-[16px] text-[#1b1c1a] font-bold">
            {technology.machinery}
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-mono-epoch text-[10px] text-[#565e74] uppercase tracking-wider font-bold">
            Industrial Engineering Process
          </span>
          <p className="font-body text-[13px] text-[#5c3f40] leading-relaxed">
            {technology.process}
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-[#f5f3f0] border border-[#dae2fd] flex flex-col gap-1 mt-auto">
          <span className="font-mono-epoch text-[10px] text-[#006093] uppercase font-bold tracking-wider">
            Productivity & Resource Metric
          </span>
          <p className="font-body text-[12px] text-[#1b1c1a] font-medium leading-snug">
            {technology.metric}
          </p>
        </div>
      </div>
    </div>
  );
};
