import type {
  User,
  TodayStats,
  WeeklyStep,
  MoodEntry,
  SmartRecommendation,
  Badge,
  HealthTip,
  ActivityLog,
  Activity,
} from '../types';

export const currentUser: User = {
  id: 'user_01',
  name: 'Injil Zhena',
  avatar: 'https://i.pravatar.cc/150?img=47',
  level: 42,
  title: 'Elite Athlete',
  totalPoints: 24580,
  streakDays: 12,
  targetLevel: 43,
  levelProgress: 0.85,
};

export const todayStats: TodayStats = {
  healthScore: 84,
  maxScore: 100,
  steps: 8432,
  targetSteps: 10000,
  waterLiters: 1.8,
  targetWater: 2.5,
  sleepHours: 5.75,
  targetSleep: 8,
  sleepQuality: 'Sangat Baik',
  mood: 'Tenang',
  caloriesBurned: 2450,
  activeMinutes: 42,
};

export const weeklySteps: WeeklyStep[] = [
  { day: 'Sen', steps: 6200 },
  { day: 'Sel', steps: 8100 },
  { day: 'Rab', steps: 7500 },
  { day: 'Kam', steps: 9200 },
  { day: 'Jum', steps: 8432 },
  { day: 'Sab', steps: 3200 },
  { day: 'Min', steps: 5100 },
];

export const moodHistory: MoodEntry[] = [
  { date: '2026-04-14', mood: 'senang', score: 5, note: '' },
  { date: '2026-04-15', mood: 'biasa', score: 3, note: 'Hari yang biasa saja' },
  { date: '2026-04-16', mood: 'sedih', score: 1, note: 'Tugas menumpuk' },
  { date: '2026-04-17', mood: 'senang', score: 5, note: 'Olahraga pagi terasa menyegarkan' },
  { date: '2026-04-18', mood: 'tenang', score: 4, note: '' },
  { date: '2026-04-19', mood: 'biasa', score: 3, note: '' },
  { date: '2026-04-20', mood: 'tenang', score: 4, note: 'Merasa lebih fokus hari ini' },
];

export const smartRecommendations: SmartRecommendation[] = [
  {
    id: 'rec_01',
    type: 'water',
    icon: 'water',
    title: 'Tingkatkan Asupan Air',
    description:
      'Berdasarkan cuaca panas hari ini dan aktivitas paginya, minumlah 500ml air dalam 30 menit ke depan untuk metabolisme optimal.',
    priority: 'high',
    tag: 'REKOMENDASI UTAMA',
  },
  {
    id: 'rec_02',
    type: 'sleep',
    icon: 'moon',
    title: 'Waktu Tidur',
    description: 'Target: 22:00 WIB',
    priority: 'medium',
    tag: null,
  },
  {
    id: 'rec_03',
    type: 'activity',
    icon: 'walk',
    title: 'Target Langkah',
    description: '8,432 dari 10.000 hari ini',
    priority: 'medium',
    tag: null,
  },
  {
    id: 'rec_04',
    type: 'nutrition',
    icon: 'nutrition',
    title: 'Camilan Tinggi Protein',
    description:
      'Coba segenggam kacang almond atau yogurt Yunani untuk menjaga energi tetap stabil hingga makan malam.',
    priority: 'low',
    tag: null,
  },
  {
    id: 'rec_05',
    type: 'mental',
    icon: 'brain',
    title: 'Micro-Meditation',
    description:
      'Stres terdeteksi sedikit meningkat. Lakukan teknik pernapasan 4-7-8 selama 2 menit sekarang.',
    priority: 'high',
    tag: null,
  },
];

export const badges: Badge[] = [
  { id: 'b01', name: 'Pejalan Pagi', icon: 'footsteps', unlocked: true, color: '#FF6B6B' },
  { id: 'b02', name: 'Zen Master', icon: 'leaf', unlocked: true, color: '#7B61FF' },
  { id: 'b03', name: 'Marathon', icon: 'trophy', unlocked: false, color: '#5A5A7A' },
  { id: 'b04', name: 'Mood Ace', icon: 'happy', unlocked: false, color: '#5A5A7A' },
  { id: 'b05', name: 'Hydrated', icon: 'water', unlocked: true, color: '#00F5C4' },
  { id: 'b06', name: 'Deep Sleep', icon: 'moon', unlocked: false, color: '#5A5A7A' },
];

export const dailyTips: HealthTip[] = [
  {
    id: 't01',
    category: 'Fisik',
    title: 'HIIT Cardio Intensif',
    duration: '45 menit',
    calories: 320,
    tag: 'AKTIVITAS TERBAIK',
  },
  {
    id: 't02',
    category: 'Mental',
    title: 'Teknik Pernapasan Box',
    content:
      'Hirup 4 detik, tahan 4 detik, hembuskan 4 detik. Ulangi 4x untuk meredakan stres instan.',
  },
  {
    id: 't03',
    category: 'Nutrisi',
    title: 'Sarapan Power Bowl',
    content:
      'Kombinasi oat, buah beri, dan kacang-kacangan memberi energi stabil hingga 5 jam.',
  },
  {
    id: 't04',
    category: 'Tidur',
    title: 'Rutinitas Tidur Optimal',
    content: 'Hindari layar 1 jam sebelum tidur. Buat suhu kamar 18–22°C untuk tidur berkualitas.',
  },
  {
    id: 't05',
    category: 'Nutrisi',
    title: 'Hidrasi Pagi Hari',
    content: 'Minum 2 gelas air segera setelah bangun tidur untuk reaktivasi metabolisme.',
  },
];

export const activityLogs: ActivityLog[] = [
  {
    id: 'al_01',
    type: 'running',
    name: 'Lari Pagi',
    duration: 35,
    calories: 280,
    timestamp: '2026-04-20T06:30:00',
    icon: 'walk',
  },
  {
    id: 'al_02',
    type: 'cycling',
    name: 'Bersepeda',
    duration: 20,
    calories: 150,
    timestamp: '2026-04-20T08:00:00',
    icon: 'bicycle',
  },
  {
    id: 'al_03',
    type: 'gym',
    name: 'Gym — Upper Body',
    duration: 45,
    calories: 320,
    timestamp: '2026-04-19T17:00:00',
    icon: 'barbell',
  },
];

export const featuredActivity: Activity = {
  id: 'act_01',
  name: 'HIIT Cardio Intensif',
  duration: 45,
  calories: 320,
  category: 'Fisik',
};

export const relaxationTips = [
  {
    id: 'rel_01',
    icon: 'body',
    label: 'Relaksasi',
    description: 'Yoga 10 menit sebelum tidur memperbaiki kualitas istirahat.',
  },
  {
    id: 'rel_02',
    icon: 'cafe',
    label: 'Nutrisi & Mood',
    description: 'Coklat gelap mengandung serotonin alami untuk mood lebih baik.',
  },
  {
    id: 'rel_03',
    icon: 'bulb',
    label: 'Tips Ergonomis',
    description: 'Setiap 45 menit kerja, istirahat 5 menit untuk jaga postur tubuh.',
  },
];
