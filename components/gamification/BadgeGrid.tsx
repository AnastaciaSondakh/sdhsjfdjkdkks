import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Spacing, Typography, Shadow } from '../../constants/theme';
import type { Badge } from '../../types';

interface BadgeGridProps {
  badges: Badge[];
}

export function BadgeGrid({ badges }: BadgeGridProps) {
  return (
    <View style={styles.grid}>
      {badges.map((badge, i) => (
        <Animated.View
          key={badge.id}
          entering={FadeInDown.delay(i * 60).springify()}
          style={[
            styles.cell,
            badge.unlocked
              ? { borderColor: badge.color + '55', shadowColor: badge.color, shadowOpacity: 0.2, shadowRadius: 8 }
              : styles.locked,
          ]}
        >
          <View
            style={[
              styles.iconWrap,
              { backgroundColor: badge.unlocked ? badge.color + '22' : Colors.bgElevated },
            ]}
          >
            <Ionicons
              name={badge.icon as any}
              size={24}
              color={badge.unlocked ? badge.color : Colors.textMuted}
            />
            {!badge.unlocked && (
              <View style={styles.lockOverlay}>
                <Ionicons name="lock-closed" size={12} color={Colors.textMuted} />
              </View>
            )}
          </View>
          <Text style={[styles.name, !badge.unlocked ? { color: Colors.textMuted } : null]}>
            {badge.name}
          </Text>
        </Animated.View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  cell: {
    width: '30%',
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.large,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    paddingVertical: Spacing.base,
    gap: Spacing.sm,
    elevation: 4,
  },
  locked: {
    borderColor: Colors.border,
    opacity: 0.7,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: Radius.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockOverlay: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: Colors.bgSecondary,
    borderRadius: 10,
    padding: 2,
  },
  name: {
    ...Typography.tiny,
    color: Colors.textPrimary,
    fontWeight: '600',
    textAlign: 'center',
  },
});
