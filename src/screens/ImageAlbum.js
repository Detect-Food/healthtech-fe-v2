import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { useFocusEffect } from '@react-navigation/native';
// import Toast from "react-native-toast-message";

export default function ImageAlbum() {
  const [albumImages, setAlbumImages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState(null);

  useFocusEffect(
    useCallback(() => {
      loadAlbumImages();
    }, [])
  );

  const loadAlbumImages = async () => {
    let album = await MediaLibrary.getAlbumAsync('AI');
    if (album) {
      const assets = await MediaLibrary.getAssetsAsync({
        album: album.id,
        mediaType: 'photo',
        sortBy: 'creationTime',
        first: 100, // Giới hạn số ảnh để tải về nhanh hơn
      });
      setAlbumImages(assets.assets);
    }
  };

  const handleImagePress = (imageUri) => {
    setSelectedImageUri(imageUri);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedImageUri(null);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.albumTitle}>Tất cả ảnh trong album "AI":</Text>
        <View style={styles.albumContainer}>
          {albumImages.map((item) => (
            <TouchableOpacity key={item.id} style={styles.imageWrapper} onPress={() => handleImagePress(item.uri)}>
              {/* <Image source={{ uri: item.uri }} style={styles.albumImage} /> */}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Modal hiển thị chi tiết ảnh */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              {/* {selectedImageUri && (
                 <Image source={{ uri: selectedImageUri }} style={styles.fullImage} />
              )} */}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f5',
  },
  scrollContainer: {
    flex: 1,
    paddingTop: 20,
  },
  albumTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  albumContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  imageWrapper: {
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  albumImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    height: '70%',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  fullImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
