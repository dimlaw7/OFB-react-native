import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import icons from "@/assets/constants/images";

export const TabIcon = ({
  icon,
  title,
  focused,
}: {
  icon: any;
  title: string;
  focused: boolean;
}) => (
  <View
    style={{
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      marginTop: 12,
    }}
  >
    <Image
      source={icon}
      tintColor={focused ? "#6420AA" : "#666876"}
      resizeMode="contain"
    />
    <Text
      style={[
        { fontSize: 10, width: 100, textAlign: "center" },
        { color: focused ? "#6420AA" : "#666876" },
      ]}
    >
      {title}
    </Text>
  </View>
);

export default function TablLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarBadgeStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.home} focused={focused} title="Home" />
          ),
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="packages"
        options={{
          title: "Packages",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={icons.menuSquare}
              focused={focused}
              title="Packages"
            />
          ),
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.user} focused={focused} title="Profile" />
          ),
        }}
      ></Tabs.Screen>
    </Tabs>
  );
}
