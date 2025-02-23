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
            if (!values.username) {
                setFieldError("username", "Tên người dùng không được để trống");
                return;
            }
            if (!values.password) {
                setFieldError("password", "Mật khẩu không được để trống");
                return;
            }

            const response = await AuthAPI.login(values.username, values.password);


            if (response?.status === 401) {
                setFieldError("password", "Mật khẩu không chính xác");
                return;
            } else if (response?.status === 404) {
                setFieldError("username", "Tên người dùng không chính xác");
                return;
            } else if (response?.status === 200) {
                await AsyncStorage.setItem('userId', response?.data?.userId);
                console.log(response?.data?.role);

                // Kiểm tra role và điều hướng
                if (response?.data?.role === "User") {
                    navigation.navigate("Home");
                } else if (response?.data?.role === "Admin") {
                    navigation.navigate("AdminHome");
                } else {
                    // Trong trường hợp role không phải "User" hoặc "Admin"
                    setFieldError("general", "Vui lòng kiểm tra lại thông tin tài khoản.");
                }

            }
        } catch (error) {
            setFieldError("general", "Đã có lỗi xảy ra. Vui lòng thử lại sau.");
            console.error("Lỗi đăng nhập:", error);
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
                    <Text style={styles.textLogin}>Đăng nhập</Text>

                    <Formik
                        initialValues={{ username: "", password: "" }}  // Thay email thành username
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
                                {/* Input Username */}
                                <TextInput
                                    placeholder="Nhập tên người dùng"
                                    placeholderTextColor="#999"
                                    style={[
                                        styles.input,
                                        touched.username && errors.username ? styles.inputError : null
                                    ]}
                                    onChangeText={handleChange("username")}  // Dùng username
                                    onBlur={handleBlur("username")}
                                    value={values.username}  // Dùng username
                                    autoCapitalize="none"
                                />
                                {touched.username && errors.username && (
                                    <Text style={styles.errorText}>{errors.username}</Text>
                                )}

                                {/* Input Mật khẩu */}
                                <View style={styles.inputPassword}>
                                    <TextInput
                                        placeholder="Nhập mật khẩu"
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

                                {/* Nút Đăng nhập */}
                                <TouchableOpacity style={styles.btnLogin} onPress={handleSubmit}>
                                    <Text style={styles.btnText}>Đăng nhập</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Formik>

                    {/* Đăng ký + Các phương thức đăng nhập khác */}
                    <View style={styles.signupContainer}>
                        <Text style={{ marginTop: 20, textAlign: "center" }}>
                            Chưa có tài khoản?{" "}
                            <Text
                                onPress={() => navigation.navigate("SignUp")}
                                style={{ color: "blue" }}
                            >
                                Đăng ký
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
        height: 280,
        width: width - 100,
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
