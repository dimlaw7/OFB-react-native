import { SplashScreen, Stack } from "expo-router";
import "./global.css";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import AuthProvider from "@/hooks/useContext/AuthProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { JwtPayload, jwtDecode } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  username: string;
  isLoggedIn: boolean;
}

export default function RootLayout() {
  const [auth, setAuth] = useState<string>("Hello World");
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
      value={{ auth, setAuth, isLoggedIn, isLoading, setIsLoading }}
    >
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
}
