import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useSettingsStore } from "@/store/useSettingsStore";
import { COLORS, FONTS, relativeTimeObject } from "@/constants";
import { THistory } from "@/types";
import Card from "@/components/Card/Card";
import Typography from "@/components/Typography/Typography";
import Animated, {
  SlideInLeft,
  SlideInRight,
  ZoomInDown,
} from "react-native-reanimated";
import { onImpact } from "@/utils";
import TableComponent from "../../components/TableComponent/TableComponent";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocal from "dayjs/plugin/updateLocale";

dayjs.extend(relativeTime);
dayjs.extend(updateLocal);
dayjs.updateLocale("en", {
  relativeTime: relativeTimeObject,
});
const Page = () => {
  const { results } = useLocalSearchParams<{ results: string }>();
  const { settings } = useSettingsStore();
  const router = useRouter();
  const history = JSON.parse(results) as THistory;

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
        showsVerticalScrollIndicator={false}
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
                ? `The results show that you don't have TB with a model prediction accuracy of ${
                    history.prediction.prediction.probability * 100
                  }%.`
                : `The results show that you have TB with a model prediction accuracy of ${
                    history.prediction.prediction.probability * 100
                  }%.`}
            </Typography>

            <Typography styles={{ alignSelf: "flex-end" }}>
              {dayjs(new Date(history.date)).fromNow()}
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
              source={{
                uri: history?.image,
              }}
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
                width: 150,
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
                Prediction Summary
              </Text>
            </View>
            <TableComponent
              tableHead={["KEY", "VALUE"]}
              tableData={[
                ["When", dayjs(new Date(history.date)).fromNow()],
                ["Model Used", history.prediction.model],
                ["Class Label", history.prediction.prediction.label.toString()],
                ["Time Taken", `${history.prediction.time.toFixed(2)}s`],
                ["Class Name", history.prediction.prediction.class_label],
                [
                  "Confidence",
                  `${(history.prediction.prediction.probability * 100).toFixed(
                    0
                  )}%`,
                ],
              ]}
            />
          </Card>
        </Animated.View>
      </ScrollView>
    </>
  );
};

export default Page;
