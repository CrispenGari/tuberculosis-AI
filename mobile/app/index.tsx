import { View, Text, Image } from "react-native";
import React from "react";
import { FONTS, LOGO } from "@/constants";

const Page = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontFamily: FONTS.bold }}>Hello There!!</Text>

      <Image source={LOGO} style={{ width: 200, height: 200 }} />
    </View>
  );
};

export default Page;
