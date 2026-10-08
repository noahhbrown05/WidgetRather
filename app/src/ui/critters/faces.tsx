import { Circle, Ellipse, G, Path } from 'react-native-svg';

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
      // Pushed further (Noah, 2026-10-07): big eye + squint wink, tongue out, sweat drop,
      // so it reads as clearly unhinged, not just "happy but uneven".
      return (
        <G>
          {/* one huge wide-open eye */}
          <Circle cx={39} cy={y} r={5.2} fill={INK} />
          <Circle cx={40.9} cy={y - 1.9} r={1.6} fill="#FFFFFF" />
          {/* squeezed-shut wink on the right (Noah, 2026-10-07: replaced a spiral eye) */}
          <Path
            d={`M65 ${y - 3.8} L57 ${y} L65 ${y + 3.8}`}
            stroke={INK}
            strokeWidth={2.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* raised brow over the big eye */}
          <Path d={`M32 ${y - 10} Q37 ${y - 14} 45 ${y - 10.5}`} stroke={INK} strokeWidth={2.4} strokeLinecap="round" fill="none" />
          {/* sweat drop */}
          <Path
            d={`M73 ${y - 15} C76 ${y - 10.5} 76.5 ${y - 7.5} 73 ${y - 7} C69.5 ${y - 7.5} 70 ${y - 10.5} 73 ${y - 15} Z`}
            fill="#9CC3F0"
          />
          {/* wide crooked grin with the tongue out */}
          <Path d={`M40 ${m - 2} Q50 ${m + 11} 61 ${m - 4} Q50 ${m + 2} 40 ${m - 2} Z`} fill={INK} />
          <Ellipse cx={54} cy={m + 5} rx={3.4} ry={2.8} fill="#F07BB5" />
        </G>
      );
  }
}
