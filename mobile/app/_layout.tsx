import { Fonts } from "@/constants";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import { LogBox, StatusBar, View } from "react-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MenuProvider } from "react-native-popup-menu";

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
  return (
    <Stack>
      <Stack.Screen name="+not-found" />
    </Stack>
  );
};
