import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthContext } from "@/hooks/useContext/AuthProvider";
import { Redirect, Slot } from "expo-router";

export default function AppLayout() {
  const { isLoading, isLoggedIn } = useAuthContext();
  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeAreaContainer}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </SafeAreaView>
    );
  }
  if (!isLoggedIn) {
    return <Redirect href="/signIn" />;
  }
  return <Slot />;
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6420AA",
  },
});
