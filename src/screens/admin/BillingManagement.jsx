import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, Button, ScrollView } from 'react-native';
import TransactionAPI from '../../api/TransactionAPI';
import Icon from 'react-native-vector-icons/MaterialIcons'; 

function BillingManagement() {
    const [transactions, setTransactions] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    // Lấy dữ liệu giao dịch từ API
    const fetchTransactions = async () => {
        try {
            const response = await TransactionAPI.getAllTransactions();
            console.log(response);
            if (response) {
                setTransactions(response.transactions);
                setTotalAmount(response.totalAmount);
            } else {
                Alert.alert('Không có dữ liệu giao dịch');
            }
        } catch (error) {
            console.error('Lỗi khi lấy giao dịch:', error);
            Alert.alert('Có lỗi xảy ra, vui lòng thử lại');
        }
    };

    // Gọi API khi component mount
    useEffect(() => {
        fetchTransactions();
    }, []);

    // Render mỗi giao dịch trong bảng
    const renderTransactionItem = ({ item }) => (
        <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.transactionCode}</Text>
            <Text style={styles.tableCell}>{item.amount.toLocaleString()} VND</Text>
            <Text style={styles.tableCell}>{item.status}</Text>
            <Text style={styles.tableCell}>{new Date(item.dateCreated).toLocaleString()}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                {/* Nút refresh (tải lại) ở góc trái */}
                <TouchableOpacity onPress={fetchTransactions} style={styles.refreshButton}>
                    <Icon name="refresh" size={30} color="#000" />
                </TouchableOpacity>

                <Text style={styles.title}>Quản lý Billing</Text>

                <Text style={styles.totalAmount}>Tổng số tiền thu được: {totalAmount.toLocaleString()} VND</Text>

                <View style={styles.transactionsContainer}>
                    <Text style={styles.sectionTitle}>Danh sách giao dịch:</Text>

                    {/* Bảng giao dịch */}
                    <View style={styles.table}>
                        <View style={styles.tableHeader}>
                            <Text style={styles.tableHeaderCell}>Mã giao dịch</Text>
                            <Text style={styles.tableHeaderCell}>Số tiền</Text>
                            <Text style={styles.tableHeaderCell}>Trạng thái</Text>
                            <Text style={styles.tableHeaderCell}>Ngày tạo</Text>
                        </View>

                        {/* Hiển thị danh sách giao dịch */}
                        <FlatList
                            data={transactions}
                            renderItem={renderTransactionItem}
                            keyExtractor={(item) => item._id}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f5',
        paddingTop: 50,
    },
    card: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        marginBottom: 20,
    },
    refreshButton: {
        position: 'absolute',
        top: 20,
        right: 10,
        zIndex: 1, // Đảm bảo nút luôn nằm trên các phần tử khác
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    totalAmount: {
        fontSize: 18,
        color: '#4CAF50',
        marginBottom: 20,
    },
    transactionsContainer: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    table: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        overflow: 'hidden',
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#f2f2f2',
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    tableHeaderCell: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    tableCell: {
        flex: 1,
        textAlign: 'center',
    },
});

export default BillingManagement;
