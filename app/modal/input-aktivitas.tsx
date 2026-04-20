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
import { Colors, Spacing, Typography, Radius, Shadow } from '../../constants/theme';
import { Button } from '../../components/ui/Button';

const ACTIVITY_TYPES = [
  { key: 'running', label: 'Lari', icon: 'walk' },
  { key: 'cycling', label: 'Sepeda', icon: 'bicycle' },
  { key: 'gym', label: 'Gym', icon: 'barbell' },
  { key: 'swimming', label: 'Renang', icon: 'water' },
  { key: 'yoga', label: 'Yoga', icon: 'body' },
  { key: 'other', label: 'Lainnya', icon: 'fitness' },
];

export default function InputAktivitasModal() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [duration, setDuration] = useState('');
  const [calories, setCalories] = useState('');
  const [note, setNote] = useState('');

  async function handleSave() {
    if (!selectedType || !duration) return;
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    console.log('Log activity:', { selectedType, duration, calories, note });
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
              <Text style={styles.caption}>LOG AKTIVITAS</Text>
              <Text style={styles.title}>Catat Aktivitasmu</Text>
            </View>
            <Pressable style={styles.closeBtn} onPress={() => router.back()}>
              <Ionicons name="close" size={20} color={Colors.textSecondary} />
            </Pressable>
          </Animated.View>

          {/* Type Selector */}
          <Animated.View entering={FadeInDown.delay(80).springify()} style={styles.section}>
            <Text style={styles.sectionLabel}>Jenis Aktivitas</Text>
            <View style={styles.typeGrid}>
              {ACTIVITY_TYPES.map((type) => {
                const isActive = selectedType === type.key;
                return (
                  <Pressable
                    key={type.key}
                    style={[styles.typeBtn, isActive ? styles.typeBtnActive : null]}
                    onPress={async () => {
                      setSelectedType(type.key);
                      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    }}
                  >
                    <Ionicons
                      name={type.icon as any}
                      size={22}
                      color={isActive ? Colors.bgPrimary : Colors.textMuted}
                    />
                    <Text style={[styles.typeLabel, isActive ? styles.typeLabelActive : null]}>
                      {type.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </Animated.View>

          {/* Duration */}
          <Animated.View entering={FadeInDown.delay(140).springify()} style={styles.section}>
            <Text style={styles.sectionLabel}>Durasi (menit)</Text>
            <TextInput
              style={styles.input}
              placeholder="Contoh: 30"
              placeholderTextColor={Colors.textMuted}
              value={duration}
              onChangeText={setDuration}
              keyboardType="numeric"
            />
          </Animated.View>

          {/* Calories */}
          <Animated.View entering={FadeInDown.delay(200).springify()} style={styles.section}>
            <Text style={styles.sectionLabel}>Kalori Terbakar (opsional)</Text>
            <TextInput
              style={styles.input}
              placeholder="Contoh: 250"
              placeholderTextColor={Colors.textMuted}
              value={calories}
              onChangeText={setCalories}
              keyboardType="numeric"
            />
          </Animated.View>

          {/* Note */}
          <Animated.View entering={FadeInDown.delay(260).springify()} style={styles.section}>
            <Text style={styles.sectionLabel}>Catatan (opsional)</Text>
            <TextInput
              style={[styles.input, { minHeight: 80 }]}
              placeholder="Tambahkan catatan..."
              placeholderTextColor={Colors.textMuted}
              value={note}
              onChangeText={setNote}
              multiline
              textAlignVertical="top"
            />
          </Animated.View>

          {/* Save Button */}
          <Animated.View entering={FadeInUp.delay(300).springify()}>
            <Button
              label="Simpan Aktivitas"
              onPress={handleSave}
              fullWidth
              disabled={!selectedType || !duration}
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

  section: { marginBottom: Spacing.base },
  sectionLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontWeight: '600',
    marginBottom: Spacing.sm,
  },

  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  typeBtn: {
    width: '30%',
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.large,
    padding: Spacing.md,
    alignItems: 'center',
    gap: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  typeBtnActive: {
    backgroundColor: Colors.accentPrimary,
    borderColor: Colors.accentPrimary,
  },
  typeLabel: {
    ...Typography.tiny,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  typeLabelActive: { color: Colors.bgPrimary },

  input: {
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.medium,
    padding: Spacing.md,
    color: Colors.textPrimary,
    ...Typography.body,
    borderWidth: 1,
    borderColor: Colors.border,
  },
});
