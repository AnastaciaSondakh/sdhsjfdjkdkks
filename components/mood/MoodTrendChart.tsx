import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Defs, LinearGradient as SvgGradient, Stop, Circle as SvgCircle } from 'react-native-svg';
import { Colors, Radius, Spacing, Typography } from '../../constants/theme';
import type { MoodEntry } from '../../types';

const W = 300;
const H = 100;
const PAD = 16;

interface MoodTrendChartProps {
  data: MoodEntry[];
}

export function MoodTrendChart({ data }: MoodTrendChartProps) {
  if (!data.length) return null;

  const stepX = (W - PAD * 2) / Math.max(data.length - 1, 1);
  const maxScore = 5;

  const points = data.map((d, i) => ({
    x: PAD + i * stepX,
    y: H - PAD - ((d.score - 1) / (maxScore - 1)) * (H - PAD * 2),
    score: d.score,
    date: d.date,
  }));

  let linePath = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const cp1x = (points[i - 1].x + points[i].x) / 2;
    linePath += ` C ${cp1x} ${points[i - 1].y}, ${cp1x} ${points[i].y}, ${points[i].x} ${points[i].y}`;
  }
  const fillPath = `${linePath} L ${points[points.length - 1].x} ${H} L ${points[0].x} ${H} Z`;

  const days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tren Mingguan</Text>
      <Svg width={W} height={H}>
        <Defs>
          <SvgGradient id="moodGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor={Colors.accentSecondary} stopOpacity={0.45} />
            <Stop offset="100%" stopColor={Colors.accentSecondary} stopOpacity={0.0} />
          </SvgGradient>
        </Defs>
        <Path d={fillPath} fill="url(#moodGrad)" />
        <Path
          d={linePath}
          stroke={Colors.accentSecondary}
          strokeWidth={2.5}
          fill="none"
          strokeLinecap="round"
        />
        {points.map((p, i) => (
          <SvgCircle key={i} cx={p.x} cy={p.y} r={4} fill={Colors.accentSecondary} />
        ))}
      </Svg>
      <View style={styles.xLabels}>
        {data.map((d, i) => {
          const dayIdx = new Date(d.date).getDay();
          return (
            <Text key={i} style={styles.xLabel}>
              {days[(dayIdx + 6) % 7]}
            </Text>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.large,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  title: {
    ...Typography.body,
    color: Colors.textSecondary,
    fontWeight: '600',
    marginBottom: Spacing.sm,
  },
  xLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: PAD,
    marginTop: 4,
  },
  xLabel: {
    ...Typography.tiny,
    color: Colors.textMuted,
  },
});
