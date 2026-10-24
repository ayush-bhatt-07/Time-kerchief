/**
 * Time-Kerchief Core MVP v3.0 - Stage Video Modal
 * Safe user-activated playback with transcript summary and external link fallback.
 * Strictly unmounts on close or when active stage changes.
 */

import React, { useEffect } from 'react';
import { MediaAsset } from '../types/content';

interface VideoModalProps {
  video: MediaAsset;
  stageTitle: string;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ video, stageTitle, onClose }) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#e4e2df] flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#eae8e5] flex items-center justify-between bg-[#fbf9f6]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#b80035] text-[22px]">play_circle</span>
            <div>
              <h3 id="video-modal-title" className="font-headline text-[17px] font-bold text-[#1b1c1a]">
                Educational Process Footage
              </h3>
              <p className="text-xs text-[#565e74] truncate max-w-md">{stageTitle}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#efeeeb] hover:bg-[#eae8e5] flex items-center justify-center text-[#5c3f40] transition-colors"
            aria-label="Close video player"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Video Viewport / Embed Area */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center">
          {video.embedUrl ? (
            <iframe
              src={video.embedUrl}
              title={video.caption}
              className="w-full h-full border-0"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="p-6 text-center text-white flex flex-col items-center gap-3">
              <span className="material-symbols-outlined text-4xl text-[#ffb3b6]">video_library</span>
              <p className="text-sm font-medium">External process video available for this stage</p>
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#b80035] text-white text-xs font-semibold hover:bg-[#e11d48] transition-colors"
              >
                <span>Open in New Tab</span>
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </a>
            </div>
          )}
        </div>

        {/* Modal Body & Text Summary */}
        <div className="p-6 flex flex-col gap-3 bg-[#fbf9f6]">
          <div className="flex items-center justify-between text-xs text-[#565e74]">
            <span className="font-mono-epoch font-semibold">{video.creator}</span>
            <span>Reviewed: {video.reviewedAt}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-[#e4e2df]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#006093] mb-1 font-mono-epoch">
              Curated Process Summary
            </h4>
            <p className="text-xs text-[#1b1c1a] leading-relaxed">
              {video.transcriptSummary || video.caption}
            </p>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-[#5c3f40]">
              Rights: {video.rightsBasis}
            </span>
            <a
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-[#006093] font-semibold hover:underline"
            >
              <span>View Source Clip</span>
              <span className="material-symbols-outlined text-[14px]">launch</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
