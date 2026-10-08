import { Text } from 'react-native';

import { MotionPressable } from './motion';

import { colors, fonts, radius } from './theme';

/** Small pill for switching between groups and communities. */
export function Chip({ label, selected, onPress }: { label: string; selected?: boolean; onPress?: () => void }) {
  return (
    <MotionPressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: !!selected }}
      style={{
        paddingVertical: 7,
        paddingHorizontal: 13,
        minHeight: 44,
        justifyContent: 'center',
        borderRadius: radius.pill,
        backgroundColor: selected ? colors.plum : 'rgba(255,255,255,0.75)',
        borderWidth: 1,
        borderColor: selected ? colors.plum : colors.divider,
      }}
    >
      <Text style={{ fontFamily: fonts.bold, fontSize: 12.5, color: selected ? colors.white : colors.plum2 }}>{label}</Text>
    </MotionPressable>
  );
}
