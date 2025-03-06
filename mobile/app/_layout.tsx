import { COLORS, FONTS, Fonts } from "@/constants";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import { LogBox, StatusBar, TouchableOpacity, View } from "react-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MenuProvider } from "react-native-popup-menu";
import { usePlatform } from "@/hooks";
import { useSettingsStore } from "@/store/useSettingsStore";
import { Ionicons } from "@expo/vector-icons";
import { onImpact } from "@/utils";

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
      <StatusBar barStyle={"dark-content"} />
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
            color: COLORS.black,
          },
          headerTitleAlign: "center",
          navigationBarHidden: true,
          headerShadowVisible: false,
          headerLeft: ({}) => (
            <TouchableOpacity
              style={{
                marginRight: 20,
              }}
              activeOpacity={0.7}
              onPress={async () => {
                if (settings.haptics) {
                  await onImpact();
                }
                router.replace("/(tabs)");
                update({ ...settings, new: false });
              }}
              hitSlop={20}
            >
              <Ionicons name="close-outline" size={30} color={COLORS.black} />
            </TouchableOpacity>
          ),
        }}
        name="(modals)/landing"
      />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
};
