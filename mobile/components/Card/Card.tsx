import { StyleProp, View, ViewStyle } from "react-native";
import React from "react";
import { COLORS } from "@/constants";
import { useSettingsStore } from "@/store/useSettingsStore";

const Card = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) => {
  const {
    settings: { theme },
  } = useSettingsStore();
  return (
    <View
      style={[
        {
          padding: 10,
          borderRadius: 10,
          backgroundColor:
            theme === "dark" ? COLORS.darkSecondary : COLORS.lightSecondary,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default Card;
