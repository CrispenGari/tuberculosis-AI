import { FlatList } from "react-native";
import React from "react";
import { useDiagnoseHistoryStore } from "@/store/useDiagnoseHistoryStore";
import HistoryItem from "@/components/HistoryItem/HistoryItem";
import { COLORS } from "@/constants";
import { useSettingsStore } from "@/store/useSettingsStore";

const Page = () => {
  const { history } = useDiagnoseHistoryStore();
  const {
    settings: { theme },
  } = useSettingsStore();
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={history}
      keyExtractor={({ id }) => id.toString()}
      renderItem={({ item }) => <HistoryItem history={item} />}
      style={{
        flex: 1,
        backgroundColor: theme === "dark" ? COLORS.dark : COLORS.light,
      }}
      contentContainerStyle={{ paddingBottom: 150 }}
    />
  );
};

export default Page;
