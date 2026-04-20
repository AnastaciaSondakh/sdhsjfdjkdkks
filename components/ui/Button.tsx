import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Colors, Radius, Spacing, Typography } from '../../constants/theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  fullWidth = false,
  icon,
  disabled = false,
  style,
  textStyle,
}: ButtonProps) {
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  function handlePressIn() {
    scale.value = withSpring(0.95, { damping: 15, stiffness: 300 });
  }

  function handlePressOut() {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  }

  async function handlePress() {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  }

  const variantStyle =
    variant === 'primary'
      ? styles.primary
      : variant === 'secondary'
      ? styles.secondary
      : variant === 'outline'
      ? styles.outline
      : styles.ghost;

  const variantTextStyle =
    variant === 'primary'
      ? styles.primaryText
      : variant === 'secondary'
      ? styles.secondaryText
      : variant === 'outline'
      ? styles.outlineText
      : styles.ghostText;

  return (
    <AnimatedPressable
      style={[
        styles.base,
        variantStyle,
        fullWidth ? styles.fullWidth : null,
        disabled ? styles.disabled : null,
        animStyle,
        style,
      ]}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
    >
      {icon}
      <Text style={[styles.baseText, variantTextStyle, textStyle]}>{label}</Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: Radius.pill,
  },
  fullWidth: { width: '100%' },
  disabled: { opacity: 0.4 },
  primary: { backgroundColor: Colors.accentPrimary },
  secondary: { backgroundColor: Colors.accentSecondary },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.accentPrimary,
  },
  ghost: { backgroundColor: 'transparent' },
  baseText: { ...Typography.body, fontWeight: '600' },
  primaryText: { color: Colors.bgPrimary },
  secondaryText: { color: Colors.textPrimary },
  outlineText: { color: Colors.accentPrimary },
  ghostText: { color: Colors.textSecondary },
});
