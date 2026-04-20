import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Spacing, Typography, Shadow } from '../../constants/theme';
import { Badge } from '../ui/Badge';
import type { SmartRecommendation } from '../../types';

interface SmartRecommendationProps {
  recommendation: SmartRecommendation;
}

const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
  water: 'water',
  moon: 'moon',
  walk: 'walk',
  nutrition: 'nutrition',
  brain: 'medical',
};

export function SmartRecommendationCard({ recommendation }: SmartRecommendationProps) {
  const iconName = iconMap[recommendation.icon] ?? 'bulb';

  return (
    <Animated.View entering={FadeInRight.duration(500).springify()} style={styles.card}>
      <View style={styles.leftBorder} />
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View style={styles.iconWrap}>
            <Ionicons name={iconName} size={16} color={Colors.accentWarm} />
          </View>
          <Text style={styles.headerLabel}>Saran Cerdas</Text>
          {recommendation.tag ? (
            <Badge label={recommendation.tag} color={Colors.accentWarm} />
          ) : null}
        </View>
        <Text style={styles.title}>{recommendation.title}</Text>
        <Text style={styles.description}>{recommendation.description}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.large,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadow.card,
  },
  leftBorder: {
    width: 3,
    backgroundColor: Colors.accentPrimary,
  },
  content: {
    flex: 1,
    padding: Spacing.base,
    gap: Spacing.xs,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  iconWrap: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: Colors.accentWarm + '22',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLabel: {
    ...Typography.caption,
    color: Colors.accentWarm,
    fontWeight: '700',
    letterSpacing: 0.5,
    flex: 1,
  },
  title: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  description: {
    ...Typography.caption,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
});
