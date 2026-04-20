import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Defs, LinearGradient as SvgGradient, Stop, Circle as SvgCircle } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedProps, withTiming, Easing } from 'react-native-reanimated';
import { Colors, Radius, Spacing, Typography } from '../../constants/theme';
import type { WeeklyStep } from '../../types';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const W = 320;
const H = 120;
const PAD = 16;

function buildPath(data: WeeklyStep[], progress: number): string {
  const maxSteps = Math.max(...data.map((d) => d.steps));
  const stepX = (W - PAD * 2) / (data.length - 1);

  const points = data.map((d, i) => ({
    x: PAD + i * stepX,
    y: H - PAD - ((d.steps / maxSteps) * (H - PAD * 2)) * progress,
  }));

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const cp1x = (points[i - 1].x + points[i].x) / 2;
    d += ` C ${cp1x} ${points[i - 1].y}, ${cp1x} ${points[i].y}, ${points[i].x} ${points[i].y}`;
  }
  return d;
}

interface ActivityGraphProps {
  data: WeeklyStep[];
}

export function ActivityGraph({ data }: ActivityGraphProps) {
  const maxSteps = Math.max(...data.map((d) => d.steps));
  const stepX = (W - PAD * 2) / (data.length - 1);

  const points = data.map((d, i) => ({
    x: PAD + i * stepX,
    y: H - PAD - (d.steps / maxSteps) * (H - PAD * 2),
  }));

  const linePath = (() => {
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const cp1x = (points[i - 1].x + points[i].x) / 2;
      d += ` C ${cp1x} ${points[i - 1].y}, ${cp1x} ${points[i].y}, ${points[i].x} ${points[i].y}`;
    }
    return d;
  })();

  const fillPath = `${linePath} L ${points[points.length - 1].x} ${H} L ${points[0].x} ${H} Z`;

  // peak index
  const peakIdx = data.reduce((best, d, i) => (d.steps > data[best].steps ? i : best), 0);
  const peakPt = points[peakIdx];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Grafik Aktivitas</Text>
        <View style={styles.callout}>
          <Text style={styles.calloutText}>PUNCAK {data[peakIdx].steps.toLocaleString()} langkah</Text>
        </View>
      </View>
      <Svg width={W} height={H}>
        <Defs>
          <SvgGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor={Colors.accentPrimary} stopOpacity={0.4} />
            <Stop offset="100%" stopColor={Colors.accentPrimary} stopOpacity={0.0} />
          </SvgGradient>
        </Defs>
        {/* Fill */}
        <Path d={fillPath} fill="url(#lineGrad)" />
        {/* Line */}
        <Path
          d={linePath}
          stroke={Colors.accentPrimary}
          strokeWidth={2.5}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Peak dot */}
        <SvgCircle cx={peakPt.x} cy={peakPt.y} r={5} fill={Colors.accentPrimary} />
        <SvgCircle cx={peakPt.x} cy={peakPt.y} r={9} fill={Colors.accentPrimary} fillOpacity={0.25} />
      </Svg>

      {/* X labels */}
      <View style={styles.xLabels}>
        {data.map((d, i) => (
          <Text key={d.day} style={[styles.xLabel, i === peakIdx ? { color: Colors.accentPrimary } : null]}>
            {d.day}
          </Text>
        ))}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  title: {
    ...Typography.body,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  callout: {
    backgroundColor: Colors.accentPrimary + '22',
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
  },
  calloutText: {
    ...Typography.tiny,
    color: Colors.accentPrimary,
    fontWeight: '700',
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
