import { BarCodeEvent, BarCodeScannerResult } from "expo-barcode-scanner";
import React from "react";
import { View } from "react-native";
import { Card, Text, Button, ListItem, Icon } from "react-native-elements";
import theme from "../theme";
import {
  detectBarcodeTypes,
  DetectedBarcodeTypes,
} from "../utils/detectBarcodeType";
import { BarcodeTypeIcon } from "./BarcodeTypeIcon";
import { HistoryItem } from "./HistoryItem";

export const ScanResult = ({
  scanResult,
}: {
  scanResult: BarCodeEvent & { types: DetectedBarcodeTypes };
}) => {
  return <View />;
};
