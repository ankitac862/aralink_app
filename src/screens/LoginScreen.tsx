import React, { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { RootStackParamList } from '@navigation/AppNavigator';
import { PrimaryButton } from '@components/PrimaryButton';
import { AuthTabSwitch } from '@components/AuthTabSwitch';
import { useAuth } from '@contexts/AuthContext';

const LoginScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList, 'Login'>) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const actionDisabled = useMemo(() => !email || !password, [email, password]);

  const handleLogin = async () => {
    if (actionDisabled) return;
    setLoading(true);
    await login(email, password);
    setLoading(false);
    navigation.replace('Dashboard');
  };

  const SocialButton = ({ label, icon }: { label: string; icon: 'google' | 'apple' }) => (
    <Pressable style={styles.socialButton}>
      <FontAwesome name={icon} size={18} color="#111827" style={styles.socialIcon} />
      <Text style={styles.socialButtonLabel}>{label}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.select({ ios: 'padding', android: undefined })}
      >
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.iconWrapper}>
            <MaterialIcons name="home" size={48} color="#2563EB" />
          </View>
          <Text style={styles.heading}>Your Rental Home, Managed.</Text>
          <View style={styles.tabWrapper}>
            <AuthTabSwitch active="login" onChange={(tab) => tab === 'signup' && navigation.navigate('Signup')} />
          </View>
          <View style={styles.card}>
            <Text style={styles.cardHeading}>Welcome Back</Text>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Email or Phone</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email or phone"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#94A3B8"
              />
            </View>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordWrapper}>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  style={[styles.input, styles.passwordInput]}
                  secureTextEntry={!showPassword}
                  placeholderTextColor="#94A3B8"
                />
                <Pressable
                  style={styles.iconButton}
                  onPress={() => setShowPassword((prev) => !prev)}
                  hitSlop={8}
                >
                  <MaterialIcons
                    name={showPassword ? 'visibility-off' : 'visibility'}
                    size={22}
                    color="#94A3B8"
                  />
                </Pressable>
              </View>
            </View>
            <View style={styles.linkRow}>
              <Pressable>
                <Text style={styles.linkText}>Forgot Password?</Text>
              </Pressable>
              <Pressable>
                <Text style={styles.linkText}>Log in with OTP</Text>
              </Pressable>
            </View>
            <PrimaryButton
              label="Log In"
              onPress={handleLogin}
              loading={loading}
              disabled={actionDisabled}
            />
            <View style={styles.dividerRow}>
              <View style={styles.divider} />
              <Text style={styles.dividerLabel}>OR</Text>
              <View style={styles.divider} />
            </View>
            <View style={styles.socialWrapper}>
              <SocialButton label="Continue with Google" icon="google" />
              <SocialButton label="Continue with Apple" icon="apple" />
            </View>
          </View>
          <Text style={styles.legalText}>
            By continuing, you agree to our <Text style={styles.legalStrong}>Terms of Service</Text> and{' '}
            <Text style={styles.legalStrong}>Privacy Policy</Text>.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    padding: 20,
    paddingBottom: 32,
  },
  iconWrapper: {
    alignSelf: 'center',
    height: 56,
    width: 56,
    borderRadius: 16,
    backgroundColor: '#E0EAFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: '#0F172A',
    marginBottom: 18,
  },
  card: {
    backgroundColor: '#F5F6FA',
    borderRadius: 20,
    padding: 20,
    gap: 4,
  },
  tabWrapper: {
    marginBottom: 16,
  },
  cardHeading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 16,
  },
  fieldGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#0F172A',
  },
  passwordWrapper: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 48,
  },
  iconButton: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  linkText: {
    color: '#2563EB',
    fontWeight: '600',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerLabel: {
    marginHorizontal: 12,
    color: '#94A3B8',
    fontWeight: '600',
  },
  socialWrapper: {
    gap: 12,
  },
  socialButton: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialIcon: {
    marginRight: 10,
  },
  socialButtonLabel: {
    fontWeight: '600',
    color: '#0F172A',
  },
  legalText: {
    marginTop: 24,
    textAlign: 'center',
    color: '#64748B',
    fontSize: 12,
    lineHeight: 18,
  },
  legalStrong: {
    color: '#0F172A',
    fontWeight: '600',
  },
});

export default LoginScreen;
