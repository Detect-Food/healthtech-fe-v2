import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileSetupScreen = ({ navigation }) => {
  const [age, setAge] = useState('16');
  const [gender, setGender] = useState('Male');
  const [height, setHeight] = useState('165');
  const [weight, setWeight] = useState('52');

  const saveToStorage = async () => {
    try {
      await AsyncStorage.setItem('age', age);
      await AsyncStorage.setItem('gender', gender);
      await AsyncStorage.setItem('height', height);
      await AsyncStorage.setItem('weight', weight);
    } catch (error) {
      console.error('Lỗi khi lưu dữ liệu:', error);
    }
  };

  const handleNext = async () => {
    await saveToStorage();

    try {
      const storedAge = await AsyncStorage.getItem('age');
      const storedGender = await AsyncStorage.getItem('gender');
      const storedHeight = await AsyncStorage.getItem('height');
      const storedWeight = await AsyncStorage.getItem('weight');

      console.log('Dữ liệu đã lưu:');
      console.log('Age:', storedAge);
      console.log('Gender:', storedGender);
      console.log('Height:', storedHeight);
      console.log('Weight:', storedWeight);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu từ AsyncStorage:', error);
    }

    navigation.navigate('Login');
  };


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={10} // Điều chỉnh giá trị này nếu cần
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile Setup</Text>
          <Text style={styles.subtitle}>Please provide your details to calibrate your custom plan.</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
          />

          <Text style={styles.label}>Gender</Text>
          <View style={styles.radioContainer}>
            <RadioButton.Group onValueChange={setGender} value={gender}>
              <View style={styles.radioItem}>
                <RadioButton value="Male" /><Text>Male</Text>
              </View>
              <View style={styles.radioItem}>
                <RadioButton value="Female" /><Text>Female</Text>
              </View>
            </RadioButton.Group>
          </View>

          <Text style={styles.label}>Height (cm)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
          />

          <Text style={styles.label}>Weight (kg)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
          />
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    marginTop: 70,
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
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    marginBottom: 20, // Để tránh bị che bởi bàn phím
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileSetupScreen;
