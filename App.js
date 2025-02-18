import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import TabScreens from './src/components/TabScreens';
import LoginScreen from './src/screens/LoginScreen';
import ProfileSetupScreen from './src/screens/ProfileSetupScreen';

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={LoginScreen}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={TabScreens} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ProfileSetupScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
