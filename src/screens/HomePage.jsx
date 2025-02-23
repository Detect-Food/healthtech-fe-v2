import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import FoodAPI from '../api/FoodAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Checkbox } from 'react-native-paper';

const HomePage = () => {
  const [nutritionData, setNutritionData] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMeals, setSelectedMeals] = useState([]);

  const fetchNutritionPlan = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        const response = await FoodAPI.getNutritionPlan(userId);
        setNutritionData(response?.data?.days);
      }
    } catch (error) {
      console.error('Error fetching nutrition plan:', error);
    }
  };

  useEffect(() => {
    fetchNutritionPlan();
  }, []);

  const toggleMealCheck = (dayIndex, mealIndex) => {
    const updatedMeals = [...selectedMeals];
    const mealKey = `${dayIndex}-${mealIndex}`;

    if (updatedMeals.includes(mealKey)) {
      updatedMeals.splice(updatedMeals.indexOf(mealKey), 1);
    } else {
      updatedMeals.push(mealKey);
    }

    setSelectedMeals(updatedMeals);
  };

  const renderMeal = (item, dayIndex, mealIndex) => (
    <View style={styles.mealItem} key={`${dayIndex}-${mealIndex}`}>
      <Checkbox
        status={selectedMeals.includes(`${dayIndex}-${mealIndex}`) ? 'checked' : 'unchecked'}
        onPress={() => toggleMealCheck(dayIndex, mealIndex)}
      />
      <View style={styles.mealTextContainer}>
        <Text style={styles.mealName}>{item.meal}</Text>
        <Text style={styles.mealDescription}>{item.description}</Text>
        <Text style={styles.mealCalories}>{item.calories} kcal</Text>
      </View>
    </View>
  );

  const renderDayItem = (item, index) => (
    <TouchableOpacity
      style={[styles.dayItem, selectedDay === index && styles.selectedDay]}
      onPress={() => setSelectedDay(selectedDay === index ? null : index)}
      key={index}
    >
      <Text style={styles.dayText}>{item.day}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>🍎 Best5-Team-AI</Text>
        <View style={styles.headerRight}>
          <Icon name="flame-outline" size={20} color="#000" />
          <Text style={styles.headerRightText}>0</Text>
        </View>
      </View>

      {/* Date Selection (Vertical list) */}
      <ScrollView style={styles.dateContainer}>
        {nutritionData.map((day, index) => renderDayItem(day, index))}
      </ScrollView>

      {/* Meals for Selected Day (Only shown when a day is selected) */}
      {selectedDay !== null && (
        <FlatList
          data={nutritionData[selectedDay].meals}
          renderItem={({ item, index }) => renderMeal(item, selectedDay, index)}
          keyExtractor={(item, index) => `${selectedDay}-${index}`}
        />
      )}


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRightText: {
    fontSize: 16,
    marginLeft: 5,
  },
  dateContainer: {
    marginTop: 30,
    height: 200
  },
  dayItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f0f0f5',
    borderRadius: 12,
    marginBottom: 8,
    alignItems: 'center',
  },
  selectedDay: {
    backgroundColor: '#2ecc71',
  },
  dayText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  mealItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
  },
  mealTextContainer: {
    marginLeft: 12,
    flexShrink: 1, // Prevent text from overflowing
  },
  mealName: {
    fontSize: 16,
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },
  mealDescription: {
    fontSize: 14,
    color: '#666',
    flexWrap: 'wrap',
  },
  mealCalories: {
    fontSize: 14,
    color: '#888',
  },
  fab: {
    backgroundColor: '#4CAF50',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    bottom: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
});

export default HomePage;
