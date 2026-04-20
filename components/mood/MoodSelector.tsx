import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Colors, Radius, Spacing, Typography, Shadow } from '../../constants/theme';

const MOODS = [
  { key: 'sedih', emoji: '😔', label: 'SEDIH', color: Colors.accentTertiary },
  { key: 'biasa', emoji: '😐', label: 'BIASA', color: Colors.accentWarm },
  { key: 'tenang', emoji: '😌', label: 'TENANG', color: Colors.accentSecondary },
  { key: 'senang', emoji: '😊', label: 'SENANG', color: Colors.accentPrimary },
];

interface MoodSelectorProps {
  selected: string | null;
  onSelect: (mood: string) => void;
}

function MoodButton({
  mood,
  isSelected,
  onSelect,
}: {
  mood: typeof MOODS[0];
  isSelected: boolean;
  onSelect: () => void;
}) {
  const scale = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: isSelected ? 1 : 0.45,
  }));

  async function handlePress() {
    scale.value = withSpring(1.12, { damping: 10, stiffness: 200 });
    setTimeout(() => {
      scale.value = withSpring(1, { damping: 14, stiffness: 200 });
    }, 150);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onSelect();
  }

  return (
    <Animated.View style={animStyle}>
      <Pressable
        style={[
          styles.moodBtn,
          isSelected
            ? {
                borderColor: mood.color,
                shadowColor: mood.color,
                shadowOpacity: 0.35,
                shadowRadius: 12,
                elevation: 8,
                backgroundColor: mood.color + '18',
              }
            : null,
        ]}
        onPress={handlePress}
      >
        <Text style={styles.emoji}>{mood.emoji}</Text>
        <Text style={[styles.label, isSelected ? { color: mood.color } : null]}>
          {mood.label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

export function MoodSelector({ selected, onSelect }: MoodSelectorProps) {
  return (
    <View style={styles.row}>
      {MOODS.map((mood) => (
        <MoodButton
          key={mood.key}
          mood={mood}
          isSelected={selected === mood.key}
          onSelect={() => onSelect(mood.key)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  moodBtn: {
    flex: 1,
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.large,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    paddingVertical: Spacing.base,
    gap: Spacing.xs,
  },
  emoji: {
    fontSize: 28,
  },
  label: {
    ...Typography.tiny,
    color: Colors.textMuted,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
