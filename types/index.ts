export interface User {
  id: string;
  name: string;
  avatar: string;
  level: number;
  title: string;
  totalPoints: number;
  streakDays: number;
  targetLevel: number;
  levelProgress: number;
}

export interface TodayStats {
  healthScore: number;
  maxScore: number;
  steps: number;
  targetSteps: number;
  waterLiters: number;
  targetWater: number;
  sleepHours: number;
  targetSleep: number;
  sleepQuality: string;
  mood: string;
  caloriesBurned: number;
  activeMinutes: number;
}

export interface WeeklyStep {
  day: string;
  steps: number;
}

export interface MoodEntry {
  date: string;
  mood: 'senang' | 'biasa' | 'sedih' | 'tenang';
  score: 1 | 2 | 3 | 4 | 5;
  note: string;
}

export interface SmartRecommendation {
  id: string;
  type: string;
  icon: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  tag: string | null;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  unlocked: boolean;
  color: string;
}

export interface HealthTip {
  id: string;
  category: string;
  title: string;
  content?: string;
  duration?: string;
  calories?: number;
  tag?: string;
}

export interface ActivityLog {
  id: string;
  type: string;
  name: string;
  duration: number;
  calories: number;
  timestamp: string;
  icon: string;
}

export interface Activity {
  id: string;
  name: string;
  duration: number;
  calories: number;
  category: string;
}
