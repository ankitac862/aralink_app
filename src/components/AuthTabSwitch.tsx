import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type AuthTab = 'login' | 'signup';

interface Props {
  active: AuthTab;
  onChange: (tab: AuthTab) => void;
}

export const AuthTabSwitch = ({ active, onChange }: Props) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.tab, active === 'login' && styles.tabActive]}
        onPress={() => onChange('login')}
        accessibilityRole="button"
        accessibilityState={{ selected: active === 'login' }}
      >
        <Text style={[styles.label, active === 'login' ? styles.labelActive : styles.labelInactive]}>Log In</Text>
      </Pressable>
      <Pressable
        style={[styles.tab, active === 'signup' && styles.tabActive]}
        onPress={() => onChange('signup')}
        accessibilityRole="button"
        accessibilityState={{ selected: active === 'signup' }}
      >
        <Text style={[styles.label, active === 'signup' ? styles.labelActive : styles.labelInactive]}>Sign Up</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    padding: 4,
    borderRadius: 16,
    gap: 4,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 12,
  },
  tabActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  label: {
    fontWeight: '700',
    fontSize: 15,
  },
  labelActive: {
    color: '#2563EB',
  },
  labelInactive: {
    color: '#6B7280',
  },
});

export default AuthTabSwitch;
