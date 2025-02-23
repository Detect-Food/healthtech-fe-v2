import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserManagement from '../screens/admin/UserManagement'; 
import BillingManagement from '../screens/admin/BillingManagement';  
import AdminSetting from '../screens/admin/AdminSetting';  
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function AdminTabScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'User Management') {
            iconName = 'people-outline';  
          } else if (route.name === 'Billing Management') {
            iconName = 'cash-outline';  
          } else if (route.name === 'Admin Settings') {
            iconName = 'settings-outline';  
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: '#f0f0f5' },
      })}
    >
      <Tab.Screen name="User Management" component={UserManagement} options={{ headerShown: false }} />
      <Tab.Screen name="Billing Management" component={BillingManagement} options={{ headerShown: false }} />
      <Tab.Screen name="Admin Settings" component={AdminSetting} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

export default AdminTabScreen;
