import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Modal, Button } from 'react-native';
import UserAPI from '../../api/UserAPI';

function UserManagement() {
    const [users, setUsers] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userData = await UserAPI.getAllUsers();
                setUsers(userData);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleUserClick = (user) => {
        setSelectedUser(user);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setSelectedUser(null);
    };

    const renderUser = ({ item }) => (
        <View style={styles.row}>
            <Text style={styles.cell}>{item.username}</Text>
            <Text style={styles.cell}>{item.subcription}</Text>
            <Text style={styles.cell}>{item.role}</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => handleUserClick(item)}
            >
                <Text style={styles.buttonText}>View Details</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>User Management</Text>

            {/* Table Header */}
            <View style={styles.headerRow}>
                <Text style={styles.headerCell}>Username</Text>
                <Text style={styles.headerCell}>Subscription</Text>
                <Text style={styles.headerCell}>Role</Text>
                <Text style={styles.headerCell}>Actions</Text>
            </View>

            {/* FlatList to display users in table format */}
            <FlatList
                data={users}
                renderItem={renderUser}
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.table}
            />

            {/* Modal to show user details */}
            {selectedUser && (
                <Modal
                    visible={isModalVisible}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={closeModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>User Details</Text>
                            <Text style={styles.modalText}>Username: {selectedUser.username}</Text>
                            <Text style={styles.modalText}>Email: {selectedUser.email}</Text>
                            <Text style={styles.modalText}>Role: {selectedUser.role}</Text>
                            <Text style={styles.modalText}>Age: {selectedUser.age}</Text>
                            <Text style={styles.modalText}>Gender: {selectedUser.gender}</Text>
                            <Text style={styles.modalText}>Subscription: {selectedUser.subcription}</Text>
                            <Text style={styles.modalText}>Note: {selectedUser.note}</Text>

                            <TouchableOpacity
                                style={styles.button}
                                onPress={closeModal}
                            >
                                <Text style={styles.buttonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
        paddingTop: 60,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    table: {
        paddingBottom: 20,
    },
    headerRow: {
        flexDirection: 'row',
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderRadius: 5,
        marginBottom: 10,
    },
    headerCell: {
        flex: 1,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 5,
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        alignItems: 'center',
    },
    cell: {
        flex: 1,
        fontSize: 14,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        paddingLeft: 30,
        borderRadius: 10,
        width: '80%',

    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 10,
    },
});

export default UserManagement;
