import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

function Billing() {
  return (
    <ScrollView style={styles.container}>
      {/* Gói Miễn phí */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Free</Text>
        <Text style={styles.cardPrice}>0.00 VND / month</Text>
        <Text style={styles.featuresTitle}>Tính năng:</Text>
        <View style={styles.features}>
          <Text style={styles.feature}>✔ Theo dõi dinh dưỡng cơ bản (calo, protein, carbohydrate, chất béo)</Text>
          <Text style={styles.feature}>✔ Nhận dạng hình ảnh dinh dưỡng thực phẩm thông qua AI (giới hạn 5 lần/ngày)</Text>
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
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>GET PREMIUM</Text>
        </TouchableOpacity>
      </View>
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
  cardSubText: {
    fontSize: 14,
    color: 'gray',
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
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Billing;
