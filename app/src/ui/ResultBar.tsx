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
  /**
   * 'card'    = label | track | % on one line, in its own white card (in-app results, mockup 01).
   * 'stacked' = label + % on top, track underneath (widgets, recaps). Fits long option text
   *             without truncating; it's the medium widget's after-voting row layout.
   */
  variant?: 'card' | 'stacked';
};

export function ResultBar({ label, percent, option, variant = 'card' }: ResultBarProps) {
  const pct = Math.max(0, Math.min(100, Math.round(percent)));
  const a11y = { accessible: true, accessibilityLabel: `${label}: ${pct} percent` };

  if (variant === 'stacked') {
    return (
      <View {...a11y} style={{ gap: 4 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
          <T v="label" style={{ flex: 1 }}>
            {label}
          </T>
          <T v="number">{pct}%</T>
        </View>
        <Track pct={pct} option={option} height={8} />
      </View>
    );
  }

  return (
    <View
      {...a11y}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 11,
        paddingVertical: 9,
        paddingHorizontal: 13,
        borderRadius: 15,
        backgroundColor: 'rgba(255,255,255,0.78)',
      }}
    >
      <T v="label" style={{ width: 92 }} numberOfLines={1}>
        {label}
      </T>
      <Track pct={pct} option={option} height={11} style={{ flex: 1 }} />
      <T v="number" style={{ width: 38, textAlign: 'right' }}>
        {pct}%
      </T>
    </View>
  );
}

function Track({ pct, option, height, style }: { pct: number; option: Option; height: number; style?: object }) {
  const [from, to] = optionColors[option].bar;
  return (
    <View style={[{ height, borderRadius: radius.pill, backgroundColor: colors.track, overflow: 'hidden' }, style]}>
      <View
        style={[{ width: `${pct}%`, height: '100%', borderRadius: radius.pill }, gradient(`linear-gradient(90deg, ${from}, ${to})`)]}
      />
    </View>
  );
}
