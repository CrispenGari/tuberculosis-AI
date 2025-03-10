import { Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { COLORS, FONTS, LOGO } from "@/constants";
import Animated, {
  SlideInLeft,
  SlideInRight,
  ZoomInDown,
} from "react-native-reanimated";
import Card from "@/components/Card/Card";
import { useSettingsStore } from "@/store/useSettingsStore";
import Typography from "@/components/Typography/Typography";

const AboutApp = () => {
  const {
    settings: { theme },
  } = useSettingsStore();

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "ABOUT THE APP",
          headerLargeTitle: false,
          headerLargeTitleShadowVisible: true,
          headerTitleStyle: {
            fontFamily: FONTS.bold,
            fontSize: 18,
            color: COLORS.white,
          },
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[
          styles.container,
          { backgroundColor: theme === "dark" ? COLORS.dark : COLORS.light },
        ]}
        contentContainerStyle={{ paddingBottom: 150 }}
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
            <Typography styles={styles.sectionHeader}>About the App</Typography>
            <Typography styles={styles.bulletPoint}>
              The TB AI Diagnosis Assistant helps users analyze chest X-ray
              images using AI models to predict tuberculosis (TB) presence.
            </Typography>
            <Typography styles={styles.bulletPoint}>
              The app offers multiple AI models and stores your diagnosis
              history locally for easy access.
            </Typography>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInRight.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Typography styles={styles.sectionHeader}>
              How to Use the App
            </Typography>
            <Typography styles={styles.bulletPoint}>
              <Text style={styles.bold}>1.</Text> Select a chest X-ray image
              from your device or take a new picture.
            </Typography>
            <Typography styles={styles.bulletPoint}>
              <Text style={styles.bold}>2.</Text> Choose an AI model for
              diagnosis: ResNet50, DenseNet201, or MobileNetV3.
            </Typography>
            <Typography styles={styles.bulletPoint}>
              <Text style={styles.bold}>3.</Text> View your diagnosis results
              instantly.
            </Typography>
            <Typography styles={styles.bulletPoint}>
              <Text style={styles.bold}>4.</Text> Diagnosis history is saved
              locally and can be accessed from the History page.
            </Typography>
            <Typography styles={styles.bulletPoint}>
              <Text style={styles.bold}>5.</Text> Adjust app settings like
              sound, haptics, and display preferences in the Settings tab.
            </Typography>
            <Typography styles={styles.bulletPoint}>
              <Text style={styles.bold}>6.</Text> Ensure an active internet
              connection, as AI models are hosted on a server.
            </Typography>
          </Card>
        </Animated.View>
      </ScrollView>
    </>
  );
};

export default AboutApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    padding: 10,
    maxWidth: 500,
    alignSelf: "flex-start",
    borderRadius: 5,
    width: "100%",
    paddingVertical: 20,
    marginBottom: 10,
  },
  sectionHeader: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 16,
    marginBottom: 4,
    fontFamily: FONTS.regular,
  },
  bold: {
    fontFamily: FONTS.bold,
    color: COLORS.secondary,
  },
});
