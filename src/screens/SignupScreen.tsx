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
import { MaterialIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/AppNavigator';
import { PrimaryButton } from '@components/PrimaryButton';
import { AuthTabSwitch } from '@components/AuthTabSwitch';
import { useAuth } from '@contexts/AuthContext';
import { UserRole } from '@types';

type MaterialIconName = React.ComponentProps<typeof MaterialIcons>['name'];

const roles: Array<{ label: string; value: UserRole; icon: MaterialIconName }> = [
  { label: 'Landlord', value: UserRole.LANDLORD, icon: 'home-work' },
  { label: 'Property Manager', value: UserRole.MANAGER, icon: 'apartment' },
  { label: 'Tenant', value: UserRole.TENANT, icon: 'person' },
];

const SignupScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList, 'Signup'>) => {
  const { signup } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('new@user.com');
  const [password, setPassword] = useState('password');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<UserRole>(UserRole.LANDLORD);
  const [loading, setLoading] = useState(false);

  const actionDisabled = useMemo(() => !fullName || !email || !password, [fullName, email, password]);

  const handleSignup = async () => {
    if (actionDisabled) return;
    setLoading(true);
    await signup({ email, password, role });
    setLoading(false);
    navigation.replace('Dashboard');
  };

  const SocialButton = ({ label }: { label: string }) => (
    <Pressable style={styles.socialButton}>
      <Text style={styles.socialLabel}>{label}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.select({ ios: 'padding', android: undefined })}
      >
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.logoWrapper}>
            <MaterialIcons name="home" size={32} color="#FFFFFF" />
          </View>
          <View style={styles.tabWrapper}>
            <AuthTabSwitch active="signup" onChange={(tab) => tab === 'login' && navigation.navigate('Login')} />
          </View>
          <Text style={styles.heading}>Create Your Account</Text>
          <Text style={styles.subheading}>Join our community of landlords and tenants.</Text>
          <View style={styles.socialRow}>
            <SocialButton label="Google" />
            <SocialButton label="Apple" />
          </View>
          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.dividerLabel}>OR</Text>
            <View style={styles.divider} />
          </View>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              placeholder="Enter your full name"
              value={fullName}
              onChangeText={setFullName}
              style={styles.input}
              placeholderTextColor="#94A3B8"
            />
          </View>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              placeholder="Enter your email address"
              value={email}
              onChangeText={setEmail}
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
                placeholder="Create a strong password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                style={[styles.input, styles.passwordInput]}
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
          <Text style={[styles.label, styles.roleLabel]}>I am a...</Text>
          <View style={styles.rolesWrapper}>
            {roles.map((option) => {
              const selected = option.value === role;
              return (
                <Pressable
                  key={option.value}
                  style={[styles.roleCard, selected && styles.roleCardActive]}
                  onPress={() => setRole(option.value)}
                >
                  <MaterialIcons
                    name={option.icon}
                    size={20}
                    color={selected ? '#2A64F5' : '#475569'}
                    style={styles.roleIcon}
                  />
                  <Text style={[styles.roleText, selected && styles.roleTextActive]}>{option.label}</Text>
                </Pressable>
              );
            })}
          </View>
          <PrimaryButton
            label="Sign Up"
            onPress={handleSignup}
            loading={loading}
            disabled={actionDisabled}
          />
          <Text style={styles.legalText}>
            By creating an account, you agree to our <Text style={styles.linkStrong}>Terms of Service</Text> and{' '}
            <Text style={styles.linkStrong}>Privacy Policy</Text>.
          </Text>
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text style={styles.footerLink}>
              Already have an account? <Text style={styles.linkStrong}>Log In</Text>
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
  container: {
    padding: 24,
    paddingBottom: 48,
  },
  logoWrapper: {
    alignSelf: 'center',
    height: 56,
    width: 56,
    borderRadius: 16,
    backgroundColor: '#2A64F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  tabWrapper: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
  },
  subheading: {
    textAlign: 'center',
    color: '#6B7280',
    marginTop: 8,
    marginBottom: 24,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CBD5F5',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  socialLabel: {
    fontWeight: '600',
    color: '#0F172A',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#D1D5DB',
  },
  dividerLabel: {
    marginHorizontal: 12,
    color: '#94A3B8',
    fontWeight: '600',
  },
  fieldGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#0F172A',
    backgroundColor: '#FFFFFF',
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
  roleLabel: {
    marginTop: 8,
    marginBottom: 12,
  },
  rolesWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  roleCard: {
    flexBasis: '48%',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  roleCardActive: {
    borderColor: '#2A64F5',
    backgroundColor: '#E3EBFF',
  },
  roleIcon: {
    marginRight: 8,
  },
  roleText: {
    fontWeight: '600',
    color: '#475569',
  },
  roleTextActive: {
    color: '#2A64F5',
  },
  legalText: {
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 12,
    marginTop: 16,
    lineHeight: 18,
  },
  linkStrong: {
    color: '#2A64F5',
    fontWeight: '700',
  },
  footerLink: {
    textAlign: 'center',
    marginTop: 24,
    color: '#475569',
    fontSize: 14,
  },
});

export default SignupScreen;
