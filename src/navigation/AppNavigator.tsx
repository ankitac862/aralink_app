import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '@screens/SplashScreen';
import LoginScreen from '@screens/LoginScreen';
import SignupScreen from '@screens/SignupScreen';
import DashboardScreen from '@screens/DashboardScreen';
import PropertiesScreen from '@screens/PropertiesScreen';
import TenantsScreen from '@screens/TenantsScreen';
import MaintenanceScreen from '@screens/MaintenanceScreen';
import AccountingScreen from '@screens/AccountingScreen';
import ApplicantsScreen from '@screens/ApplicantsScreen';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Signup: undefined;
  Dashboard: undefined;
  Properties: undefined;
  Tenants: undefined;
  Maintenance: undefined;
  Accounting: undefined;
  Applicants: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
    <Stack.Screen name="Dashboard" component={DashboardScreen} />
    <Stack.Screen name="Properties" component={PropertiesScreen} />
    <Stack.Screen name="Tenants" component={TenantsScreen} />
    <Stack.Screen name="Maintenance" component={MaintenanceScreen} />
    <Stack.Screen name="Accounting" component={AccountingScreen} />
    <Stack.Screen name="Applicants" component={ApplicantsScreen} />
  </Stack.Navigator>
);

export default AppNavigator;
