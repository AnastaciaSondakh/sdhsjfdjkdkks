import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Radius, Spacing, Typography, Shadow } from '../../constants/theme';
import { ProgressBar } from '../ui/ProgressBar';

interface WeeklyProgressBarProps {
  caloriesBurned: number;
  caloriesTarget?: number;
  activeMinutes: number;
  activeTarget?: number;
}

export function WeeklyProgressBar({
  caloriesBurned,
  caloriesTarget = 3000,
  activeMinutes,
  activeTarget = 300,
}: WeeklyProgressBarProps) {
  return (
    <View style={styles.row}>
      <View style={styles.card}>
        <Text style={styles.label}>KALORI TERBAKAR</Text>
        <Text style={styles.value}>{caloriesBurned.toLocaleString()} kkal</Text>
        <ProgressBar
          progress={caloriesBurned / caloriesTarget}
          color="#FF6B6B"
          height={5}
          style={{ marginTop: Spacing.sm }}
        />
        <Text style={styles.sub}>+15% minggu lalu</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>DURASI AKTIF</Text>
        <Text style={styles.value}>
          {Math.floor(activeMinutes / 60)}j {activeMinutes % 60}m
        </Text>
        <ProgressBar
          progress={activeMinutes / activeTarget}
          color={Colors.accentSecondary}
          height={5}
          style={{ marginTop: Spacing.sm }}
        />
        <Text style={styles.sub}>total 1 kelebihan</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  card: {
    flex: 1,
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.large,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadow.card,
  },
  label: {
    ...Typography.tiny,
    color: Colors.textMuted,
    letterSpacing: 0.6,
    fontWeight: '700',
    marginBottom: 4,
  },
  value: {
    ...Typography.headingMD,
    color: Colors.textPrimary,
    fontSize: 16,
  },
  sub: {
    ...Typography.tiny,
    color: Colors.success,
    marginTop: 6,
    fontWeight: '600',
  },
});
