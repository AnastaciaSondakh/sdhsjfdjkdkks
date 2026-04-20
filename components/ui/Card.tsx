import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Radius, Shadow, Spacing } from '../../constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  noPadding?: boolean;
  glowAccent?: string;
}

export function Card({ children, style, noPadding, glowAccent }: CardProps) {
  return (
    <View
      style={[
        styles.card,
        noPadding ? { padding: 0 } : null,
        glowAccent
          ? {
              shadowColor: glowAccent,
              shadowOpacity: 0.2,
              shadowRadius: 14,
              elevation: 10,
            }
          : null,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.large,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadow.card,
  },
});
