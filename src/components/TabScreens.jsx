import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from '../screens/HomePage';
import Analytics from '../screens/Analytics';
import Settings from '../screens/Settings';
import Icon from 'react-native-vector-icons/Ionicons';
import GenFood from '../screens/GenFood';
import Billing from '../screens/Billing'; 

const Tab = createBottomTabNavigator();

function TabScreens() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'HomePage') {
            iconName = 'home-outline';
          } else if (route.name === 'Analytics') {
            iconName = 'bar-chart-outline';
          } else if (route.name === 'GenFood') {
            iconName = 'pizza-outline';
          } else if (route.name === 'Billing') {
            iconName = 'cash-outline'; 
          } else if (route.name === 'Settings') {
            iconName = 'settings-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: '#f0f0f5' },
      })}
    >
      <Tab.Screen name="HomePage" component={HomePage} options={{ headerShown: false }} />
      <Tab.Screen name="Analytics" component={Analytics} options={{ headerShown: false }} />
      <Tab.Screen name="GenFood" component={GenFood} options={{ headerShown: false }} />
      <Tab.Screen name="Billing" component={Billing} options={{ headerShown: false }} />
      <Tab.Screen name="Settings" component={Settings} options={{ headerShown: false }} />

    </Tab.Navigator>
  );
}

export default TabScreens;
