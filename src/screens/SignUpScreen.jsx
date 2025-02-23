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
    const [notificationMessage, setNotificationMessage] = useState(""); // State to store the notification message

    const handleSignUp = async (values, { setFieldError }) => {
        // Lấy dữ liệu từ AsyncStorage
        const storedAge = await AsyncStorage.getItem('age');
        const storedGender = await AsyncStorage.getItem('gender');
        const storedHeight = await AsyncStorage.getItem('height');
        const storedWeight = await AsyncStorage.getItem('weight');

        // Kiểm tra dữ liệu form
        if (!values.username) {
            setFieldError("username", "Username is required");
            return;
        }
        if (!values.email || !values.email.includes("@")) {
            setFieldError("email", "Valid email is required");
            return;
        }
        if (!values.password || values.password.length < 6) {
            setFieldError("password", "Password must be at least 6 characters");
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
            console.log("Response Status Code:", response?.status);
            console.log("Response Data:", response?.data?.message);

            // Kiểm tra kết quả đăng ký với status 201
            if (response?.status === 201) {
                // Hiển thị thông báo thành công
                setNotificationMessage(response?.data?.message || "Registration successful!");

                // Thêm delay 2 giây trước khi chuyển đến màn hình Login
                setTimeout(() => {
                    navigation.navigate("Login");
                }, 1300); // Delay 2000ms (2 giây)
            } else {
                setFieldError("general", "Registration failed. Please try again.");
                setNotificationMessage("Registration failed. Please try again.");
            }

        } catch (error) {
            // Xử lý lỗi API
            setFieldError("general", "An error occurred. Please try again later.");
            setNotificationMessage("An error occurred. Please try again later.");
            console.error("Sign Up Error:", error);
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
                        <Text style={styles.textTitle}>Sign Up</Text>
                    </View>

                    <Formik initialValues={{ username: "", email: "", password: "" }} onSubmit={handleSignUp}>
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <View style={styles.inputForm}>
                                {/* Username Input */}
                                <TextInput
                                    placeholder="Enter your username"
                                    placeholderTextColor="#999"
                                    style={[styles.input, touched.username && errors.username ? styles.inputError : null]}
                                    onChangeText={handleChange("username")}
                                    onBlur={handleBlur("username")}
                                    value={values.username}
                                    autoCapitalize="none"
                                />
                                {touched.username && errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

                                {/* Email Input */}
                                <TextInput
                                    placeholder="Enter your email"
                                    placeholderTextColor="#999"
                                    style={[styles.input, touched.email && errors.email ? styles.inputError : null]}
                                    onChangeText={handleChange("email")}
                                    onBlur={handleBlur("email")}
                                    value={values.email}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                                {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                                {/* Password Input */}
                                <View style={styles.inputPassword}>
                                    <TextInput
                                        placeholder="Enter your password"
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

                                {/* Sign Up Button */}
                                <TouchableOpacity style={styles.btnSignUp} onPress={handleSubmit}>
                                    <Text style={styles.btnText}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Formik>

                    {/* Display Notification Message */}
                    {notificationMessage ? (
                        <Text style={styles.notificationText}>{notificationMessage}</Text>
                    ) : null}

                    {/* Go to Login */}
                    <View>
                        <Text style={{ marginTop: 20, textAlign: "center" }}>
                            Already have an account?{" "}
                            <Text onPress={() => navigation.navigate("Login")} style={{ color: "blue" }}>
                                Log In
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
