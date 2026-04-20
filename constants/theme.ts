export const Colors = {
  // Backgrounds
  bgPrimary: '#0A0A0F',
  bgSecondary: '#12121A',
  bgCard: '#1A1A27',
  bgElevated: '#222235',

  // Accents
  accentPrimary: '#00F5C4',
  accentSecondary: '#7B61FF',
  accentTertiary: '#FF6B6B',
  accentWarm: '#FFB347',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#A0A0B8',
  textMuted: '#5A5A7A',

  // Semantic
  success: '#00D68F',
  warning: '#FFB347',
  danger: '#FF6B6B',

  // Borders
  border: 'rgba(255,255,255,0.08)',
  borderLight: 'rgba(255,255,255,0.06)',

  // Chart
  chartMuted: '#2A2A40',
};

export const Typography = {
  headingXL: { fontSize: 32, fontWeight: '700' as const },
  headingLG: { fontSize: 24, fontWeight: '700' as const },
  headingMD: { fontSize: 18, fontWeight: '600' as const },
  body: { fontSize: 14, fontWeight: '400' as const },
  caption: { fontSize: 12, fontWeight: '400' as const },
  tiny: { fontSize: 10, fontWeight: '400' as const },
};

export const Radius = {
  small: 8,
  medium: 16,
  large: 24,
  xl: 32,
  pill: 999,
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
};

export const Shadow = {
  card: {
    shadowColor: Colors.accentPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 16,
  },
};
