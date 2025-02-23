import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import FoodAPI from '../api/FoodAPI';

const GenFood = () => {
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [note, setNote] = useState('');
  const [mealPlan, setMealPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedGender = await AsyncStorage.getItem('gender');
        const storedHeight = await AsyncStorage.getItem('height');
        const storedWeight = await AsyncStorage.getItem('weight');
        const storedAge = await AsyncStorage.getItem('age');

        if (storedGender) setGender(storedGender);
        if (storedHeight) setHeight(storedHeight);
        if (storedWeight) setWeight(storedWeight);
        if (storedAge) setAge(storedAge);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu từ AsyncStorage:', error);
      }
    };

    fetchUserData();
  }, []);

  const generateMeal = async () => {
    setLoading(true);
    setMealPlan(null);
    setError('');

    const body = {
      age: age || 25,
      weight: weight ? parseInt(weight, 10) : 70,
      height: height ? parseInt(height, 10) : 175,
      gender: gender || 'male',
      note,
    };

    try {
      const response = await FoodAPI.genFood(body);

      if (response && response.days) {
        setMealPlan(response);
      } else {
        setError('Không thể tạo bữa ăn, vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Lỗi API:', error);
      setError('Lỗi khi gọi API.');
    } finally {
      setLoading(false);
    }
  };

  const renderMealPlan = () => {
    if (!mealPlan) return null;

    return (
      <View style={styles.mealContainer}>
        <Text style={styles.sectionTitle}>🔥 Nhu cầu dinh dưỡng</Text>
        <Text style={styles.nutritionalDescription}>
          {mealPlan.nutritionalNeeds?.description || ''}
        </Text>
        <Text style={styles.calories}>
          🌟 {mealPlan.nutritionalNeeds?.totalCalories || ''}
        </Text>

        <Text style={styles.sectionTitle}>📅 Thực đơn theo ngày</Text>
        {mealPlan.days.map((day, index) => (
          <View key={index} style={styles.dayContainer}>
            <Text style={styles.dayTitle}>{day.day}</Text>
            {day.meals.map((meal, mealIndex) => (
              <View key={mealIndex} style={styles.mealDetailsContainer}>
                <Text style={styles.mealText}>🍽 {meal.meal}</Text>
                <Text style={styles.mealDescription}>{meal.description}</Text>
                <Text style={styles.calories}>🌟 {meal.calories} kcal</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Thông Tin Người Dùng</Text>
      <Text style={styles.infoText}>Giới tính: {gender}</Text>
      <Text style={styles.infoText}>Chiều cao: {height} cm</Text>
      <Text style={styles.infoText}>Cân nặng: {weight} kg</Text>
      <Text style={styles.infoText}>Tuổi: {age}</Text>

      <TextInput
        style={styles.input}
        placeholder="Nhập ghi chú (VD: Không ăn cá)..."
        value={note}
        onChangeText={setNote}
        placeholderTextColor="#aaa"
      />

      <Button 
        title="Gen Meal" 
        onPress={generateMeal} 
        disabled={loading} 
        color="#ff6347" 
      />

      {loading && <Text style={styles.loading}>Đang tạo bữa ăn...</Text>}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {renderMealPlan()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
    paddingTop: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2c3e50',
  },
  infoText: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginVertical: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  loading: {
    marginTop: 10,
    fontSize: 16,
    color: 'blue',
  },
  errorText: {
    marginTop: 10,
    fontSize: 14,
    color: 'red',
    textAlign: 'center',
  },
  mealContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#e74c3c',
  },
  nutritionalDescription: {
    fontSize: 16,
    marginTop: 5,
    color: '#7f8c8d',
  },
  calories: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#27ae60',
    marginTop: 5,
  },
  dayContainer: {
    marginTop: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#ecf0f1',
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2980b9',
  },
  mealDetailsContainer: {
    marginTop: 8,
    paddingLeft: 10,
  },
  mealText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8e44ad',
  },
  mealDescription: {
    fontSize: 14,
    color: '#34495e',
    marginTop: 5,
  },
});

export default GenFood;