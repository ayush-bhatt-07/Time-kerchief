/**
 * Time-Kerchief Core MVP v3.0 - Footer
 */

import React from 'react';

interface FooterProps {
  onNavigateSection: (section: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection }) => {
  return (
    <footer className="w-full bg-[#f5f3f0] text-[#5c3f40] mt-auto border-t border-[#eae8e5] shadow-[0_-1px_6px_rgba(0,0,0,0.02)]">
      <div className="w-full px-6 lg:px-12 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col gap-1 max-w-2xl">
          <div className="font-headline text-base font-bold text-[#1b1c1a] tracking-tight">
            Time-Kerchief — BVP Promptaethon 2025 • Educational Manufacturing History Explorer
          </div>
          <p className="font-body text-xs text-[#565e74]">
            Team Doraemon (Ayush Bhatt, Kartik Aggarwal, Tanushree Dhawan, Aryan Das). Curated educational reference for Classes 8–12. Non-commercial, illustrative manufacturing workflows.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-headline font-semibold">
          <button
            type="button"
            onClick={() => onNavigateSection('sdg-8')}
            className="text-[#565e74] hover:text-[#b80035] transition-colors"
          >
            SDG 8: Decent Work
          </button>
          <button
            type="button"
            onClick={() => onNavigateSection('sdg-9')}
            className="text-[#565e74] hover:text-[#b80035] transition-colors"
          >
            SDG 9: Industry & Innovation
          </button>
          <button
            type="button"
            onClick={() => onNavigateSection('curriculum')}
            className="text-[#565e74] hover:text-[#b80035] transition-colors"
          >
            Curricular Standards
          </button>
          <button
            type="button"
            onClick={() => onNavigateSection('methodology')}
            className="text-[#565e74] hover:text-[#b80035] transition-colors"
          >
            Methodology & Verification
          </button>
        </div>
      </div>
    </footer>
  );
};
