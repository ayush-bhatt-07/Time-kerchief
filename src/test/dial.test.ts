import { describe, expect, it } from 'vitest';
import {
  ARC_END_DEG,
  ARC_SPAN_DEG,
  ARC_START_DEG,
  GAP_CENTER_DEG,
  getGaugeDashArray,
  getNeedleRotation,
  getStageAngle,
  getStageNodeCoordinates,
  handleDialKeyDown,
  mapPointerToStage,
} from '../engine/dial';

describe('Chrono-Kerchief Dial Engine', () => {
  it('correctly maps 1-indexed stages to angles on the 270-degree arc', () => {
    // 8 stages (Cotton Garment)
    // Stage 1 (Raw origin) is at ARC_START_DEG (135°)
    expect(getStageAngle(1, 8)).toBe(135);
    // Stage 8 (Finished artifact) is at ARC_END_DEG (405°)
    expect(getStageAngle(8, 8)).toBe(405);
    // Intermediate stage 4.5 is at midpoint (135 + 135 = 270°)
    const midAngle = getStageAngle(4.5, 8);
    expect(midAngle).toBe(270);
  });

  it('clamps out-of-range stage numbers when calculating angles', () => {
    expect(getStageAngle(0, 8)).toBe(135);
    expect(getStageAngle(9, 8)).toBe(405);
  });

  it('calculates needle rotation correctly', () => {
    // getNeedleRotation is angle + 90
    expect(getNeedleRotation(1, 8)).toBe(135 + 90);
    expect(getNeedleRotation(8, 8)).toBe(405 + 90);
  });

  it('computes node coordinates on 360x360 canvas with center 180, 180 and radius 132', () => {
    const coords1 = getStageNodeCoordinates(1, 8, 180, 180, 132);
    expect(coords1.angleDeg).toBe(135);
    // cos(135°) = -sqrt(2)/2 ≈ -0.7071 => 180 - 132*0.7071 ≈ 86.7
    // sin(135°) = sqrt(2)/2 ≈ 0.7071 => 180 + 132*0.7071 ≈ 273.3
    expect(coords1.x).toBeCloseTo(86.7, 1);
    expect(coords1.y).toBeCloseTo(273.3, 1);
  });

  it('computes gauge dasharray accurately', () => {
    const gauge = getGaugeDashArray(1, 8, 132);
    expect(gauge.activeLength).toBe(0);
    const gaugeFull = getGaugeDashArray(8, 8, 132);
    const expectedFull = (ARC_SPAN_DEG / 360) * (2 * Math.PI * 132);
    expect(gaugeFull.activeLength).toBeCloseTo(expectedFull, 1);
  });

  describe('mapPointerToStage endpoint clamping and gap handling', () => {
    const cx = 180;
    const cy = 180;
    const totalStages = 8;

    it('clamps dead-center touches to stage 1 without error', () => {
      expect(mapPointerToStage(180, 180, cx, cy, totalStages)).toBe(1);
    });

    it('maps angle at Stage 1 (135°, down-left) to stage 1', () => {
      // Angle 135 deg: dx = -100, dy = 100
      expect(mapPointerToStage(cx - 100, cy + 100, cx, cy, totalStages)).toBe(1);
    });

    it('maps angle at Stage 8 (45° = 405°, down-right) to stage 8', () => {
      // Angle 45 deg: dx = 100, dy = 100
      expect(mapPointerToStage(cx + 100, cy + 100, cx, cy, totalStages)).toBe(8);
    });

    it('handles the 90-degree mechanical gap without wrapping between endpoints', () => {
      // In the gap between 45° and 135°:
      // If angle is 80° (closer to 45°), clamps to terminal stage 8
      // dx = 100 * cos(80°) > 0, dy = 100 * sin(80°) > 0
      const rad80 = (80 * Math.PI) / 180;
      const x80 = cx + 100 * Math.cos(rad80);
      const y80 = cy + 100 * Math.sin(rad80);
      expect(mapPointerToStage(x80, y80, cx, cy, totalStages)).toBe(8);

      // If angle is 100° (closer to 135°), clamps to stage 1
      const rad100 = (100 * Math.PI) / 180;
      const x100 = cx + 100 * Math.cos(rad100);
      const y100 = cy + 100 * Math.sin(rad100);
      expect(mapPointerToStage(x100, y100, cx, cy, totalStages)).toBe(1);
    });

    it('works symmetrically for 7-stage Packaged Biscuit', () => {
      expect(mapPointerToStage(cx - 100, cy + 100, cx, cy, 7)).toBe(1);
      expect(mapPointerToStage(cx + 100, cy + 100, cx, cy, 7)).toBe(7);
    });
  });

  describe('handleDialKeyDown keyboard navigation', () => {
    it('rewinds on ArrowLeft and ArrowDown and clamps at stage 1', () => {
      expect(handleDialKeyDown('ArrowLeft', 5, 8)).toBe(4);
      expect(handleDialKeyDown('ArrowDown', 1, 8)).toBe(1);
    });

    it('advances on ArrowRight and ArrowUp and clamps at stage N', () => {
      expect(handleDialKeyDown('ArrowRight', 5, 8)).toBe(6);
      expect(handleDialKeyDown('ArrowUp', 8, 8)).toBe(8);
    });

    it('jumps to earliest stage on Home or PageUp', () => {
      expect(handleDialKeyDown('Home', 7, 8)).toBe(1);
      expect(handleDialKeyDown('PageUp', 4, 8)).toBe(1);
    });

    it('jumps to terminal stage on End or PageDown', () => {
      expect(handleDialKeyDown('End', 2, 8)).toBe(8);
      expect(handleDialKeyDown('PageDown', 3, 8)).toBe(8);
    });

    it('returns null for unrelated keys', () => {
      expect(handleDialKeyDown('Enter', 3, 8)).toBeNull();
      expect(handleDialKeyDown('Tab', 3, 8)).toBeNull();
    });
  });
});
