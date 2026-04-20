import { useMemo } from 'react';
import type { TodayStats } from '../types';

export function useHealthScore(stats: TodayStats): {
  score: number;
  label: string;
  color: string;
} {
  return useMemo(() => {
    const stepsScore = Math.min((stats.steps / stats.targetSteps) * 25, 25);
    const waterScore = Math.min((stats.waterLiters / stats.targetWater) * 25, 25);
    const sleepScore = Math.min((stats.sleepHours / stats.targetSleep) * 25, 25);
    const moodScore = 25; // placeholder

    const total = Math.round(stepsScore + waterScore + sleepScore + moodScore);

    let label = 'Perlu Perhatian';
    let color = '#FF6B6B';

    if (total >= 90) {
      label = 'Luar Biasa';
      color = '#00F5C4';
    } else if (total >= 75) {
      label = 'Sangat Baik';
      color = '#00F5C4';
    } else if (total >= 60) {
      label = 'Cukup Baik';
      color = '#FFB347';
    } else if (total >= 40) {
      label = 'Sedang';
      color = '#FFB347';
    }

    return { score: total, label, color };
  }, [stats]);
}
