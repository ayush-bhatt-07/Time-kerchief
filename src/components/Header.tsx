/**
 * Time-Kerchief Core MVP v3.0 - Top Navigation Bar
 * Conforms to the Top Bar Contract: Zone 1 (Brand), Zone 2 (Nav links), Zone 3 (Primary action / badges).
 */

import React from 'react';
import { ProductId } from '../types/content';

export type MainNavRoute =
  | 'explore-products'
  | 'rewind-journey'
  | 'decode-label'
  | 'check-learning'
  | 'how-it-works'
  | 'learning-progress'
  | 'about-exhibit';

interface HeaderProps {
  currentRoute: MainNavRoute;
  onRouteChange: (route: MainNavRoute) => void;
  activeProductId: ProductId;
  onSelectProduct: (productId: ProductId) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  onRouteChange,
  activeProductId,
  onSelectProduct,
}) => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#fbf9f6]/95 backdrop-blur-md border-b border-[#eae8e5] shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 w-full px-6 lg:px-12 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => onRouteChange('explore-products')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <img
              src="/assets/aistudio/image_cffe5180.png"
              alt="Time-Kerchief Brand Logo"
              className="w-10 h-10 rounded-xl object-cover shadow-sm group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="font-headline text-xl font-extrabold text-[#1b1c1a] tracking-tight leading-none group-hover:text-[#b80035] transition-colors">
                Time-Kerchief
              </span>
              <span className="font-mono-epoch text-[11px] text-[#5c3f40] tracking-wider uppercase mt-1 font-semibold">
                Manufacturing History Explorer
              </span>
            </div>
          </button>

          <div className="hidden xl:block h-8 w-px bg-[#e4e2df]"></div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#f5f3f0] p-1 rounded-full border border-[#e4e2df]">
            <button
              type="button"
              onClick={() => onRouteChange('explore-products')}
              className={`px-4 py-2 rounded-full font-headline text-xs font-bold transition-all ${
                currentRoute === 'explore-products'
                  ? 'bg-[#e11d48] text-white shadow-sm'
                  : 'text-[#565e74] hover:text-[#1b1c1a]'
              }`}
            >
              Explore Products
            </button>
            <button
              type="button"
              onClick={() => onRouteChange('rewind-journey')}
              className={`px-4 py-2 rounded-full font-headline text-xs font-bold transition-all ${
                currentRoute === 'rewind-journey'
                  ? 'bg-[#e11d48] text-white shadow-sm'
                  : 'text-[#565e74] hover:text-[#1b1c1a]'
              }`}
            >
              Rewind Journey
            </button>
            <button
              type="button"
              onClick={() => onRouteChange('how-it-works')}
              className={`px-4 py-2 rounded-full font-headline text-xs font-bold transition-all ${
                currentRoute === 'how-it-works'
                  ? 'bg-[#e11d48] text-white shadow-sm'
                  : 'text-[#565e74] hover:text-[#1b1c1a]'
              }`}
            >
              How It Works
            </button>
            <button
              type="button"
              onClick={() => onRouteChange('learning-progress')}
              className={`px-4 py-2 rounded-full font-headline text-xs font-bold transition-all ${
                currentRoute === 'learning-progress'
                  ? 'bg-[#e11d48] text-white shadow-sm'
                  : 'text-[#565e74] hover:text-[#1b1c1a]'
              }`}
            >
              Learning Progress
            </button>
          </nav>
        </div>

        {/* Zone 3: Active Product Selector & Actions */}
        <div className="flex items-center gap-3">
          {/* Active Product Switcher dropdown / pill */}
          <div className="hidden sm:flex items-center gap-1.5 p-1 rounded-xl bg-[#efeeeb] border border-[#e4e2df]">
            <button
              type="button"
              onClick={() => onSelectProduct('cotton-garment')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono-epoch font-bold transition-all ${
                activeProductId === 'cotton-garment'
                  ? 'bg-white text-[#1b1c1a] shadow-sm'
                  : 'text-[#565e74] hover:text-[#1b1c1a]'
              }`}
            >
              Cotton Garment
            </button>
            <button
              type="button"
              onClick={() => onSelectProduct('packaged-biscuit')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono-epoch font-bold transition-all ${
                activeProductId === 'packaged-biscuit'
                  ? 'bg-white text-[#1b1c1a] shadow-sm'
                  : 'text-[#565e74] hover:text-[#1b1c1a]'
              }`}
            >
              Packaged Biscuit
            </button>
          </div>

          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#dae2fd] text-[#131b2e] font-mono-epoch text-[11px] font-bold">
            <span className="material-symbols-outlined text-[15px] text-[#006093]">school</span>
            <span>SDG 8 & 9 Edu</span>
          </div>

          <button
            type="button"
            onClick={() => onRouteChange('about-exhibit')}
            className="px-3.5 py-2 rounded-xl bg-[#eae8e5] hover:bg-[#e4e2df] text-[#1b1c1a] font-headline text-xs font-bold transition-colors"
          >
            About Exhibit
          </button>
        </div>
      </div>
    </header>
  );
};
