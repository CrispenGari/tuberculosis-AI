import * as Sharing from "expo-sharing";
import mime from "mime";
import * as FileSystem from "expo-file-system";
import { Alert } from "react-native";
import * as Haptics from "expo-haptics";
import { Audio } from "expo-av";
import * as StoreReview from "expo-store-review";
import * as Updates from "expo-updates";
import * as Constants from "expo-constants";
import { ReactNativeFile } from "apollo-upload-client";
import * as rnMimeTypes from "react-native-mime-types";

export const generateRNFile = ({
  uri,
  name,
}: {
  uri: string;
  name: string;
}) => {
  return uri
    ? new ReactNativeFile({
        uri,
        type: rnMimeTypes.lookup(uri) || "image",
        name,
      })
    : null;
};
let publishedSound: Audio.Sound | undefined;

export const rateApp = async () => {
  const available = await StoreReview.isAvailableAsync();
  if (available) {
    const hasAction = await StoreReview.hasAction();
    if (hasAction) {
      await StoreReview.requestReview();
    }
  }
};
export const onFetchUpdateAsync = async () => {
  try {
    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    }
  } catch (error) {
    Alert.alert(
      Constants.default.name,
      error as any,
      [{ text: "OK", style: "destructive" }],
      { cancelable: false }
    );
  }
};

// export const playPublishSound = async () => {
//   const { sound: s, status } = await Audio.Sound.createAsync(
//     require("@/assets/sounds/published.mp3"),
//     {
//       shouldPlay: true,
//       isLooping: false,
//       isMuted: false,
//     }
//   );
//   if (status.isLoaded) {
//     publishedSound = s;
//   }
//   if (!!publishedSound) {
//     await publishedSound.playAsync().catch((err) => console.log(err));
//   }
// };
export const onImpact = async () =>
  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
export const getMimeType = (url: string) => mime.getType(url) || undefined;
export const downloadMedia = async (url: string) => {
  const fileName = mime.getExtension(getMimeType(url)!) || "fileName-img.jpg";
  const downloadPath = FileSystem.cacheDirectory + fileName;
  const { uri } = await FileSystem.downloadAsync(url, downloadPath);

  return {
    uri,
  };
};
export const shareSomething = async (url: string, dialogTitle: string) => {
  const isAvailable = await Sharing.isAvailableAsync();
  if (!isAvailable) return;
  const { uri } = await downloadMedia(url);
  await Sharing.shareAsync(uri, {
    dialogTitle,
    UTI: getMimeType(url),
    mimeType: getMimeType(url),
  });
};
