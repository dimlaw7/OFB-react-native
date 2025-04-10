import images from "@/assets/constants/images";
import { useAuthContext } from "@/hooks/useContext/AuthProvider";
import useAuth from "@/services/useAuth";
import { Link, Redirect } from "expo-router";
import React, { useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [redirect, setRedirect] = useState<boolean>(false);

  const { login } = useAuth();
  const { isLoading } = useAuthContext();

  const isDisabled = !email.trim() || !password.trim();

  const handleLogin = async () => {
    setErrorMessage(null);
    const result = await login({ email, password });
    if (result === true) {
      setRedirect(true);
    } else if (result && result.error) {
      setErrorMessage(result.error);
    }
  };

  if (redirect) {
    return <Redirect href="/" />;
  }

  return (
    <>
      <View style={styles.inputGroup}>
        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

        <View style={styles.inputWrapper}>
          <Feather
            name="mail"
            size={22}
            color="#7D7D7D"
            style={styles.iconStyle}
          />
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            placeholderTextColor="#7D7D7D"
          />
        </View>

        <View style={styles.inputWrapper}>
          <MaterialIcons
            name="lock-outline"
            size={22}
            color="#7D7D7D"
            style={styles.iconStyle}
          />
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            placeholderTextColor="#7D7D7D"
            secureTextEntry
          />
          <Image source={images.eye} style={styles.eyeIcon} />
        </View>
      </View>

      <View style={styles.actionsWrapper}>
        <Text style={styles.rememberMeText}>Remember Me</Text>
        <Link href="/profile" style={styles.forgotPasswordLink}>
          Forgot Password?
        </Link>
      </View>

      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          disabled={isDisabled}
          onPress={handleLogin}
          style={[
            styles.buttonLogin,
            (isDisabled || isLoading) && styles.disabledButton,
          ]}
        >
          <Text style={styles.buttonText}>
            {!isLoading ? "Log In" : "Logging In..."}
          </Text>
        </TouchableOpacity>

        <Text style={styles.registerText}>
          Don't have an account?{" "}
          <Link href="/profile" style={styles.registerLink}>
            Register
          </Link>
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputGroup: { marginTop: 22, gap: 22 },
  inputWrapper: { position: "relative" },
  input: {
    borderWidth: 2,
    borderColor: "#F2F2F2",
    height: 50,
    paddingLeft: 40,
    color: "#6420AA",
    fontFamily: "sf-regular",
    borderRadius: 10,
    fontSize: 14,
    alignItems: "center",
  },
  iconStyle: { position: "absolute", top: 14, left: 12 },
  eyeIcon: { position: "absolute", top: 12, left: 12 },
  buttonWrapper: { marginTop: 32, gap: 32 },
  buttonLogin: {
    backgroundColor: "#6240AA",
    borderRadius: 10,
    paddingVertical: 12,
    height: 50,
    justifyContent: "center",
    shadowColor: "#4D3385",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  disabledButton: { backgroundColor: "#B9A7D6" },
  buttonText: { color: "#ffffff", textAlign: "center" },
  actionsWrapper: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rememberMeText: { color: "#A7A7A7" },
  forgotPasswordLink: { color: "#6240AA" },
  errorText: { color: "red", textAlign: "center", marginBottom: 10 },
  registerText: {
    fontFamily: "sf-bold",
    color: "#A7A7A7",
    textAlign: "center",
  },
  registerLink: { color: "#6240AA", textDecorationLine: "underline" },
});

export default LoginForm;
