import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Radius, Typography, Spacing } from '../../constants/theme';

interface BadgeProps {
  label: string;
  color?: string;
  bgColor?: string;
  style?: ViewStyle;
  size?: 'sm' | 'md';
}

export function Badge({
  label,
  color = Colors.accentPrimary,
  bgColor,
  style,
  size = 'sm',
}: BadgeProps) {
  const bg = bgColor ?? color + '22';
  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: bg, borderColor: color + '55' },
        size === 'md' ? styles.badgeMd : null,
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          { color },
          size === 'md' ? styles.textMd : null,
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Radius.pill,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  badgeMd: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
  },
  text: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  textMd: {
    fontSize: 12,
  },
});
