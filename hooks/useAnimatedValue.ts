import { useEffect } from 'react';
import {
  useSharedValue,
  withSpring,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
} from 'react-native-reanimated';

export function useAnimatedValue(targetValue: number, delay = 0) {
  const animValue = useSharedValue(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      animValue.value = withSpring(targetValue, {
        damping: 18,
        stiffness: 90,
        mass: 1,
      });
    }, delay);
    return () => clearTimeout(timer);
  }, [targetValue, delay]);

  return animValue;
}

export function usePulseAnimation() {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.08, { duration: 900, easing: Easing.inOut(Easing.ease) }),
        withTiming(1.0, { duration: 900, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, []);

  return scale;
}

export function useShimmerAnimation() {
  const translateX = useSharedValue(-300);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(300, { duration: 1200, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  return translateX;
}
