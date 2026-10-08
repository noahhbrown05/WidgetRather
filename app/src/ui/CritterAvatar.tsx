import { Text, View } from 'react-native';
import Svg from 'react-native-svg';

import { mix, tonesFor } from './critters/color';
import { Face, type Mood } from './critters/faces';
import { HEADS } from './critters/heads';
import type { CritterName } from './critters/roster';
import { bandana, colors, critterBodies, fonts, type CritterBody, type Option } from './theme';

/**
 * A Pastel Critter avatar (D-016, D-024; design/critters.md).
 *  - Pick any critter in any of 8 body colours.
 *  - The RING around the circle is neutral lavender before you vote and takes
 *    your option's colour after (pink = A, blue = B): "your pick tints your avatar".
 *  - `mood` swaps the shared face parts: sleepy (before the drop), happy
 *    (after voting), chaotic (rare pick).
 *  - Critters that don't have art yet fall back to a letter placeholder, so
 *    callers never need to know which ones are drawn.
 *
 * In-app only. The iPhone widget can't render SVG (Expo SDK 57 widgets docs), so
 * the widget will use small PNGs exported from this same art (see D-024).
 */
export type CritterAvatarProps = {
  /** A roster name ('Capy', 'Kip', ...). Unknown names show the placeholder. */
  critter: string;
  body: CritterBody;
  /** Today's pick, or undefined before voting. */
  pick?: Option;
  mood?: Mood;
  size?: number;
};

/**
 * The circle behind the head is a much lighter tint of the critter's own body
 * colour, so the head is always the darker shape and its silhouette reads,
 * even for pale bodies like lilac or cloud. (A shared lavender background made
 * lilac critters disappear in review, 2026-10-02.)
 */
const bgFor = (body: string) => mix(body, '#FFFFFF', 0.72);

export function CritterAvatar({ critter, body, pick, mood = 'happy', size = 36 }: CritterAvatarProps) {
  const ring = Math.max(2, Math.round(size * 0.08));
  const head = HEADS[critter as CritterName];
  const pickText = pick ? `, picked the ${pick === 'a' ? 'pink' : 'blue'} option` : '';
  const inner = size - ring * 2;

  return (
    <View
      accessibilityLabel={`${critter}${pickText}`}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: ring,
        borderColor: pick ? bandana[pick] : bandana.neutral,
        backgroundColor: head ? bgFor(critterBodies[body]) : critterBodies[body],
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {head ? (
        <Svg width={inner} height={inner} viewBox="0 0 100 100">
          {head.draw(tonesFor(critterBodies[body]))}
          <Face mood={mood} y={head.faceY} mouthY={head.mouthY} />
        </Svg>
      ) : (
        <Text style={{ fontFamily: fonts.black, fontSize: size * 0.42, color: colors.plum2, lineHeight: size * 0.55 }}>
          {critter.charAt(0).toUpperCase()}
        </Text>
      )}
    </View>
  );
}

/** Overlapping row of avatars ("You and 12 friends agree"). */
export function AvatarStack({ people, size = 26, max = 4 }: { people: CritterAvatarProps[]; size?: number; max?: number }) {
  const shown = people.slice(0, max);
  const extra = people.length - shown.length;
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {shown.map((p, i) => (
        <View key={`${p.critter}-${i}`} style={{ marginLeft: i === 0 ? 0 : -size * 0.28 }}>
          <CritterAvatar {...p} size={size} />
        </View>
      ))}
      {extra > 0 && (
        <View
          style={{
            marginLeft: 4,
            minWidth: size,
            height: size,
            paddingHorizontal: 6,
            borderRadius: size / 2,
            backgroundColor: colors.lavChip,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontFamily: fonts.extrabold, fontSize: size * 0.42, color: colors.plum2 }}>+{extra}</Text>
        </View>
      )}
    </View>
  );
}
