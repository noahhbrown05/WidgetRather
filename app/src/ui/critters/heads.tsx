import type { ReactElement } from 'react';
import { Circle, Ellipse, G, Path, Rect } from 'react-native-svg';

import type { Tones } from './color';
import type { CritterName } from './roster';

/**
 * Critter heads, drawn in a shared 100x100 space that the avatar crops to a
 * circle. Rules (design/critters.md, D-016, D-024):
 *  - soft & round, NO outlines; tones come from the body colour (color.ts)
 *  - head only; each critter must be recognisable by its SILHOUETTE alone
 *    (ears / frills / muzzle), because the widget face stack is ~22px
 *  - faces are NOT drawn here; faces.tsx puts the mood's eyes + mouth at `faceY`
 *
 * Status: test set (Capy, Kip, Fen; Kip replaced Axie 2026-10-07) approved; drawing the rest in batches for Noah's review.
 * Critters without art fall back to the letter placeholder in CritterAvatar.
 */
export type HeadArt = { faceY: number; mouthY?: number; draw: (t: Tones) => ReactElement };

/** A soft top-left sheen shared by every head, so flat shapes still feel round. */
const Sheen = ({ cx, cy }: { cx: number; cy: number }) => (
  <Ellipse cx={cx} cy={cy} rx={10} ry={5.5} fill="#FFFFFF" opacity={0.28} transform={`rotate(-20 ${cx} ${cy})`} />
);

