import { StateStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const zustandStorage: StateStorage = {
  getItem: async (key: string) => {
    try {
      const v = await AsyncStorage.getItem(key);
      return v;
    } catch (error) {
      return null;
    }
  },
  removeItem: async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      return false;
    }
  },
  setItem: async <TValue extends string>(key: string, value: TValue) => {
    try {
      await AsyncStorage.setItem(key, value);
      return true;
    } catch (error) {
      return false;
    }
  },
};
