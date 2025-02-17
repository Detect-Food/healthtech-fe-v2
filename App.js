import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';
import TabScreens from './src/components/TabScreens';
import LoginScreen from './src/screens/LoginScreen';
import ProfileSetupScreen from './src/screens/ProfileSetupScreen';

const Stack = createStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const gender = await AsyncStorage.getItem('gender');
        // console.log('isFirstLaunch:', isFirstLaunch);

        if (gender === null) {
          // await AsyncStorage.setItem('isFirstLaunch', 'false');
          setInitialRoute('ProfileSetup');
        } else {
          setInitialRoute('Login');
        }
      } catch (error) {
        console.error('Failed to check first launch', error);
        setInitialRoute('Login');
      }
    };

    checkFirstLaunch();
  }, []);

  if (initialRoute == null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} options={{ headerShown: false }} />

        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={TabScreens} options={{ headerShown: false }} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
