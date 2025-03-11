import { TFontSize, TFontStyle, TFontWeight, TModel } from "@/types";

export const LOGO = require("@/assets/images/adaptive-icon.png");

export const LANDING_MESSAGES = [
  "Hello! Welcome to our AI tool—making TB diagnosis faster and easier.",
  "Before using this tool, we recommend you read the Terms and Conditions and Privacy Policy for a better understanding.",
  "Scan your chest X-rays and check your TB STATUS instantly.",
  "Tuberculosis (TB) can be caused by Mycobacterium tuberculosis and is highly infectious.",
  "Use our AI mobile tool to 99.9% accurately predict TB from your chest X-ray images.",
];

export const APP_NAME = "TBAIDA";

export const MODELS: { id: number; name: string; value: TModel }[] = [
  { name: "Mobilenet v3", id: 0, value: "mobilenetv3" },
  { name: "Resnet 50", id: 1, value: "resnet50" },
  { name: "Densenet 201", id: 2, value: "densenet201" },
];

export const FONTSIZES: { id: number; name: TFontSize; value: TFontSize }[] = [
  { name: "default", id: 0, value: "default" },
  { name: "small", id: 0, value: "small" },
  { name: "medium", id: 0, value: "medium" },
  { name: "large", id: 0, value: "large" },
];
export const FONTWEIGHTS: {
  id: number;
  name: TFontWeight;
  value: TFontWeight;
}[] = [
  { name: "normal", id: 0, value: "normal" },
  { name: "bold", id: 0, value: "bold" },
];
export const FONTSTYLES: {
  id: number;
  name: TFontStyle;
  value: TFontStyle;
}[] = [
  { name: "normal", id: 0, value: "normal" },
  { name: "italic", id: 0, value: "italic" },
];

export const COLORS = {
  black: "#000000",
  white: "#ffffff",
  gray: "#8E9598",
  dark: "#18230F",
  light: "#FFEDFA",
  transparent: "transparent",
  primary: "#00879E",
  main: "#003092",
  secondary: "#D84040",
  tertiary: "#1B4D3E",
  lightSecondary: "#F7CFD8",
  darkSecondary: "#3F4F44",
};

export const Fonts = {
  GentiumPlusBold: require("@/assets/fonts/GentiumPlus-Bold.ttf"),
  GentiumPlusRegular: require("@/assets/fonts/GentiumPlus-Regular.ttf"),
  GentiumPlusItalic: require("@/assets/fonts/GentiumPlus-Italic.ttf"),
  GentiumPlusBoldItalic: require("@/assets/fonts/GentiumPlus-BoldItalic.ttf"),
};

export const FONTS = {
  regular: "GentiumPlusRegular",
  bold: "GentiumPlusBold",
  italic: "GentiumPlusItalic",
  boldItalic: "GentiumPlusBoldItalic",
};

export const STORAGE_NAMES = {
  SETTINGS: "tb-ai:settings",
  HISTORY: "tb-ai:history",
};

export const relativeTimeObject = {
  future: "in %s",
  past: "%s",
  s: "now",
  m: "1m",
  mm: "%dm",
  h: "1h",
  hh: "%dh",
  d: "1d",
  dd: "%dd",
  M: "1M",
  MM: "%dM",
  y: "1y",
  yy: "%dy",
};
