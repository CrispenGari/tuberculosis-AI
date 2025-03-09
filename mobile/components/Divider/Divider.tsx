import { View, Text, StyleProp, TextStyle, StyleSheet } from "react-native";
import React from "react";
import { COLORS, FONTS } from "@/constants";
import { useSettingsStore } from "@/store/useSettingsStore";

const Divider = ({
  position = "left",
  title,
  titleStyles,
}: {
  position?: "left" | "right" | "center";
  title: string;
  titleStyles?: StyleProp<TextStyle>;
}) => {
  const {
    settings: { theme },
  } = useSettingsStore();
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        marginVertical: 10,
        width: "100%",
      }}
    >
      {position === "center" || position === "right" ? (
        <View
          style={{
            borderBottomColor: COLORS.gray,
            borderBottomWidth: 0.34,
            flex: 1,
          }}
        />
      ) : null}
      <Text
        style={[
          {
            fontFamily: FONTS.bold,
            color: theme === "dark" ? COLORS.white : COLORS.black,
            fontSize: 18,
          },
          titleStyles,
        ]}
      >
        {title}
      </Text>
      {position === "center" || position === "left" ? (
        <View
          style={{
            borderBottomColor: COLORS.gray,
            borderBottomWidth: 0.34,
            flex: 1,
          }}
        />
      ) : null}
    </View>
  );
};

export default Divider;
