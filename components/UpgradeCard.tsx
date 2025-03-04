import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import icons from "@/assets/constants/icons";

const UpgradeCard = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.wrapper}>
        <View style={{ marginRight: 8 }}>
          <Image source={icons.star} />
        </View>
        <View>
          <Text style={{ fontSize: 16 }}>Upgrade Package</Text>
          <Text style={{ fontSize: 12, marginTop: 4 }}>
            Get more with other exclusive packages
          </Text>
        </View>
      </View>
      <Image source={icons.arrowRight} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6, // For Android
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default UpgradeCard;
