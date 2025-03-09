import React from "react";
import { Tabs } from "expo-router";
import { useMediaQuery } from "@/hooks";
import { Platform } from "react-native";
import { COLORS, FONTS } from "@/constants";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useSettingsStore } from "@/store/useSettingsStore";
import DiagnoseHeader from "@/components/Headers/DiagnoseHeader";
import HistoryHeader from "@/components/Headers/HistoryHeader";
import SettingsHeader from "@/components/Headers/SettingsHeader";

const Layout = () => {
  const {
    dimension: { width },
  } = useMediaQuery();
  const { settings } = useSettingsStore();
  return (
    <>
      <StatusBar
        style={settings.theme === "dark" ? "light" : "dark"}
        backgroundColor={settings.theme === "dark" ? COLORS.dark : COLORS.light}
      />
      <Tabs
        initialRouteName="index"
        screenOptions={{
          tabBarStyle: {
            height:
              width >= 600 ? 70 : Platform.select({ ios: 100, android: 80 }),
            backgroundColor:
              settings.theme === "dark" ? COLORS.dark : COLORS.light,
            position: "absolute",
            elevation: 0,
          },
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: COLORS.secondary,
          tabBarInactiveTintColor:
            settings.theme === "dark" ? COLORS.gray : COLORS.main,
          headerShown: true,
          tabBarLabelStyle: {
            fontFamily: FONTS.bold,
            fontSize: 12,
            marginTop: width >= 600 ? 10 : -5,
            marginBottom: 10,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Diagnose",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="analytics-outline" color={color} size={size} />
            ),
            header: () => <DiagnoseHeader />,
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: "History",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="history" color={color} size={size} />
            ),
            header: () => <HistoryHeader />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            headerShown: true,
            title: "Settings",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings-outline" color={color} size={size} />
            ),
            header: () => <SettingsHeader />,
          }}
        />
      </Tabs>
    </>
  );
};

export default Layout;
