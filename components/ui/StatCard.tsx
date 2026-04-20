import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Radius, Shadow, Spacing, Typography } from '../../constants/theme';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  subColor?: string;
  accent?: string;
  style?: ViewStyle;
  children?: React.ReactNode;
}

export function StatCard({
  icon,
  label,
  value,
  sub,
  subColor = Colors.accentPrimary,
  accent = Colors.accentPrimary,
  style,
  children,
}: StatCardProps) {
  return (
    <View
      style={[
        styles.card,
        {
          shadowColor: accent,
          shadowOpacity: 0.12,
          shadowRadius: 10,
          elevation: 6,
        },
        style,
      ]}
    >
      <View style={styles.iconRow}>
        {icon}
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
      {sub ? <Text style={[styles.sub, { color: subColor }]}>{sub}</Text> : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.large,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.border,
    flex: 1,
  },
  iconRow: {
    marginBottom: Spacing.sm,
  },
  value: {
    ...Typography.headingMD,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  label: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  sub: {
    ...Typography.tiny,
    fontWeight: '600',
    marginTop: 4,
  },
});
