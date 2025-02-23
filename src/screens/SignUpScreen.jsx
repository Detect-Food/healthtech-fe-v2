import React, { useState } from "react";
import { Alert, SafeAreaView, Text, TextInput, TouchableOpacity, View, StyleSheet, ScrollView, Dimensions, KeyboardAvoidingView, Platform, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";
import AuthAPI from "../api/AuthAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

const SignUpScreen = () => {
    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState(true);
    const [notificationMessage, setNotificationMessage] = useState(""); // State để lưu thông báo

    const handleSignUp = async (values, { setFieldError }) => {
        // Lấy dữ liệu từ AsyncStorage
        const storedAge = await AsyncStorage.getItem('age');
        const storedGender = await AsyncStorage.getItem('gender');
        const storedHeight = await AsyncStorage.getItem('height');
        const storedWeight = await AsyncStorage.getItem('weight');

        // Kiểm tra dữ liệu form
        if (!values.username) {
            setFieldError("username", "Tên người dùng là bắt buộc");
            return;
        }
        if (!values.email || !values.email.includes("@")) {
            setFieldError("email", "Email hợp lệ là bắt buộc");
            return;
        }
        if (!values.password || values.password.length < 6) {
            setFieldError("password", "Mật khẩu phải có ít nhất 6 ký tự");
            return;
        }

        // Dữ liệu cần gửi lên API
        const body = {
            username: values.username,
            password: values.password,
            email: values.email,
            age: storedAge,
            gender: storedGender,
            height: storedHeight,
            weight: storedWeight,
        };

        try {
            const response = await AuthAPI.signUp(body);
            console.log("Mã trạng thái phản hồi:", response?.status);
            console.log("Dữ liệu phản hồi:", response?.data?.message);

            // Kiểm tra kết quả đăng ký với status 201
            if (response?.status === 201) {
                // Hiển thị thông báo thành công
                setNotificationMessage(response?.data?.message || "Đăng ký thành công!");

                // Thêm delay 2 giây trước khi chuyển đến màn hình Đăng nhập
                setTimeout(() => {
                    navigation.navigate("Login");
                }, 1300); // Delay 1300ms (1.3 giây)
            } else {
                setFieldError("general", "Đăng ký không thành công. Vui lòng thử lại.");
                setNotificationMessage("Đăng ký không thành công. Vui lòng thử lại.");
            }

        } catch (error) {
            // Xử lý lỗi API
            setFieldError("general", "Đã có lỗi xảy ra. Vui lòng thử lại sau.");
            setNotificationMessage("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
            console.error("Lỗi đăng ký:", error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.containerImage}>
                <Image source={require("../../assets/images/logo.png")} resizeMode="center" style={{ height: "100%", width: "100%" }} />
            </View>

            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.containerForm}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ marginTop: 20 }}>
                        <Text style={styles.textTitle}>Đăng ký</Text>
                    </View>

                    <Formik initialValues={{ username: "", email: "", password: "" }} onSubmit={handleSignUp}>
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <View style={styles.inputForm}>
                                {/* Nhập tên người dùng */}
                                <TextInput
                                    placeholder="Nhập tên người dùng"
                                    placeholderTextColor="#999"
                                    style={[styles.input, touched.username && errors.username ? styles.inputError : null]}
                                    onChangeText={handleChange("username")}
                                    onBlur={handleBlur("username")}
                                    value={values.username}
                                    autoCapitalize="none"
                                />
                                {touched.username && errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

                                {/* Nhập email */}
                                <TextInput
                                    placeholder="Nhập email của bạn"
                                    placeholderTextColor="#999"
                                    style={[styles.input, touched.email && errors.email ? styles.inputError : null]}
                                    onChangeText={handleChange("email")}
                                    onBlur={handleBlur("email")}
                                    value={values.email}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                                {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                                {/* Nhập mật khẩu */}
                                <View style={styles.inputPassword}>
                                    <TextInput
                                        placeholder="Nhập mật khẩu của bạn"
                                        placeholderTextColor="#999"
                                        style={[styles.input, touched.password && errors.password ? styles.inputError : null]}
                                        secureTextEntry={showPassword}
                                        onChangeText={handleChange("password")}
                                        onBlur={handleBlur("password")}
                                        value={values.password}
                                        autoCapitalize="none"
                                    />
                                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
                                        <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={24} color="gray" />
                                    </TouchableOpacity>
                                </View>
                                {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                                {/* Nút Đăng ký */}
                                <TouchableOpacity style={styles.btnSignUp} onPress={handleSubmit}>
                                    <Text style={styles.btnText}>Đăng ký</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Formik>

                    {/* Hiển thị thông báo */}
                    {notificationMessage ? (
                        <Text style={styles.notificationText}>{notificationMessage}</Text>
                    ) : null}

                    {/* Đi đến màn hình Đăng nhập */}
                    <View>
                        <Text style={{ marginTop: 20, textAlign: "center" }}>
                            Đã có tài khoản?{" "}
                            <Text onPress={() => navigation.navigate("Login")} style={{ color: "blue" }}>
                                Đăng nhập
                            </Text>
                        </Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerImage: {
        alignItems: "center",
        height: 280,
        width: width - 100,
        // marginTop: 50,
        marginBottom: 10,
        marginHorizontal: 50,
    },
    containerForm: {
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
        flex: 1,
        backgroundColor: "white",
        width: width,
    },
    inputForm: {
        marginTop: 20,
        marginHorizontal: 20,
    },
    input: {
        marginBottom: 20,
        width: width - 40,
        height: 50,
        borderWidth: 0.5,
        borderColor: "gray",
        borderRadius: 10,
        paddingLeft: 20,
        color: "black",
    },
    inputPassword: {
        flexDirection: "row",
        alignItems: "center",
        position: "relative",
    },
    eyeButton: {
        position: "absolute",
        right: 15,
        top: 15,
    },
    inputError: {
        borderColor: "red",
    },
    textTitle: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 20,
        textAlign: "center",
    },
    btnSignUp: {
        backgroundColor: "blue",
        padding: 12,
        borderRadius: 10,
        marginTop: 20,
    },
    btnText: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 18,
    },
    errorText: {
        color: "red",
        marginBottom: 10,
    },
    notificationText: {
        color: "green",
        marginTop: 20,
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default SignUpScreen;
