import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Radius, Spacing, Typography, Shadow } from '../../constants/theme';
import { ProgressBar } from '../ui/ProgressBar';

interface LevelProgressBarProps {
  currentLevel: number;
  targetLevel: number;
  progress: number; // 0-1
  currentXP: number;
  targetXP: number;
}

export function LevelProgressBar({
  currentLevel,
  targetLevel,
  progress,
  currentXP,
  targetXP,
}: LevelProgressBarProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.label}>TARGET MINGGUAN</Text>
          <Text style={styles.goal}>Menuju Level {targetLevel}</Text>
        </View>
        <View style={styles.xpWrap}>
          <Text style={styles.pct}>{Math.round(progress * 100)}%</Text>
          <Text style={styles.xp}>
            {currentXP.toLocaleString()}/{targetXP.toLocaleString()} XP
          </Text>
        </View>
      </View>
      <ProgressBar
        progress={progress}
        color={Colors.accentPrimary}
        height={10}
        style={{ marginTop: Spacing.md }}
      />
      <View style={styles.levelRow}>
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>Lv {currentLevel}</Text>
        </View>
        <View style={[styles.levelBadge, styles.targetBadge]}>
          <Text style={styles.levelText}>Lv {targetLevel}</Text>
        </View>
      </View>
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
    ...Shadow.card,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  label: {
    ...Typography.tiny,
    color: Colors.textMuted,
    fontWeight: '700',
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  goal: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  xpWrap: { alignItems: 'flex-end' },
  pct: {
    ...Typography.headingMD,
    color: Colors.accentPrimary,
  },
  xp: {
    ...Typography.tiny,
    color: Colors.textMuted,
  },
  levelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.sm,
  },
  levelBadge: {
    backgroundColor: Colors.bgElevated,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Radius.pill,
  },
  targetBadge: {
    backgroundColor: Colors.accentPrimary + '22',
  },
  levelText: {
    ...Typography.tiny,
    color: Colors.accentPrimary,
    fontWeight: '700',
  },
});
