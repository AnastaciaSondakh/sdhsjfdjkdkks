import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography } from '../../constants/theme';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightPress?: () => void;
  hasDot?: boolean;
}

export function ScreenHeader({
  title,
  subtitle,
  rightIcon,
  onRightPress,
  hasDot = false,
}: ScreenHeaderProps) {
  return (
    <View style={styles.container}>
      <View>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        <Text style={styles.title}>{title}</Text>
      </View>
      {rightIcon ? (
        <Pressable onPress={onRightPress} style={styles.rightBtn}>
          <Ionicons name={rightIcon} size={22} color={Colors.textSecondary} />
          {hasDot ? <View style={styles.dot} /> : null}
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.base,
  },
  subtitle: {
    ...Typography.caption,
    color: Colors.textMuted,
    marginBottom: 2,
  },
  title: {
    ...Typography.headingMD,
    color: Colors.textPrimary,
  },
  rightBtn: {
    position: 'relative',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.bgCard,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  dot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: Colors.accentTertiary,
    borderWidth: 1,
    borderColor: Colors.bgPrimary,
  },
});
