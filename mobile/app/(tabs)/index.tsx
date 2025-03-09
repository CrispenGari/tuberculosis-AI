import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useSettingsStore } from "@/store/useSettingsStore";
import { COLORS } from "@/constants";
import Typography from "@/components/Typography/Typography";
import Form from "@/components/Form/Form";

const Page = () => {
  const { settings, update } = useSettingsStore();

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: settings.theme === "dark" ? COLORS.dark : COLORS.light,
      }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        padding: 20,
        paddingBottom: 150,
      }}
    >
      <Form />

      <Typography>Page</Typography>
    </ScrollView>
  );
};

export default Page;
