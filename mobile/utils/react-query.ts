import { TModel, TPredictionResponse } from "@/types";
import { ReactNativeFile } from "apollo-upload-client";

const __serverURL__ = "https://cc7d-105-9-16-246.ngrok-free.app"; //process.env.EXPO_PUBLIC_SERVER_URL!;

export const predictTB = async ({
  xray,
  modelName,
}: {
  xray: ReactNativeFile;
  modelName: TModel;
}) => {
  const formData = new FormData();
  formData.append("xray", xray);
  const res = await fetch(`${__serverURL__}/api/v1/tb/predict/${modelName}`, {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  return data as TPredictionResponse;
};
