import { SplashScreen, Stack } from "expo-router";
import "./global.css";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import AuthProvider from "@/hooks/useContext/AuthProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { StatusBar } from "expo-status-bar";

interface CustomJwtPayload extends JwtPayload {
  username: string;
  isLoggedIn: boolean;
}

export default function RootLayout() {
  const [user, setUser] = useState<string>("Hello World");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fontsLoaded] = useFonts({
    "sf-regular": require("../assets/fonts/sf-pro-text-regular.ttf"),
    "sf-bold": require("../assets/fonts/sf-pro-text-bold.ttf"),
    "sf-heavy": require("../assets/fonts/sf-pro-text-heavy.ttf"),
    "sf-semibolditalic": require("../assets/fonts/SF-Pro-Text-SemiboldItalic.ttf"),
  });

  useEffect(() => {
    //Load fonts
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    //Load logged user data
    const checkUser = async () => {
      try {
        setIsLoading(true);
        const value = await AsyncStorage.getItem("token");
        if (value) {
          const decoded = jwtDecode<CustomJwtPayload>(value);
          setIsLoggedIn(!!decoded.username);
          setUser(decoded.username);
        }
      } catch (e) {
        console.error("Error retrieving user data:", e);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, [isLoggedIn]);

  if (!fontsLoaded) return null;

  return (
    <AuthProvider
      value={{
        user,
        setUser,
        isLoggedIn,
        isLoading,
        setIsLoading,
        setIsLoggedIn,
      }}
    >
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
}
