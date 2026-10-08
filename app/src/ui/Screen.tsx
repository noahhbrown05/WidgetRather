import { ScrollView, View, type ViewProps } from 'react-native';

import { gradient } from './gradient';
import { space, washes } from './theme';

/** Full-screen lavender-to-blue wash (mockup 01's app background) + scrolling content. */
export function Screen({ children, style, ...rest }: ViewProps) {
  return (
    <View {...rest} style={[{ flex: 1 }, gradient(washes.app), style]}>
      <ScrollView contentContainerStyle={{ padding: space.xl, gap: space.lg, paddingBottom: space.xxl * 2 }}>
        {children}
      </ScrollView>
    </View>
  );
}
