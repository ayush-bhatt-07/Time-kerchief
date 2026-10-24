/**
 * Time-Kerchief Core MVP v3.0 - Reusable TimeDial Component
 * Bounded 270-degree arc with visible 90° mechanical gap
 * Direct tapping, pointer dragging with pointer capture, keyboard navigation,
 * accessible slider fallback, and continuous time-travel autoplay.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  getGaugeDashArray,
  getNeedleRotation,
  getStageNodeCoordinates,
  handleDialKeyDown,
  mapPointerToStage,
} from '../engine/dial';
import { Stage } from '../types/content';

interface TimeDialProps {
  stages: Stage[];
  currentStageNumber: number; // 1-indexed (e.g. 1..8)
  onStageChange: (newStageNumber: number) => void;
  productTitle: string;
}

export const TimeDial: React.FC<TimeDialProps> = ({
  stages,
  currentStageNumber,
  onStageChange,
  productTitle,
}) => {
  const totalStages = stages.length;
  const currentStage = stages.find((s) => s.number === currentStageNumber) || stages[totalStages - 1];

  const dialSvgRef = useRef<SVGSVGElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoplaying, setIsAutoplaying] = useState(false);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Stop autoplay when user manually changes stage or on unmount
  const stopAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
    setIsAutoplaying(false);
  }, []);

  useEffect(() => {
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, []);

  const currentStageRef = useRef(currentStageNumber);
  currentStageRef.current = currentStageNumber;

  // Continuous Autoplay Rewind Sequence
  const toggleAutoplay = () => {
    if (isAutoplaying) {
      stopAutoplay();
      return;
    }

    setIsAutoplaying(true);
    // If already at stage 1, reset to terminal stage first
    if (currentStageNumber <= 1) {
      onStageChange(totalStages);
    }

    autoplayTimerRef.current = setInterval(() => {
      const next = currentStageRef.current - 1;
      if (next >= 1) {
        onStageChange(next);
      } else {
        stopAutoplay();
      }
    }, 1300);
  };

  // Direct Marker Tapping
  const handleMarkerClick = (stageNum: number) => {
    stopAutoplay();
    onStageChange(stageNum);
  };

  // Rewind / Advance Button Step
  const handleRewindStep = () => {
    stopAutoplay();
    if (currentStageNumber > 1) {
      onStageChange(currentStageNumber - 1);
    }
  };

  const handleAdvanceStep = () => {
    stopAutoplay();
    if (currentStageNumber < totalStages) {
      onStageChange(currentStageNumber + 1);
    }
  };

  // Keyboard navigation
  const onKeyDown = (e: React.KeyboardEvent) => {
    const nextStage = handleDialKeyDown(e.key, currentStageNumber, totalStages);
    if (nextStage !== null && nextStage !== currentStageNumber) {
      e.preventDefault();
      stopAutoplay();
      onStageChange(nextStage);
    }
  };

  // Slider change
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    stopAutoplay();
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) {
      onStageChange(val);
    }
  };

  // Pointer Dragging on Dial Canvas
  const processPointerEvent = (clientX: number, clientY: number) => {
    if (!dialSvgRef.current) return;
    const rect = dialSvgRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mappedStage = mapPointerToStage(clientX, clientY, centerX, centerY, totalStages);
    if (mappedStage !== currentStageNumber) {
      onStageChange(mappedStage);
    }
  };

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    stopAutoplay();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // safe fallback if pointer capture unsupported
    }
    setIsDragging(true);
    processPointerEvent(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDragging) return;
    processPointerEvent(e.clientX, e.clientY);
  };

  const handlePointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const handlePointerCancel = (e: React.PointerEvent<SVGSVGElement>) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  // SVG Gauge calculations
  const { dashArray } = getGaugeDashArray(currentStageNumber, totalStages, 132);
  const needleRotation = getNeedleRotation(currentStageNumber, totalStages);

  // Generate Stage Marker Coordinates for 1..totalStages
  const markerPositions = stages.map((s) => {
    const coords = getStageNodeCoordinates(s.number, totalStages, 180, 180, 132);
    return {
      stage: s,
      x: coords.x,
      y: coords.y,
    };
  });

  const isAtStart = currentStageNumber === 1;
  const isAtEnd = currentStageNumber === totalStages;

  return (
    <div
      className="bg-white dial-outer-shadow rounded-2xl border border-[#e4e2df] relative overflow-hidden flex flex-col p-5 sm:p-7 select-none focus:outline-none focus:ring-2 focus:ring-[#b80035]/50"
      tabIndex={0}
      onKeyDown={onKeyDown}
      role="region"
      aria-label={`Chrono-Kerchief dial for ${productTitle}, Stage ${currentStageNumber} of ${totalStages}: ${currentStage.title}`}
    >
      {/* Metallic Bezel Corner Fasteners / Screws */}
      <div className="absolute top-3.5 left-3.5 w-3 h-3 rounded-full bg-[#e4e2df] border border-[#906f70]/30 flex items-center justify-center brass-rivet pointer-events-none">
        <div className="w-1.5 h-0.5 bg-[#906f70]/60"></div>
      </div>
      <div className="absolute top-3.5 right-3.5 w-3 h-3 rounded-full bg-[#e4e2df] border border-[#906f70]/30 flex items-center justify-center brass-rivet pointer-events-none">
        <div className="w-1.5 h-0.5 bg-[#906f70]/60 rotate-45"></div>
      </div>
      <div className="absolute bottom-3.5 left-3.5 w-3 h-3 rounded-full bg-[#e4e2df] border border-[#906f70]/30 flex items-center justify-center brass-rivet pointer-events-none">
        <div className="w-1.5 h-0.5 bg-[#906f70]/60 -rotate-45"></div>
      </div>
      <div className="absolute bottom-3.5 right-3.5 w-3 h-3 rounded-full bg-[#e4e2df] border border-[#906f70]/30 flex items-center justify-center brass-rivet pointer-events-none">
        <div className="w-1.5 h-0.5 bg-[#906f70]/60 rotate-90"></div>
      </div>

      {/* Engraved Scientific Nameplate */}
      <div className="w-full rounded-lg bg-gradient-to-r from-[#efeeeb] via-[#eae8e5] to-[#efeeeb] border border-[#e5bdbe]/60 px-4 py-2.5 flex items-center justify-between mb-3 shadow-inner">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#b80035] animate-pulse"></span>
          <span className="font-mono-epoch text-[11px] font-bold text-[#1b1c1a] tracking-wider">
            CHRONO-KERCHIEF // MK-IV
          </span>
        </div>
        <div className="font-mono-epoch text-[10px] text-[#5c3f40] font-semibold uppercase tracking-widest flex items-center gap-1.5">
          <span>ARC: 270° CALIBRATED</span>
          <span className="text-[#906f70]">•</span>
          <span className="text-[#006093]">SER. #TK-0824-ED</span>
        </div>
      </div>

      {/* Header Info */}
      <div className="w-full flex items-center justify-between pb-2 px-1">
        <div>
          <h2 className="font-headline text-[18px] text-[#1b1c1a] tracking-tight font-bold flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#b80035] text-[20px]">explore</span>
            TEMPORAL REWIND DIAL
          </h2>
          <p className="font-body text-[12px] text-[#5c3f40] mt-0.5">
            Turn backward toward raw organic origin ({stages[0]?.title.split(':')[1]?.trim() || 'Cultivation'})
          </p>
        </div>
        <span className="px-2.5 py-1 rounded bg-[#dae2fd]/80 text-[#131b2e] font-mono-epoch text-[11px] font-bold tracking-wide border border-[#bec6e0]/40 shadow-sm">
          REV. 270° ◀
        </span>
      </div>

      {/* Dynamic Stage Callout Badge */}
      <div
        className="w-full py-2 px-3 rounded-md bg-[#f5f3f0] border border-[#e5bdbe]/40 flex items-center justify-between my-2 shadow-sm"
        id="dial-stage-indicator"
      >
        <span className="font-mono-epoch text-[12px] text-[#b80035] tracking-wider font-bold uppercase flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#b80035]"></span>
          {isAtEnd
            ? `STAGE ${totalStages} OF ${totalStages} • FINISHED ARTIFACT`
            : `STAGE ${currentStageNumber} OF ${totalStages} • REWOUND TEMPORAL STATE`}
        </span>
        <span className="font-mono-epoch text-[11px] text-[#565e74] font-semibold">
          {currentStage.degreesText}
        </span>
      </div>

      {/* 360x360 SVG Instrument Centerpiece with Interactive Markers & Needle */}
      <div className="relative w-full max-w-[360px] h-[360px] mx-auto flex items-center justify-center select-none my-2">
        {/* Concentric Outer Horological Enamel & Steel Ring */}
        <div className="absolute inset-2 rounded-full border-4 border-[#e4e2df] bg-[#ffffff]/60 shadow-[inset_0_4px_12px_rgba(0,0,0,0.06),0_10px_25px_rgba(0,0,0,0.05)] pointer-events-none"></div>
        <div className="absolute inset-5 rounded-full border border-dashed border-[#e5bdbe]/60 pointer-events-none"></div>

        {/* Calibrated Arc SVG */}
        <svg
          ref={dialSvgRef}
          className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing touch-none z-10"
          viewBox="0 0 360 360"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          aria-hidden="true"
        >
          {/* Background Track Ring (270 degrees = 622.03 out of 829.38) */}
          <circle
            cx="180"
            cy="180"
            r="132"
            fill="none"
            stroke="#e4e2df"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray="622.03 829.38"
            strokeDashoffset="518.36"
          />

          {/* Active Temporal Gauge Track Fill */}
          <circle
            cx="180"
            cy="180"
            r="132"
            fill="none"
            stroke="#b80035"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={dashArray}
            strokeDashoffset="518.36"
            className="transition-all duration-300 ease-out"
          />

          {/* Calibrated Hairline Ticks */}
          <g opacity="0.6" stroke="#906f70" strokeLinecap="round">
            <line x1="86.7" y1="273.3" x2="95.2" y2="264.8" strokeWidth="2.5" />
            <line x1="48.5" y1="194.8" x2="60.4" y2="193.5" strokeWidth="2.5" />
            <line x1="68.2" y1="109.4" x2="77.8" y2="115.8" strokeWidth="2.5" />
            <line x1="136.4" y1="55.2" x2="140.4" y2="66.6" strokeWidth="2.5" />
            <line x1="223.6" y1="55.2" x2="219.6" y2="66.6" strokeWidth="2.5" />
            <line x1="291.8" y1="109.4" x2="282.2" y2="115.8" strokeWidth="2.5" />
            <line x1="311.5" y1="194.8" x2="299.6" y2="193.5" strokeWidth="2.5" />
            <line x1="273.3" y1="273.3" x2="264.8" y2="264.8" strokeWidth="2.5" />
          </g>

          {/* Mechanical Stop Buffer Wall at 90° Gap */}
          <path d="M 180 300 L 180 326" stroke="#906f70" strokeDasharray="3 3" strokeWidth="2" />
          <text
            x="180"
            y="340"
            fill="#906f70"
            fontSize="9"
            fontWeight="700"
            fontFamily="'Space Grotesk', monospace"
            textAnchor="middle"
            letterSpacing="1"
          >
            MECHANICAL STOP • 90° GAP
          </text>
        </svg>

        {/* Mechanical Indicator Needle & Counterweight */}
        <div
          className="absolute w-full h-full flex items-center justify-center pointer-events-none transition-transform duration-300 ease-out needle-assembly z-20"
          style={{ transform: `rotate(${needleRotation}deg)` }}
        >
          {/* Tapered Instrument Needle Pointer Blade */}
          <div className="relative w-2.5 h-[134px] -translate-y-[67px] flex flex-col items-center justify-start">
            <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[14px] border-b-[#b80035] -mt-2"></div>
            <div className="w-1.5 h-full bg-gradient-to-b from-[#b80035] via-[#e11d48] to-[#1b1c1a] rounded-full flex items-center justify-center">
              <div className="w-0.5 h-4/5 bg-[#ffb3b6]/70 rounded-full"></div>
            </div>
          </div>
          {/* Counterweight Tail */}
          <div className="absolute w-3.5 h-9 bg-[#1b1c1a] rounded-full translate-y-7 shadow-md flex items-center justify-center opacity-90 border border-[#906f70]/40">
            <div className="w-1.5 h-1.5 rounded-full bg-[#eae8e5]"></div>
          </div>
        </div>

        {/* Central Recessed Hub Plinth */}
        <div className="z-30 w-32 h-32 rounded-full bg-gradient-to-b from-white to-[#efeeeb] shadow-[0_4px_16px_rgba(0,0,0,0.12),inset_0_2px_4px_rgba(255,255,255,0.8),inset_0_-2px_4px_rgba(0,0,0,0.15)] flex flex-col items-center justify-center text-center p-2.5 border-2 border-[#e4e2df] relative pointer-events-none">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#b80035] via-[#e11d48] to-[#40000c] shadow-md border-2 border-white flex items-center justify-center mb-1">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffdada] shadow-inner animate-pulse"></div>
          </div>
          <span className="font-mono-epoch text-[9px] text-[#006093] uppercase font-bold tracking-wider">
            {currentStage.displacement}
          </span>
          <span
            className="font-mono-epoch text-[11px] text-[#1b1c1a] font-extrabold leading-tight mt-0.5"
            dangerouslySetInnerHTML={{ __html: currentStage.centerEra }}
          />
          <span className="font-mono-epoch text-[8px] text-[#5c3f40] uppercase tracking-widest mt-0.5">
            NODE {currentStageNumber} / {totalStages}
          </span>
        </div>

        {/* Stage Marker Buttons on Arc */}
        {markerPositions.map(({ stage, x, y }) => {
          const isSelected = stage.number === currentStageNumber;
          const isPassed = stage.number < currentStageNumber;

          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => handleMarkerClick(stage.number)}
              title={stage.title}
              style={{
                top: `${y}px`,
                left: `${x}px`,
              }}
              className={`stage-node-btn group absolute z-40 flex items-center justify-center font-mono-epoch transition-all active:scale-95 ${
                isSelected
                  ? 'w-10 h-10 -ml-5 -mt-5 rounded-full bg-[#b80035] text-white ring-4 ring-[#ffdada] shadow-[0_4px_12px_rgba(184,0,53,0.35)] text-sm font-bold scale-110'
                  : isPassed
                  ? 'w-8 h-8 -ml-4 -mt-4 rounded-full bg-[#eae8e5] hover:bg-[#e4e2df] border border-[#906f70]/40 text-[#1b1c1a] text-xs shadow-sm'
                  : 'w-8 h-8 -ml-4 -mt-4 rounded-full bg-[#efeeeb] hover:bg-[#e4e2df] border border-[#906f70]/20 text-[#906f70] text-xs shadow-sm'
              }`}
            >
              <span>{stage.number}</span>
              {/* Tooltip on hover */}
              <span className="pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 whitespace-nowrap bg-[#1b1c1a] text-white text-[10px] px-2 py-0.5 rounded shadow-lg font-mono-epoch z-50">
                {stage.number}: {stage.title.split(':')[1]?.trim() || stage.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tactile Rewind & Advance Rocker Controls */}
      <div className="w-full flex items-center justify-between gap-3 pt-2">
        <button
          type="button"
          disabled={isAtStart}
          onClick={handleRewindStep}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-xl border text-[13px] font-semibold transition-all ${
            isAtStart
              ? 'bg-[#f5f3f0] border-[#e5bdbe]/20 text-[#906f70] opacity-50 cursor-not-allowed'
              : 'bg-[#efeeeb] hover:bg-[#e4e2df] border-[#e5bdbe]/40 text-[#1b1c1a] active:scale-95 shadow-sm'
          }`}
          aria-label="Rewind one stage"
        >
          <span className="material-symbols-outlined text-[18px] text-[#b80035]">fast_rewind</span>
          <span>◀ Rewind (-1 Stage)</span>
        </button>

        <button
          type="button"
          disabled={isAtEnd}
          onClick={handleAdvanceStep}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-xl border text-[13px] font-semibold transition-all ${
            isAtEnd
              ? 'bg-[#f5f3f0] border-[#e5bdbe]/20 text-[#906f70] opacity-50 cursor-not-allowed'
              : 'bg-[#efeeeb] hover:bg-[#e4e2df] border-[#e5bdbe]/40 text-[#1b1c1a] active:scale-95 shadow-sm'
          }`}
          aria-label="Advance one stage"
        >
          <span>Advance (+1 Stage) ▶</span>
          <span className="material-symbols-outlined text-[18px]">fast_forward</span>
        </button>
      </div>

      {/* Continuous Time-Travel Rewind (Autoplay) Button */}
      <button
        type="button"
        onClick={toggleAutoplay}
        className={`w-full mt-2.5 py-2 px-3 rounded-lg border text-[11px] font-mono-epoch font-bold flex items-center justify-center gap-1.5 transition-colors ${
          isAutoplaying
            ? 'bg-[#b80035] text-white border-[#b80035]'
            : 'bg-[#eae8e5]/60 hover:bg-[#e4e2df] border-[#e5bdbe]/30 text-[#5c3f40]'
        }`}
      >
        <span className="material-symbols-outlined text-[16px]">
          {isAutoplaying ? 'pause_circle' : 'replay'}
        </span>
        <span>
          {isAutoplaying
            ? 'Pause Automatic Time-Travel'
            : 'Continuous Time-Travel Rewind (Autoplay)'}
        </span>
      </button>

      {/* Accessible Linear Slider Fallback */}
      <div className="w-full mt-4 pt-3 border-t border-[#eae8e5] flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="font-body text-[12px] text-[#5c3f40] flex items-center gap-1.5 font-medium">
            <span className="material-symbols-outlined text-[16px]">tune</span>
            Accessible Linear Scrub
          </span>
          <span className="font-mono-epoch text-[12px] text-[#b80035] font-bold" id="slider-readout">
            Node {currentStageNumber} / {totalStages}
          </span>
        </div>
        <input
          type="range"
          min="1"
          max={totalStages}
          step="1"
          value={currentStageNumber}
          onChange={handleSliderChange}
          aria-label={`Linear temporal scrubber for ${productTitle}`}
          aria-valuemin={1}
          aria-valuemax={totalStages}
          aria-valuenow={currentStageNumber}
          aria-valuetext={`Stage ${currentStageNumber} of ${totalStages}: ${currentStage.title}`}
          className="w-full accent-[#b80035] h-2 bg-[#efeeeb] rounded-lg cursor-pointer"
        />
        <div className="flex justify-between font-mono-epoch text-[10px] text-[#5c3f40] px-0.5 uppercase tracking-wide">
          <span>1: {stages[0]?.title.split(':')[1]?.trim().split(' ')[0] || 'Origin'}</span>
          <span>
            {Math.ceil(totalStages / 2)}:{' '}
            {stages[Math.ceil(totalStages / 2) - 1]?.title.split(':')[1]?.trim().split(' ')[0] || 'Process'}
          </span>
          <span>{totalStages}: {stages[totalStages - 1]?.title.split(':')[1]?.trim().split(' ')[0] || 'Finished'}</span>
        </div>
      </div>
    </div>
  );
};
