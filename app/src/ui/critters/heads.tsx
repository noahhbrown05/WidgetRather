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
 * Status: 3 test critters (Capy, Kip, Fen; Kip replaced Axie 2026-10-07) for Noah's review before the other 9.
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
