// src/screens/AdminSetting.js

import React from 'react';
import { View, Text, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

function AdminSetting({ navigation }) {
  // Hàm xử lý logout
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userId');

      navigation.navigate('Login');  

      Alert.alert('Đăng xuất thành công', 'Bạn đã được đăng xuất khỏi hệ thống.');
    } catch (error) {
      console.error('Lỗi khi đăng xuất:', error);
      Alert.alert('Có lỗi xảy ra', 'Không thể đăng xuất, vui lòng thử lại.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cài đặt quản trị viên</Text>

      {/* Các mục cài đặt */}
      <View style={styles.settingsContainer}>
        <TouchableOpacity style={styles.settingItem} onPress={() => Alert.alert('Cài đặt mật khẩu')}>
          <Text style={styles.settingText}>Thay đổi mật khẩu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem} onPress={() => Alert.alert('Cài đặt thông báo')}>
          <Text style={styles.settingText}>Cài đặt thông báo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem} onPress={() => Alert.alert('Cài đặt tài khoản')}>
          <Text style={styles.settingText}>Cài đặt tài khoản</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem} onPress={() => Alert.alert('Cài đặt mã QR')}>
          <Text style={styles.settingText}>Cài đặt mã QR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={
            styles.logout} onPress={handleLogout}>
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', 
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f5',
    paddingTop: 70,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#4CAF50', 
  },
  settingsContainer: {
    width: '100%',
    marginBottom: 30,
  },
  settingItem: {
    backgroundColor: '#ffffff', 
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#ddd',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  settingText: {
    fontSize: 18,
    color: '#333', 
  },
  logout: {
    backgroundColor: '#f44336',  
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    shadowColor: '#ddd',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  logoutText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',  
    textAlign: 'center',  
  },
});

export default AdminSetting;
