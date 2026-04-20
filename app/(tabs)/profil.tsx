import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Colors, Spacing, Typography, Radius, Shadow } from '../../constants/theme';
import { BadgeGrid } from '../../components/gamification/BadgeGrid';
import { StreakCounter } from '../../components/gamification/StreakCounter';
import { LevelProgressBar } from '../../components/gamification/LevelProgressBar';
import { SkeletonLoader } from '../../components/ui/SkeletonLoader';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { Button } from '../../components/ui/Button';
import { currentUser, badges, featuredActivity } from '../../data/dummyData';

export default function ProfilScreen() {
  const router = useRouter();
  const [isLoading] = useState(false);

  if (isLoading) return <SkeletonLoader />;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ── PROFILE HERO ── */}
        <Animated.View entering={FadeInDown.duration(400).springify()} style={styles.heroCard}>
          <LinearGradient
            colors={[Colors.accentSecondary + '33', Colors.accentPrimary + '11']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.avatarWrap}>
            <Image
              source={{ uri: currentUser.avatar }}
              style={styles.avatar}
              resizeMode="cover"
            />
            <View style={styles.onlineRing} />
          </View>
          <Text style={styles.name}>{currentUser.name}</Text>
          <Text style={styles.titleText}>
            {currentUser.title} · Level {currentUser.level}
          </Text>
        </Animated.View>

        {/* ── LEVEL PROGRESS ── */}
        <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.section}>
          <LevelProgressBar
            currentLevel={currentUser.level}
            targetLevel={currentUser.targetLevel}
            progress={currentUser.levelProgress}
            currentXP={340}
            targetXP={400}
          />
        </Animated.View>

        {/* ── STATS ROW ── */}
        <Animated.View entering={FadeInDown.delay(160).springify()} style={styles.statsRow}>
          {/* Total Points */}
          <View style={[styles.statCard, { borderColor: Colors.accentWarm + '44' }]}>
            <View style={[styles.statIcon, { backgroundColor: Colors.accentWarm + '22' }]}>
              <Ionicons name="star" size={18} color={Colors.accentWarm} />
            </View>
            <Text style={styles.statLabel}>TOTAL POIN</Text>
            <Text style={styles.statValue}>
              {currentUser.totalPoints.toLocaleString()}
            </Text>
          </View>

          {/* Streak */}
          <View style={[styles.statCard, { borderColor: Colors.accentTertiary + '44' }]}>
            <View style={[styles.statIcon, { backgroundColor: Colors.accentTertiary + '22' }]}>
              <Ionicons name="flash" size={18} color={Colors.accentTertiary} />
            </View>
            <Text style={styles.statLabel}>STREAK</Text>
            <Text style={[styles.statValue, { color: Colors.accentTertiary }]}>
              {currentUser.streakDays} Hari
            </Text>
          </View>
        </Animated.View>

        {/* ── STREAK COUNTER ── */}
        <Animated.View entering={FadeInDown.delay(220).springify()} style={styles.section}>
          <StreakCounter days={currentUser.streakDays} />
        </Animated.View>

        {/* ── BADGE GRID ── */}
        <Animated.View entering={FadeInDown.delay(280).springify()} style={styles.section}>
          <SectionHeader title="Koleksi Badge" actionLabel="Lihat Semua" onAction={() => {}} />
          <BadgeGrid badges={badges} />
        </Animated.View>

        {/* ── AKTIVITAS TERBAIK ── */}
        <Animated.View entering={FadeInDown.delay(340).springify()} style={styles.section}>
          <SectionHeader title="Aktivitas Terbaik" />
          <View style={styles.activityCard}>
            <View style={styles.actLeft}>
              <View style={styles.actIcon}>
                <Ionicons name="barbell" size={22} color={Colors.accentPrimary} />
              </View>
              <View>
                <Text style={styles.actName}>{featuredActivity.name}</Text>
                <View style={styles.actMeta}>
                  <Ionicons name="time-outline" size={12} color={Colors.textMuted} />
                  <Text style={styles.actMetaText}>{featuredActivity.duration} mnt</Text>
                  <Ionicons name="flame-outline" size={12} color={Colors.accentWarm} />
                  <Text style={styles.actMetaText}>{featuredActivity.calories} kkal</Text>
                </View>
              </View>
            </View>
            <View style={styles.actBadge}>
              <Text style={styles.actBadgeText}>TERBAIK</Text>
            </View>
          </View>
        </Animated.View>

        {/* ── LOGOUT BUTTON ── */}
        <Animated.View entering={FadeInDown.delay(400).springify()} style={styles.section}>
          <Button
            label="Keluar"
            onPress={() => router.replace('/(auth)/login')}
            variant="outline"
            style={styles.logoutButton}
            textStyle={styles.logoutButtonText}
            icon={<Ionicons name="log-out-outline" size={20} color={Colors.danger} />}
          />
        </Animated.View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bgPrimary },
  scroll: { flex: 1 },
  content: { paddingHorizontal: Spacing.base, paddingTop: Spacing.xl },

  heroCard: {
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.base,
    overflow: 'hidden',
    ...Shadow.card,
  },
  avatarWrap: {
    position: 'relative',
    marginBottom: Spacing.base,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 3,
    borderColor: Colors.accentPrimary,
  },
  onlineRing: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.success,
    borderWidth: 2.5,
    borderColor: Colors.bgCard,
  },
  name: {
    ...Typography.headingLG,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  titleText: {
    ...Typography.caption,
    color: Colors.textMuted,
    marginTop: 4,
  },

  section: { marginBottom: Spacing.base },

  statsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.base,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.large,
    padding: Spacing.base,
    borderWidth: 1,
    alignItems: 'flex-start',
    gap: 4,
    ...Shadow.card,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: Radius.medium,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
  statLabel: {
    ...Typography.tiny,
    color: Colors.textMuted,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  statValue: {
    ...Typography.headingMD,
    color: Colors.textPrimary,
  },

  activityCard: {
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.large,
    padding: Spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadow.card,
  },
  actLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  actIcon: {
    width: 48,
    height: 48,
    borderRadius: Radius.medium,
    backgroundColor: Colors.accentPrimary + '18',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actName: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '700',
    marginBottom: 4,
  },
  actMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actMetaText: {
    ...Typography.tiny,
    color: Colors.textMuted,
    marginRight: Spacing.xs,
  },
  actBadge: {
    backgroundColor: Colors.accentPrimary + '22',
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: Colors.accentPrimary + '55',
  },
  actBadgeText: {
    ...Typography.tiny,
    color: Colors.accentPrimary,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  logoutButton: {
    marginTop: Spacing.md,
    borderColor: Colors.danger + '44',
    borderWidth: 1.5,
  },
  logoutButtonText: {
    color: Colors.danger,
  },
});
