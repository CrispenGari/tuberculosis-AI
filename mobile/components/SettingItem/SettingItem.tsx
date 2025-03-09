import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, FONTS } from "@/constants";
import { useSettingsStore } from "@/store/useSettingsStore";
import Typography from "../Typography/Typography";

interface SettingItemProps {
  Icon: React.ReactNode;
  title: string;
  subtitle: string;
  onPress: () => void;
}
const SettingItem = ({ Icon, title, onPress, subtitle }: SettingItemProps) => {
  const {
    settings: { theme },
  } = useSettingsStore();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        gap: 10,
        paddingHorizontal: 20,
        marginBottom: 2,
      }}
    >
      {Icon}
      <View style={{ flex: 1 }}>
        <Typography styles={{ fontFamily: FONTS.bold, flexShrink: 18 }}>
          {title}
        </Typography>
        <Text
          style={{
            fontFamily: FONTS.regular,
            fontSize: 12,
            color: COLORS.gray,
          }}
        >
          {subtitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SettingItem;
