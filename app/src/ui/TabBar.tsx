import { Pressable, Text, View } from 'react-native';

import { colors, fonts } from './theme';

export type Tab = 'today' | 'friends' | 'you';

const TABS: { id: Tab; label: string; glyph: string }[] = [
  { id: 'today', label: 'Today', glyph: '☀️' },
  { id: 'friends', label: 'Friends', glyph: '👥' },
  { id: 'you', label: 'You', glyph: '🙂' },
];

/** Bottom tab bar from mockup 01: Today / Friends / You. Glyphs are placeholders until icons are drawn. */
export function TabBar({ active, onChange }: { active: Tab; onChange?: (t: Tab) => void }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingTop: 8,
        paddingBottom: 14,
        backgroundColor: 'rgba(255,255,255,0.72)',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.85)',
      }}
    >
      {TABS.map((t) => {
        const on = t.id === active;
        return (
          <Pressable
            key={t.id}
            onPress={() => onChange?.(t.id)}
            accessibilityRole="tab"
            accessibilityState={{ selected: on }}
            style={{ flex: 1, alignItems: 'center', gap: 2 }}
          >
            <Text style={{ fontSize: 19, opacity: on ? 1 : 0.55 }}>{t.glyph}</Text>
            <Text style={{ fontFamily: fonts.bold, fontSize: 10.5, color: on ? colors.magenta : colors.plum3 }}>{t.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
