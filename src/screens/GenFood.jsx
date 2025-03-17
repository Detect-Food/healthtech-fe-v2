import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import FoodAPI from '../api/FoodAPI';
import UserAPI from '../api/UserAPI';  // Thêm API để lấy thông tin người dùng
import { useFocusEffect } from '@react-navigation/native';

const GenFood = () => {
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [note, setNote] = useState('');
  const [mealPlan, setMealPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false); // Trạng thái lưu

  useFocusEffect(
    React.useCallback(() => {
      const fetchUserData = async () => {
        try {
          const storedUserId = await AsyncStorage.getItem('userId');
          if (storedUserId) {
            const response = await UserAPI.getUserPhysicalStats(storedUserId);

            if (response?.status === 200) {
              const { Gender, Height, Weight, Age, Note } = response?.userPhysicalStats || {};

              setGender(Gender || '');
              setHeight(String(Height) || '');
              setWeight(String(Weight) || '');
              setAge(String(Age) || '');
              setNote(Note || '');
            }
          }
        } catch (error) {
          console.error('Lỗi khi lấy dữ liệu:', error);
        }
      };
      fetchUserData();
    }, [])
  );

  const generateMeal = async () => {
    setLoading(true);
    setMealPlan(null);
    setError('');

    const body = {
      age: age || 25,
      weight: weight ? parseInt(weight, 10) : 70,
      height: height ? parseInt(height, 10) : 175,
      gender: gender || 'male',
      note,
    };

    try {
    //   const response = {
    //     "nutritionalNeeds": {
    //       "description": "Nhu cầu năng lượng hàng ngày của người dùng phụ thuộc vào tuổi, cân nặng, chiều cao, và giới tính. Với chiều cao 172 cm, cân nặng 50 kg, và giới tính nữ, mức độ hoạt động sinh hoạt được tính toán là trung bình (BMR + hoạt động nhẹ). Không sử dụng chất béo bão hòa trong chế độ ăn.",
    //       "totalCalories": "Khoảng 1,800 kcal mỗi ngày, với tỷ lệ macronutrients gợi ý: 50% Carbs - 25% Protein - 25% Fat."
    //     },
    //     "_id": "67bb7f25937e3cbff9233cfb",
    //     "days": [
    //       {
    //         "day": "Day 1",
    //         "meals": [
    //           {
    //             "meal": "Breakfast",
    //             "description": "- 1 lát bánh mì đen nguyên cám (50g) - 120 kcal - 2 thìa bơ hạt hạnh nhân (10g, không dầu hydrogen hóa) - 90 kcal - 1 quả trứng luộc - 70 kcal - 1 trái chuối nhỏ (~100g) - 90 kcal - 1 ly sữa hạt không đường (200ml) - 80 kcal ",
    //             "calories": 450
    //           },
    //           {
    //             "meal": "Lunch",
    //             "description": "- 1 bát cơm gạo lứt nhỏ (100g) - 110 kcal - 150g thịt ức gà áp chảo không dầu - 250 kcal - 200g rau cải xanh luộc (bông cải, cải bó xôi) - 50 kcal - 1 thìa dầu oliu (cho vào rau) - 120 kcal - 1 quả cam - 120 kcal ",
    //             "calories": 650
    //           },
    //           {
    //             "meal": "Dinner",
    //             "description": "- 1 bát phở cuốn với bánh phở gạo (120g) - 200 kcal - 120g cá hồi áp chảo, dùng dầu oliu thay vì bơ - 250 kcal - 200g rau xà lách, cà chua, và dưa leo trộn dầu mè - 100 kcal - 1 ly nước ép táo không đường (150ml) - 150 kcal --- ",
    //             "calories": 700
    //           }
    //         ]
    //       },
    //       {
    //         "day": "Day 2",
    //         "meals": [
    //           {
    //             "meal": "Breakfast",
    //             "description": "- 1 bát cháo yến mạch ăn kèm hạt chia (30g yến mạch, 5g hạt chia) - 150 kcal - 1 thìa hạt óc chó (7g) - 50 kcal - 1 quả táo đỏ (~120g) - 60 kcal - 1 ly sữa hạnh nhân không đường (200ml) - 80 kcal - 1 quả trứng luộc - 70 kcal ",
    //             "calories": 450
    //           },
    //           {
    //             "meal": "Lunch",
    //             "description": "- 1 bát cơm gạo lứt nhỏ (100g) - 110 kcal - 150g cá basa hấp với ít nước chanh - 220 kcal - 200g rau luộc (cải thảo, cà rốt) - 50 kcal - 25g quả bơ làm topping - 50 kcal - 1 quả kiwi - 80 kcal - 1 hũ sữa chua không đường - 140 kcal ",
    //             "calories": 650
    //           },
    //           {
    //             "meal": "Dinner",
    //             "description": "- 150g bún gạo lứt với nước dùng nấu từ rau củ - 200 kcal - 120g tôm hấp không dầu - 100 kcal - 200g rau xà lách trộn giấm táo và dầu oliu - 150 kcal - 1 bắp ngô luộc (~100g) - 100 kcal - 1 ly sinh tố bơ chuối không đường (200ml) - 150 kcal --- - Các bữa ăn đã được phân bổ với tỷ lệ Carbs/Protein/Fats phù hợp (50%/25%/25%). - Không sử dụng chất béo bão hòa; thay thế bằng dầu oliu/dầu mè và các chất béo tốt từ hạt. - Chế biến các món ăn đơn giản bằng cách luộc, hấp, áp chảo không dầu hoặc dùng dầu lành mạnh. - Uống đủ nước (2-2.5 lít mỗi ngày). ",
    //             "calories": 700
    //           }
    //         ]
    //       }
    //     ],
    //     "status": true,
    //     "createdAt": "2025-02-23T20:03:49.483Z",
    //     "updatedAt": "2025-02-23T20:03:49.483Z",
    //     "__v": 0
    //   };

    //   setTimeout(() => {
    //     if (response?.days) {
    //       setMealPlan(response);
    //       setLoading(false);
    //     } else {
    //       setError('Không thể tạo bữa ăn, vui lòng thử lại.');
    //     }
    //   }, 5000); 



      const response = await FoodAPI.genFood(body);
      console.log(response?.data);


      if (response?.data && response?.data?.days) {
        setMealPlan(response?.data);
      } else {
        setError('Không thể tạo bữa ăn, vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Lỗi API:', error);
      setError('Lỗi khi gọi API.');
    } 
    finally {
      setLoading(false);
    }
  };

  const handleSaveMealPlan = async () => {
    setSaving(true);
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (userId && mealPlan) {
        const response = await FoodAPI.saveMealPlan(userId, mealPlan);
        if (response?.status === 200) {
          alert('Lưu lộ trình ăn thành công!');
        } else {
          alert('Lỗi khi lưu lộ trình ăn.');
        }
      } else {
        alert('Lỗi khi lấy thông tin người dùng.');
      }
    } catch (error) {
      console.error('Lỗi khi lưu lộ trình ăn:', error);
      alert('Có lỗi xảy ra khi lưu lộ trình ăn.');
    } finally {
      setSaving(false);
    }
  };

  const renderMealPlan = () => {
    if (!mealPlan) return null;

    return (
      <View style={styles.mealContainer}>
        <Text style={styles.sectionTitle}>🔥 Nhu cầu dinh dưỡng</Text>
        <Text style={styles.nutritionalDescription}>
          {mealPlan.nutritionalNeeds?.description || ''}
        </Text>
        <Text style={styles.calories}>
          🌟 {mealPlan.nutritionalNeeds?.totalCalories || ''}
        </Text>

        <Text style={styles.sectionTitle}>📅 Thực đơn theo ngày</Text>
        {mealPlan.days.map((day, index) => (
          <View key={index} style={styles.dayContainer}>
            <Text style={styles.dayTitle}>{day.day}</Text>
            {day.meals.map((meal, mealIndex) => (
              <View key={mealIndex} style={styles.mealDetailsContainer}>
                <Text style={styles.mealText}>🍽 {meal.meal}</Text>
                <Text style={styles.mealDescription}>{meal.description}</Text>
                <Text style={styles.calories}>🌟 {meal.calories} kcal</Text>
              </View>
            ))}
          </View>
        ))}


        {saving && <Text style={styles.loading}>Đang lưu lộ trình...</Text>}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Thông Tin Người Dùng</Text>
      <Text style={styles.infoText}>Giới tính: {gender}</Text>
      <Text style={styles.infoText}>Chiều cao: {height} cm</Text>
      <Text style={styles.infoText}>Cân nặng: {weight} kg</Text>
      <Text style={styles.infoText}>Tuổi: {age}</Text>

      <Text style={styles.noteText}>Ghi chú: {note}</Text>
      {!mealPlan && <View style={styles.buttonContainer}>
        <Button
          title="Tạo lộ trình ăn"
          onPress={generateMeal}
          disabled={loading}
          color="#ff6347"
        />
      </View>}


      {/* Only show the save button when meal plan is generated */}
      {!loading && mealPlan && (
        <View style={styles.buttonContainer}>
          <Button
            title="Lưu lộ trình ăn"
            onPress={handleSaveMealPlan}
            disabled={saving}
            color="#2ecc71"
          />
        </View>
      )}


      {loading && <Text style={styles.loading}>Đang tạo bữa ăn...</Text>}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {renderMealPlan()}
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
    paddingTop: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2c3e50',
  },
  infoText: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 5,
  },
  loading: {
    marginTop: 10,
    fontSize: 16,
    color: 'blue',
  },
  errorText: {
    marginTop: 10,
    fontSize: 14,
    color: 'red',
    textAlign: 'center',
  },
  mealContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#e74c3c',
  },
  nutritionalDescription: {
    fontSize: 16,
    marginTop: 5,
    color: '#7f8c8d',
  },
  calories: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#27ae60',
    marginTop: 5,
  },
  dayContainer: {
    marginTop: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#ecf0f1',
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2980b9',
  },
  mealDetailsContainer: {
    marginTop: 8,
    paddingLeft: 10,
  },
  mealText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8e44ad',
  },
  mealDescription: {
    fontSize: 14,
    color: '#34495e',
    marginTop: 5,
  },
  buttonContainer: {
    marginTop: 5,
    marginBottom: 10,
  },
  noteText: {
    fontSize: 16,
    color: '#7f8c8d',
    marginVertical: 5,
    fontStyle: 'italic',
  },
});

export default GenFood;
