/**
 * Time-Kerchief Core MVP v3.0 - Stage Hero Showcase
 * High-precision stage specimen viewport with interactive callout pins
 */

import React, { useEffect, useState } from 'react';
import { CalloutPin, Stage } from '../types/content';

interface StageHeroProps {
  stage: Stage;
  totalStages: number;
}

export const StageHero: React.FC<StageHeroProps> = ({ stage, totalStages }) => {
  const [activePin, setActivePin] = useState<CalloutPin | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
    setActivePin(null);
  }, [stage.id]);

  return (
    <div className="flex flex-col gap-4">
      {/* Stage Header Block */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#eae8e5] pb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#dae2fd] text-[#131b2e] font-mono-epoch text-[11px] font-bold tracking-wider uppercase flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] text-[#006093]">verified</span>
              {stage.badge}
            </span>
            <span className="px-3 py-1 rounded-full bg-[#ffdada] text-[#40000c] text-xs font-bold tracking-wide">
              Stage {stage.number} of {totalStages}
            </span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#efeeeb] text-[#5c3f40] font-mono-epoch text-[11px] tracking-wider uppercase">
            SPECIMEN #{stage.id.toUpperCase()}
          </span>
        </div>

        <div className="pt-1">
          <div className="flex items-center gap-2 text-[#b80035] font-mono-epoch text-xs uppercase tracking-widest font-semibold">
            <span>Production Milestone</span>
            <span>—</span>
            <span>Step {stage.number} of {totalStages}</span>
          </div>
          <h1 className="font-headline text-2xl sm:text-3xl lg:text-4xl text-[#1b1c1a] tracking-tight font-bold mt-1">
            {stage.title}
          </h1>
          <p className="font-body text-base sm:text-lg text-[#5c3f40] leading-relaxed mt-2 max-w-3xl">
            {stage.description}
          </p>
        </div>
      </div>

      {/* Hero Image & Technical Viewport */}
      <div className="relative w-full h-72 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-sm bg-[#efeeeb] border border-[#e4e2df] group">
        {!imageError ? (
          <img
            src={stage.image.url}
            alt={stage.image.altText}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#efeeeb] to-[#eae8e5]">
            <span className="material-symbols-outlined text-4xl text-[#906f70] mb-2">image</span>
            <span className="font-headline text-sm font-bold text-[#1b1c1a]">{stage.title}</span>
            <p className="text-xs text-[#5c3f40] max-w-sm mt-1">{stage.image.caption}</p>
          </div>
        )}

        {/* Ambient Dark Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none"></div>

        {/* Interactive Specimen Callout Pins */}
        {stage.calloutPins?.map((pin) => (
          <div
            key={pin.id}
            style={{
              top: `${pin.yPercent}%`,
              left: `${pin.xPercent}%`,
            }}
            className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2"
          >
            <button
              type="button"
              onClick={() => setActivePin(activePin?.id === pin.id ? null : pin)}
              aria-label={`Inspect pin ${pin.number}: ${pin.label}`}
              className="group/pin flex items-center gap-1.5 backdrop-blur-md bg-white/95 hover:bg-white p-1 px-2.5 rounded-full shadow-lg border border-white/80 transition-all hover:scale-110 active:scale-95 cursor-pointer"
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center font-mono-epoch text-[11px] font-bold text-white shrink-0 ${
                  pin.badgeColor === 'tertiary' ? 'bg-[#006093]' : 'bg-[#b80035]'
                }`}
              >
                {pin.number}
              </span>
              <span className="hidden sm:inline font-mono-epoch text-[11px] text-[#1b1c1a] font-bold uppercase tracking-wider pr-1">
                {pin.label}
              </span>
            </button>

            {/* Pin Detail Popover */}
            {activePin?.id === pin.id && (
              <div className="absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 rounded-xl bg-white text-[#1b1c1a] shadow-2xl border border-[#e4e2df] text-xs flex flex-col gap-1 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between font-bold border-b border-[#eae8e5] pb-1">
                  <span className="text-[#b80035] font-mono-epoch uppercase tracking-wider">{pin.label}</span>
                  <button
                    type="button"
                    onClick={() => setActivePin(null)}
                    className="text-[#906f70] hover:text-[#1b1c1a] text-sm"
                  >
                    ×
                  </button>
                </div>
                <p className="text-[11px] text-[#5c3f40] leading-relaxed pt-1">
                  {pin.description}
                </p>
              </div>
            )}
          </div>
        ))}

        {/* Live Inspection Loupe Badge Overlay */}
        <div className="absolute bottom-4 left-4 backdrop-blur-md bg-white/90 px-4 py-2 rounded-xl shadow-md flex items-center gap-3 border border-white/80 max-w-xs sm:max-w-md">
          <span className="material-symbols-outlined text-[#b80035] text-[20px]">verified</span>
          <div className="flex flex-col">
            <span className="font-mono-epoch text-[11px] text-[#1b1c1a] font-bold uppercase tracking-wider">
              {stage.number === totalStages ? 'AQL 2.5 Standard Inspection' : 'Curated Process Milestone'}
            </span>
            <span className="font-body text-[11px] text-[#5c3f40] truncate">
              {stage.image.caption}
            </span>
          </div>
        </div>

        {/* Epoch Marker Ribbon */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 font-mono-epoch text-xs text-[#1b1c1a] border border-[#e5bdbe]/40">
          <span className="w-2 h-2 rounded-full bg-[#b80035] animate-ping"></span>
          <span>Stage {stage.number} Analysis</span>
        </div>
      </div>
    </div>
  );
};
