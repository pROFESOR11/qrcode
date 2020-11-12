import { BarCodeEvent, BarCodeScannerResult } from "expo-barcode-scanner";
import React from "react";
import { View } from "react-native";
import { Card, Text, Button } from "react-native-elements";
import { detectBarcodeTypes } from "../utils/detectBarcodeType";
import { Btn } from "./Btn";

export const ScanResult = ({ scanResult }: { scanResult?: BarCodeEvent }) => {
  return (
    <Card>
      <Card.Title>Scan Results</Card.Title>
      <Card.Divider />
      <Text>{scanResult?.data ?? "Something went wrong!"}</Text>
      <Card.Divider />
      <View style={{ flexDirection: "row" }}>
        <Btn title="SMS" />
        <Btn title="Call" />
        <Btn title="Mail" />
      </View>
    </Card>
  );
};
