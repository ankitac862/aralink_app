import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppGradient } from '@components/AppGradient';
import { RootStackParamList } from '@navigation/AppNavigator';

const SplashScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList, 'Splash'>) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <AppGradient>
      <View style={styles.animationContainer}>
        <LottieView
          source={require('../assets/lottie/Animantes_Splash_screen.json')}
          autoPlay
          loop
          style={{ width: 200, height: 200 }}
        />
      </View>
    </AppGradient>
  );
};

const styles = StyleSheet.create({
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;
