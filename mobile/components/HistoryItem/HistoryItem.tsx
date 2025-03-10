import { View, TouchableOpacity } from "react-native";
import React from "react";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { onImpact } from "../../utils";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, FONTS, relativeTimeObject } from "../../constants";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocal from "dayjs/plugin/updateLocale";
import { THistory } from "@/types";
import { useSettingsStore } from "@/store/useSettingsStore";
import Animated from "react-native-reanimated";
import Typography from "../Typography/Typography";
import Card from "../Card/Card";
import { useDiagnoseHistoryStore } from "@/store/useDiagnoseHistoryStore";
import { useRouter } from "expo-router";

dayjs.extend(relativeTime);
dayjs.extend(updateLocal);
dayjs.updateLocale("en", {
  relativeTime: relativeTimeObject,
});
interface Props {
  history: THistory;
}
const HistoryItem: React.FunctionComponent<Props> = ({ history }) => {
  const swipeableRef = React.useRef<Swipeable | undefined>();
  const {
    settings: { theme, ...settings },
  } = useSettingsStore();
  const { remove } = useDiagnoseHistoryStore();
  const router = useRouter();

  return (
    <Swipeable
      ref={swipeableRef as any}
      renderRightActions={(_progress, _dragX) => {
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              justifyContent: "center",
              alignItems: "center",
              minWidth: 50,
              backgroundColor: COLORS.secondary,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }}
            onPress={() => {
              if (settings.haptics) {
                onImpact();
              }
              remove(history);
            }}
          >
            <MaterialIcons name="delete" size={24} color="white" />
          </TouchableOpacity>
        );
      }}
    >
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 10,
          backgroundColor: theme === "dark" ? COLORS.dark : COLORS.light,
          flex: 1,
          paddingHorizontal: 10,
        }}
        activeOpacity={0.7}
        onPress={async () => {
          if (settings.haptics) {
            await onImpact();
          }
          router.navigate({
            pathname: "/(modals)/result",
            params: {
              results: JSON.stringify(history),
            },
          });
        }}
      >
        <Animated.Image
          source={{ uri: history.xray }}
          style={{
            height: 40,
            width: 40,
            objectFit: "cover",
            marginRight: 10,
            borderRadius: 3,
          }}
        />
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Typography styles={{ fontFamily: FONTS.bold, fontSize: 16 }}>
              {history.prediction?.prediction?.class_label} • (
              {history.prediction.model})
            </Typography>
            <Typography styles={[{ fontSize: 14, color: COLORS.gray }]}>
              {(history.prediction.prediction.probability * 100).toFixed(0)}% •{" "}
              {history.prediction.prediction.class_label} •{" "}
              {dayjs(new Date(history.date)).fromNow()}
            </Typography>
          </View>
        </View>

        <MaterialIcons
          name="history"
          size={24}
          color={theme === "dark" ? COLORS.white : COLORS.black}
        />
      </TouchableOpacity>
    </Swipeable>
  );
};

export default HistoryItem;