export const HEADS: Partial<Record<CritterName, HeadArt>> = {
  /** Capybara: tall blocky head, eyes set high, long blunt snout with nostrils, tiny ears. */
  Capy: {
    faceY: 45,
    mouthY: 70,
    draw: (t) => (
      <G>
        <Ellipse cx={27} cy={31} rx={6.5} ry={6} fill={t.shade} />
        <Ellipse cx={73} cy={31} rx={6.5} ry={6} fill={t.shade} />
        <Rect x={14} y={29} width={72} height={66} rx={27} fill={t.body} />
        <Rect x={25} y={55} width={50} height={31} rx={15} fill={t.shade} opacity={0.5} />
        <Ellipse cx={43} cy={62} rx={2} ry={1.4} fill={t.deep} />
        <Ellipse cx={57} cy={62} rx={2} ry={1.4} fill={t.deep} />
        <Sheen cx={31} cy={40} />
      </G>
    ),
  },

  /**
   * Koala (replaced Axie the axolotl, Noah 2026-10-07): huge fuzzy ears set out
   * to the SIDES (Beanie the bear's are small and on top) + a big dark nose.
   */
  Kip: {
    faceY: 50,
    mouthY: 73,
    draw: (t) => (
      <G>
        {[20, 80].map((x) => {
          const out = x < 50 ? -1 : 1; // which way is "outward" for this ear
          return (
            <G key={`ear${x}`}>
              {/* fluff tufts on the outer edge */}
              <Circle cx={x + out * 14} cy={33} r={4.5} fill={t.body} />
              <Circle cx={x + out * 16} cy={43} r={4.5} fill={t.body} />
              <Circle cx={x + out * 12} cy={52} r={4.5} fill={t.body} />
              <Circle cx={x} cy={40} r={16.5} fill={t.body} />
              <Circle cx={x + out * 1.5} cy={41} r={9.5} fill={t.light} />
            </G>
          );
        })}
        <Ellipse cx={50} cy={59} rx={32} ry={29} fill={t.body} />
        {/* the big koala nose */}
        <Ellipse cx={50} cy={61.5} rx={6.8} ry={7.8} fill={t.deep} />
        <Ellipse cx={47.8} cy={58.5} rx={1.9} ry={2.6} fill="#FFFFFF" opacity={0.35} />
        <Sheen cx={36} cy={45} />
      </G>
    ),
  },

  /** Bunny: two tall ears, the right one flopped over; tiny nose. */
  Bun: {
    faceY: 60,
    mouthY: 71,
    draw: (t) => (
      <G>
        {/* upright left ear */}
        <Ellipse cx={37} cy={28} rx={8.5} ry={19} fill={t.body} transform="rotate(-8 37 28)" />
        <Ellipse cx={37} cy={30} rx={4.3} ry={13} fill={t.light} transform="rotate(-8 37 30)" />
        {/* flopped right ear: a short base, then the tip folding down and out */}
        <Ellipse cx={61} cy={33} rx={7.5} ry={11} fill={t.body} transform="rotate(12 61 33)" />
        <Ellipse cx={73} cy={27} rx={13} ry={6.8} fill={t.body} transform="rotate(32 73 27)" />
        <Path d="M63 24 Q67 27 66 32" stroke={t.shade} strokeWidth={2} strokeLinecap="round" fill="none" />
        <Ellipse cx={50} cy={64} rx={30} ry={26} fill={t.body} />
        <Ellipse cx={50} cy={65.5} rx={2.8} ry={2} fill={t.deep} />
        <Sheen cx={36} cy={52} />
      </G>
    ),
  },

  /** Frog: two eye bumps on top (the face's eyes sit in them) and a wide flat head. */
  Ribbs: {
    faceY: 38,
    mouthY: 64,
    draw: (t) => (
      <G>
        <Circle cx={38} cy={38} r={13} fill={t.body} />
        <Circle cx={62} cy={38} r={13} fill={t.body} />
        <Ellipse cx={50} cy={63} rx={36} ry={24} fill={t.body} />
        {/* eye whites, so the dot eyes read as frog eyes */}
        <Circle cx={40} cy={38} r={7.5} fill={t.light} />
        <Circle cx={60} cy={38} r={7.5} fill={t.light} />
        <Circle cx={47} cy={55} r={1.1} fill={t.deep} />
        <Circle cx={53} cy={55} r={1.1} fill={t.deep} />
        <Sheen cx={30} cy={56} />
      </G>
    ),
  },

  /** Otter: wide head, small round ears set LOW on the sides, light muzzle with whisker dots. */
  Ollie: {
    faceY: 51,
    mouthY: 71,
    draw: (t) => (
      <G>
        <Circle cx={19} cy={45} r={6.5} fill={t.body} />
        <Circle cx={81} cy={45} r={6.5} fill={t.body} />
        <Circle cx={19.5} cy={45.5} r={3.3} fill={t.shade} />
        <Circle cx={80.5} cy={45.5} r={3.3} fill={t.shade} />
        <Ellipse cx={50} cy={58} rx={33} ry={27} fill={t.body} />
        <Ellipse cx={50} cy={69} rx={15} ry={10.5} fill={t.light} />
        <Ellipse cx={50} cy={63} rx={4.2} ry={2.9} fill={t.deep} />
        {[
          [39, 67],
          [37, 71.5],
          [40.5, 75],
        ].map(([x, y]) => (
          <G key={`w${x}${y}`}>
            <Circle cx={x} cy={y} r={1} fill={t.shade} />
            <Circle cx={100 - x} cy={y} r={1} fill={t.shade} />
          </G>
        ))}
        <Sheen cx={35} cy={44} />
      </G>
    ),
  },

  /** Fox: big pointy ears and a pointed light muzzle. */
  Fen: {
    // Eyes up a touch; mouth sits ON the light muzzle patch (Noah, 2026-10-07)
    faceY: 52,
    mouthY: 74,
    draw: (t) => (
      <G>
        <Path d="M20 50 Q11 22 18 11 Q25 9 47 34 Z" fill={t.body} />
        <Path d="M80 50 Q89 22 82 11 Q75 9 53 34 Z" fill={t.body} />
        <Path d="M25 41 Q19 25 22 18 Q27 18 40 33 Z" fill={t.shade} />
        <Path d="M75 41 Q81 25 78 18 Q73 18 60 33 Z" fill={t.shade} />
        <Ellipse cx={50} cy={58} rx={31} ry={27} fill={t.body} />
        <Path d="M22 59 Q30 77 50 88 Q70 77 78 59 Q66 67 50 67 Q34 67 22 59 Z" fill={t.light} />
        <Sheen cx={35} cy={45} />
      </G>
    ),
  },
};
