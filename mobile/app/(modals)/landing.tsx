import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, FONTS, LANDING_MESSAGES, LOGO } from "@/constants";
import Typography from "@/components/Typography/Typography";
import Animated, { ZoomIn } from "react-native-reanimated";
import TypeWriter from "react-native-typewriter";
import { onImpact } from "@/utils";

const Page = () => {
  const { settings, update } = useSettingsStore();
  const [index, setIndex] = React.useState(0);
  const router = useRouter();
  React.useEffect(() => {
    if (!settings.new) {
      router.replace("/(tabs)");
    }
  }, [settings]);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      if (index >= LANDING_MESSAGES.length - 1) {
        setIndex(0);
      } else {
        setIndex((state) => state + 1);
      }
    }, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, [index]);

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        style={{
          flex: 1,
        }}
        colors={[COLORS.secondary, COLORS.main]}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <Typography
            styles={{
              color: COLORS.white,
              textAlign: "center",
              fontFamily: FONTS.bold,
              fontSize: 20,
            }}
          >
            TB Artificial Intelligent Diagnosis Assistant (TBAIDA)
          </Typography>
          <Animated.Image
            source={LOGO}
            style={{ width: 200, height: 200 }}
            entering={ZoomIn.duration(1000).delay(100)}
          />

          <View
            style={{
              margin: 20,
              maxWidth: 400,
              borderRadius: 10,
              backgroundColor: COLORS.white,
              padding: 10,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              height: 100,
            }}
          >
            <View
              style={{
                position: "absolute",
                backgroundColor: COLORS.secondary,
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
              }}
            >
              <Typography
                styles={{
                  color: COLORS.white,
                  fontFamily: FONTS.bold,
                }}
              >
                ABOUT TBAIDA
              </Typography>
            </View>

            <TypeWriter
              style={[
                {
                  textAlign: "center",

                  color:
                    settings.theme === "dark" ? COLORS.white : COLORS.black,
                  fontFamily: FONTS.bold,
                },
              ]}
              typing={1}
              maxDelay={-50}
            >
              {LANDING_MESSAGES[index]}
            </TypeWriter>
          </View>

          <TouchableOpacity
            style={{ width: "100%", maxWidth: 300 }}
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              update({ ...settings, new: false });
              router.replace("/(tabs)");
            }}
          >
            <LinearGradient
              colors={[COLORS.secondary, COLORS.tertiary]}
              style={{
                padding: 10,
                backgroundColor: COLORS.secondary,
                borderRadius: 999,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 30,
              }}
              start={{ x: 0, y: 0 }}
            >
              <Typography
                styles={{
                  color: COLORS.white,
                  fontFamily: FONTS.bold,
                  fontSize: 18,
                }}
              >
                Continue
              </Typography>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <SafeAreaView style={{ padding: 20 }}>
          <Typography
            styles={{
              color: COLORS.white,
              marginBottom: 20,
              fontSize: 16,

              textAlign: "center",
            }}
          >
            By using TB Artificial Intelligent Diagnosis Assistant you are
            automatically accepting{" "}
            <Text
              onPress={async () => {
                if (settings.haptics) {
                  await onImpact();
                }
                router.push("/(modals)/tnc");
              }}
              style={styles.clickable_text}
            >
              Terms and Conditions
            </Text>{" "}
            and{" "}
            <Text
              onPress={async () => {
                if (settings.haptics) {
                  await onImpact();
                }
                router.push("/(modals)/pp");
              }}
              style={styles.clickable_text}
            >
              Privacy Policy
            </Text>{" "}
            of this app.
          </Typography>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  clickable_text: {
    color: COLORS.secondary,
    fontFamily: FONTS.bold,
    textDecorationLine: "underline",
  },
});
