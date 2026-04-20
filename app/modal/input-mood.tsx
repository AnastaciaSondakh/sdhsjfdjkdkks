import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Colors, Spacing, Typography, Radius } from '../../constants/theme';
import { MoodSelector } from '../../components/mood/MoodSelector';
import { Button } from '../../components/ui/Button';

export default function InputMoodModal() {
  const router = useRouter();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [note, setNote] = useState('');

  async function handleSave() {
    if (!selectedMood) return;
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    console.log('Saved mood:', { selectedMood, note });
    router.back();
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <Animated.View entering={FadeInDown.duration(300)} style={styles.header}>
            <View>
              <Text style={styles.caption}>LOG MOOD</Text>
              <Text style={styles.title}>Bagaimana perasaanmu?</Text>
            </View>
            <Pressable style={styles.closeBtn} onPress={() => router.back()}>
              <Ionicons name="close" size={20} color={Colors.textSecondary} />
            </Pressable>
          </Animated.View>

          {/* Mood Selector */}
          <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.section}>
            <Text style={styles.sectionLabel}>Pilih Suasana Hati</Text>
            <MoodSelector selected={selectedMood} onSelect={setSelectedMood} />
          </Animated.View>

          {/* Note */}
          <Animated.View entering={FadeInDown.delay(180).springify()} style={styles.section}>
            <Text style={styles.sectionLabel}>Ceritakan sedikit (opsional)</Text>
            <TextInput
              style={styles.noteInput}
              multiline
              numberOfLines={5}
              placeholder="Apa yang membuatmu merasa begini...?"
              placeholderTextColor={Colors.textMuted}
              value={note}
              onChangeText={setNote}
              textAlignVertical="top"
            />
          </Animated.View>

          {/* Save */}
          <Animated.View entering={FadeInUp.delay(260).springify()}>
            <Button
              label="Simpan Mood"
              onPress={handleSave}
              fullWidth
              disabled={!selectedMood}
            />
          </Animated.View>

          <View style={{ height: 32 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bgSecondary },
  content: { paddingHorizontal: Spacing.base, paddingTop: Spacing.xl },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.xl,
  },
  caption: {
    ...Typography.tiny,
    color: Colors.textMuted,
    letterSpacing: 1,
    fontWeight: '700',
    marginBottom: 4,
  },
  title: {
    ...Typography.headingLG,
    color: Colors.textPrimary,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.bgCard,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },

  section: { marginBottom: Spacing.xl },
  sectionLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontWeight: '600',
    marginBottom: Spacing.base,
  },
  noteInput: {
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.large,
    padding: Spacing.md,
    color: Colors.textPrimary,
    ...Typography.body,
    minHeight: 120,
    borderWidth: 1,
    borderColor: Colors.border,
  },
});
