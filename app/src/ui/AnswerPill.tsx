import type { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';

import { boxShadow, gradient } from './gradient';
import { colors, fonts, optionColors, radius, shadow, type Option } from './theme';

type Size = 'sm' | 'md' | 'lg';

const SIZES: Record<Size, { padV: number; padH: number; font: number; icon: number; radius: number }> = {
  sm: { padV: 6, padH: 10, font: 11, icon: 14, radius: radius.sm },
  md: { padV: 10, padH: 14, font: 14, icon: 19, radius: radius.md },
  lg: { padV: 12, padH: 16, font: 15.5, icon: 22, radius: radius.lg },
};

export type AnswerPillProps = {
  option: Option;
  label: string;
  /** Glyph shown before the label when not picked (e.g. an eye / crystal ball). */
  icon?: ReactNode;
  /** Shows the magenta check disc instead of the icon. */
  picked?: boolean;
  /** Fades the pill: used for the option you didn't pick, after voting. */
  dimmed?: boolean;
  size?: Size;
  onPress?: () => void;
  disabled?: boolean;
};

/**
 * One answer option. Pink = option A, blue = option B, always (theme.ts).
 * Label text is plum, never white (mockups 01/02).
 */
export function AnswerPill({ option, label, icon, picked, dimmed, size = 'md', onPress, disabled }: AnswerPillProps) {
  const s = SIZES[size];
  const c = optionColors[option];
  const inactive = disabled || !onPress;
  return (
    <Pressable
      onPress={onPress}
      disabled={inactive}
      accessibilityRole="button"
      accessibilityState={{ selected: !!picked, disabled: inactive }}
      accessibilityLabel={picked ? `${label}, your pick` : label}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: s.padH * 0.7,
          paddingVertical: s.padV,
          paddingHorizontal: s.padH,
          borderRadius: s.radius,
          opacity: dimmed ? 0.45 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
        gradient(`linear-gradient(96deg, ${c.light}, ${c.deep})`),
        boxShadow(shadow.pill),
      ]}
    >
      {picked ? (
        <CheckDisc size={s.icon + 2} />
      ) : icon ? (
        <View style={{ width: s.icon, alignItems: 'center' }}>{icon}</View>
      ) : null}
      <Text
        style={{ fontFamily: fonts.extrabold, fontSize: s.font, color: colors.plum, letterSpacing: -0.2, flexShrink: 1 }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

/** The magenta "picked" disc with a white check. */
export function CheckDisc({ size = 21 }: { size?: number }) {
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: colors.magenta,
          alignItems: 'center',
          justifyContent: 'center',
        },
        boxShadow(shadow.check),
      ]}
    >
      <Text style={{ color: colors.white, fontFamily: fonts.black, fontSize: size * 0.55, lineHeight: size * 0.7 }}>
        {'✓'}
      </Text>
    </View>
  );
}
