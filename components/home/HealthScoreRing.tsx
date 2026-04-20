import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ProgressRing } from '../ui/ProgressRing';
import { Colors, Typography, Spacing } from '../../constants/theme';

interface HealthScoreRingProps {
  score: number;
  maxScore: number;
  label: string;
  yesterdayScore?: number;
  targetScore?: number;
}

export function HealthScoreRing({
  score,
  maxScore,
  label,
  yesterdayScore = 75,
  targetScore = 90,
}: HealthScoreRingProps) {
  const progress = score / maxScore;

  return (
    <View style={styles.container}>
      <Text style={styles.caption}>SKOR KESEHATAN HARIAN</Text>

      <ProgressRing
        size={200}
        strokeWidth={14}
        progress={progress}
        color={Colors.accentPrimary}
        trackColor={Colors.bgElevated}
      >
        <View style={styles.center}>
          <Text style={styles.score}>{score}</Text>
          <Text style={styles.maxScore}>/100</Text>
          <Text style={[styles.label, { color: Colors.accentPrimary }]}>{label}</Text>
        </View>
      </ProgressRing>

      <View style={styles.metaRow}>
        <Text style={styles.meta}>Target: {targetScore}</Text>
        <View style={styles.dot} />
        <Text style={styles.meta}>Kemarin: {yesterdayScore}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  caption: {
    ...Typography.caption,
    color: Colors.textMuted,
    letterSpacing: 1,
    marginBottom: Spacing.base,
    textTransform: 'uppercase',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  score: {
    fontSize: 40,
    fontWeight: '700',
    color: Colors.accentPrimary,
    lineHeight: 46,
  },
  maxScore: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  label: {
    ...Typography.caption,
    fontWeight: '600',
    marginTop: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.base,
  },
  meta: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: Colors.textMuted,
  },
});
