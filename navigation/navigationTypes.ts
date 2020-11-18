import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { BarCodeEvent } from "expo-barcode-scanner";
import { DetectedBarcodeTypes } from "../utils/detectBarcodeType";

export type ScanStackParamList = {
  Scan: {
    cameraType?: "front" | "back";
    isTorchOn?: boolean;
  };
  ScanResult: {
    id: string;
  };
};

export type ScanScreenRouteProp = RouteProp<ScanStackParamList, "Scan">;

export type ScanScreenNavigationProp = StackNavigationProp<
  ScanStackParamList,
  "Scan"
>;

export type ScanResultScreenRouteProp = RouteProp<
  ScanStackParamList,
  "ScanResult"
>;

export type HistoryStackParamList = {
  History: {
    editMode?: boolean;
  };
};

export type HistoryScreenRouteProp = RouteProp<
  HistoryStackParamList,
  "History"
>;
export type HistoryScreenNavigationProp = StackNavigationProp<
  HistoryStackParamList,
  "History"
>;

export type FavouritesStackParamList = {
  Favourites: {
    editMode?: boolean;
  };
};

export type FavouritesScreenRouteProp = RouteProp<
  FavouritesStackParamList,
  "Favourites"
>;
export type FavouritesScreenNavigationProp = StackNavigationProp<
  FavouritesStackParamList,
  "Favourites"
>;

export type FaqStackParamList = {
  Faq: undefined;
};
