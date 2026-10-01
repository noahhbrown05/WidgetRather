import { Text, type TextProps } from 'react-native';

import { type TypeVariant, type } from './theme';

/** Themed text. `<T v="title">` — every string in the app should go through this. */
export function T({ v = 'body', style, ...rest }: TextProps & { v?: TypeVariant }) {
  return <Text {...rest} style={[type[v], style]} />;
}
