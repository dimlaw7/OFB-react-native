import images from "@/assets/constants/images";
import LoginForm from "@/components/login/LoginForm";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {
  const goBack = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Image source={images.arrowBack} />
        </TouchableOpacity>

        <Image source={images.foodBasket} style={styles.logo} />

        <View style={styles.headerWrapper}>
          <Text style={styles.header}>Login to your account</Text>
          <Text style={styles.subheader}>Enter your credentials to log in</Text>
        </View>

        <LoginForm />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "#ffffff", height: "100%" },
  scrollView: { paddingHorizontal: 24, paddingTop: 32 },
  backButton: {
    position: "absolute",
    backgroundColor: "#f5f1f9",
    width: 40,
    height: 40,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: { alignSelf: "center", width: 150, height: 150 },
  headerWrapper: { marginVertical: 24 },
  header: {
    fontSize: 20,
    fontFamily: "sf-bold",
    textAlign: "center",
  },
  subheader: {
    fontFamily: "sf-regular",
    textAlign: "center",
    fontSize: 14,
    marginTop: 12,
  },
});

export default SignIn;
