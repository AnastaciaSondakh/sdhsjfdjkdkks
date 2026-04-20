import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Colors, Radius, Spacing, Typography, Shadow } from '../../constants/theme';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import type { TodayStats } from '../../types';

interface QuickStatsRowProps {
  stats: TodayStats;
}

export function QuickStatsRow({ stats }: QuickStatsRowProps) {
  const stepsProgress = stats.steps / stats.targetSteps;
  const waterProgress = stats.waterLiters / stats.targetWater;
  const sleepProgress = stats.sleepHours / stats.targetSleep;

  return (
    <>
      {/* Row 1: Steps + Water */}
      <View style={styles.row}>
        <Animated.View entering={FadeInDown.delay(100).springify()} style={[styles.card, styles.half]}>
          <View style={styles.iconRow}>
            <View style={[styles.iconWrap, { backgroundColor: Colors.accentPrimary + '22' }]}>
              <Ionicons name="footsteps" size={18} color={Colors.accentPrimary} />
            </View>
            <Badge label="+12%" color={Colors.accentPrimary} />
          </View>
          <Text style={styles.value}>{stats.steps.toLocaleString()}</Text>
          <Text style={styles.label}>Langkah</Text>
          <ProgressBar progress={stepsProgress} style={{ marginTop: Spacing.sm }} height={4} />
          <Text style={styles.target}>{stats.targetSteps.toLocaleString()} target</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(180).springify()} style={[styles.card, styles.half]}>
          <View style={styles.iconRow}>
            <View style={[styles.iconWrap, { backgroundColor: '#4FC3F7' + '22' }]}>
              <Ionicons name="water" size={18} color="#4FC3F7" />
            </View>
          </View>
          <Text style={styles.value}>{stats.waterLiters}L</Text>
          <Text style={styles.label}>Air Minum</Text>
          <ProgressBar progress={waterProgress} color="#4FC3F7" style={{ marginTop: Spacing.sm }} height={4} />
          <Text style={styles.target}>{stats.targetWater}L target</Text>
        </Animated.View>
      </View>

      {/* Row 2: Sleep + Mood */}
      <View style={styles.row}>
        <Animated.View entering={FadeInDown.delay(260).springify()} style={[styles.card, styles.half]}>
          <View style={styles.iconRow}>
            <View style={[styles.iconWrap, { backgroundColor: Colors.accentSecondary + '22' }]}>
              <Ionicons name="moon" size={18} color={Colors.accentSecondary} />
            </View>
          </View>
          <Text style={styles.value}>
            {Math.floor(stats.sleepHours)}j {Math.round((stats.sleepHours % 1) * 60)}m
          </Text>
          <Text style={styles.label}>Tidur</Text>
          <ProgressBar
            progress={sleepProgress}
            color={Colors.accentSecondary}
            style={{ marginTop: Spacing.sm }}
            height={4}
          />
          <Text style={[styles.target, { color: Colors.success }]}>{stats.sleepQuality}</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(340).springify()} style={[styles.card, styles.half]}>
          <View style={styles.iconRow}>
            <View style={[styles.iconWrap, { backgroundColor: Colors.accentWarm + '22' }]}>
              <Ionicons name="happy" size={18} color={Colors.accentWarm} />
            </View>
          </View>
          <Text style={[styles.value, { fontSize: 26 }]}>😌</Text>
          <Text style={styles.label}>Mood</Text>
          <Text style={[styles.target, { color: Colors.accentWarm }]}>{stats.mood}</Text>
        </Animated.View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  half: { flex: 1 },
  card: {
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.large,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadow.card,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: Radius.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    ...Typography.headingMD,
    color: Colors.textPrimary,
    fontWeight: '700',
  },
  label: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  target: {
    ...Typography.tiny,
    color: Colors.textMuted,
    marginTop: 4,
  },
});
