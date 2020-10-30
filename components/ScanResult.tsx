import { BarCodeScannerResult } from "expo-barcode-scanner";
import React from "react";
import { Card, Text } from "react-native-elements";

interface ScanResultProps {
  scanResult: BarCodeScannerResult;
}

export const ScanResult = ({ scanResult }: ScanResultProps) => {
  return (
    <Card>
      <Card.Title>Scan Results</Card.Title>
      <Card.Divider />
      <Text>{scanResult.data ?? "Something went wrong!"}</Text>
    </Card>
  );
};
