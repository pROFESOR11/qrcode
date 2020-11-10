import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { BarCodeEvent } from "expo-barcode-scanner";

type ScanStackParamList = {
  Scan: undefined;
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
