import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { StatusPill } from './StatusPill';

type Props = {
  title: string;
  subtitle?: string;
  meta?: string;
  status?: { label: string; tone?: 'success' | 'warning' | 'danger' | 'info' };
  onPress?: () => void;
};

export const ListRow: React.FC<Props> = ({ title, subtitle, meta, status, onPress }) => {
  const content = (
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      {meta && <Text style={styles.meta}>{meta}</Text>}
      {status && <StatusPill label={status.label} tone={status.tone} />}
    </View>
  );

  if (onPress) {
    return (
      <Pressable style={({ pressed }) => [styles.pressable, pressed && styles.pressed]} onPress={onPress}>
        {content}
      </Pressable>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  row: {
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E4E7EC',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pressable: {
    borderRadius: 12,
  },
  pressed: {
    backgroundColor: '#EEF2FF',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
  subtitle: {
    color: '#6B7280',
  },
  meta: {
    fontWeight: '600',
    color: '#1A2980',
    marginHorizontal: 8,
  },
});
