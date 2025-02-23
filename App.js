import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TabScreens from './src/components/TabScreens';
import LoginScreen from './src/screens/LoginScreen';
import ProfileSetupScreen from './src/screens/ProfileSetupScreen';

const Stack = createStackNavigator();

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    checkIfFirstLaunch();
  }, []);

  const checkIfFirstLaunch = async () => {
    try {
      const hasLaunched = await AsyncStorage.getItem('hasLaunched');
      if (hasLaunched === null) {
        // First time launching the app
        await AsyncStorage.setItem('hasLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    } catch (error) {
      // In case of error, default to Login screen
      setIsFirstLaunch(false);
    }
  };

  // Show loading screen while checking first launch status
  if (isFirstLaunch === null) {
    return null; // Or return a loading component
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isFirstLaunch ? "ProfileSetup" : "Login"}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={TabScreens} options={{ headerShown: false }} />
        <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}