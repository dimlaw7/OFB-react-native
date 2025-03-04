import images from "@/assets/constants/images";
import { useAuthContext } from "@/hooks/useContext/AuthProvider";
import useAuth from "@/services/useAuth";
import { Link, Redirect } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
const axios = require("axios").default;

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  //const [isLoading, setIsLoading] = useState<boolean>(false);
  const [redirect, setRedirect] = useState<boolean>(false);
  const { login } = useAuth();

  const isDisabled = !email.trim() || !password.trim();
  const { user, isLoggedIn, setUser, isLoading } = useAuthContext();
  const handleLogin = async () => {
    const result = await login({ email, password });
    if (result) setRedirect(true);
    // try {
    //   setIsLoading(true);
    //   const response = await axios.post(
    //     "http://192.168.0.102:3000/api/v1/user/login",
    //     {
    //       email: email,
    //       pass: password,
    //     }
    //   );
    //   if (response.data.status === "error") {
    //     throw new Error("Login error from server");
    //   }
    //   if (!response.data.payload) {
    //     throw new Error("Token is missing in the response");
    //   }
    //   await AsyncStorage.setItem("token", response.data.payload);
    //   console.log("You are logged In");
    // } catch (e) {
    //   console.log("Error!", e);
    // } finally {
    //   setIsLoading(false);
    // }
  };
  if (redirect) {
    return <Redirect href="/" />;
  }
  return (
    <>
      <View style={styles.inputGroup}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            placeholderTextColor="#6420AAAD"
          />
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            placeholderTextColor="#6420AAAD"
            secureTextEntry
          />
          <Image
            source={images.eye}
            style={{ position: "absolute", top: 12, left: 10 }}
          />
        </View>
      </View>
      <View style={styles.actionsWrapper}>
        <Text style={{ color: "#A7A7A7" }}>Remember Me</Text>
        <Link href="/profile" style={{ color: "#6240AA" }}>
          Forgot Password?
        </Link>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          disabled={isDisabled}
          onPress={handleLogin}
          style={[
            styles.buttonLogin,
            (isDisabled || isLoading) && { backgroundColor: "#B9A7D6" },
          ]}
        >
          <Text style={styles.buttonText}>
            {!isLoading ? "Log In" : "Logging In..."}
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
  inputGroup: { marginTop: 49, gap: 32 },
  inputWrapper: { position: "relative" },
  input: {
    backgroundColor: "#f2f2f2", //#f5f1f9
    height: 50,
    paddingLeft: 16, //42,
    color: "#6420AA",
    fontFamily: "sf-regular",
    borderRadius: 10,
    fontSize: 14,
    alignItems: "center",
  },
  placeholder: {
    position: "absolute",
    left: 16,
    top: 16,
    color: "#857F86",
    fontWeight: "bold",
    zIndex: 1,
  },
  buttonWrapper: { marginTop: 64, gap: 32 },
  buttonLogin: {
    backgroundColor: "#6240AA",
    borderRadius: 10,
    paddingVertical: 12,
    height: 50,
    justifyContent: "center",
    shadowColor: "#4D3385", // Slightly darker shade of #6240AA
    shadowOffset: {
      width: 0,
      height: 4, // Depth of shadow
    },
    shadowOpacity: 0.2, // Subtle shadow effect
    shadowRadius: 6, // Blurring effect
    elevation: 6, // For Android
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
  },
  actionsWrapper: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default LoginForm;
