import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import type { ReactNode } from 'react';

const colors = ['#1A2980', '#26D0CE'];

export const AppGradient = ({ children }: { children: ReactNode }) => (
  <LinearGradient colors={colors} style={styles.gradient}>
    {children}
  </LinearGradient>
);

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    padding: 24,
  },
});
