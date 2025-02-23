import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserManagement from '../screens/UserManagement';  // Thêm màn hình quản lý người dùng
// import BillingManagement from '../screens/BillingManagement';  // Thêm màn hình quản lý thanh toán
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function AdminTabScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'User Management') {
            iconName = 'people-outline';  // Biểu tượng quản lý người dùng
          } else if (route.name === 'Billing Management') {
            iconName = 'cash-outline';  // Biểu tượng quản lý thanh toán
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: '#f0f0f5' },
      })}
    >
      <Tab.Screen name="User Management" component={UserManagement} options={{ headerShown: false }} />
      {/* <Tab.Screen name="Billing Management" component={BillingManagement} options={{ headerShown: false }} /> */}
    </Tab.Navigator>
  );
}

export default AdminTabScreen;
