import React from "react";
import { Tabs } from "expo-router";
import { useMediaQuery } from "@/hooks";
import { Platform, StyleSheet } from "react-native";
import { COLORS, FONTS } from "@/constants";
import { Ionicons } from "@expo/vector-icons";

const Layout = () => {
  const {
    dimension: { width },
  } = useMediaQuery();
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarStyle: {
          height:
            width >= 600 ? 70 : Platform.select({ ios: 100, android: 80 }), //os === "ios" ? 100 : 80,
          backgroundColor: COLORS.transparent,
          position: "absolute",
          elevation: 0,
        },
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: COLORS.main,
        tabBarInactiveTintColor: COLORS.gray,
        headerShown: true,
        tabBarLabelStyle: {
          fontFamily: FONTS.bold,
          fontSize: 12,
          marginTop: width >= 600 ? 10 : -10,
          marginBottom: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" color={color} size={size} />
          ),
          // header: (props) => <HomeHeader {...props} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cloud-upload-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
