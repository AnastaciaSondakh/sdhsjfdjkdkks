import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Spacing, Typography, Shadow } from '../../constants/theme';

interface StreakCounterProps {
  days: number;
}

export function StreakCounter({ days }: StreakCounterProps) {
  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <View style={styles.iconWrap}>
          <Ionicons name="flash" size={22} color={Colors.accentWarm} />
        </View>
        <View>
          <Text style={styles.label}>STREAK</Text>
          <Text style={styles.value}>{days} Hari</Text>
        </View>
      </View>
      <View style={styles.flames}>
        {Array.from({ length: Math.min(days, 7) }).map((_, i) => (
          <Text key={i} style={[styles.flame, i < days ? null : { opacity: 0.2 }]}>
            🔥
          </Text>
        ))}
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
    borderColor: Colors.accentWarm + '33',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Shadow.card,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: Radius.medium,
    backgroundColor: Colors.accentWarm + '22',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    ...Typography.tiny,
    color: Colors.textMuted,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  value: {
    ...Typography.headingMD,
    color: Colors.textPrimary,
  },
  flames: {
    flexDirection: 'row',
    gap: 2,
  },
  flame: {
    fontSize: 14,
  },
});
