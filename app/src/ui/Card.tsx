import { View, type ViewProps } from 'react-native';

import { boxShadow, gradient } from './gradient';
import { radius, shadow, space, washes } from './theme';

/** The frosted white card from the mockups (question card, result groups). */
export function Card({ style, ...rest }: ViewProps) {
  return (
    <View
      {...rest}
      style={[
        {
          borderRadius: radius.card,
          padding: space.lg,
          gap: space.sm + 2,
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.85)',
        },
        gradient(washes.card),
        boxShadow(shadow.card),
        style,
      ]}
    />
  );
}
