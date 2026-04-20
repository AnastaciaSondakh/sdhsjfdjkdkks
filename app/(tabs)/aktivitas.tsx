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
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, Spacing, Typography, Radius, Shadow } from '../../constants/theme';
import { ActivityGraph } from '../../components/activity/ActivityGraph';
import { ActivityLogCard } from '../../components/activity/ActivityLogCard';
import { WeeklyProgressBar } from '../../components/activity/WeeklyProgressBar';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { SkeletonLoader } from '../../components/ui/SkeletonLoader';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { todayStats, weeklySteps, activityLogs } from '../../data/dummyData';

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
  const fabStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  return (
    <AnimatedPressable style={[styles.fab, fabStyle]} onPress={onPress}>
      <Ionicons name="add" size={28} color={Colors.bgPrimary} />
    </AnimatedPressable>
  );
}

export default function AktivitasScreen() {
  const [isLoading] = useState(false);
  const router = useRouter();

  if (isLoading) return <SkeletonLoader />;

  const stepsProgress = todayStats.steps / todayStats.targetSteps;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ── HERO STEPS ── */}
        <Animated.View entering={FadeInDown.duration(500).springify()} style={styles.heroCard}>
          <Text style={styles.heroCaption}>LANGKAH HARI INI</Text>
          <Text style={styles.heroSteps}>{todayStats.steps.toLocaleString()}</Text>
          <View style={styles.heroSubRow}>
            <Ionicons name="trending-up" size={14} color={Colors.success} />
            <Text style={styles.heroSub}>+12% lebih tinggi dari kemarin</Text>
          </View>
          <ProgressBar
            progress={stepsProgress}
            color={Colors.accentPrimary}
            height={6}
            style={{ marginTop: Spacing.base }}
          />
          <Text style={styles.heroTarget}>TARGET: {todayStats.targetSteps.toLocaleString()}</Text>
        </Animated.View>

        {/* ── ACTIVITY GRAPH ── */}
        <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.section}>
          <SectionHeader title="Grafik Aktivitas" />
          <ActivityGraph data={weeklySteps} />
        </Animated.View>

        {/* ── WEEKLY PROGRESS ── */}
        <Animated.View entering={FadeInDown.delay(180).springify()} style={styles.section}>
          <SectionHeader title="Progress Mingguan" />
          <WeeklyProgressBar
            caloriesBurned={todayStats.caloriesBurned}
            activeMinutes={todayStats.activeMinutes}
          />
        </Animated.View>

        {/* ── SLEEP QUALITY ── */}
        <Animated.View entering={FadeInDown.delay(240).springify()} style={styles.sleepCard}>
          <View style={styles.sleepHeader}>
            <View style={styles.sleepIconWrap}>
              <Ionicons name="moon" size={18} color={Colors.accentSecondary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.sleepLabel}>KUALITAS TIDUR</Text>
              <Text style={styles.sleepQuality}>{todayStats.sleepQuality}</Text>
            </View>
            <Text style={styles.sleepPct}>85%</Text>
          </View>
          <ProgressBar
            progress={0.85}
            color={Colors.accentSecondary}
            height={6}
            style={{ marginTop: Spacing.md }}
          />
        </Animated.View>

        {/* ── LOG CARDS ── */}
        <View style={styles.section}>
          <SectionHeader title="Riwayat Aktivitas" />
          {activityLogs.map((log, i) => (
            <ActivityLogCard key={log.id} log={log} index={i} />
          ))}
        </View>

        <View style={{ height: 88 }} />
      </ScrollView>

      <FAB onPress={() => router.push('/modal/input-aktivitas')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bgPrimary },
  scroll: { flex: 1 },
  content: { paddingHorizontal: Spacing.base, paddingTop: Spacing.xl },

  heroCard: {
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.large,
    padding: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.base,
    ...Shadow.card,
  },
  heroCaption: {
    ...Typography.tiny,
    color: Colors.textMuted,
    letterSpacing: 1,
    fontWeight: '700',
    marginBottom: Spacing.sm,
  },
  heroSteps: {
    fontSize: 48,
    fontWeight: '700',
    color: Colors.textPrimary,
    lineHeight: 56,
  },
  heroSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginTop: Spacing.xs,
  },
  heroSub: {
    ...Typography.caption,
    color: Colors.success,
    fontWeight: '600',
  },
  heroTarget: {
    ...Typography.caption,
    color: Colors.textMuted,
    marginTop: Spacing.sm,
  },

  section: { marginBottom: Spacing.base },

  sleepCard: {
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.large,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.base,
    ...Shadow.card,
  },
  sleepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  sleepIconWrap: {
    width: 40,
    height: 40,
    borderRadius: Radius.medium,
    backgroundColor: Colors.accentSecondary + '22',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sleepLabel: {
    ...Typography.tiny,
    color: Colors.textMuted,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  sleepQuality: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  sleepPct: {
    ...Typography.headingMD,
    color: Colors.accentSecondary,
  },

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
