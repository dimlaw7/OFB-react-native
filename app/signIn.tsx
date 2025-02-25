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
      <ScrollView style={{ paddingHorizontal: 24, paddingTop: 32 }}>
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
        <Image
          source={images.foodBasket}
          style={{ alignSelf: "center", width: 150, height: 150 }}
        />
        <View style={styles.wrapHeader}>
          <Text style={styles.header}>Login to your account</Text>
          <Text style={styles.subheader}>Don't have an account? Register</Text>
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
    fontSize: 20,
    fontFamily: "sf-bold",
    //color: "#6420AA",
    textAlign: "center",
    marginVertical: 24,
  },
  subheader: {
    //color: "#A7A7A7",
    fontFamily: "sf-regular",
    textAlign: "center",
    fontSize: 14,
  },
});

export default signIn;
