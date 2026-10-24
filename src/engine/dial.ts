/**
 * Time-Kerchief Core MVP v3.0 - Chrono-Kerchief Dial Engine
 * Bounded 270-degree arc mathematics, coordinate mapping, and endpoint clamping
 */

export const ARC_START_DEG = 135; // Stage 1 (Raw origin, bottom-left)
export const ARC_SPAN_DEG = 270;  // 270° bounded arc
export const ARC_END_DEG = 405;   // Stage N (Finished artifact, bottom-right = 45° + 360°)
export const GAP_CENTER_DEG = 90; // Bottom center of the 90° mechanical gap

/**
 * Returns the angular position in degrees (135° to 405°) for a given 1-indexed stage.
 */
export function getStageAngle(stageNumber: number, totalStages: number): number {
  if (totalStages <= 1) return ARC_START_DEG;
  const clampedStage = Math.max(1, Math.min(totalStages, stageNumber));
  const fraction = (clampedStage - 1) / (totalStages - 1);
  return ARC_START_DEG + fraction * ARC_SPAN_DEG;
}

/**
 * Returns the needle rotation in degrees for CSS transform: rotate(...)
 * In our visual dial, Stage 1 (135°) needle rotates to -45° (or 225°),
 * matching the visual pointer blade pointing from center to (x, y).
 */
export function getNeedleRotation(stageNumber: number, totalStages: number): number {
  const angle = getStageAngle(stageNumber, totalStages);
  // Pointer points in the direction of `angle`. Since base CSS pointer points upward (270° in standard trig / 0° CSS),
  // rotate(angle + 90) or rotate(angle - 270) gives the exact pointing direction.
  return angle + 90;
}

/**
 * Calculates SVG stroke-dasharray for the 270° gauge fill on a circle with radius R.
 * Total circumference = 2 * PI * R.
 * 270° track = (270 / 360) * circumference.
 */
export function getGaugeDashArray(stageNumber: number, totalStages: number, radius = 132): {
  dashArray: string;
  circumference: number;
  activeLength: number;
} {
  const circumference = 2 * Math.PI * radius;
  const totalArcLength = (ARC_SPAN_DEG / 360) * circumference;
  const fraction = totalStages > 1 ? (stageNumber - 1) / (totalStages - 1) : 1;
  const activeLength = totalArcLength * fraction;

  return {
    dashArray: `${activeLength.toFixed(2)} ${circumference.toFixed(2)}`,
    circumference,
    activeLength,
  };
}

/**
 * Computes (x, y) coordinates for a stage button on the 360x360 canvas.
 * Center is (180, 180), radius is 132 by default.
 */
export function getStageNodeCoordinates(
  stageNumber: number,
  totalStages: number,
  centerX = 180,
  centerY = 180,
  radius = 132
): { x: number; y: number; angleDeg: number } {
  const angleDeg = getStageAngle(stageNumber, totalStages);
  const angleRad = (angleDeg * Math.PI) / 180;
  const x = centerX + radius * Math.cos(angleRad);
  const y = centerY + radius * Math.sin(angleRad);
  return {
    x: Math.round(x * 10) / 10,
    y: Math.round(y * 10) / 10,
    angleDeg,
  };
}

/**
 * Maps a pointer position (clientX, clientY) relative to the dial center into the nearest stage.
 * Never wraps across the 90° mechanical gap at the bottom!
 */
export function mapPointerToStage(
  pointerX: number,
  pointerY: number,
  centerX: number,
  centerY: number,
  totalStages: number
): number {
  const dx = pointerX - centerX;
  const dy = pointerY - centerY;

  // Ignore clicks dead center to avoid jitter
  if (Math.hypot(dx, dy) < 15) {
    return 1;
  }

  // Calculate angle in degrees [0, 360)
  let angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;
  if (angleDeg < 0) {
    angleDeg += 360;
  }

  // The 90° mechanical gap is between 45° and 135° (bottom center).
  // If the pointer lies inside this gap, clamp to the nearer endpoint:
  if (angleDeg > 45 && angleDeg < 135) {
    if (angleDeg <= GAP_CENTER_DEG) {
      // Closer to Stage N (45°)
      return totalStages;
    } else {
      // Closer to Stage 1 (135°)
      return 1;
    }
  }

  // Normalize angle to the continuous arc interval [135, 405]
  let effectiveAngle = angleDeg;
  if (effectiveAngle <= 45) {
    effectiveAngle += 360;
  }

  // Clamp within arc span
  effectiveAngle = Math.max(ARC_START_DEG, Math.min(ARC_END_DEG, effectiveAngle));

  const progress = (effectiveAngle - ARC_START_DEG) / ARC_SPAN_DEG;
  const nearestStage = Math.round(1 + progress * (totalStages - 1));

  return Math.max(1, Math.min(totalStages, nearestStage));
}

/**
 * Handles keyboard navigation for the TimeDial component.
 * Returns the next valid clamped stage index.
 */
export function handleDialKeyDown(
  key: string,
  currentStage: number,
  totalStages: number
): number | null {
  switch (key) {
    case 'ArrowLeft':
    case 'ArrowDown':
      // Rewind (-1 stage towards raw origin)
      return Math.max(1, currentStage - 1);

    case 'ArrowRight':
    case 'ArrowUp':
      // Advance (+1 stage towards finished artifact)
      return Math.min(totalStages, currentStage + 1);

    case 'Home':
    case 'PageUp':
      // Jump to earliest stage (raw organic origin)
      return 1;

    case 'End':
    case 'PageDown':
      // Jump to terminal stage (finished artifact)
      return totalStages;

    default:
      return null;
  }
}
