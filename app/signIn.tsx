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

const signIn = () => {
  const goBack = () => {};
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ width: "85%", marginHorizontal: "auto" }}>
        <TouchableOpacity
          onPress={goBack}
          style={{
            position: "absolute",
            backgroundColor: "#f5f1f9",
            width: 40,
            height: 40,
            borderRadius: 100,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image source={images.arrowBack} />
        </TouchableOpacity>
        <Image source={images.foodBasket} style={{ alignSelf: "center" }} />
        <View style={styles.wrapHeader}>
          <Text style={styles.header}>Welcome Back</Text>
          <Text style={styles.subheader}>Login To Your Account</Text>
        </View>
        <LoginForm />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "#ffffff", height: "100%" },
  logo: {},
  wrapHeader: {},
  header: {
    fontSize: 24,
    fontFamily: "sf-heavy",
    color: "#6420AA",
    textAlign: "center",
  },
  subheader: {
    marginTop: 10,
    color: "#A7A7A7",
    fontFamily: "sf-regular",
    textAlign: "center",
    fontSize: 16,
  },
});

export default signIn;
