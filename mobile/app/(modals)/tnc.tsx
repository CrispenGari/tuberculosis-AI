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

const TermsAndConditions = () => {
  const {
    settings: { theme },
  } = useSettingsStore();

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "TERMS AND CONDITIONS",
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
              Welcome to the TB AI Diagnosis Assistant. These Terms and
              Conditions outline the rules and regulations for using our
              AI-powered TB prediction service.
            </Typography>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInRight.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Typography styles={styles.sectionHeader}>
              2. User Responsibilities
            </Typography>
            <Typography styles={styles.bulletPoint}>
              <Text style={styles.bold}>Compliance:</Text> By using this app,
              you agree to follow all applicable laws and regulations.
            </Typography>
            <Typography styles={styles.bulletPoint}>
              <Text style={styles.bold}>Data Accuracy:</Text> You are
              responsible for ensuring the accuracy of any data you provide for
              analysis.
            </Typography>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInLeft.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Typography styles={styles.sectionHeader}>
              3. Limitation of Liability
            </Typography>
            <Typography styles={styles.bulletPoint}>
              <Text style={styles.bold}>No Medical Advice:</Text> The app
              provides AI-generated insights but does not replace professional
              medical advice.
            </Typography>
            <Typography styles={styles.bulletPoint}>
              <Text style={styles.bold}>Use at Your Own Risk:</Text> We are not
              responsible for any decisions made based on app results.
            </Typography>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInRight.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Typography styles={styles.sectionHeader}>
              4. Modifications
            </Typography>
            <Typography styles={styles.bulletPoint}>
              <Text style={styles.bold}>Updates:</Text> We may update these
              Terms and Conditions at any time. Continued use of the app
              signifies acceptance of the updated terms.
            </Typography>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInLeft.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Typography styles={styles.sectionHeader}>5. Contact Us</Typography>
            <Typography styles={styles.bulletPoint}>
              <Text style={styles.bold}>Support:</Text> If you have any
              questions regarding these Terms and Conditions, contact us at
              crispengari@gmail.com.
            </Typography>
          </Card>
        </Animated.View>
      </ScrollView>
    </>
  );
};

export default TermsAndConditions;

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
