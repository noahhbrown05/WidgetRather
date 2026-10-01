import { Text, View } from 'react-native';

import { bandana, colors, critterBodies, fonts, type CritterBody, type Option } from './theme';

/**
 * Placeholder for a Pastel Critter avatar (D-016, design/critters.md) until
 * the critters are drawn. It already follows the roster's rules:
 *  - a round head on one of the 8 pastel body colours,
 *  - a bandana ring that's neutral lavender before you vote and takes your
 *    option's colour after (pink = A, blue = B): "your pick tints your avatar",
 *  - readable down to ~22px (the large widget's face stack).
 * Swap the inner letter for the real critter art later; the props stay the same.
 */
export type CritterAvatarProps = {
  /** e.g. 'Capy', 'Axie'. The first letter is shown until the art exists. */
  critter: string;
  body: CritterBody;
  /** Today's pick, or undefined before voting. */
  pick?: Option;
  size?: number;
};

export function CritterAvatar({ critter, body, pick, size = 36 }: CritterAvatarProps) {
  const ring = Math.max(2, Math.round(size * 0.09));
  const pickText = pick ? `, picked the ${pick === 'a' ? 'pink' : 'blue'} option` : '';
  return (
    <View
      accessibilityLabel={`${critter}${pickText}`}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: ring,
        borderColor: pick ? bandana[pick] : bandana.neutral,
        backgroundColor: critterBodies[body],
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ fontFamily: fonts.black, fontSize: size * 0.42, color: colors.plum2, lineHeight: size * 0.55 }}>
        {critter.charAt(0).toUpperCase()}
      </Text>
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
