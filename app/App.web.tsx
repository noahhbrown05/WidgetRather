/**
 * Web-only root (Expo picks `App.web.tsx` over `App.tsx` when bundling for web).
 *
 * Why it exists: on Windows, the web browser is the fastest way to see screens
 * (no Mac, no simulator; D-013, D-023). Greg's native harness in `App.tsx`
 * imports `expo-widgets` and `expo-sqlite`, which are phone features, so the web
 * build gets its own root and the native harness stays untouched.
 *
 * The DEV BAR at the top is for reviewing mockups: it jumps between every state
 * of every screen. It is not part of the app.
 */
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

import { CritterLab } from './src/dev/CritterLab';
import { Gallery } from './src/dev/Gallery';
import { TodayScreen } from './src/screens/today/TodayScreen';
import { colors, fonts, useAppFonts } from './src/ui';

type View_ = 'today-before' | 'today-open' | 'today-voted' | 'critters' | 'gallery';

const VIEWS: { id: View_; label: string }[] = [
  { id: 'today-before', label: 'Before drop' },
  { id: 'today-open', label: 'Open' },
  { id: 'today-voted', label: 'Voted' },
  { id: 'critters', label: 'Critters' },
  { id: 'gallery', label: 'Components' },
];

export default function App() {
  const fontsReady = useAppFonts();
  const [view, setView] = useState<View_>('today-open');

  if (!fontsReady) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={colors.magenta} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, padding: 8, backgroundColor: colors.plum }}>
        <Text style={{ fontFamily: fonts.bold, fontSize: 11, color: colors.pink1, alignSelf: 'center', marginRight: 4 }}>DEV</Text>
        {VIEWS.map((v) => (
          <Pressable
            key={v.id}
            onPress={() => setView(v.id)}
            style={{ paddingVertical: 4, paddingHorizontal: 10, borderRadius: 999, backgroundColor: view === v.id ? colors.pink2 : 'rgba(255,255,255,0.12)' }}
          >
            <Text style={{ fontFamily: fonts.bold, fontSize: 11, color: view === v.id ? colors.plum : colors.white }}>{v.label}</Text>
          </Pressable>
        ))}
      </View>
      {view === 'gallery' ? (
        <Gallery />
      ) : view === 'critters' ? (
        <CritterLab />
      ) : (
        <TodayScreen
          key={view}
          phase={view === 'today-before' ? 'beforeDrop' : 'open'}
          initialPick={view === 'today-voted' ? 'a' : undefined}
        />
      )}
    </View>
  );
}
