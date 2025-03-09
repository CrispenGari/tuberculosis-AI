import { Text, StyleProp, TextStyle } from "react-native";
import React from "react";
import { COLORS, FONTS } from "@/constants";
import { useSettingsStore } from "@/store/useSettingsStore";

const Typography = ({
  children,
  styles,
}: {
  children: React.ReactNode;
  styles?: StyleProp<TextStyle>;
}) => {
  const {
    settings: { theme },
  } = useSettingsStore();
  return (
    <Text
      style={[
        {
          fontFamily: FONTS.regular,
          color: theme === "dark" ? COLORS.white : COLORS.black,
        },
        styles,
      ]}
    >
      {children}
    </Text>
  );
};

export default Typography;
