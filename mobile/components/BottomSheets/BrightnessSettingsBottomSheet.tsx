import { Text, View } from "react-native";
import React from "react";
import { COLORS, FONTS } from "@/constants";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import Card from "../Card/Card";
import { useSettingsStore } from "@/store/useSettingsStore";
import * as Brightness from "expo-brightness";
import Slider from "@react-native-community/slider";

interface Props {}
const ReadingBrightnessSettingsBottomSheet = React.forwardRef<
  BottomSheetModal,
  Props
>(({}, ref) => {
  const snapPoints = React.useMemo(() => ["20%"], []);
  const { settings } = useSettingsStore();
  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      index={0}
      enablePanDownToClose={true}
      enableContentPanningGesture={false}
      enableOverDrag={false}
      backgroundStyle={{
        backgroundColor: settings.theme === "dark" ? COLORS.dark : COLORS.light,
      }}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      )}
      handleComponent={() => (
        <View
          style={{
            alignSelf: "center",
            backgroundColor: COLORS.secondary,
            maxWidth: 150,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 999,
            height: 25,
            position: "absolute",
            top: -13,
            shadowOffset: { height: 5, width: 5 },
            shadowOpacity: 0.9,
            shadowRadius: 2,
            shadowColor: COLORS.secondary,
            elevation: 1,
            width: "100%",
          }}
        >
          <Text
            style={{
              fontFamily: FONTS.bold,
              textTransform: "uppercase",
              color: COLORS.white,
            }}
          >
            App Brightness
          </Text>
        </View>
      )}
    >
      <BottomSheetView style={{ flex: 1, padding: 10, gap: 10 }}>
        <Card
          style={{
            marginTop: 40,
          }}
        >
          <ReadingBrightnessComponent />
        </Card>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default ReadingBrightnessSettingsBottomSheet;
const ReadingBrightnessComponent = () => {
  const { settings, update } = useSettingsStore();
  const [value, setValue] = React.useState(settings.brightness);

  return (
    <View style={{ flexDirection: "row", gap: 5 }}>
      <Slider
        style={{ width: "100%", height: 20, marginLeft: 0 }}
        minimumValue={0}
        maximumValue={1}
        lowerLimit={0.1}
        minimumTrackTintColor={COLORS.secondary}
        maximumTrackTintColor={COLORS.main}
        thumbTintColor={COLORS.main}
        value={value}
        onValueChange={(value) => setValue(value)}
        onSlidingComplete={async (value) => {
          await Brightness.setBrightnessAsync(value);
          // update({
          //   ...settings,
          //   brightness: value,
          // });
        }}
      />
    </View>
  );
};
