import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

import TabScreens from './src/components/TabScreens';
import LoginScreen from './src/screens/LoginScreen';
import ProfileSetupScreen from './src/screens/ProfileSetupScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import PersonalDetailScreen from './src/screens/PersonalDetail';
import AdminTabScreen from './src/components/AdminTabScreen';

const Stack = createStackNavigator();

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        if (hasLaunched === null) {
          await AsyncStorage.setItem('hasLaunched', 'true');
          setIsFirstLaunch(true);
        } else {
          setIsFirstLaunch(false);
        }
      } catch (error) {
        setIsFirstLaunch(false);
      }
    })();
  }, []);

  if (isFirstLaunch === null) {
    return null; // Loading...
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isFirstLaunch ? "ProfileSetup" : "Login"}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />

        <Stack.Screen
          name="PersonalDetail"
          component={PersonalDetailScreen}
          options={({ navigation }) => ({
            headerShown: true,
            title: "Thông tin cá nhân",
            headerLeft: () => (
              <Ionicons
                name="arrow-back"
                size={24}
                color="black"
                style={{ marginLeft: 16 }}
                onPress={() => {
                  if (navigation.canGoBack()) {
                    navigation.goBack();
                  } else {
                    navigation.navigate('Home'); // Nếu không có màn hình trước thì về Home
                  }
                }}
              />
            ),
          })}
        />

        <Stack.Screen name="AdminHome" component={AdminTabScreen} options={{ headerShown: false }} />


        <Stack.Screen name="Home" component={TabScreens} options={{ headerShown: false }} />
        <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
