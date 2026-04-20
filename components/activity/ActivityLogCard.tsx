import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Spacing, Typography, Shadow } from '../../constants/theme';
import type { ActivityLog } from '../../types';

interface ActivityLogCardProps {
  log: ActivityLog;
  index?: number;
}

const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
  walk: 'walk',
  bicycle: 'bicycle',
  barbell: 'barbell',
  fitness: 'fitness',
};

export function ActivityLogCard({ log, index = 0 }: ActivityLogCardProps) {
  const icon = iconMap[log.icon] ?? 'body';
  const time = new Date(log.timestamp).toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Animated.View entering={FadeInDown.delay(index * 80).springify()} style={styles.card}>
      <View style={styles.iconWrap}>
        <Ionicons name={icon} size={22} color={Colors.accentPrimary} />
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{log.name}</Text>
        <Text style={styles.meta}>{log.duration} mnt · {log.calories} kkal</Text>
      </View>
      <Text style={styles.time}>{time}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.medium,
    padding: Spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadow.card,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: Radius.medium,
    backgroundColor: Colors.accentPrimary + '18',
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: { flex: 1 },
  name: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  meta: {
    ...Typography.caption,
    color: Colors.textMuted,
    marginTop: 2,
  },
  time: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
});
