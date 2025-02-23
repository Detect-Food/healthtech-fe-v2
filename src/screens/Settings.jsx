import { View, Text, ScrollView, StyleSheet, TextInput, Image, Switch, SafeAreaView, TouchableOpacity, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"

const SettingsItem = ({ icon, label, value, color = "#000", showSwitch, isOn, showArrow = true, onPress }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
    <View style={styles.settingsItem}>
      <View style={styles.settingsItemLeft}>
        <View style={[styles.iconContainer, { backgroundColor: color }]}>
          <Ionicons name={icon} size={22} color="#fff" />
        </View>
        <Text style={styles.settingsItemLabel}>{label}</Text>
      </View>
      <View style={styles.settingsItemRight}>
        {value && <Text style={styles.settingsItemValue}>{value}</Text>}
        {showSwitch && <Switch value={isOn} onValueChange={() => { }} />}
        {showArrow && <Ionicons name="chevron-forward" size={20} color="#aaa" />}
      </View>
    </View>
  </TouchableOpacity>
)



const SettingsGroup = ({ children }) => <View style={styles.settingsGroup}>{children}</View>

export default function SettingsScreen() {
  const navigation = useNavigation()

  const handleLogout = async () => {
    try {

      await AsyncStorage.removeItem('userId');

      navigation.navigate('Login');

      Alert.alert('Đăng xuất thành công', 'Bạn đã được đăng xuất.');
    } catch (error) {
      console.error('Lỗi khi đăng xuất:', error);
      Alert.alert('Có lỗi xảy ra', 'Không thể đăng xuất, vui lòng thử lại.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={{ marginTop: 20 }} ></Text>

        {/* Profile Section */}
        <SettingsGroup>
          <View style={styles.profileItem}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>HealthTech</Text>
              <Text style={styles.profileSubtitle}> @healthtech </Text>
            </View>
          </View>
        </SettingsGroup>

        {/* System Settings */}
        <SettingsGroup>
          <SettingsItem
            icon="person-circle"
            label="Personal Detail"
            color="#007AFF"
            onPress={() => navigation.navigate("PersonalDetail")}
          />
          <SettingsItem icon="key" label="Change Password" color="#FC3D39" />
          <SettingsItem icon="lock-closed" label="Two-Factor Authentication" color="#4CD964" />
          <SettingsItem icon="eye" label="Privacy & Permissions" color="#6C2DC7" />
          <SettingsItem icon="phone-portrait" label="Manage Devices" color="#FC3D39" />
        </SettingsGroup>

        {/* General Settings */}
        <SettingsGroup>
          <SettingsItem icon="settings" label="General" color="#8E8E93" />
        </SettingsGroup>
        <SettingsGroup>
          <SettingsItem icon="log-out" label="Log Out" onPress={handleLogout} color="#FC3D39" />
        </SettingsGroup>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  settingsGroup: {
    backgroundColor: "#f9f9f9",
    marginBottom: 16,
    borderRadius: 10,
    marginHorizontal: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  settingsItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd",
  },
  settingsItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  settingsItemLabel: {
    fontSize: 16,
    color: "#000",
  },
  settingsItemRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingsItemValue: {
    fontSize: 16,
    color: "#666",
    marginRight: 8,
  },
  profileItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  profileSubtitle: {
    fontSize: 14,
    color: "#666",
  },
})
