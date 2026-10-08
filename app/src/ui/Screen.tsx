import type { ReactNode } from 'react';
import { ScrollView, View, type ViewProps } from 'react-native';

import { gradient } from './gradient';
import { space, washes } from './theme';

/**
 * Full-screen lavender-to-blue wash (mockup 01's app background) + scrolling
 * content. `footer` stays pinned below the scroll area (e.g. the tab bar).
 */
export function Screen({ children, footer, style, ...rest }: ViewProps & { footer?: ReactNode }) {
  return (
    <View {...rest} style={[{ flex: 1 }, gradient(washes.app), style]}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: space.xl, gap: space.lg, paddingBottom: space.xxl * 2 }}
      >
        {children}
      </ScrollView>
      {footer}
    </View>
  );
}
