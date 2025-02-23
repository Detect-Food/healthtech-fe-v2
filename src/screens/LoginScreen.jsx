import {
    Dimensions, Image, StyleSheet, Text, View, TouchableOpacity,
    TextInput, KeyboardAvoidingView, Platform, ScrollView,
    SafeAreaView, Keyboard
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import AuthAPI from '../api/AuthAPI';
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

const LoginScreen = () => {
    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState(true);


    const handleLogin = async (values, { setFieldError }) => {
        try {
            // Kiểm tra đầu vào
            if (!values.password || values.password.length < 6) {
                setFieldError("password", "Password must be at least 6 characters");
                return;
            }

            // Gửi yêu cầu login đến API
            const response = await AuthAPI.login(values.email, values.password);
            console.log(response?.status);
            console.log(response?.data);

            // Kiểm tra kết quả trả về từ API
            if (response?.status === 200 && response) {
                // Lưu userId vào AsyncStorage
                await AsyncStorage.setItem('userId', response?.data?.userId);

                // Chuyển hướng đến trang Home nếu login thành công
                navigation.navigate("Home");
                
            } else {
                // Xử lý lỗi từ API (nếu có)
                setFieldError("general", "Login failed. Please try again.");
            }
        } catch (error) {
            // Xử lý lỗi nếu yêu cầu API thất bại
            setFieldError("general", "An error occurred. Please try again later.");
            console.error("Login Error:", error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.containerImage}>
                <Image
                    source={require("../../assets/images/logo.png")}
                    resizeMode="center"
                    style={{ height: "100%", width: "100%" }}
                />
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.containerForm}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20} // Điều chỉnh khoảng cách
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <Text style={styles.textLogin}>Log In</Text>

                    <Formik
                        initialValues={{ email: "", password: "" }}
                        onSubmit={handleLogin}
                    >
                        {({
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            values,
                            errors,
                            touched,
                        }) => (
                            <View style={styles.inputForm}>
                                {/* Email Input */}
                                <TextInput
                                    placeholder="Enter your Username"
                                    placeholderTextColor="#999"
                                    style={[
                                        styles.input,
                                        touched.email && errors.email ? styles.inputError : null
                                    ]}
                                    onChangeText={handleChange("email")}
                                    onBlur={handleBlur("email")}
                                    value={values.email}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                                {touched.email && errors.email && (
                                    <Text style={styles.errorText}>{errors.email}</Text>
                                )}

                                {/* Password Input */}
                                <View style={styles.inputPassword}>
                                    <TextInput
                                        placeholder="Enter your password"
                                        placeholderTextColor="#999"
                                        style={[
                                            styles.input,
                                            touched.password && errors.password ? styles.inputError : null
                                        ]}
                                        secureTextEntry={showPassword}
                                        onChangeText={handleChange("password")}
                                        onBlur={handleBlur("password")}
                                        value={values.password}
                                        autoCapitalize="none"
                                    />
                                    <TouchableOpacity
                                        onPress={() => setShowPassword(!showPassword)}
                                        style={styles.eyeButton}
                                    >
                                        <Ionicons
                                            name={showPassword ? "eye-outline" : "eye-off-outline"}
                                            size={24}
                                            color="gray"
                                        />
                                    </TouchableOpacity>
                                </View>
                                {touched.password && errors.password && (
                                    <Text style={styles.errorText}>{errors.password}</Text>
                                )}

                                {/* Login Button */}
                                <TouchableOpacity style={styles.btnLogin} onPress={handleSubmit}>
                                    <Text style={styles.btnText}>Log In</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Formik>

                    {/* Signup + Other Login Methods */}
                    <View style={styles.signupContainer}>
                        <Text style={{ marginTop: 20, textAlign: "center" }}>
                            Don’t have an account?{" "}
                            <Text
                                onPress={() => navigation.navigate("SignUp")}
                                style={{ color: "blue" }}
                            >
                                Sign Up
                            </Text>
                        </Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerImage: {
        alignItems: "center",
        height: 180,
        width: width - 100,
        marginTop: 50,
        marginBottom: 10,
        marginHorizontal: 50,
    },
    containerForm: {
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
        flex: 1,
        backgroundColor: "white",
        width: width,
        padding: 20,
    },
    inputForm: {
        marginTop: 20,
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
    textLogin: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 20,
        textAlign: "center",
    },
    btnLogin: {
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
    signupContainer: {
        marginTop: 20,
        alignItems: "center",
    }
});
