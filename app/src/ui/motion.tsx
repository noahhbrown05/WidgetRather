import { useEffect, useRef, useState } from 'react';
import {
  AccessibilityInfo, Animated, Easing, Platform, Pressable,
  type PressableProps, type StyleProp, type ViewProps, type ViewStyle,
} from 'react-native';

import { colors } from './theme';

// React Native 0.86: https://reactnative.dev/docs/0.86/animated
// Preferences: https://reactnative.dev/docs/0.86/accessibilityinfo
// Cache the preference so newly revealed content knows it before its first frame.
let reducedMotion = Platform.OS === 'web' && typeof window !== 'undefined'
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : true;

export function useReducedMotion() {
  const [reduced, setReduced] = useState(reducedMotion);
  useEffect(() => {
    let active = true;
    let changed = false;
    const update = (value: boolean) => {
      reducedMotion = value;
      if (active) setReduced(value);
    };
    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', (value) => {
      changed = true;
      update(value);
    });
    AccessibilityInfo.isReduceMotionEnabled().then((value) => {
      if (active && !changed) update(value);
    }).catch(() => {});
    return () => { active = false; subscription.remove(); };
  }, []);
  return reduced;
}

export function useMotionValue(target: number, {
  from = 0, duration = 260, delay = 0, layout = false,
}: { from?: number; duration?: number; delay?: number; layout?: boolean } = {}) {
  const reduced = useReducedMotion();
  const value = useRef(new Animated.Value(reduced ? target : from)).current;
  useEffect(() => {
    if (reduced) { value.setValue(target); return; }
    const animation = Animated.timing(value, {
      toValue: target, duration, delay, easing: Easing.out(Easing.cubic),
      useNativeDriver: !layout && Platform.OS !== 'web', isInteraction: false,
    });
    animation.start();
    return () => animation.stop();
  }, [value, target, duration, delay, layout, reduced]);
  return value;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/** Immediate action, with a short press/release spring. Never delays onPress. */
export function MotionPressable({
  style, onPressIn, onPressOut, onFocus, onBlur, disabled, onPress,
  pressScale = 0.975, ...props
}: Omit<PressableProps, 'style'> & { style?: StyleProp<ViewStyle>; pressScale?: number }) {
  const scale = useRef(new Animated.Value(1)).current;
  const reduced = useReducedMotion();
  const [focused, setFocused] = useState(false);
  const inactive = !!disabled || !onPress;

  useEffect(() => {
    if (reduced || inactive) { scale.stopAnimation(); scale.setValue(1); }
    return () => scale.stopAnimation();
  }, [scale, reduced, inactive]);

  const release = () => {
    if (reduced) return;
    Animated.spring(scale, {
      toValue: 1, stiffness: 420, damping: 24, mass: 0.6,
      useNativeDriver: Platform.OS !== 'web', isInteraction: false,
    }).start();
  };

  return (
    <AnimatedPressable
      {...props}
      onPress={onPress}
      disabled={inactive}
      onFocus={(event) => { setFocused(true); onFocus?.(event); }}
      onBlur={(event) => { setFocused(false); release(); onBlur?.(event); }}
      onPressIn={(event) => {
        if (!reduced) Animated.timing(scale, {
          toValue: pressScale, duration: 80, easing: Easing.out(Easing.quad),
          useNativeDriver: Platform.OS !== 'web', isInteraction: false,
        }).start();
        onPressIn?.(event);
      }}
      onPressOut={(event) => { release(); onPressOut?.(event); }}
      style={[
        style,
        { transform: [{ scale }] },
        focused && Platform.OS === 'web' && {
          outlineColor: colors.magenta, outlineWidth: 2, outlineStyle: 'solid', outlineOffset: 3,
        },
      ]}
    />
  );
}

/** A restrained entrance; reduced-motion users see the final state immediately. */
export function Reveal({ children, style, delay = 0, pop = false, ...props }: ViewProps & { delay?: number; pop?: boolean }) {
  const progress = useMotionValue(1, { duration: pop ? 180 : 260, delay });
  return (
    <Animated.View {...props} style={[
      style,
      { opacity: progress, transform: pop
        ? [{ scale: progress.interpolate({ inputRange: [0, 1], outputRange: [0.82, 1] }) }]
        : [{ translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [8, 0] }) }],
      },
    ]}>
      {children}
    </Animated.View>
  );
}
