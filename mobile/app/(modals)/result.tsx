import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useSettingsStore } from "@/store/useSettingsStore";
import { COLORS, FONTS } from "@/constants";
import { THistory } from "@/types";
import Card from "@/components/Card/Card";
import Typography from "@/components/Typography/Typography";
import Animated, {
  SlideInLeft,
  SlideInRight,
  ZoomInDown,
} from "react-native-reanimated";
import { onImpact } from "@/utils";
import Bar from "@/components/BarChart/BarChart";

const Page = () => {
  const { results } = useLocalSearchParams<{ results: string }>();
  const history = JSON.parse(results) as THistory;
  const { settings } = useSettingsStore();
  const router = useRouter();
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "DIAGNOSING RESULTS",
          headerStyle: {
            backgroundColor:
              history.prediction.prediction.label === 0
                ? COLORS.tertiary
                : COLORS.secondary,
          },
          headerTitleStyle: {
            fontSize: 18,
            fontFamily: FONTS.bold,
            color: COLORS.white,
          },
        }}
      />
      <ScrollView
        style={{
          flex: 1,
          backgroundColor:
            settings.theme === "dark" ? COLORS.dark : COLORS.light,
        }}
        contentContainerStyle={{
          paddingBottom: 150,
          padding: 20,
        }}
      >
        <Animated.View entering={SlideInRight.duration(500).delay(200)}>
          <Card style={{ width: "100%", maxWidth: 400, alignSelf: "center" }}>
            <View
              style={{
                position: "absolute",
                backgroundColor:
                  history.prediction.prediction.label === 0
                    ? COLORS.tertiary
                    : COLORS.secondary,
                top: -10,
                width: 100,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 999,
                shadowOpacity: 0.5,
                elevation: 2,
                shadowOffset: { width: 2, height: 2 },
                shadowRadius: 5,
                shadowColor: COLORS.tertiary,
                padding: 3,
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  fontFamily: FONTS.bold,
                  textTransform: "uppercase",
                }}
              >
                {history.prediction.prediction.class_label}
              </Text>
            </View>
            <Typography
              styles={{
                marginTop: 10,
                fontFamily: FONTS.bold,
                fontSize: 18,
              }}
            >
              TB Results
            </Typography>

            <Typography styles={{ fontFamily: FONTS.bold }}>
              {history.prediction.prediction.label === 0
                ? `The results show that you don't have TB with a confidence of ${
                    history.prediction.prediction.probability * 100
                  }%.`
                : `The results show that you have TB with a confidence of ${
                    history.prediction.prediction.probability * 100
                  }%.`}
            </Typography>

            <Typography styles={{ alignSelf: "flex-end" }}>
              {history.date}
            </Typography>
          </Card>
        </Animated.View>

        <Animated.View
          entering={ZoomInDown.duration(500).delay(200)}
          style={{
            marginTop: 30,
          }}
        >
          <Card style={{ width: "100%", maxWidth: 400, alignSelf: "center" }}>
            <View
              style={{
                position: "absolute",
                backgroundColor:
                  history.prediction.prediction.label === 0
                    ? COLORS.tertiary
                    : COLORS.secondary,
                top: -10,
                width: 100,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 999,
                shadowOpacity: 0.5,
                elevation: 2,
                shadowOffset: { width: 2, height: 2 },
                shadowRadius: 5,
                shadowColor: COLORS.tertiary,
                padding: 3,
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  fontFamily: FONTS.bold,
                  textTransform: "uppercase",
                }}
              >
                X-Ray Image
              </Text>
            </View>
            <Animated.Image
              style={{
                width: 250,
                height: 300,
                backgroundColor: COLORS.gray,
                borderRadius: 10,
                marginVertical: 20,
                alignSelf: "center",
              }}
              source={{ uri: history?.xray }}
            />
          </Card>
        </Animated.View>
        <Animated.View
          entering={SlideInLeft.duration(500).delay(200)}
          style={{
            marginTop: 30,
          }}
        >
          <Card style={{ width: "100%", maxWidth: 400, alignSelf: "center" }}>
            <View
              style={{
                position: "absolute",
                backgroundColor:
                  history.prediction.prediction.label === 0
                    ? COLORS.tertiary
                    : COLORS.secondary,
                top: -10,
                width: 100,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 999,
                shadowOpacity: 0.5,
                elevation: 2,
                shadowOffset: { width: 2, height: 2 },
                shadowRadius: 5,
                shadowColor: COLORS.tertiary,
                padding: 3,
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  fontFamily: FONTS.bold,
                  textTransform: "uppercase",
                }}
              >
                model used
              </Text>
            </View>
            <Typography
              styles={{
                marginTop: 10,
                fontFamily: FONTS.bold,
              }}
            >
              {`The model that was used to do the diagnosing is "${history.prediction.model}". Please try to diagnose using other models to compare the results output.`}
            </Typography>

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
                Try other Models
              </Text>
            </TouchableOpacity>
          </Card>
        </Animated.View>

        <Animated.View
          entering={SlideInLeft.duration(500).delay(200)}
          style={{
            marginTop: 30,
          }}
        >
          <Card style={{ width: "100%", maxWidth: 400, alignSelf: "center" }}>
            <View
              style={{
                position: "absolute",
                backgroundColor:
                  history.prediction.prediction.label === 0
                    ? COLORS.tertiary
                    : COLORS.secondary,
                top: -10,
                width: 100,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 999,
                shadowOpacity: 0.5,
                elevation: 2,
                shadowOffset: { width: 2, height: 2 },
                shadowRadius: 5,
                shadowColor: COLORS.tertiary,
                padding: 3,
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  fontFamily: FONTS.bold,
                  textTransform: "uppercase",
                }}
              >
                model used
              </Text>
            </View>
            <Bar />
          </Card>
        </Animated.View>
      </ScrollView>
    </>
  );
};

export default Page;
