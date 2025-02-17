import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomePage = () => {
  const nutritionData = [
    { id: '1', amount: '157g', label: 'Protein left', icon: 'flash-outline' },
    { id: '2', amount: '169g', label: 'Carbs left', icon: 'leaf-outline' },
    { id: '3', amount: '48g', label: 'Fats left', icon: 'water-outline' },
  ];

  const recentlyEatenData = [
    { id: '1', name: 'Chicken Breast', calories: '165 kcal', icon: 'nutrition-outline' },
    { id: '2', name: 'Brown Rice', calories: '215 kcal', icon: 'nutrition-outline' },
    { id: '3', name: 'Broccoli', calories: '55 kcal', icon: 'nutrition-outline' },
  ];

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

      {/* Date Selection */}
      <View style={styles.dateContainer}>
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
          <View key={index} style={styles.dateItem}>
            <Text style={styles.dayText}>{day}</Text>
            <Text style={[styles.dateText, index === 5 && styles.selectedDate]}>
              {21 + index} {/* Just an example to display dates */}
            </Text>
          </View>
        ))}
      </View>

      {/* Calories left */}
      <View style={styles.caloriesContainer}>
        <Text style={styles.caloriesAmount}>1740</Text>
        <Text style={styles.caloriesLabel}>Calories left</Text>
      </View>

      {/* Nutrition Breakdown */}
      <FlatList
        data={nutritionData}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.nutritionItem}>
            <Icon name={item.icon} size={24} color="#888" />
            <Text style={styles.nutritionAmount}>{item.amount}</Text>
            <Text style={styles.nutritionLabel}>{item.label}</Text>
          </View>
        )}
        contentContainerStyle={styles.nutritionContainer}
        showsHorizontalScrollIndicator={false}
      />

      {/* Recently Eaten */}
      <View style={styles.recentContainer}>
        <Text style={styles.recentTitle}>Recently eaten</Text>
        {recentlyEatenData.length > 0 ? (
          <FlatList
            data={recentlyEatenData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.recentItem}>
                <Icon name={item.icon} size={24} color="#888" />
                <View style={styles.recentItemTextContainer}>
                  <Text style={styles.recentItemName}>{item.name}</Text>
                  <Text style={styles.recentItemCalories}>{item.calories}</Text>
                </View>
              </View>
            )}
          />
        ) : (
          <View style={styles.recentBox}>
            <Text style={styles.recentTextBold}>You haven’t uploaded any food</Text>
            <Text style={styles.recentText}>Start tracking Today's meals by taking a quick picture</Text>
          </View>
        )}
      </View>

      {/* Floating Button */}
      <TouchableOpacity style={styles.fab}>
        <Icon name="add-outline" size={30} color="#fff" />
      </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  dateItem: {
    alignItems: 'center',
  },
  dayText: {
    fontSize: 12,
    color: '#aaa',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  selectedDate: {
    color: '#000',
    fontWeight: 'bold',
  },
  caloriesContainer: {
    backgroundColor: '#f0f0f5',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 20,
    marginVertical: 20,
  },
  caloriesAmount: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  caloriesLabel: {
    fontSize: 16,
    color: '#666',
  },
  nutritionContainer: {
    marginTop: 20,
    paddingHorizontal: 5,
  },
  nutritionItem: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
  },
  nutritionAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  nutritionLabel: {
    fontSize: 12,
    color: '#888',
  },
  recentContainer: {
    marginTop: 30,
  },
  recentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  recentBox: {
    backgroundColor: '#f7f7f7',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 8,
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
  },
  recentItemTextContainer: {
    marginLeft: 10,
  },
  recentItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  recentItemCalories: {
    fontSize: 14,
    color: '#666',
  },
  recentTextBold: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  recentText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
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
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
});

export default HomePage;