export type TTheme = "dark" | "light";

export type TModel = "mobilenetv3" | "resnet50" | "densenet201";
export type TStatus = "ok" | "error";
export type TFontSize = "default" | "medium" | "small" | "large";
export type TFontWeight = "bold" | "normal";
export type TFontStyle = "italic" | "normal";
export type TSettings = {
  haptics: boolean;
  sound: boolean;
  keepAwake: boolean;
  brightness: number;
  theme: TTheme;
  new: boolean;
  fontsize: TFontSize;
  fontWeight: TFontWeight;
  fontStyle: TFontStyle;
  keepHistory: boolean;
};

export interface TPrediction {
  label: number;
  class_label: string;
  probability: number;
}

export interface TPredictionResponse {
  time: number;
  ok: boolean;
  status: TStatus;
  prediction: TPrediction;
  model: TModel;
}
export type THistory = {
  id: string;
  date: Date;
  prediction: TPredictionResponse;
};
