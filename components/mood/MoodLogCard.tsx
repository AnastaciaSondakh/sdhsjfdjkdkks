import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Colors, Radius, Spacing, Typography, Shadow } from '../../constants/theme';
import type { MoodEntry } from '../../types';

const moodEmoji: Record<string, string> = {
  senang: '😊',
  biasa: '😐',
  sedih: '😔',
  tenang: '😌',
};

const moodColor: Record<string, string> = {
  senang: Colors.accentPrimary,
  biasa: Colors.accentWarm,
  sedih: Colors.accentTertiary,
  tenang: Colors.accentSecondary,
};

interface MoodLogCardProps {
  entry: MoodEntry;
  index?: number;
}

export function MoodLogCard({ entry, index = 0 }: MoodLogCardProps) {
  const color = moodColor[entry.mood] ?? Colors.textSecondary;
  const date = new Date(entry.date).toLocaleDateString('id-ID', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

  return (
    <Animated.View entering={FadeInDown.delay(index * 70).springify()} style={styles.card}>
      <Text style={styles.emoji}>{moodEmoji[entry.mood]}</Text>
      <View style={styles.info}>
        <View style={styles.row}>
          <Text style={[styles.mood, { color }]}>{entry.mood.toUpperCase()}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        {entry.note ? <Text style={styles.note}>{entry.note}</Text> : null}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.medium,
    padding: Spacing.base,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadow.card,
  },
  emoji: { fontSize: 28 },
  info: { flex: 1 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  mood: {
    ...Typography.caption,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  date: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  note: {
    ...Typography.caption,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
});
