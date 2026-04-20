import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, Radius, Shadow } from '../../constants/theme';
import { MoodSelector } from '../../components/mood/MoodSelector';
import { MoodTrendChart } from '../../components/mood/MoodTrendChart';
import { MoodLogCard } from '../../components/mood/MoodLogCard';
import { Button } from '../../components/ui/Button';
import { SkeletonLoader } from '../../components/ui/SkeletonLoader';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { moodHistory, relaxationTips } from '../../data/dummyData';

export default function SuasanaScreen() {
  const [isLoading] = useState(false);
  const [selectedMood, setSelectedMood] = useState<string | null>('tenang');
  const [note, setNote] = useState('');

  if (isLoading) return <SkeletonLoader />;

  function handleSave() {
    if (!selectedMood) return;
    // In a real app, persist here
    console.log('Saved mood:', selectedMood, note);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ── HERO ── */}
          <Animated.View entering={FadeInDown.duration(400).springify()} style={styles.hero}>
            <Text style={styles.heroTitle}>Bagaimana perasaanmu?</Text>
            <Text style={styles.heroSub}>Ungkapkan suasana hatimu hari ini.</Text>
          </Animated.View>

          {/* ── MOOD SELECTOR ── */}
          <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.section}>
            <MoodSelector selected={selectedMood} onSelect={setSelectedMood} />
          </Animated.View>

          {/* ── CATATAN ── */}
          <Animated.View entering={FadeInDown.delay(180).springify()} style={styles.noteCard}>
            <Text style={styles.noteLabel}>CATATAN HARI INI</Text>
            <TextInput
              style={styles.noteInput}
              multiline
              numberOfLines={4}
              placeholder="Apa yang membuatmu merasa begini...?"
              placeholderTextColor={Colors.textMuted}
              value={note}
              onChangeText={setNote}
              textAlignVertical="top"
            />
            <Button
              label="Simpan"
              onPress={handleSave}
              fullWidth
              style={{ marginTop: Spacing.base }}
              disabled={!selectedMood}
            />
          </Animated.View>

          {/* ── TREN MINGGUAN ── */}
          <Animated.View entering={FadeInDown.delay(240).springify()} style={styles.section}>
            <SectionHeader title="Tren Mingguan" />
            <MoodTrendChart data={moodHistory} />
          </Animated.View>

          {/* ── LOG HISTORY ── */}
          <Animated.View entering={FadeInDown.delay(300).springify()} style={styles.section}>
            <SectionHeader title="Riwayat Mood" />
            {moodHistory
              .slice()
              .reverse()
              .map((entry, i) => (
                <MoodLogCard key={entry.date} entry={entry} index={i} />
              ))}
          </Animated.View>

          {/* ── SARAN RELAKSASI ── */}
          <Animated.View entering={FadeInDown.delay(360).springify()} style={styles.section}>
            <SectionHeader title="Saran Relaksasi" />
            <View style={styles.relaxCard}>
              {relaxationTips.map((tip) => (
                <View key={tip.id} style={styles.relaxRow}>
                  <View style={styles.relaxIcon}>
                    <Ionicons
                      name={tip.icon as any}
                      size={20}
                      color={Colors.accentSecondary}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.relaxLabel}>{tip.label}</Text>
                    <Text style={styles.relaxDesc}>{tip.description}</Text>
                  </View>
                </View>
              ))}
            </View>
          </Animated.View>

          <View style={{ height: 32 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bgPrimary },
  scroll: { flex: 1 },
  content: { paddingHorizontal: Spacing.base, paddingTop: Spacing.xl },

  hero: {
    marginBottom: Spacing.xl,
  },
  heroTitle: {
    ...Typography.headingLG,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  heroSub: {
    ...Typography.body,
    color: Colors.textSecondary,
  },

  section: { marginBottom: Spacing.base },

  noteCard: {
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.large,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.base,
    ...Shadow.card,
  },
  noteLabel: {
    ...Typography.tiny,
    color: Colors.textMuted,
    fontWeight: '700',
    letterSpacing: 0.6,
    marginBottom: Spacing.sm,
  },
  noteInput: {
    backgroundColor: Colors.bgElevated,
    borderRadius: Radius.medium,
    padding: Spacing.md,
    color: Colors.textPrimary,
    ...Typography.body,
    minHeight: 100,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  relaxCard: {
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.large,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.base,
    ...Shadow.card,
  },
  relaxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
  },
  relaxIcon: {
    width: 40,
    height: 40,
    borderRadius: Radius.medium,
    backgroundColor: Colors.accentSecondary + '18',
    alignItems: 'center',
    justifyContent: 'center',
  },
  relaxLabel: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
    marginBottom: 2,
  },
  relaxDesc: {
    ...Typography.caption,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
});
