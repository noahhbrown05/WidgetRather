import { Circle, G, Path } from 'react-native-svg';

/**
 * Modular faces (D-024): ONE set of eyes + mouth per mood, placed on every
 * critter's head. 12 heads x 3 faces instead of 36 separate drawings, and
 * every critter emotes the same way (Notion Faces / Duolingo lesson,
 * research/avatar-case-study.md).
 *
 * Style (Noah, 2026-10-01): tiny dot eyes + small mouth; "cute but a bit chaotic".
 * Drawn in the shared 100x100 critter space; eyes sit at x = 50 +/- 10.
 */
export type Mood = 'sleepy' | 'happy' | 'chaotic';

export const MOODS: Mood[] = ['sleepy', 'happy', 'chaotic'];

const INK = '#2A1D40'; // face ink: deep plum, never pure black

/** When each mood shows up (MVP-SPEC moods, design/critters.md). */
export const MOOD_MEANING: Record<Mood, string> = {
  sleepy: 'Before the drop',
  happy: 'After you vote',
  chaotic: 'Rare pick (25% or less)',
};

/** `y` = eye line. `mouthY` = where the mouth sits (defaults to just under the eyes). */
export function Face({ mood, y, mouthY }: { mood: Mood; y: number; mouthY?: number }) {
  const m = mouthY ?? y + 8;
  switch (mood) {
    case 'sleepy':
      return (
        <G>
          {/* closed, droopy eyes */}
          <Path d={`M36 ${y} Q40 ${y + 3.5} 44 ${y}`} stroke={INK} strokeWidth={2.6} strokeLinecap="round" fill="none" />
          <Path d={`M56 ${y} Q60 ${y + 3.5} 64 ${y}`} stroke={INK} strokeWidth={2.6} strokeLinecap="round" fill="none" />
          {/* little 'o' snore mouth */}
          <Circle cx={50} cy={m + 2} r={2.2} fill={INK} />
          {/* z */}
          <Path d="M70 20 h7 l-7 7 h7" stroke={INK} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={0.7} />
        </G>
      );
    case 'happy':
      return (
        <G>
          <Circle cx={40} cy={y} r={3.3} fill={INK} />
          <Circle cx={60} cy={y} r={3.3} fill={INK} />
          {/* tiny highlight in each eye */}
          <Circle cx={41.1} cy={y - 1.1} r={1} fill="#FFFFFF" />
          <Circle cx={61.1} cy={y - 1.1} r={1} fill="#FFFFFF" />
          <Path d={`M44 ${m} Q50 ${m + 5} 56 ${m}`} stroke={INK} strokeWidth={2.6} strokeLinecap="round" fill="none" />
        </G>
      );
    case 'chaotic':
      return (
        <G>
          {/* uneven eyes: one huge, one tiny */}
          <Circle cx={39} cy={y} r={4.6} fill={INK} />
          <Circle cx={40.6} cy={y - 1.6} r={1.4} fill="#FFFFFF" />
          <Circle cx={61} cy={y + 0.5} r={2.1} fill={INK} />
          {/* one raised brow over the big eye */}
          <Path d={`M33 ${y - 9} Q38 ${y - 12} 44 ${y - 9.5}`} stroke={INK} strokeWidth={2.2} strokeLinecap="round" fill="none" />
          {/* crooked open grin */}
          <Path d={`M42 ${m - 1} Q49 ${m + 9} 59 ${m - 3} Q50 ${m + 2} 42 ${m - 1} Z`} fill={INK} />
        </G>
      );
  }
}
