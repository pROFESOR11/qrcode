import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { BarCodeEvent } from "expo-barcode-scanner";

export type ScanStackParamList = {
  Scan: {
    cameraType?: "front" | "back";
  };
  ScanResult: {
    barcodeEvent?: BarCodeEvent;
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
