import { FONTS } from "@/constants";
import { TSettings } from "@/types";
import { StyleSheet } from "react-native";

export const FONT_STYLING = StyleSheet.create({
  default: { fontSize: 16 },
  small: { fontSize: 14 },
  medium: { fontSize: 18 },
  large: { fontSize: 20 },
});

export const getFontFamily = (settings: TSettings) => {
  return {
    fontFamily:
      settings.fontWeight === "bold" && settings.fontStyle === "italic"
        ? FONTS.boldItalic
        : settings.fontStyle === "italic"
        ? FONTS.italic
        : settings.fontWeight === "bold"
        ? FONTS.bold
        : FONTS.regular,
  };
};

export const getIconSize = (settings: TSettings): number => {
  if (settings.fontsize === "default") return 18;
  if (settings.fontsize === "small") return 16;
  if (settings.fontsize === "medium") return 20;
  return 22;
};
