import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Image, Alert } from 'react-native';
import UserAPI from '../api/UserAPI';
import TransactionAPI from '../api/TransactionAPI';

function Billing() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [timer, setTimer] = useState(60);
    const [subscription, setSubscription] = useState('');


    const getUserDetails = async () => {
        try {
            const storedUserId = await AsyncStorage.getItem('userId');
            const response = await UserAPI.getUserDetails(storedUserId);
            if (String(response?.userDetails.subcription) === 'Premium') {
                setSubscription('Premium');
            } else {
                setSubscription('Free');
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    useEffect(() => {

        getUserDetails();

        let interval;
        if (isModalVisible && timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timer === 0) {
            setIsModalVisible(false);
        }

        return () => clearInterval(interval);
    }, [isModalVisible, timer]);

    const handleGetPremium = () => {
        setIsModalVisible(true);
        setTimer(60);
    };

    const handleConfirmPayment = async () => {
        const storedUserId = await AsyncStorage.getItem('userId');
        const response = await TransactionAPI.getNewTransaction(storedUserId);
        console.log(response);
        if (response.status === 200) {
            Alert.alert('Thanh toán thành công');
        }
        setSubscription('Premium');
        
        setIsModalVisible(false);
    };

    return (
        <ScrollView style={styles.container}>
            {/* Gói Miễn phí */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Free</Text>
                <Text style={styles.cardPrice}>0.00 VND / month</Text>
                <Text style={styles.featuresTitle}>Tính năng:</Text>
                <View style={styles.features}>
                    <Text style={styles.feature}>✔ Theo dõi dinh dưỡng cơ bản (calo, protein, carbohydrate, chất béo)</Text>
                    <Text style={styles.feature}>✔ Nhận dạng hình ảnh dinh dưỡng thực phẩm thông qua AI (giới hạn 3 lần/ngày)</Text>
                    <Text style={styles.feature}>✔ Kế hoạch bữa ăn dinh dưỡng (2 ngày)</Text>
                    <Text style={styles.feature}>✔ Lộ trình dinh dưỡng theo cá nhân hóa</Text>
                </View>
            </View>

            {/* Gói Cao cấp */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Premium</Text>
                <Text style={styles.cardPrice}>89.000 VND / month</Text>
                <Text style={styles.featuresTitle}>Tính năng:</Text>
                <View style={styles.features}>
                    <Text style={styles.feature}>✔ Tất cả các tính năng miễn phí</Text>
                    <Text style={styles.feature}>✔ Tùy chỉnh các tình trạng sức khỏe như dị ứng hoặc bệnh lý</Text>
                    <Text style={styles.feature}>✔ Tùy chỉnh chế độ ăn uống (thực phẩm chay, sống, v.v.)</Text>
                    <Text style={styles.feature}>✔ Kế hoạch bữa ăn dinh dưỡng dựa trên nhu cầu</Text>
                    <Text style={styles.feature}>✔ Gợi ý các kế hoạch bữa ăn phù hợp với mục tiêu sức khỏe</Text>
                    <Text style={styles.feature}>✔ Tư vấn dinh dưỡng AI dựa trên thói quen ăn uống (Chat Bot)</Text>
                </View>
                {subscription === 'Premium' ? (
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Đang dùng bản premium</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.button} onPress={handleGetPremium}>
                        <Text style={styles.buttonText}>GET PREMIUM</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Modal Popup for Payment */}
            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Xác nhận thanh toán</Text>
                        <Image
                            source={require('../../assets/images/qr.jpg')}
                            style={styles.image}
                        />
                        <Text style={styles.timer}>Thời gian còn lại: {timer}s</Text>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.buttonCancel} onPress={() => setIsModalVisible(false)}>
                                <Text style={styles.buttonText}>Hủy </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonConfirm} onPress={handleConfirmPayment}>
                                <Text style={styles.buttonText}>Xác nhận</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f5',
        paddingTop: 60,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
        marginRight: 30,
        marginLeft: 30,
    },
    card: {
        backgroundColor: 'white',
        padding: 20,
        marginBottom: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cardPrice: {
        fontSize: 20,
        color: '#4CAF50',
        marginBottom: 10,
    },
    featuresTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    features: {
        marginBottom: 20,
    },
    feature: {
        fontSize: 14,
        marginVertical: 5,
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonCancel: {
        backgroundColor: 'red',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginLeft: 30,
    },
    buttonConfirm: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginRight: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        paddingHorizontal: 20,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    image: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    timer: {
        fontSize: 16,
        color: 'red',
        marginBottom: 20,
    },
});

export default Billing;
