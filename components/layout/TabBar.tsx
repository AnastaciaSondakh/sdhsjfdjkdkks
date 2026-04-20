import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Colors, Spacing, Typography, Radius } from '../../constants/theme';

const { width } = Dimensions.get('window');

const TABS = [
  { name: 'index', label: 'Beranda', icon: 'home' as const, iconActive: 'home' as const },
  { name: 'aktivitas', label: 'Aktivitas', icon: 'barbell-outline' as const, iconActive: 'barbell' as const },
  { name: 'suasana', label: 'Suasana', icon: 'happy-outline' as const, iconActive: 'happy' as const },
  { name: 'tips', label: 'Tips', icon: 'bulb-outline' as const, iconActive: 'bulb' as const },
  { name: 'profil', label: 'Profil', icon: 'person-outline' as const, iconActive: 'person' as const },
];

const TAB_W = width / TABS.length;

interface TabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

export function TabBar({ state, descriptors, navigation }: TabBarProps) {
  const indicatorX = useSharedValue(state.index * TAB_W);

  useEffect(() => {
    indicatorX.value = withSpring(state.index * TAB_W, {
      damping: 20,
      stiffness: 200,
    });
  }, [state.index]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorX.value + TAB_W / 2 - 16 }],
  }));

  return (
    <View style={styles.container}>
      {/* Slide indicator dot */}
      <Animated.View style={[styles.indicator, indicatorStyle]} />

      {TABS.map((tab, index) => {
        const isFocused = state.index === index;
        const route = state.routes[index];

        async function onPress() {
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        }

        return (
          <Pressable key={tab.name} style={styles.tab} onPress={onPress}>
            <Ionicons
              name={isFocused ? tab.iconActive : tab.icon}
              size={22}
              color={isFocused ? Colors.accentPrimary : Colors.textMuted}
            />
            <Text
              style={[
                styles.label,
                isFocused ? styles.labelActive : null,
              ]}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.bgSecondary,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    paddingBottom: Platform.OS === 'ios' ? 24 : 8,
    paddingTop: Spacing.sm,
    position: 'relative',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    paddingVertical: 4,
  },
  label: {
    ...Typography.tiny,
    color: Colors.textMuted,
    fontWeight: '500',
  },
  labelActive: {
    color: Colors.accentPrimary,
    fontWeight: '700',
  },
  indicator: {
    position: 'absolute',
    top: 0,
    width: 32,
    height: 2.5,
    borderRadius: Radius.pill,
    backgroundColor: Colors.accentPrimary,
    shadowColor: Colors.accentPrimary,
    shadowOpacity: 0.7,
    shadowRadius: 6,
    elevation: 4,
  },
});
