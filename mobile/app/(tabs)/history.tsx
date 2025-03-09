import { Text, ScrollView } from "react-native";
import React from "react";
import { useDiagnoseHistoryStore } from "@/store/useDiagnoseHistoryStore";

const Page = () => {
  const { history } = useDiagnoseHistoryStore();
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: 150 }}
    >
      <Text>{JSON.stringify({ history }, undefined, 2)}</Text>
    </ScrollView>
  );
};

export default Page;
