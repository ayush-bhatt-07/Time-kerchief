import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { TimeDial } from '../components/TimeDial';
import { COTTON_PRODUCT } from '../content/cottonGarment';
import { BISCUIT_PRODUCT } from '../content/packagedBiscuit';

describe('TimeDial Reusable Component', () => {
  it('renders correctly for Cotton Garment with 8 stages', () => {
    const handleStageChange = vi.fn();
    render(
      <TimeDial
        stages={COTTON_PRODUCT.stages}
        currentStageNumber={8}
        onStageChange={handleStageChange}
        productTitle={COTTON_PRODUCT.name}
      />
    );

    // Verify 8 stage marker buttons are present
    COTTON_PRODUCT.stages.forEach((stage) => {
      const marker = screen.getByRole('button', { name: String(stage.number) });
      expect(marker).toBeDefined();
      expect(marker).toBeTruthy();
    });

    // Verify stage 8 indicator
    expect(screen.getByText(/STAGE 8 OF 8 • FINISHED ARTIFACT/i)).toBeDefined();
  });

  it('renders correctly for Packaged Biscuit with 7 stages using the same component', () => {
    const handleStageChange = vi.fn();
    render(
      <TimeDial
        stages={BISCUIT_PRODUCT.stages}
        currentStageNumber={7}
        onStageChange={handleStageChange}
        productTitle={BISCUIT_PRODUCT.name}
      />
    );

    // Verify 7 stage marker buttons are present
    BISCUIT_PRODUCT.stages.forEach((stage) => {
      const marker = screen.getByRole('button', { name: String(stage.number) });
      expect(marker).toBeDefined();
    });

    expect(screen.getByText(/STAGE 7 OF 7 • FINISHED ARTIFACT/i)).toBeDefined();
  });

  it('selects stage when clicking a direct stage marker', () => {
    const handleStageChange = vi.fn();
    render(
      <TimeDial
        stages={COTTON_PRODUCT.stages}
        currentStageNumber={8}
        onStageChange={handleStageChange}
        productTitle={COTTON_PRODUCT.name}
      />
    );

    const stage3Marker = screen.getByRole('button', {
      name: '3',
    });
    fireEvent.click(stage3Marker);
    expect(handleStageChange).toHaveBeenCalledWith(3);
  });

  it('rewinds and advances via tactile buttons with endpoint clamping', () => {
    const handleStageChange = vi.fn();

    // Render at intermediate stage (4)
    const { rerender } = render(
      <TimeDial
        stages={COTTON_PRODUCT.stages}
        currentStageNumber={4}
        onStageChange={handleStageChange}
        productTitle={COTTON_PRODUCT.name}
      />
    );

    const rewindBtn = screen.getByRole('button', { name: /Rewind one stage/i });
    const advanceBtn = screen.getByRole('button', { name: /Advance one stage/i });

    expect((rewindBtn as HTMLButtonElement).disabled).toBe(false);
    expect((advanceBtn as HTMLButtonElement).disabled).toBe(false);

    fireEvent.click(rewindBtn);
    expect(handleStageChange).toHaveBeenCalledWith(3);

    fireEvent.click(advanceBtn);
    expect(handleStageChange).toHaveBeenCalledWith(5);

    // Test endpoint clamping at Stage 1
    rerender(
      <TimeDial
        stages={COTTON_PRODUCT.stages}
        currentStageNumber={1}
        onStageChange={handleStageChange}
        productTitle={COTTON_PRODUCT.name}
      />
    );
    expect((screen.getByRole('button', { name: /Rewind one stage/i }) as HTMLButtonElement).disabled).toBe(true);

    // Test endpoint clamping at Stage 8
    rerender(
      <TimeDial
        stages={COTTON_PRODUCT.stages}
        currentStageNumber={8}
        onStageChange={handleStageChange}
        productTitle={COTTON_PRODUCT.name}
      />
    );
    expect((screen.getByRole('button', { name: /Advance one stage/i }) as HTMLButtonElement).disabled).toBe(true);
  });

  it('supports keyboard navigation (ArrowLeft, ArrowRight, Home, End)', () => {
    const handleStageChange = vi.fn();
    render(
      <TimeDial
        stages={COTTON_PRODUCT.stages}
        currentStageNumber={5}
        onStageChange={handleStageChange}
        productTitle={COTTON_PRODUCT.name}
      />
    );

    const region = screen.getByRole('region');

    // ArrowLeft rewinds
    fireEvent.keyDown(region, { key: 'ArrowLeft' });
    expect(handleStageChange).toHaveBeenCalledWith(4);

    // ArrowRight advances
    fireEvent.keyDown(region, { key: 'ArrowRight' });
    expect(handleStageChange).toHaveBeenCalledWith(6);

    // Home jumps to stage 1
    fireEvent.keyDown(region, { key: 'Home' });
    expect(handleStageChange).toHaveBeenCalledWith(1);

    // End jumps to stage 8
    fireEvent.keyDown(region, { key: 'End' });
    expect(handleStageChange).toHaveBeenCalledWith(8);
  });

  it('updates stage via accessible linear scrubber', () => {
    const handleStageChange = vi.fn();
    render(
      <TimeDial
        stages={COTTON_PRODUCT.stages}
        currentStageNumber={8}
        onStageChange={handleStageChange}
        productTitle={COTTON_PRODUCT.name}
      />
    );

    const slider = screen.getByRole('slider', {
      name: `Linear temporal scrubber for ${COTTON_PRODUCT.name}`,
    });
    fireEvent.change(slider, { target: { value: '2' } });
    expect(handleStageChange).toHaveBeenCalledWith(2);
  });
});
