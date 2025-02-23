import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RadioButton } from 'react-native-paper';
import UserAPI from '../api/UserAPI';

const PersonalDetail = () => {
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) setUserId(storedUserId);

        if (storedUserId) {
          const response = await UserAPI.getUserPhysicalStats(storedUserId);

          if (response?.status === 200) {
            const { Gender, Height, Weight, Age } = response?.userPhysicalStats || {};

            setGender(Gender || '');
            setHeight(String(Height) || '');
            setWeight(String(Weight) || '');
            setAge(String(Age) || '');
          }
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    };
    fetchUserData();
  }, []);

  const handleSave = async () => {
    if (!userId) {
      Alert.alert('Lỗi', 'Không tìm thấy userId');
      return;
    }

    setLoading(true);
    const updatedData = {
      gender,
      height: parseInt(height, 10) || 0,
      weight: parseInt(weight, 10) || 0,
      age: parseInt(age, 10) || 0,
    };

    try {
      await UserAPI.updateUserPhysicalStats(userId, updatedData);

      await AsyncStorage.setItem('gender', gender);
      await AsyncStorage.setItem('height', height);
      await AsyncStorage.setItem('weight', weight);
      await AsyncStorage.setItem('age', age);

      Alert.alert('Thành công', 'Thông tin đã được cập nhật!');
    } catch (error) {
      console.error('Lỗi khi cập nhật:', error);
      Alert.alert('Lỗi', 'Không thể cập nhật thông tin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Giới tính:</Text>
      <View style={styles.radioButtonContainer}>
        <View style={styles.radioButton}>
          <RadioButton
            value="Male"
            status={gender === 'Male' ? 'checked' : 'unchecked'}
            onPress={() => setGender('Male')}
          />
          <Text style={styles.radioLabel}>Nam</Text>
        </View>
        <View style={styles.radioButton}>
          <RadioButton
            value="Female"
            status={gender === 'Female' ? 'checked' : 'unchecked'}
            onPress={() => setGender('Female')}
          />
          <Text style={styles.radioLabel}>Nữ</Text>
        </View>
      </View>

      <Text style={styles.label}>Chiều cao (cm):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={height}
        onChangeText={(text) => setHeight(text)}
        placeholder="Nhập chiều cao"
      />

      <Text style={styles.label}>Cân nặng (kg):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={weight}
        onChangeText={(text) => setWeight(text)}
        placeholder="Nhập cân nặng"
      />

      <Text style={styles.label}>Tuổi:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(age)}
        onChangeText={(text) => setAge(text)}
        placeholder="Nhập tuổi"
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonLoading]}
        onPress={handleSave}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Đang lưu...' : 'Lưu'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#34495e',
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  radioLabel: {
    fontSize: 16,
    marginLeft: 5,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#000',
  },
  buttonLoading: {
    backgroundColor: '#ccc',
    borderColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default PersonalDetail;
