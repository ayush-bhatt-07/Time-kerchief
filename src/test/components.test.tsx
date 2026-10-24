import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { FabricDecoder } from '../components/FabricDecoder';
import { FoodDecoder } from '../components/FoodDecoder';
import { RewindJourneyView } from '../components/RewindJourneyView';
import { SDGPanels } from '../components/SDGPanels';
import { VideoModal } from '../components/VideoModal';
import { COTTON_PRODUCT } from '../content/cottonGarment';
import { BISCUIT_PRODUCT } from '../content/packagedBiscuit';
import { MediaAsset } from '../types/content';

describe('Application Components & Synchronization', () => {
  it('synchronizes stage content when stage changes in RewindJourneyView', () => {
    const handleStageChange = vi.fn();
    const handleDecode = vi.fn();
    const handleQuiz = vi.fn();
    const handleHome = vi.fn();

    const { rerender } = render(
      <RewindJourneyView
        product={COTTON_PRODUCT}
        currentStageNumber={8}
        onStageChange={handleStageChange}
        onNavigateToDecode={handleDecode}
        onNavigateToQuiz={handleQuiz}
        onNavigateHome={handleHome}
      />
    );

    // Initial stage 8 content
    expect(screen.getAllByText(/Finished Garment/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Quality Control Inspector/i).length).toBeGreaterThanOrEqual(1);

    // Rerender at stage 1 (Cultivation)
    rerender(
      <RewindJourneyView
        product={COTTON_PRODUCT}
        currentStageNumber={1}
        onStageChange={handleStageChange}
        onNavigateToDecode={handleDecode}
        onNavigateToQuiz={handleQuiz}
        onNavigateHome={handleHome}
      />
    );

    // Stage 1 content should now be rendered
    expect(screen.getAllByText(/Cotton Cultivation/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Agronomist/i).length).toBeGreaterThanOrEqual(1);
  });

  it('unmounts video player when stage navigation occurs', () => {
    const handleStageChange = vi.fn();
    render(
      <RewindJourneyView
        product={COTTON_PRODUCT}
        currentStageNumber={1} // Stage 1 (Cotton Cultivation) has educational video
        onStageChange={handleStageChange}
        onNavigateToDecode={vi.fn()}
        onNavigateToQuiz={vi.fn()}
        onNavigateHome={vi.fn()}
      />
    );

    // Click "Watch Process Clip" button
    const watchBtn = screen.getByRole('button', { name: /Watch Process Clip/i });
    fireEvent.click(watchBtn);

    // Video modal should appear
    expect(screen.getByRole('dialog')).toBeDefined();

    // Advance to stage 2 via direct marker button
    const stage2Marker = screen.getByRole('button', {
      name: '2',
    });
    fireEvent.click(stage2Marker);

    // Handler called with 2
    expect(handleStageChange).toHaveBeenCalledWith(2);
    // Modal is unmounted
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('renders verified FabricDecoder data correctly', () => {
    render(<FabricDecoder decoderData={COTTON_PRODUCT.fabricDecoder!} />);

    expect(screen.getAllByText(/Organic/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Fabric Weight \(GSM\)/i)).toBeDefined();
    expect(screen.getAllByText(/ISO 3758/i).length).toBeGreaterThanOrEqual(1);
  });

  it('renders verified FoodDecoder data correctly', () => {
    render(<FoodDecoder decoderData={BISCUIT_PRODUCT.foodDecoder!} />);

    expect(screen.getByText(/Descending Weight Ingredient Order/i)).toBeDefined();
    expect(screen.getAllByText(/Wheat Flour/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Declared Allergens/i)).toBeDefined();
    expect(screen.getAllByText(/Gluten/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Decoded INS Functional Additives/i)).toBeDefined();
  });

  it('renders SDGPanels with worker and technology details', () => {
    const stage = COTTON_PRODUCT.stages[0]; // Stage 1 Cultivation
    render(<SDGPanels worker={stage.worker} technology={stage.technology} />);

    expect(screen.getByText(/SDG 8: Decent Work/i)).toBeDefined();
    expect(screen.getByText(stage.worker.role)).toBeDefined();

    expect(screen.getByText(/SDG 9: Innovation/i)).toBeDefined();
    expect(screen.getByText(stage.technology.machinery)).toBeDefined();
  });

  it('renders VideoModal without autoplay and provides transcript summary', () => {
    const mockVideo: MediaAsset = {
      id: 'vid-test-01',
      type: 'video',
      sourceId: 'src-spin-01',
      creator: 'Open Industrial Education',
      rightsBasis: 'CC BY 4.0',
      reviewedAt: '2026-03-01',
      caption: 'Continuous ring spinning spindle at 18,000 RPM',
      altText: 'Ring spinning machine running',
      url: 'https://example.com/video.mp4',
      playback: 'external',
      transcriptSummary: 'High-speed automated ring spinning spindle rotating at 18,000 RPM.',
    };
    const handleClose = vi.fn();

    render(
      <VideoModal
        video={mockVideo}
        stageTitle="Yarn Spinning Stage"
        onClose={handleClose}
      />
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeDefined();

    // Summary transcript is rendered
    expect(screen.getByText(mockVideo.transcriptSummary!)).toBeDefined();

    // Close button works
    const closeBtn = screen.getByRole('button', { name: /Close video player/i });
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalled();
  });
});
