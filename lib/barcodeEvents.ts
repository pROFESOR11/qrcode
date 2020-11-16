import AsyncStorage from "@react-native-async-storage/async-storage";
import { BarCodeEvent } from "expo-barcode-scanner";
import { DetectedBarcodeTypes } from "../utils/detectBarcodeType";
import { uuidv4 } from "../utils/uuid";

export function saveBarcodeEvent(
  barcodeEvent: BarCodeEvent & { details: DetectedBarcodeTypes }
) {
  const { data, type, details } = barcodeEvent;
  try {
    const uuid = uuidv4();
    AsyncStorage.setItem(
      uuid,
      JSON.stringify({
        data,
        type,
        isFavourite: false,
        date: new Date(),
        details,
      })
    );
    return uuid;
  } catch (error) {
    console.log("error", error);
  }
}
