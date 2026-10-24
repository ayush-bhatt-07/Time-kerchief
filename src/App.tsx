/**
 * Time-Kerchief Core MVP v3.0 - Main Application Entrypoint
 * Educational Manufacturing History Explorer
 * TanStack React Query + Persistent Local State Engine
 */

import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { AboutExhibit } from './components/AboutExhibit';
import { ExploreProducts } from './components/ExploreProducts';
import { FabricDecoder } from './components/FabricDecoder';
import { FoodDecoder } from './components/FoodDecoder';
import { Footer } from './components/Footer';
import { Header, MainNavRoute } from './components/Header';
import { HowItWorksView } from './components/HowItWorksView';
import { LearningProgressView } from './components/LearningProgressView';
import { QuizView } from './components/QuizView';
import { RewindJourneyView } from './components/RewindJourneyView';
import { ALL_PRODUCTS, getProductById } from './content/catalogue';
import { loadUserProgress, saveStagePosition } from './store/storage';
import { ProductId } from './types/content';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function TimeKerchiefApp() {
  const queryClientRef = useQueryClient();

  // Asynchronous query for user progress state using TanStack React Query
  const { data: progressState, refetch: refetchProgress } = useQuery({
    queryKey: ['user-progress'],
    queryFn: async () => loadUserProgress(),
    initialData: loadUserProgress,
  });

  const [activeRoute, setActiveRoute] = useState<MainNavRoute>('explore-products');
  const [activeProductId, setActiveProductId] = useState<ProductId>(
    progressState?.activeProductId || 'cotton-garment'
  );

  const activeProduct = getProductById(activeProductId) || ALL_PRODUCTS[0];
  const currentStageNumber = progressState?.stageByProduct[activeProductId] ?? activeProduct.stagesTotal;

  // Handle stage change on time dial
  const handleStageChange = (newStage: number) => {
    saveStagePosition(activeProductId, newStage);
    queryClientRef.invalidateQueries({ queryKey: ['user-progress'] });
  };

  // Switch product
  const handleSelectProduct = (productId: ProductId) => {
    setActiveProductId(productId);
    saveStagePosition(productId, progressState?.stageByProduct[productId] ?? (productId === 'cotton-garment' ? 8 : 7));
    queryClientRef.invalidateQueries({ queryKey: ['user-progress'] });
  };

  // Navigation handlers
  const handleStartRewind = (productId: ProductId) => {
    handleSelectProduct(productId);
    setActiveRoute('rewind-journey');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartDecode = (productId: ProductId) => {
    handleSelectProduct(productId);
    setActiveRoute('decode-label');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartQuiz = (productId: ProductId) => {
    handleSelectProduct(productId);
    setActiveRoute('check-learning');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#fbf9f6] text-[#1b1c1a] flex flex-col font-body selection:bg-[#ffdada] selection:text-[#40000c]">
      <Header
        currentRoute={activeRoute}
        onRouteChange={(route) => {
          setActiveRoute(route);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        activeProductId={activeProductId}
        onSelectProduct={handleSelectProduct}
      />

      <main className="w-full pt-20 flex-1 flex flex-col">
        {/* Route Render Engine */}
        {activeRoute === 'explore-products' && (
          <ExploreProducts
            onStartRewind={handleStartRewind}
            onStartDecode={handleStartDecode}
            onStartQuiz={handleStartQuiz}
            onOpenHowItWorks={() => {
              setActiveRoute('how-it-works');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenMethodology={() => {
              setActiveRoute('about-exhibit');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeRoute === 'rewind-journey' && (
          <div className="w-full px-6 lg:px-12 py-8 max-w-7xl mx-auto">
            <RewindJourneyView
              product={activeProduct}
              currentStageNumber={currentStageNumber}
              onStageChange={handleStageChange}
              onNavigateToDecode={() => setActiveRoute('decode-label')}
              onNavigateToQuiz={() => setActiveRoute('check-learning')}
              onNavigateHome={() => setActiveRoute('explore-products')}
            />
          </div>
        )}

        {activeRoute === 'decode-label' && (
          <div className="w-full px-6 lg:px-12 py-8 max-w-7xl mx-auto">
            {activeProduct.id === 'cotton-garment' && activeProduct.fabricDecoder && (
              <FabricDecoder decoderData={activeProduct.fabricDecoder} />
            )}
            {activeProduct.id === 'packaged-biscuit' && activeProduct.foodDecoder && (
              <FoodDecoder decoderData={activeProduct.foodDecoder} />
            )}
          </div>
        )}

        {activeRoute === 'check-learning' && (
          <div className="w-full px-6 lg:px-12 py-8 max-w-7xl mx-auto">
            <QuizView product={activeProduct} />
          </div>
        )}

        {activeRoute === 'how-it-works' && (
          <div className="w-full px-6 lg:px-12 py-10 max-w-7xl mx-auto">
            <HowItWorksView onStartRewind={handleStartRewind} />
          </div>
        )}

        {activeRoute === 'learning-progress' && (
          <div className="w-full px-6 lg:px-12 py-10 max-w-7xl mx-auto">
            <LearningProgressView
              onSelectProductAndQuiz={handleStartQuiz}
              onRefresh={() => {
                refetchProgress();
              }}
            />
          </div>
        )}

        {activeRoute === 'about-exhibit' && (
          <div className="w-full px-6 lg:px-12 py-10 max-w-7xl mx-auto">
            <AboutExhibit />
          </div>
        )}
      </main>

      <Footer
        onNavigateSection={(section) => {
          if (section === 'methodology' || section === 'curriculum') {
            setActiveRoute('about-exhibit');
          } else if (section === 'sdg-8' || section === 'sdg-9') {
            setActiveRoute('rewind-journey');
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TimeKerchiefApp />
    </QueryClientProvider>
  );
}
