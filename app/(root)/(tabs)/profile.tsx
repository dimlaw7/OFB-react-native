import { settings } from "@/assets/constants/data";
import icons from "@/assets/constants/icons";
import images from "@/assets/constants/images";
import { useAuthContext } from "@/hooks/useContext/AuthProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface SettingsItemProps {
  icon?: ImageSourcePropType;
  title: string;
  textStyle?: string;
  showArrow?: boolean;
  onPress?: () => void;
}

const SettingsItem = ({
  icon,
  title,
  textStyle,
  showArrow = true,
  onPress,
}: SettingsItemProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 12,
    }}
  >
    <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
      <Image source={icon} tintColor={textStyle ? "red" : ""} />
      <Text style={{ fontSize: 16, color: textStyle ? "red" : "" }}>
        {title}
      </Text>
    </View>
    {showArrow && (
      <Image source={icons.arrowRight} style={{ width: 16, height: 16 }} />
    )}
  </TouchableOpacity>
);

const profile = () => {
  const { user, setIsLoggedIn } = useAuthContext();
  const handleLogout = async () => {
    try {
      setIsLoggedIn(false);
      await AsyncStorage.removeItem("token");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Profile</Text>
          <Image source={icons.bell} />
        </View>
        <View style={styles.profileSection}>
          <View style={{ overflow: "hidden", borderRadius: "100%" }}>
            <Image source={images.avatar} style={styles.avatarImage} />
            <TouchableOpacity
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                alignItems: "center",
                backgroundColor: "#0000004D",
                paddingVertical: 8,
              }}
            >
              <Image source={icons.cameraPlus} tintColor="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <View style={styles.userInfoContainer}>
            <Text style={styles.usernameText}>
              {user ? user : "undefined user"}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 22 }}>
          <SettingsItem title="My Packages" icon={icons.menuSquare} />
          <SettingsItem title="My Payments" icon={icons.history} />
        </View>
        <View style={{ marginTop: 22 }}>
          {settings.slice(2).map((item, index) => (
            <SettingsItem key={index} {...item} />
          ))}
        </View>
        <View style={{ marginTop: 22 }}>
          <SettingsItem
            title="Logout"
            icon={icons.logout}
            textStyle="red"
            showArrow={false}
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 24 },
  headerContainer: { flexDirection: "row", justifyContent: "space-between" },
  headerText: { fontFamily: "sf-heavy", fontSize: 16 },
  profileSection: {
    marginTop: 24,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatarImage: {
    position: "relative",
    borderRadius: "100%",
    width: 130,
    height: 130,
  },
  userInfoContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  usernameText: {
    marginVertical: 8,
    fontFamily: "sf-heavy",
    fontSize: 18,
  },
});

export default profile;
