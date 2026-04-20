import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Pressable,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, Spacing, Typography, Radius } from '../../constants/theme';
import { HealthScoreRing } from '../../components/home/HealthScoreRing';
import { SmartRecommendationCard } from '../../components/home/SmartRecommendation';
import { QuickStatsRow } from '../../components/home/QuickStatsRow';
import { WeeklyInsightChart } from '../../components/home/WeeklyInsightChart';
import { SkeletonLoader } from '../../components/ui/SkeletonLoader';
import {
  currentUser,
  todayStats,
  weeklySteps,
  smartRecommendations,
} from '../../data/dummyData';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function FAB({ onPress }: { onPress: () => void }) {
  const scale = useSharedValue(1);

  React.useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.08, { duration: 900, easing: Easing.inOut(Easing.ease) }),
        withTiming(1.0, { duration: 900, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, []);

  const fabStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      style={[styles.fab, fabStyle]}
      onPress={onPress}
    >
      <Ionicons name="add" size={28} color={Colors.bgPrimary} />
    </AnimatedPressable>
  );
}

export default function HomeScreen() {
  const [isLoading] = useState(false);
  const router = useRouter();
  const topRec = smartRecommendations[0];

  if (isLoading) return <SkeletonLoader variant="home" />;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ── HEADER ── */}
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <Image
              source={{ uri: currentUser.avatar }}
              style={styles.avatar}
              resizeMode="cover"
            />
            <View>
              <Text style={styles.greeting}>Selamat Pagi 👋</Text>
              <Text style={styles.userName}>{currentUser.name}</Text>
            </View>
          </View>
          <Pressable style={styles.bellBtn}>
            <Ionicons name="notifications-outline" size={20} color={Colors.textSecondary} />
            <View style={styles.notifDot} />
          </Pressable>
        </View>

        {/* ── HEALTH SCORE RING ── */}
        <HealthScoreRing
          score={todayStats.healthScore}
          maxScore={todayStats.maxScore}
          label="Sangat Baik"
          yesterdayScore={75}
          targetScore={90}
        />

        {/* ── SMART RECOMMENDATION ── */}
        <SmartRecommendationCard recommendation={topRec} />

        {/* ── QUICK STATS ── */}
        <View style={styles.section}>
          <QuickStatsRow stats={todayStats} />
        </View>

        {/* ── WEEKLY CHART ── */}
        <WeeklyInsightChart data={weeklySteps} todayIndex={4} />

        {/* bottom padding for FAB */}
        <View style={{ height: 88 }} />
      </ScrollView>

      {/* ── FAB ── */}
      <FAB onPress={() => router.push('/modal/input-aktivitas')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bgPrimary },
  scroll: { flex: 1 },
  content: {
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.base,
  },

  /* Header */
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: Colors.accentPrimary,
  },
  greeting: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  userName: {
    ...Typography.headingMD,
    color: Colors.textPrimary,
  },
  bellBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notifDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.accentTertiary,
    borderWidth: 1.5,
    borderColor: Colors.bgPrimary,
  },

  /* Section */
  section: {
    marginTop: Spacing.base,
  },

  /* FAB */
  fab: {
    position: 'absolute',
    bottom: 90,
    right: Spacing.base,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.accentPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.accentPrimary,
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 10,
  },
});
