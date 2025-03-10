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

const PrivacyPolicy = () => {
  const {
    settings: { theme },
  } = useSettingsStore();
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "PRIVACY POLICY",
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
            <Typography styles={styles.sectionHeader}>
              1. Introduction
            </Typography>
            <Typography styles={styles.bulletPoint}>
              Welcome to the TB AI Diagnosis Assistant. This Privacy Policy
              explains how we handle and protect your data when using our
              AI-powered TB prediction service.
            </Typography>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInRight.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Typography styles={styles.sectionHeader}>
              2. Information We Collect
            </Typography>
            <Typography styles={styles.bulletPoint}>
              <Text style={styles.bold}>Medical Images:</Text> We process chest
              X-ray images solely for AI-based TB diagnosis. No personal
              identification is required to use the app.
            </Typography>
            <Typography styles={styles.bulletPoint}>
              <Text style={styles.bold}>Non-Personal Data:</Text> We collect
              anonymous app usage statistics to enhance performance and user
              experience.
            </Typography>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInLeft.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Typography styles={styles.sectionHeader}>
              3. How We Use Information
            </Typography>
            <Typography styles={styles.bulletPoint}>
              <Text style={styles.bold}>Diagnosis Processing:</Text> Your X-ray
              images are analyzed locally using AI. No images are stored or
              shared.
            </Typography>
            <Typography styles={styles.bulletPoint}>
              <Text style={styles.bold}>App Performance:</Text> We use
              non-personal data to improve the accuracy and reliability of AI
              predictions.
            </Typography>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInRight.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Typography styles={styles.sectionHeader}>
              4. Data Security
            </Typography>
            <Typography styles={styles.bulletPoint}>
              <Text style={styles.bold}>Encryption:</Text> All image processing
              occurs securely on your device, preventing unauthorized access.
            </Typography>
            <Typography styles={styles.bulletPoint}>
              <Text style={styles.bold}>No Third-Party Access:</Text> We do not
              share your data with any external organizations or advertisers.
            </Typography>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInLeft.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Typography styles={styles.sectionHeader}>
              5. Changes to Privacy Policy
            </Typography>
            <Typography styles={styles.bulletPoint}>
              <Typography styles={styles.bold}>Policy Updates:</Typography> Any
              future updates to this Privacy Policy will be communicated through
              the app.
            </Typography>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInRight.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Typography styles={styles.sectionHeader}>6. Contact Us</Typography>
            <Typography styles={styles.bulletPoint}>
              <Text style={styles.bold}>Support:</Text> If you have any
              questions about data privacy, contact us at crispengari@gmail.com.
            </Typography>
          </Card>
        </Animated.View>
      </ScrollView>
    </>
  );
};

export default PrivacyPolicy;

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
