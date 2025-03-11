import { Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Card from "../Card/Card";
import Divider from "../Divider/Divider";
import { COLORS, FONTS, MODELS } from "@/constants";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useSettingsStore } from "@/store/useSettingsStore";
import {
  generateRNFile,
  onImpact,
  playDiagnosingSound,
  playResultSound,
  stopDiagnosingSound,
} from "@/utils";
import * as ImagePicker from "expo-image-picker";
import { useMediaPermissions } from "@/hooks/useMediaPermissions/useMediaPermissions";
import ContentLoader from "../ContentLoader/ContentLoader";
import Animated from "react-native-reanimated";
import Dropdown from "react-native-input-select";
import { THistory, TModel } from "@/types";
import Ripple from "../Ripple/Ripple";
import { useMutation } from "@tanstack/react-query";
import { predictTB } from "@/utils/react-query";
import Typography from "../Typography/Typography";
import uuid from "react-native-uuid";
import { useDiagnoseHistoryStore } from "@/store/useDiagnoseHistoryStore";
import { useRouter } from "expo-router";

const Form = () => {
  const router = useRouter();
  const { camera, gallery, requestCameraPermission } = useMediaPermissions();
  const { isPending: diagnosing, mutateAsync } = useMutation({
    mutationKey: ["diagnose"],
    mutationFn: predictTB,
  });
  const { settings } = useSettingsStore();
  const { add } = useDiagnoseHistoryStore();
  const [state, setState] = React.useState<{
    uri?: string;
    model: TModel;
    base64?: string | null;
    fileName?: string | null;
    error?: string;
  }>({
    uri: undefined,
    model: "mobilenetv3",
    fileName: undefined,
    base64: undefined,
  });

  const diagnose = async () => {
    if (settings.haptics) {
      await onImpact();
    }
    if (settings.sound) {
      await playDiagnosingSound();
    }
    if (!!!state.uri) {
      setState((s) => ({ ...s, error: "Please select a Chest X-Ray image." }));
      return;
    }
    const xray = generateRNFile({
      name: state.fileName || "xray.jpeg",
      uri: state.uri,
    });
    const predictionResponse = await mutateAsync({
      modelName: state.model,
      xray,
    });
    if (settings.sound) {
      await stopDiagnosingSound();
      await playResultSound();
    }
    if (predictionResponse.status === "error") {
      return setState({
        ...state,
        error: "Something went wrong on the server try again.",
      });
    }
    const history = {
      prediction: predictionResponse,
      date: new Date(),
      id: uuid.v4(),
      xray: state.uri,
      image: `data:image/jpeg;base64,${state.base64}`,
    } satisfies THistory;

    if (settings.keepHistory) {
      add(history);
    }
    router.navigate({
      pathname: "/(modals)/result",
      params: {
        results: JSON.stringify(history),
      },
    });
  };

  const select = async () => {
    if (settings.haptics) {
      await onImpact();
    }
    if (gallery) {
      const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
        quality: 1,
        mediaTypes: ["images"],
        allowsMultipleSelection: false,
        allowsEditing: true,
        presentationStyle: ImagePicker.UIImagePickerPresentationStyle.POPOVER,
        base64: true,
      });

      if (!canceled) {
        setState((state) => ({
          ...state,
          uri: assets[0].uri,
          fileName: assets[0].fileName,
          base64: assets[0].base64,
        }));
      }
    }
  };
  const take = async () => {
    if (settings.haptics) {
      await onImpact();
    }
    if (camera) {
      const { assets, canceled } = await ImagePicker.launchCameraAsync({
        quality: 1,
        mediaTypes: ["images"],
        allowsMultipleSelection: false,
        allowsEditing: true,
        presentationStyle: ImagePicker.UIImagePickerPresentationStyle.POPOVER,
        base64: true,
      });

      if (!canceled) {
        setState((state) => ({
          ...state,
          uri: assets[0].uri,
          fileName: assets[0].fileName,
          base64: assets[0].base64,
        }));
      }
    } else {
      await requestCameraPermission();
    }
  };
  const remove = async () => {
    if (settings.haptics) {
      await onImpact();
    }
    setState((state) => ({
      ...state,
      uri: undefined,
    }));
  };

  return (
    <View style={{ width: "100%", maxWidth: 500, alignSelf: "center" }}>
      {state.error ? (
        <Card
          style={{
            padding: 10,
            height: 100,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLORS.secondary,
          }}
        >
          <View
            style={{
              position: "absolute",
              backgroundColor: COLORS.main,
              top: -10,
              width: 100,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 999,
              shadowOpacity: 0.5,
              elevation: 2,
              shadowOffset: { width: 2, height: 2 },
              shadowRadius: 5,
              shadowColor: COLORS.tertiary,
              padding: 3,
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                fontFamily: FONTS.bold,
                textTransform: "uppercase",
              }}
            >
              Error
            </Text>
          </View>
          <Text
            style={{
              fontFamily: FONTS.bold,
              fontSize: 16,
              color: COLORS.white,
            }}
          >
            {state.error}
          </Text>
        </Card>
      ) : null}
      <Card style={{ padding: 10, marginTop: 20 }}>
        <Typography
          styles={{
            textAlign: "right",
          }}
        >
          {new Date().toLocaleString()}
        </Typography>
        <Divider title="Select an X-ray Image" />
        <TouchableOpacity
          disabled={diagnosing}
          style={{
            backgroundColor:
              settings.theme === "dark" ? COLORS.dark : COLORS.light,
            padding: 10,
            width: 50,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 50,
            alignSelf: "center",
          }}
          activeOpacity={0.7}
          onPress={select}
        >
          <AntDesign
            name="picture"
            size={24}
            color={settings.theme === "dark" ? COLORS.white : COLORS.black}
          />
        </TouchableOpacity>
        <Divider title="Take an X-ray Image" />
        <TouchableOpacity
          disabled={diagnosing}
          style={{
            backgroundColor:
              settings.theme === "dark" ? COLORS.dark : COLORS.light,
            padding: 10,
            width: 50,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 50,
            alignSelf: "center",
          }}
          activeOpacity={0.7}
          onPress={take}
        >
          <Ionicons
            name="camera"
            size={24}
            color={settings.theme === "dark" ? COLORS.white : COLORS.black}
          />
        </TouchableOpacity>
        <Divider title="Select a Model" />

        <Dropdown
          placeholder="Select Model."
          options={MODELS}
          optionLabel={"name"}
          optionValue={"value"}
          selectedValue={state.model}
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
            backgroundColor:
              settings.theme === "dark" ? COLORS.dark : COLORS.light,
          }}
          placeholderStyle={{
            color: settings.theme === "dark" ? COLORS.white : COLORS.black,
            fontSize: 18,
            fontFamily: FONTS.regular,
          }}
          onValueChange={async (value: any) => {
            if (settings.haptics) await onImpact();
            setState((state) => ({ ...state, model: value }));
          }}
          primaryColor={COLORS.secondary}
          dropdownHelperTextStyle={{
            color: settings.theme === "dark" ? COLORS.white : COLORS.black,
            fontFamily: FONTS.regular,
            fontSize: 15,
          }}
          helperText="Select the model that you want to use to diagnose TB."
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
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: COLORS.secondary,
            borderRadius: 999,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30,
            width: "100%",
            maxWidth: 300,
            marginBottom: 10,
            flexDirection: "row",
            gap: 15,
            alignSelf: "center",
          }}
          onPress={async () => {
            if (settings.haptics) {
              await onImpact();
            }
            diagnose();
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontFamily: FONTS.bold,
              fontSize: 18,
            }}
          >
            Diagnose
          </Text>
          {diagnosing ? <Ripple size={8} color={COLORS.tertiary} /> : null}
        </TouchableOpacity>
      </Card>

      <Card
        style={{
          padding: 10,
          marginTop: 20,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor:
            settings.theme === "dark"
              ? COLORS.darkSecondary
              : COLORS.lightSecondary,
        }}
      >
        <View
          style={{
            position: "absolute",
            backgroundColor: COLORS.main,
            top: -10,
            width: 100,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 999,
            shadowOpacity: 0.5,
            elevation: 2,
            shadowOffset: { width: 2, height: 2 },
            shadowRadius: 5,
            shadowColor: COLORS.tertiary,
            padding: 3,
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontFamily: FONTS.bold,
              textTransform: "uppercase",
            }}
          >
            X-Ray
          </Text>
        </View>

        {state.uri ? (
          <Animated.Image
            style={{
              width: 250,
              height: 300,
              backgroundColor: COLORS.gray,
              borderRadius: 10,
              marginTop: 20,
            }}
            source={{ uri: state.uri }}
          />
        ) : (
          <ContentLoader
            style={{
              width: 250,
              height: 300,
              backgroundColor: COLORS.gray,
              borderRadius: 10,
              marginTop: 20,
              opacity: 0.4,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialIcons
              name="image-not-supported"
              size={30}
              color={COLORS.tertiary}
            />
          </ContentLoader>
        )}

        <TouchableOpacity
          disabled={diagnosing}
          style={{
            padding: 10,
            backgroundColor: COLORS.secondary,
            borderRadius: 999,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30,
            width: "100%",
            maxWidth: 300,
            marginBottom: 10,
          }}
          onPress={async () => {
            if (settings.haptics) {
              await onImpact();
            }
            remove();
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontFamily: FONTS.bold,
              fontSize: 18,
            }}
          >
            Remove
          </Text>
        </TouchableOpacity>
      </Card>
    </View>
  );
};

export default Form;
