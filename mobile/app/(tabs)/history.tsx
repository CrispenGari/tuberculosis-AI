import { FlatList, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useDiagnoseHistoryStore } from "@/store/useDiagnoseHistoryStore";
import HistoryItem from "@/components/HistoryItem/HistoryItem";
import { COLORS, FONTS, LOGO } from "@/constants";
import { useSettingsStore } from "@/store/useSettingsStore";
import Card from "@/components/Card/Card";
import Typography from "@/components/Typography/Typography";
import Animated, { ZoomInDown } from "react-native-reanimated";
import { onImpact } from "@/utils";
import { useRouter } from "expo-router";

const Page = () => {
  const { history } = useDiagnoseHistoryStore();
  const {
    settings: { theme, ...settings },
  } = useSettingsStore();
  const router = useRouter();
  if (history.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          padding: 20,
          backgroundColor: theme === "dark" ? COLORS.dark : COLORS.light,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          style={{
            width: "100%",
            maxWidth: 500,

            alignItems: "center",
            padding: 20,
          }}
        >
          <>
            <Typography styles={{ fontFamily: FONTS.bold, fontSize: 18 }}>
              There is no Diagnosis History found.
            </Typography>
            <Animated.Image
              entering={ZoomInDown.delay(200).duration(200)}
              source={LOGO}
              style={{
                width: 200,
                height: 200,
                alignSelf: "center",
              }}
            />
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: COLORS.secondary,
                borderRadius: 999,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 30,
                width: "100%",
                maxWidth: 300,
                marginBottom: 10,
                flexDirection: "row",
                gap: 15,
                alignSelf: "center",
              }}
              onPressIn={async () => {
                if (settings.haptics) {
                  await onImpact();
                }
                if (router.canGoBack()) {
                  router.back();
                } else {
                  router.replace("/(tabs)");
                }
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  fontFamily: FONTS.bold,
                  fontSize: 18,
                }}
              >
                Start Diagnosing Now
              </Text>
            </TouchableOpacity>
          </>
        </Card>
      </View>
    );
  }

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
