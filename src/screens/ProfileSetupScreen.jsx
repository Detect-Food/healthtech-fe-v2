import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileSetupScreen = ({ navigation }) => {
  const [month, setMonth] = useState('January');
  const [day, setDay] = useState('01');
  const [year, setYear] = useState('2008');
  const [gender, setGender] = useState('Male');
  const [height, setHeight] = useState(165);
  const [weight, setWeight] = useState(52);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const genders = ['Male', 'Female', 'Other'];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1899 }, (_, i) => 1900 + i);

  useEffect(() => {
    const loadStoredValues = async () => {
      try {
        const storedMonth = await AsyncStorage.getItem('month');
        const storedDay = await AsyncStorage.getItem('day');
        const storedYear = await AsyncStorage.getItem('year');
        const storedGender = await AsyncStorage.getItem('gender');
        const storedHeight = await AsyncStorage.getItem('height');
        const storedWeight = await AsyncStorage.getItem('weight');

        if (storedMonth) setMonth(storedMonth);
        if (storedDay) setDay(storedDay);
        if (storedYear) setYear(storedYear);
        if (storedGender) setGender(storedGender);
        if (storedHeight) setHeight(parseInt(storedHeight));
        if (storedWeight) setWeight(parseInt(storedWeight));
      } catch (error) {
        console.error('Error loading data from AsyncStorage:', error);
      }
    };

    loadStoredValues();
  }, []);

  const saveToStorage = async () => {
    try {
      await AsyncStorage.setItem('month', month);
      await AsyncStorage.setItem('day', day);
      await AsyncStorage.setItem('year', year);
      await AsyncStorage.setItem('gender', gender);
      await AsyncStorage.setItem('height', height.toString());
      await AsyncStorage.setItem('weight', weight.toString());
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  };

  const handleNext = async () => {
    await saveToStorage();
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile Setup</Text>
        <Text style={styles.subtitle}>Please provide your details to calibrate your custom plan.</Text>
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Birth Date</Text>
        <View style={styles.row}>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={month}
              onValueChange={setMonth}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              {months.map((month, index) => (
                <Picker.Item key={index} label={month} value={month} />
              ))}
            </Picker>
          </View>

          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={day}
              onValueChange={setDay}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              {[...Array(31).keys()].map((i) => (
                <Picker.Item key={i} label={`${i + 1}`} value={`${i + 1}`} />
              ))}
            </Picker>
          </View>

          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={year}
              onValueChange={setYear}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              {years.map((year, index) => (
                <Picker.Item key={index} label={`${year}`} value={`${year.toString()}`} />
              ))}
            </Picker>
          </View>
        </View>

        <Text style={styles.label}>Gender</Text>
        <View style={styles.pickerWrapper1}>
          <Picker
            selectedValue={gender}
            onValueChange={setGender}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            {genders.map((gender, index) => (
              <Picker.Item key={index} label={gender} value={gender} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Height</Text>
        <View style={styles.pickerWrapper1}>
          <Picker
            selectedValue={`${height}`}
            onValueChange={(itemValue) => setHeight(parseInt(itemValue))}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            {[...Array(50).keys()].map((i) => (
              <Picker.Item key={i} label={`${165 + i} cm`} value={`${165 + i}`} />

            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Weight</Text>
        <View style={styles.pickerWrapper1}>
          <Picker
            selectedValue={`${weight}`}
            onValueChange={(itemValue) => setWeight(parseInt(itemValue))}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            {[...Array(50).keys()].map((i) => (
              <Picker.Item key={i} label={`${52 + i} kg`} value={`${52 + i}`} />

            ))}
          </Picker>
        </View>
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  header: {
    marginTop: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
  },
  pickerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    marginLeft: 10,

  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  pickerWrapper: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderRadius: 10,
    flex: 1,
    borderWidth: 1,
    paddingVertical: 8,
    marginHorizontal: 5,
    elevation: 2,
  },
  pickerWrapper1: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    elevation: 2,
    marginHorizontal: 5,
  },
  picker: {
    height: 50,
    width: '100%', // Chiếm hết chiều rộng của phần tử chứa
  },
  pickerItem: {
    height: 50,
    color: '#333',
  },
  nextButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 10,
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});



export default ProfileSetupScreen;