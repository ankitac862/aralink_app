import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  label: string;
  tone?: 'success' | 'warning' | 'danger' | 'info';
};

const palette = {
  success: '#22C55E',
  warning: '#FACC15',
  danger: '#EF4444',
  info: '#0EA5E9',
};

export const StatusPill: React.FC<Props> = ({ label, tone = 'info' }) => (
  <View style={[styles.pill, { backgroundColor: `${palette[tone]}22`, borderColor: palette[tone] }]}>
    <Text style={[styles.label, { color: palette[tone] }]}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});
