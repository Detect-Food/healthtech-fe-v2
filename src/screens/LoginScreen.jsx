import {
    Dimensions, Image, StyleSheet, Text, View, TouchableOpacity,
    TextInput, KeyboardAvoidingView, Platform, ScrollView,
    SafeAreaView
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";

const { width } = Dimensions.get("window");

const LoginScreen = () => {
    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState(true);

    const handleLogin = async (values, { setFieldError }) => {


        if (values.email !== "dev") {
            setFieldError("email", "Email is incorrect");
        }
        if (values.password !== "123") {
            setFieldError("password", "Password is incorrect");
        }
        if (values.email === "dev" && values.password === "123") {
            navigation.navigate("Home");
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
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ marginTop: 20 }}>
                        <Text style={styles.textLogin}>Log In</Text>
                    </View>

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
                                    placeholder="Enter your email"
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
                    <View>
                        <Text style={{ marginTop: 20, textAlign: "center" }}>
                            Don’t have an account?{" "}
                            <Text
                                onPress={() => navigation.navigate("Register")}
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
        height: 280,
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
});