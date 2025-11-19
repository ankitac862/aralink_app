import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  title: string;
  subtitle?: string;
  value?: string;
  children?: React.ReactNode;
}

export const InfoCard: React.FC<Props> = ({ title, subtitle, value, children }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{title}</Text>
    {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    {value && <Text style={styles.value}>{value}</Text>}
    {children}
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
  subtitle: {
    marginTop: 4,
    color: '#555',
  },
  value: {
    marginTop: 8,
    fontSize: 24,
    fontWeight: '700',
    color: '#1A2980',
  },
});
