import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

interface Props {
  title: string;
  subtitle?: string;
  onPress: () => void;
}

export const TileButton: React.FC<Props> = ({ title, subtitle, onPress }) => (
  <Pressable style={({ pressed }) => [styles.container, pressed && styles.pressed]} onPress={onPress}>
    <Text style={styles.title}>{title}</Text>
    {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF2FF',
    padding: 16,
    borderRadius: 16,
    margin: 8,
  },
  pressed: {
    opacity: 0.7,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A2980',
  },
  subtitle: {
    marginTop: 6,
    color: '#4F46E5',
  },
});
