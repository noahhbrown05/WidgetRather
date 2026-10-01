/**
 * Web-only root (Expo picks `App.web.tsx` over `App.tsx` when bundling for web).
 *
 * Why it exists: on Windows, the web browser is the fastest way to see screens
 * (no Mac, no simulator; D-013, D-023). Greg's native harness in `App.tsx`
 * imports `expo-widgets` and `expo-sqlite`, which are phone features, so the web
 * build gets its own root and the native harness stays untouched.
 *
 * For now it shows the ROADMAP 5.1 component gallery. As real screens land,
 * this becomes the web preview of the app.
 */
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View } from 'react-native';

import { Gallery } from './src/dev/Gallery';
import { colors, useAppFonts } from './src/ui';

export default function App() {
  const fontsReady = useAppFonts();
  if (!fontsReady) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={colors.magenta} />
      </View>
    );
  }
  return (
    <>
      <StatusBar style="dark" />
      <Gallery />
    </>
  );
}
