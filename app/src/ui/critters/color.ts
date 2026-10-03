/** Tiny colour helpers for shading critters from one body colour (no outlines, D-024). */

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToHex([r, g, b]: [number, number, number]): string {
  return '#' + [r, g, b].map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('');
}

/** Mix `a` toward `b` by `t` (0 = a, 1 = b). */
export function mix(a: string, b: string, t: number): string {
  const [ar, ag, ab] = hexToRgb(a);
  const [br, bg, bb] = hexToRgb(b);
  return rgbToHex([ar + (br - ar) * t, ag + (bg - ag) * t, ab + (bb - ab) * t]);
}

/**
 * The 3 tones every critter is painted with, derived from its body colour.
 * Darker tones lean toward the app's plum (not grey/black) so every critter
 * stays in the same pastel family as the pills and wash.
 */
export type Tones = { body: string; shade: string; deep: string; light: string };

export function tonesFor(body: string): Tones {
  return {
    body,
    shade: mix(body, '#6B5F82', 0.3), // inner ears, frills, markings
    deep: mix(body, '#3B2E52', 0.45), // small accents (nose, mask)
    light: mix(body, '#FFFFFF', 0.6), // muzzles, cheeks
  };
}
