import { Text, StyleProp, TextStyle } from "react-native";
import React from "react";
import { COLORS, FONTS } from "@/constants";
import { useSettingsStore } from "@/store/useSettingsStore";
import { FONT_STYLING, getFontFamily } from "@/styles";

const Typography = ({
  children,
  styles,
}: {
  children: React.ReactNode;
  styles?: StyleProp<TextStyle>;
}) => {
  const {
    settings: { theme, ...settings },
  } = useSettingsStore();
  return (
    <Text
      style={[
        {
          fontFamily: FONTS.regular,
          color: theme === "dark" ? COLORS.white : COLORS.black,
        },
        styles,
        FONT_STYLING[settings.fontsize],
        getFontFamily({ ...settings, theme }),
      ]}
    >
      {children}
    </Text>
  );
};

export default Typography;
