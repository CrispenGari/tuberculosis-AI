import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSettingsStore } from "@/store/useSettingsStore";
import Typography from "@/components/Typography/Typography";
import { COLORS, FONTS, LOGO } from "@/constants";
import Card from "@/components/Card/Card";
import Animated, { SlideInLeft, ZoomInDown } from "react-native-reanimated";
import { onImpact } from "@/utils";
import { useRouter } from "expo-router";

const Page = () => {
  const {
    settings: { theme, ...settings },
  } = useSettingsStore();
  const router = useRouter();
  return (
    <View
      style={{
        backgroundColor: theme === "dark" ? COLORS.dark : COLORS.light,
        flex: 1,
        padding: 20,
      }}
    >
      <Card style={styles.card}>
        <Animated.Image
          entering={ZoomInDown.delay(200).duration(200)}
          source={LOGO}
          style={{
            width: 200,
            height: 200,

            alignSelf: "center",
          }}
        />
        <Typography
          styles={{
            fontFamily: FONTS.bold,
            fontSize: 20,
            alignSelf: "center",
          }}
        >
          TBAIDA
        </Typography>
      </Card>
      <Animated.View entering={SlideInLeft.duration(100).delay(100)}>
        <Card style={styles.card}>
          <Typography
            styles={{
              textAlign: "center",
              fontFamily: FONTS.bold,
              fontSize: 20,
            }}
          >
            OPPS! YOU ARE LOST
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
              GO BACK
            </Text>
          </TouchableOpacity>
        </Card>
      </Animated.View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  card: {
    padding: 10,
    maxWidth: 500,
    alignSelf: "flex-start",
    borderRadius: 5,
    width: "100%",
    paddingVertical: 20,
    marginBottom: 10,
  },
});
