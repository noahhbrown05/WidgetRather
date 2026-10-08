import { View } from 'react-native';

import { T } from './T';
import { gradient } from './gradient';
import { colors, optionColors, radius, type Option } from './theme';

export type ResultBarProps = {
  label: string;
  /** 0-100. Clamped and rounded. */
  percent: number;
  /** Which option this row is about: decides pink or blue. */
  option: Option;
  /** 'card' = its own white card (in-app results); 'plain' = bare row (widgets). */
  variant?: 'card' | 'plain';
};

/** label | track | %  (the result row from mockup 01). */
export function ResultBar({ label, percent, option, variant = 'card' }: ResultBarProps) {
  const pct = Math.max(0, Math.min(100, Math.round(percent)));
  const [from, to] = optionColors[option].bar;
  const card = variant === 'card';
  return (
    <View
      accessible
      accessibilityLabel={`${label}: ${pct} percent`}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 11,
        paddingVertical: card ? 9 : 2,
        paddingHorizontal: card ? 13 : 0,
        borderRadius: card ? 15 : 0,
        backgroundColor: card ? 'rgba(255,255,255,0.78)' : 'transparent',
      }}
    >
      <T v="label" style={{ width: 92 }} numberOfLines={1}>
        {label}
      </T>
      <View
        style={{ flex: 1, height: card ? 11 : 8, borderRadius: radius.pill, backgroundColor: colors.track, overflow: 'hidden' }}
      >
        <View
          style={[
            { width: `${pct}%`, height: '100%', borderRadius: radius.pill },
            gradient(`linear-gradient(90deg, ${from}, ${to})`),
          ]}
        />
      </View>
      <T v="number" style={{ width: 38, textAlign: 'right' }}>
        {pct}%
      </T>
    </View>
  );
}
