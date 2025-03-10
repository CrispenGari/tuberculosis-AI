import { COLORS, FONTS, Fonts } from "@/constants";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import { LogBox, TouchableOpacity, View } from "react-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MenuProvider } from "react-native-popup-menu";
import { usePlatform } from "@/hooks";
import { useSettingsStore } from "@/store/useSettingsStore";
import { Ionicons } from "@expo/vector-icons";
import { onImpact } from "@/utils";
import { StatusBar } from "expo-status-bar";

LogBox.ignoreLogs;
LogBox.ignoreAllLogs();
SplashScreen.preventAutoHideAsync();

const client = new QueryClient();

const Layout = () => {
  const [loaded] = useFonts(Fonts);
  React.useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  if (!loaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" backgroundColor={COLORS.secondary} />
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <MenuProvider>
            <QueryClientProvider client={client}>
              <RootLayout />
            </QueryClientProvider>
          </MenuProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </View>
  );
};

export default Layout;

const RootLayout = () => {
  const { os } = usePlatform();
  const router = useRouter();
  const { settings, update } = useSettingsStore();

  React.useEffect(() => {
    if (settings.new) {
      router.replace("/(modals)/landing");
    }
  }, [settings]);

  return (
    <Stack initialRouteName="(modals)/landing">
      <Stack.Screen
        options={{
          presentation: os === "ios" ? "modal" : "fullScreenModal",
          headerTitle: "WELCOME",
          headerTitleStyle: {
            fontFamily: FONTS.bold,
            fontSize: 24,
            color: COLORS.white,
          },
          headerTitleAlign: "center",
          navigationBarHidden: true,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: COLORS.secondary,
          },
          headerLeft: ({}) => (
            <TouchableOpacity
              style={{
                marginRight: 20,
              }}
              onPressIn={async () => {
                if (settings.haptics) {
                  await onImpact();
                }
                router.replace("/(tabs)");
                update({ ...settings, new: false });
              }}
              hitSlop={20}
            >
              <Ionicons name="close-outline" size={30} color={COLORS.white} />
            </TouchableOpacity>
          ),
        }}
        name="(modals)/landing"
      />
      <Stack.Screen
        options={{
          presentation: os === "ios" ? "modal" : "fullScreenModal",
          headerTitle: "TERMS AND CONDITIONS",
          headerTitleStyle: {
            fontFamily: FONTS.bold,
            fontSize: 24,
            color: COLORS.white,
          },
          headerTitleAlign: "center",
          navigationBarHidden: true,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: COLORS.secondary,
          },
          headerLeft: ({}) => (
            <TouchableOpacity
              style={{
                marginRight: 20,
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
              hitSlop={20}
            >
              <Ionicons name="close-outline" size={30} color={COLORS.white} />
            </TouchableOpacity>
          ),
        }}
        name="(modals)/tnc"
      />
      <Stack.Screen
        options={{
          presentation: os === "ios" ? "modal" : "fullScreenModal",
          headerTitle: "PRIVACY POLICY",
          headerTitleStyle: {
            fontFamily: FONTS.bold,
            fontSize: 24,
            color: COLORS.white,
          },
          headerTitleAlign: "center",
          navigationBarHidden: true,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: COLORS.secondary,
          },
          headerLeft: ({}) => (
            <TouchableOpacity
              style={{
                marginRight: 20,
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
              hitSlop={20}
            >
              <Ionicons name="close-outline" size={30} color={COLORS.white} />
            </TouchableOpacity>
          ),
        }}
        name="(modals)/pp"
      />

      <Stack.Screen
        options={{
          // presentation: os === "ios" ? "modal" : "fullScreenModal",
          headerTitle: "RESULTS",
          headerTitleStyle: {
            fontFamily: FONTS.bold,
            fontSize: 24,
            color: COLORS.white,
          },
          headerTitleAlign: "center",
          navigationBarHidden: true,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: COLORS.secondary,
          },
          headerLeft: ({ canGoBack }) => (
            <TouchableOpacity
              style={{
                marginRight: 20,
              }}
              onPressIn={async () => {
                if (settings.haptics) {
                  await onImpact();
                }
                if (canGoBack) {
                  router.back();
                } else {
                  router.replace("/(tabs)");
                }
              }}
              hitSlop={20}
            >
              <Ionicons name="close-outline" size={30} color={COLORS.white} />
            </TouchableOpacity>
          ),
        }}
        name="(modals)/result"
      />
      <Stack.Screen
        options={{
          presentation: os === "ios" ? "modal" : "fullScreenModal",
          headerTitle: "ABOUT TBAIDA",
          headerTitleStyle: {
            fontFamily: FONTS.bold,
            fontSize: 24,
            color: COLORS.white,
          },
          headerTitleAlign: "center",
          navigationBarHidden: true,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: COLORS.secondary,
          },
          headerLeft: ({}) => (
            <TouchableOpacity
              style={{
                marginRight: 20,
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
              hitSlop={20}
            >
              <Ionicons name="close-outline" size={30} color={COLORS.white} />
            </TouchableOpacity>
          ),
        }}
        name="(modals)/about"
      />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="+not-found"
        options={{
          headerTitle: "NOT FOUND",
          headerTitleStyle: {
            fontFamily: FONTS.bold,
            fontSize: 24,
            color: COLORS.white,
          },
          headerTitleAlign: "center",
          navigationBarHidden: true,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: COLORS.secondary,
          },
          headerLeft: ({}) => (
            <TouchableOpacity
              style={{
                marginRight: 20,
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
              hitSlop={20}
            >
              <Ionicons name="close-outline" size={30} color={COLORS.white} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};
