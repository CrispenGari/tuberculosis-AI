import {
  Text,
  ScrollView,
  StyleSheet,
  Linking,
  Share,
  Platform,
  Alert,
} from "react-native";
import React from "react";
import KeepAwake from "expo-keep-awake";
import { useSettingsStore } from "@/store/useSettingsStore";
import { COLORS, FONTS } from "@/constants";
import { onFetchUpdateAsync, onImpact, rateApp } from "@/utils";
import SettingItem from "@/components/SettingItem/SettingItem";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Card from "@/components/Card/Card";
import * as Constants from "expo-constants";
import Typography from "@/components/Typography/Typography";
import { useDiagnoseHistoryStore } from "@/store/useDiagnoseHistoryStore";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import ReadingBrightnessSettingsBottomSheet from "@/components/BottomSheets/BrightnessSettingsBottomSheet";
import FontSizeSettingsBottomSheet from "@/components/BottomSheets/FontsizeSettingsBottomSheet";
import FontWeightSettingsBottomSheet from "@/components/BottomSheets/FontWeightSettingsBottomSheet";
import FontStyleSettingsBottomSheet from "@/components/BottomSheets/FontStyleSettingsBottomSheet";
import { getIconSize } from "@/styles";

const Page = () => {
  const { settings, update, restore: resetSettings } = useSettingsStore();
  const { clear } = useDiagnoseHistoryStore();
  const router = useRouter();
  const brightnessBottomSheetRef = React.useRef<BottomSheetModal>(null);
  const fontsizeBottomSheetRef = React.useRef<BottomSheetModal>(null);
  const fontWeightBottomSheetRef = React.useRef<BottomSheetModal>(null);
  const fontStyleBottomSheetRef = React.useRef<BottomSheetModal>(null);

  return (
    <>
      <ReadingBrightnessSettingsBottomSheet ref={brightnessBottomSheetRef} />
      <FontSizeSettingsBottomSheet ref={fontsizeBottomSheetRef} />
      <FontWeightSettingsBottomSheet ref={fontWeightBottomSheetRef} />
      <FontStyleSettingsBottomSheet ref={fontStyleBottomSheetRef} />
      <ScrollView
        style={{
          flex: 1,
          backgroundColor:
            settings.theme === "dark" ? COLORS.dark : COLORS.light,
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 140,
          padding: 20,
        }}
      >
        <Typography styles={styles.headerText}>Misc</Typography>
        <Card>
          <SettingItem
            subtitle={
              settings.haptics
                ? "In app haptics are ONN."
                : "In app haptics are OFF."
            }
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              update({ ...settings, haptics: !settings.haptics });
            }}
            title="App Haptics"
            Icon={
              <MaterialIcons
                name="vibration"
                size={getIconSize(settings)}
                color={settings.theme === "dark" ? COLORS.white : COLORS.black}
              />
            }
          />

          <SettingItem
            subtitle="Check for new updates."
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              await onFetchUpdateAsync();
            }}
            title="Updates"
            Icon={
              <MaterialIcons
                name="update"
                size={getIconSize(settings)}
                color={settings.theme === "dark" ? COLORS.white : COLORS.black}
              />
            }
          />
          <SettingItem
            subtitle="Reset settings to default."
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }

              Alert.alert(
                "Resetting Settings to Default",
                "Are you sure you want to reset the settings to default?",
                [
                  {
                    text: "Yes",
                    onPress: async () => {
                      if (settings.haptics) {
                        resetSettings();
                        clear();
                        router.replace("/(modals)/landing");
                      }
                    },
                    style: "default",
                  },
                  {
                    text: "No",
                    style: "cancel",
                    onPress: async () => {
                      if (settings.haptics) {
                        await onImpact();
                      }
                    },
                  },
                ],
                {
                  cancelable: false,
                }
              );
            }}
            title="Reset Settings"
            Icon={
              <Ionicons
                name="refresh-sharp"
                size={getIconSize(settings)}
                color={settings.theme === "dark" ? COLORS.white : COLORS.black}
              />
            }
          />
        </Card>

        <Typography styles={styles.headerText}>Display</Typography>
        <Card>
          <SettingItem
            subtitle={
              settings.theme === "dark" ? "DARK theme." : "LIGHT theme."
            }
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              update({
                ...settings,
                theme: settings.theme === "light" ? "dark" : "light",
              });
            }}
            title="App Theme"
            Icon={
              <MaterialIcons
                name={settings.theme === "light" ? "light-mode" : "dark-mode"}
                size={getIconSize(settings)}
                color={settings.theme === "dark" ? COLORS.white : COLORS.black}
              />
            }
          />
          <SettingItem
            subtitle={settings.keepAwake ? "ONN" : "OFF"}
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              !settings.keepAwake
                ? await KeepAwake.activateKeepAwakeAsync()
                : await KeepAwake.deactivateKeepAwake();

              update({
                ...settings,
                keepAwake: !settings.keepAwake,
              });
            }}
            title="Keep Awake"
            Icon={
              <Ionicons
                name={settings.keepAwake ? "eye-outline" : "eye-off-outline"}
                size={getIconSize(settings)}
                color={settings.theme === "dark" ? COLORS.white : COLORS.black}
              />
            }
          />

          <SettingItem
            subtitle={"Adjust the app Brightness."}
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              brightnessBottomSheetRef.current?.present();
            }}
            title="App Brightness."
            Icon={
              <MaterialIcons
                name={"brightness-medium"}
                size={getIconSize(settings)}
                color={settings.theme === "dark" ? COLORS.white : COLORS.black}
              />
            }
          />

          <SettingItem
            subtitle={settings.fontsize?.toUpperCase()}
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              fontsizeBottomSheetRef.current?.present();
            }}
            title="App Font Size."
            Icon={
              <MaterialCommunityIcons
                name={"format-font-size-increase"}
                size={getIconSize(settings)}
                color={settings.theme === "dark" ? COLORS.white : COLORS.black}
              />
            }
          />
          <SettingItem
            subtitle={settings.fontWeight?.toUpperCase()}
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              fontWeightBottomSheetRef.current?.present();
            }}
            title="App Font Weight."
            Icon={
              <MaterialIcons
                name={"font-download"}
                size={getIconSize(settings)}
                color={settings.theme === "dark" ? COLORS.white : COLORS.black}
              />
            }
          />
          <SettingItem
            subtitle={settings.fontStyle?.toUpperCase()}
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              fontStyleBottomSheetRef.current?.present();
            }}
            title="App Font Style."
            Icon={
              <MaterialCommunityIcons
                name={"format-font"}
                size={getIconSize(settings)}
                color={settings.theme === "dark" ? COLORS.white : COLORS.black}
              />
            }
          />
        </Card>
        <Typography styles={styles.headerText}>Storage and History</Typography>
        <Card>
          <SettingItem
            subtitle={settings.keepHistory ? "SAVING" : "NOT SAVING"}
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              update({ ...settings, keepHistory: !settings.keepHistory });
            }}
            title="Save Diagnosis History."
            Icon={
              <Ionicons
                name="save-outline"
                size={getIconSize(settings)}
                color={settings.theme === "dark" ? COLORS.white : COLORS.black}
              />
            }
          />
          <SettingItem
            subtitle={"Clear all Diagnosis history."}
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              Alert.alert(
                "Clearing Diagnosis History",
                "Are you sure you want to clear the Diagnosis history?",
                [
                  {
                    text: "Yes",
                    onPress: async () => {
                      if (settings.haptics) {
                        await onImpact();
                      }
                      clear();
                    },
                    style: "default",
                  },
                  {
                    text: "No",
                    style: "cancel",
                    onPress: async () => {
                      if (settings.haptics) {
                        await onImpact();
                      }
                    },
                  },
                ],
                {
                  cancelable: false,
                }
              );
            }}
            title="Clear Diagnosis History"
            Icon={
              <MaterialIcons
                name="clear-all"
                size={getIconSize(settings)}
                color={settings.theme === "dark" ? COLORS.white : COLORS.black}
              />
            }
          />
        </Card>
        <Typography styles={styles.headerText}>Support</Typography>
        <Card>
          <SettingItem
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              await rateApp();
            }}
            title="Rate TBAIDA"
            Icon={
              <Ionicons
                name="star-outline"
                size={getIconSize(settings)}
                color={settings.theme === "dark" ? COLORS.white : COLORS.black}
              />
            }
            subtitle={
              Platform.select({
                ios: "Rate this app on AppStore.",
                android: "Rate this app on Play Store.",
              }) || "Rate this app on Play Store."
            }
          />
          <SettingItem
            subtitle="Tell others about TBAIDA."
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              await Share.share(
                {
                  url: "https://github.com/CrispenGari/tuberculosis-AI",
                  message:
                    "TB Artificial Intelligent Diagnosis Assistant: Download at https://github.com/CrispenGari/tuberculosis-AI",
                  title: "Share TBAIDA with a Friend",
                },
                { dialogTitle: "Share TBAIDA", tintColor: COLORS.tertiary }
              );
            }}
            title="Tell a Friend"
            Icon={
              <Ionicons
                name="heart-outline"
                size={getIconSize(settings)}
                color={settings.theme === "dark" ? COLORS.white : COLORS.black}
              />
            }
          />

          <SettingItem
            subtitle="Understand how TBAIDA works."
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              // helpBottomSheetRef.current?.present();
            }}
            title="How Does TBAIDA Works?"
            Icon={
              <Ionicons
                name="help"
                size={getIconSize(settings)}
                color={settings.theme === "dark" ? COLORS.white : COLORS.black}
              />
            }
          />
          <SettingItem
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              const res = await Linking.canOpenURL(
                "https://github.com/CrispenGari/tuberculosis-AI/issues"
              );
              if (res) {
                Linking.openURL(
                  "https://github.com/CrispenGari/tuberculosis-AI/issues"
                );
              }
            }}
            title="Report an Issue"
            Icon={
              <Ionicons
                name="logo-github"
                size={getIconSize(settings)}
                color={settings.theme === "dark" ? COLORS.white : COLORS.black}
              />
            }
            subtitle="Report a bug to github."
          />
        </Card>
        <Typography styles={styles.headerText}>Legal</Typography>
        <Card>
          <SettingItem
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              router.navigate("/(modals)/tnc");
            }}
            title="Terms of Service"
            Icon={
              <Ionicons
                name="document-text-outline"
                size={getIconSize(settings)}
                color={settings.theme === "dark" ? COLORS.white : COLORS.black}
              />
            }
            subtitle="Terms and Conditions for TBAIDA."
          />
          <SettingItem
            subtitle="Privacy Policy of TBAIDA."
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              router.navigate("/(modals)/pp");
            }}
            title="Privacy Policy"
            Icon={
              <Ionicons
                name="document-text-outline"
                size={getIconSize(settings)}
                color={settings.theme === "dark" ? COLORS.white : COLORS.black}
              />
            }
          />
        </Card>

        <Text
          style={{
            textAlign: "center",
            color: settings.theme === "dark" ? COLORS.white : COLORS.black,
            fontFamily: FONTS.bold,
            marginTop: 50,
          }}
        >
          {Constants.default.expoConfig?.name}{" "}
          {Constants.default.expoConfig?.version}
        </Text>
      </ScrollView>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  headerText: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    marginLeft: 10,
    marginTop: 10,
  },
});
