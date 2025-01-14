import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import images from "@/assets/constants/images";
import React, { useState } from "react";
import { Link } from "expo-router";

const LoginForm = () => {
  const [number, setNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleLogin = () => {
    console.log("Number:", number, " Pass: ", password);
  };

  return (
    <>
      <View style={{ marginTop: 49, gap: 32 }}>
        <View style={{ position: "relative" }}>
          <TextInput
            style={styles.input}
            placeholder="Mobile No."
            placeholderTextColor="#6420AA"
            onChangeText={setNumber}
            value={number}
            keyboardType="numeric"
          />
          <Image
            source={images.phone}
            style={{ position: "absolute", top: 12, left: 10 }}
          />
        </View>
        <View style={{ position: "relative" }}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#6420AA"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
          />
          <Image
            source={images.password}
            style={{ position: "absolute", top: 12, left: 10 }}
          />
        </View>
      </View>
      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: "#A7A7A7" }}>Remember Me</Text>
        <Link href="/profile" style={{ color: "#6240AA" }}>
          Forgot Password?
        </Link>
      </View>
      <View style={{ marginTop: 92, gap: 32 }}>
        <TouchableOpacity
          onPress={handleLogin}
          style={{
            backgroundColor: "#6240AA",
            borderRadius: 30,
            paddingVertical: 16,
            shadowColor: "#4D3385", // Slightly darker shade of #6240AA
            shadowOffset: {
              width: 0,
              height: 4, // Depth of shadow
            },
            shadowOpacity: 0.2, // Subtle shadow effect
            shadowRadius: 6, // Blurring effect
            elevation: 6, // For Android
          }}
        >
          <Text
            style={{
              color: "#ffffff",
              textAlign: "center",
            }}
          >
            Log in
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: "sf-bold",
            color: "#A7A7A7",
            textAlign: "center",
          }}
        >
          Don't have an account?{" "}
          <Link
            href="/profile"
            style={{ color: "#6240AA", textDecorationLine: "underline" }}
          >
            Register
          </Link>
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#f5f1f9",
    height: 50,
    paddingLeft: 42,
    color: "#6420AA",
    fontFamily: "sf-regular",
    borderRadius: 10,
    fontSize: 14,
    alignItems: "center",
  },
});

export default LoginForm;
