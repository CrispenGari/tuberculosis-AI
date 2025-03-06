import { View, Text } from "react-native";
import React from "react";
import { useSettingsStore } from "@/store/useSettingsStore";

const Page = () => {
  const { settings, update } = useSettingsStore();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        onPress={() => {
          update({ ...settings, new: true });
        }}
      >
        Page
      </Text>
    </View>
  );
};

export default Page;
