import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Pressable,
  FlatList,
} from 'react-native';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, Radius, Shadow } from '../../constants/theme';
import { SkeletonLoader } from '../../components/ui/SkeletonLoader';
import { Badge } from '../../components/ui/Badge';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { dailyTips, featuredActivity } from '../../data/dummyData';
import type { HealthTip } from '../../types';

const FILTERS = ['Semua', 'Fisik', 'Mental', 'Nutrisi', 'Tidur'];

const CATEGORY_COLOR: Record<string, string> = {
  Fisik: Colors.accentTertiary,
  Mental: Colors.accentSecondary,
  Nutrisi: Colors.accentPrimary,
  Tidur: '#4FC3F7',
  Semua: Colors.accentPrimary,
};

function TipCard({ tip, index }: { tip: HealthTip; index: number }) {
  const color = CATEGORY_COLOR[tip.category] ?? Colors.accentPrimary;
  return (
    <Animated.View entering={FadeInDown.delay(index * 80).springify()} style={[styles.tipCard]}>
      <View style={[styles.tipLeftBorder, { backgroundColor: color }]} />
      <View style={styles.tipContent}>
        <View style={styles.tipHeader}>
          <View style={[styles.catPill, { backgroundColor: color + '22', borderColor: color + '55' }]}>
            <Text style={[styles.catText, { color }]}>{tip.category}</Text>
          </View>
          {tip.tag ? (
            <Badge label={tip.tag} color={Colors.accentWarm} />
          ) : null}
        </View>
        <Text style={styles.tipTitle}>{tip.title}</Text>
        {tip.content ? (
          <Text style={styles.tipBody}>{tip.content}</Text>
        ) : null}
        {tip.duration || tip.calories ? (
          <View style={styles.tipMeta}>
            {tip.duration ? (
              <View style={styles.metaChip}>
                <Ionicons name="time-outline" size={12} color={Colors.textMuted} />
                <Text style={styles.metaText}>{tip.duration}</Text>
              </View>
            ) : null}
            {tip.calories ? (
              <View style={styles.metaChip}>
                <Ionicons name="flame-outline" size={12} color={Colors.accentWarm} />
                <Text style={styles.metaText}>{tip.calories} kkal</Text>
              </View>
            ) : null}
          </View>
        ) : null}
      </View>
    </Animated.View>
  );
}

export default function TipsScreen() {
  const [isLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Semua');

  if (isLoading) return <SkeletonLoader />;

  const filtered =
    activeFilter === 'Semua'
      ? dailyTips
      : dailyTips.filter((t) => t.category === activeFilter);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ── FEATURED ACTIVITY CARD ── */}
        <Animated.View entering={FadeInRight.duration(500).springify()} style={{ marginBottom: Spacing.base }}>
          <LinearGradient
            colors={[Colors.accentSecondary, Colors.accentPrimary + 'AA']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.featuredCard}
          >
            <View style={styles.featuredTag}>
              <Text style={styles.featuredTagText}>{featuredActivity.category.toUpperCase()} TERBAIK</Text>
            </View>
            <Text style={styles.featuredTitle}>{featuredActivity.name}</Text>
            <View style={styles.featuredMeta}>
              <Ionicons name="time-outline" size={14} color={Colors.textPrimary} />
              <Text style={styles.featuredMetaText}>{featuredActivity.duration} mnt</Text>
              <View style={styles.metaDivider} />
              <Ionicons name="flame" size={14} color={Colors.accentWarm} />
              <Text style={styles.featuredMetaText}>{featuredActivity.calories} kkal</Text>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* ── FILTER PILLS ── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersScroll}
          contentContainerStyle={styles.filtersContent}
        >
          {FILTERS.map((f) => {
            const isActive = activeFilter === f;
            return (
              <Pressable
                key={f}
                style={[styles.filterPill, isActive ? styles.filterPillActive : null]}
                onPress={() => setActiveFilter(f)}
              >
                <Text style={[styles.filterText, isActive ? styles.filterTextActive : null]}>
                  {f}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* ── TIPS LIST ── */}
        <View style={styles.section}>
          <SectionHeader title="Tips Kesehatan" />
          {filtered.map((tip, i) => (
            <TipCard key={tip.id} tip={tip} index={i} />
          ))}
          {filtered.length === 0 && (
            <View style={styles.empty}>
              <Ionicons name="document-text-outline" size={40} color={Colors.textMuted} />
              <Text style={styles.emptyText}>Belum ada tips untuk kategori ini.</Text>
            </View>
          )}
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bgPrimary },
  scroll: { flex: 1 },
  content: { paddingHorizontal: Spacing.base, paddingTop: Spacing.xl },

  featuredCard: {
    borderRadius: Radius.large,
    padding: Spacing.xl,
    gap: Spacing.sm,
  },
  featuredTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
  },
  featuredTagText: {
    ...Typography.tiny,
    color: Colors.textPrimary,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  featuredTitle: {
    ...Typography.headingLG,
    color: Colors.textPrimary,
  },
  featuredMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  featuredMetaText: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  metaDivider: {
    width: 1,
    height: 14,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },

  filtersScroll: { marginBottom: Spacing.base },
  filtersContent: { gap: Spacing.sm, paddingBottom: Spacing.sm },
  filterPill: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.pill,
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterPillActive: {
    backgroundColor: Colors.accentPrimary,
    borderColor: Colors.accentPrimary,
  },
  filterText: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  filterTextActive: { color: Colors.bgPrimary },

  section: { marginBottom: Spacing.base },

  tipCard: {
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.large,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadow.card,
  },
  tipLeftBorder: { width: 3 },
  tipContent: { flex: 1, padding: Spacing.base, gap: Spacing.sm },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    flexWrap: 'wrap',
  },
  catPill: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Radius.pill,
    borderWidth: 1,
  },
  catText: {
    ...Typography.tiny,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  tipTitle: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '700',
  },
  tipBody: {
    ...Typography.caption,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  tipMeta: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  metaChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    ...Typography.tiny,
    color: Colors.textMuted,
  },

  empty: {
    alignItems: 'center',
    paddingVertical: Spacing.xxxl,
    gap: Spacing.md,
  },
  emptyText: {
    ...Typography.body,
    color: Colors.textMuted,
  },
});
