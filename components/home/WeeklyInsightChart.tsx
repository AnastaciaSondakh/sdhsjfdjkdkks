import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Rect, Text as SvgText } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withDelay,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Colors, Radius, Spacing, Typography } from '../../constants/theme';
import { SectionHeader } from '../ui/SectionHeader';
import type { WeeklyStep } from '../../types';

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const CHART_W = 320;
const CHART_H = 140;
const BAR_GAP = 8;

interface WeeklyInsightChartProps {
  data: WeeklyStep[];
  todayIndex?: number;
}

function AnimatedBar({
  x,
  width,
  maxH,
  value,
  maxValue,
  color,
  delay,
}: {
  x: number;
  width: number;
  maxH: number;
  value: number;
  maxValue: number;
  color: string;
  delay: number;
}) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      delay,
      withTiming(value / maxValue, { duration: 600, easing: Easing.out(Easing.cubic) })
    );
  }, [value, maxValue, delay]);

  const animProps = useAnimatedProps(() => {
    const h = progress.value * maxH;
    return {
      y: CHART_H - h,
      height: h,
    };
  });

  return (
    <AnimatedRect
      x={x}
      width={width}
      rx={4}
      fill={color}
      animatedProps={animProps}
    />
  );
}

export function WeeklyInsightChart({ data, todayIndex = 4 }: WeeklyInsightChartProps) {
  const maxSteps = Math.max(...data.map((d) => d.steps), 1);
  const totalWidth = CHART_W;
  const barWidth = (totalWidth - BAR_GAP * (data.length - 1)) / data.length;

  return (
    <View style={styles.container}>
      <SectionHeader title="Wawasan Mingguan" />
      <View style={styles.chartBox}>
        <Svg width={totalWidth} height={CHART_H + 24}>
          {data.map((item, i) => {
            const x = i * (barWidth + BAR_GAP);
            const isToday = i === todayIndex;
            return (
              <React.Fragment key={item.day}>
                <AnimatedBar
                  x={x}
                  width={barWidth}
                  maxH={CHART_H}
                  value={item.steps}
                  maxValue={maxSteps}
                  color={isToday ? Colors.accentPrimary : Colors.chartMuted}
                  delay={i * 60}
                />
                <SvgText
                  x={x + barWidth / 2}
                  y={CHART_H + 18}
                  fontSize={10}
                  fill={isToday ? Colors.accentPrimary : Colors.textMuted}
                  textAnchor="middle"
                  fontWeight={isToday ? '700' : '400'}
                >
                  {item.day}
                </SvgText>
              </React.Fragment>
            );
          })}
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.xl,
  },
  chartBox: {
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.large,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
});
