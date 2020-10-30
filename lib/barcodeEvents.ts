import AsyncStorage from "@react-native-async-storage/async-storage";
import { BarCodeEvent } from "expo-barcode-scanner";
import { uuidv4 } from "../utils/uuid";

export function saveBarcodeEvent(barcodeEvent: BarCodeEvent) {
  const { data, type } = barcodeEvent;
  try {
    AsyncStorage.setItem(
      uuidv4(),
      JSON.stringify({ data, type, date: new Date() })
    );
  } catch (error) {
    console.log("error", error);
  }
}
