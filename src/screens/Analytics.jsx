import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageAPI from '../api/ImageAPI.js';
import Toast from 'react-native-toast-message';

const Analytics = () => {
  const [imageUri, setImageUri] = useState(null);
  const [scanResults, setScanResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadImage = async (image) => {
    try {
      setLoading(true);
      const body = {
        images: [image.base64],
        message: "Tôi là Duy Hoàng",
      };
      const response = await ImageAPI.uploadImage(body);

      if (response) {
        setScanResults(response?.data);
      }

      Toast.show({
        type: 'success',
        text1: 'Thành công',
        text2: 'Ảnh đã được tải lên thành công!',
        position: 'top',
        topOffset: 50,
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Lỗi', 'Không thể tải lên ảnh.');
    } finally {
      setLoading(false);
    }
  };

  const captureImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Lỗi', 'Ứng dụng cần quyền truy cập camera!');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      const { uri } = result.assets[0];
      setImageUri(uri);
      const base64String = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
      const image = {
        uri,
        base64: base64String,
      };
      await uploadImage(image);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Chụp ảnh và tải lên!</Text>
      <TouchableOpacity style={styles.button} onPress={captureImage}>
        <Text style={styles.buttonText}>Chụp ảnh</Text>
      </TouchableOpacity>

      {imageUri && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.image} />
        </View>
      )}

      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" style={styles.spinner} />
      ) : scanResults && (
        <ScrollView style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Photo Scan Results</Text>
          {scanResults.every(item => !item.name && !item.calories && !item.vitamins && !item.minerals) ? (
            <Text style={styles.noResultText}>No food item detected</Text>
          ) : (
            scanResults
              .filter(item => item.name || item.calories || item.vitamins || item.minerals)
              .map((item, index) => (
                <View key={index} style={styles.resultItem}>
                  {item.name && <Text style={styles.resultText}>{item.name}</Text>}
                  {item.calories && <Text style={styles.resultSubText}>Calories: {item.calories}</Text>}
                  {item.vitamins && <Text style={styles.resultSubText}>Vitamins: {item.vitamins}</Text>}
                  {item.minerals && <Text style={styles.resultSubText}>Minerals: {item.minerals}</Text>}
                </View>
              ))
          )}
        </ScrollView>
      )}

      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#333',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  spinner: {
    marginTop: 20,
  },
  resultsContainer: {
    marginTop: 20,
    width: '100%',
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  resultItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  resultSubText: {
    fontSize: 14,
    color: '#555',
    marginVertical: 2,
  },
  noResultText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f8d7da',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#f5c6cb',
    overflow: 'hidden',
  },

});

export default Analytics;
