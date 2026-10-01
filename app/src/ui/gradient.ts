import { Platform, type ViewStyle } from 'react-native';

/**
 * Cross-platform CSS linear-gradient background, no native library needed.
 *
 * React Native 0.76+ draws gradients with `experimental_backgroundImage`, but
 * react-native-web doesn't translate that prop, so web needs the standard
 * `backgroundImage` instead. This is the workaround documented in
 * https://github.com/necolas/react-native-web/issues/2787.
 */
export function gradient(css: string): ViewStyle {
  return Platform.select<ViewStyle>({
    web: { backgroundImage: css } as unknown as ViewStyle,
    default: { experimental_backgroundImage: css },
  });
}

/** Same idea for box shadows: RN's `boxShadow` (New Architecture) vs web CSS. */
export function boxShadow(css: string): ViewStyle {
  return { boxShadow: css } as ViewStyle;
}
