import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  interpolateColor,
  useAnimatedReaction,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Radius, Spacing } from '../../constants/theme';

interface SkeletonBlockProps {
  width?: number | `${number}%`;
  height?: number;
  borderRadius?: number;
  style?: object;
}

function SkeletonBlock({ width = '100%', height = 20, borderRadius = Radius.small, style }: SkeletonBlockProps) {
  const translateX = useSharedValue(-300);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(300, { duration: 1100, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View
      style={[
        styles.block,
        { width: width as any, height, borderRadius, overflow: 'hidden' },
        style,
      ]}
    >
      <Animated.View style={[StyleSheet.absoluteFill, shimmerStyle]}>
        <LinearGradient
          colors={['transparent', 'rgba(255,255,255,0.06)', 'transparent']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </View>
  );
}

interface SkeletonLoaderProps {
  variant?: 'home' | 'activity' | 'mood' | 'tips' | 'profile';
}

export function SkeletonLoader({ variant = 'home' }: SkeletonLoaderProps) {
  return (
    <View style={styles.container}>
      <SkeletonBlock height={40} width="60%" style={{ marginBottom: Spacing.base }} />
      <SkeletonBlock height={200} borderRadius={Radius.large} style={{ marginBottom: Spacing.base }} />
      <SkeletonBlock height={100} borderRadius={Radius.large} style={{ marginBottom: Spacing.sm }} />
      <View style={{ flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.base }}>
        <SkeletonBlock height={100} borderRadius={Radius.large} style={{ flex: 1 }} />
        <SkeletonBlock height={100} borderRadius={Radius.large} style={{ flex: 1 }} />
      </View>
      <SkeletonBlock height={160} borderRadius={Radius.large} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.base,
  },
  block: {
    backgroundColor: Colors.bgElevated,
  },
});
