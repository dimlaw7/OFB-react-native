import { SplashScreen, Stack } from "expo-router";
import "./global.css";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import AuthProvider from "@/hooks/useContext/AuthProvider";

export default function RootLayout() {
  const [auth, setAuth] = useState<string>("Hello World");
  const [fontsLoaded] = useFonts({
    "sf-regular": require("../assets/fonts/sf-pro-text-regular.ttf"),
    "sf-bold": require("../assets/fonts/sf-pro-text-bold.ttf"),
    "sf-heavy": require("../assets/fonts/sf-pro-text-heavy.ttf"),
    "sf-semibolditalic": require("../assets/fonts/SF-Pro-Text-SemiboldItalic.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <AuthProvider value={{ auth, setAuth }}>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
}
