import { View, SafeAreaView, Platform, TouchableOpacity } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS, FONTS } from "@/constants";
import Typography from "../Typography/Typography";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "@/store/useSettingsStore";

const HistoryHeader = () => {
  const { top } = useSafeAreaInsets();
  const { settings } = useSettingsStore();
  return (
    <SafeAreaView
      style={{
        backgroundColor: settings.theme === "dark" ? COLORS.dark : COLORS.light,
      }}
    >
      <View
        style={{
          paddingBottom: 14,
          paddingTop: Platform.select({ ios: 0, android: top + 10 }),
          width: "100%",
          paddingHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          styles={{
            fontFamily: FONTS.bold,
            fontSize: 20,
          }}
        >
          History
        </Typography>

        <TouchableOpacity
          hitSlop={20}
          style={{
            borderRadius: 40,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLORS.secondary,
            width: 40,
            height: 40,
          }}
        >
          <Ionicons name="help-outline" size={20} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HistoryHeader;
