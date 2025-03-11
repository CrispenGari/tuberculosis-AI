import { Text, View } from "react-native";
import React from "react";
import { COLORS, FONTS, FONTWEIGHTS } from "@/constants";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetView,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import Card from "../Card/Card";
import { useSettingsStore } from "@/store/useSettingsStore";
import DropdownSelect from "react-native-input-select";
import { onImpact } from "@/utils";

interface Props {}
const FontWeightSettingsBottomSheet = React.forwardRef<BottomSheetModal, Props>(
  ({}, ref) => {
    const snapPoints = React.useMemo(() => ["35%"], []);
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
          backgroundColor:
            settings.theme === "dark" ? COLORS.dark : COLORS.light,
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
              APP FONT WEIGHT
            </Text>
          </View>
        )}
      >
        <BottomSheetView style={{ flex: 1, padding: 10, gap: 10 }}>
          <Card
            style={{
              marginTop: 40,
              alignSelf: "center",
              width: "100%",
              maxWidth: 500,
            }}
          >
            <FontWeightComponent />
          </Card>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default FontWeightSettingsBottomSheet;

export const FontWeightComponent = () => {
  const { settings, update } = useSettingsStore();
  const [value, setValue] = React.useState(settings.fontWeight);
  const { dismiss } = useBottomSheetModal();
  return (
    <DropdownSelect
      placeholder="Select Font Weight."
      options={FONTWEIGHTS}
      optionLabel={"name"}
      optionValue={"value"}
      selectedValue={value}
      isMultiple={false}
      dropdownIconStyle={{ top: 15, right: 15 }}
      modalControls={{
        modalOptionsContainerStyle: {
          backgroundColor:
            settings.theme === "dark" ? COLORS.dark : COLORS.light,
        },
      }}
      dropdownStyle={{
        borderWidth: 0,
        paddingVertical: 8,
        paddingHorizontal: 20,
        minHeight: 40,
        backgroundColor: settings.theme === "dark" ? COLORS.dark : COLORS.light,
      }}
      placeholderStyle={{
        color: settings.theme === "dark" ? COLORS.white : COLORS.black,
        fontSize: 18,
        fontFamily: FONTS.regular,
      }}
      onValueChange={async (value: any) => {
        if (settings.haptics) await onImpact();
        setValue(value);
        update({ ...settings, fontWeight: value });
        dismiss();
      }}
      primaryColor={COLORS.secondary}
      dropdownHelperTextStyle={{
        color: settings.theme === "dark" ? COLORS.white : COLORS.black,
        fontFamily: FONTS.regular,
        fontSize: 15,
      }}
      helperText="Select the font weight that you want to use in this app."
      selectedItemStyle={{
        color: settings.theme === "dark" ? COLORS.white : COLORS.black,
        fontSize: 18,
        fontFamily: FONTS.regular,
      }}
      listComponentStyles={{
        itemSeparatorStyle: { borderColor: COLORS.gray },
      }}
      checkboxControls={{
        checkboxLabelStyle: {
          fontFamily: FONTS.bold,
          color: settings.theme === "dark" ? COLORS.white : COLORS.black,
          fontSize: 18,
        },
        checkboxStyle: {
          borderRadius: 999,
          borderColor: COLORS.transparent,
        },
      }}
    />
  );
};
