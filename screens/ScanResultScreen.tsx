import { useRoute } from "@react-navigation/native";
import { BarCodeEvent, BarCodeScannerResult } from "expo-barcode-scanner";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ScanResult } from "../components/ScanResult";
import { ScanResultScreenRouteProp } from "../navigation/navigationTypes";

export const ScanResultScreen: React.FC = () => {
  const route = useRoute<ScanResultScreenRouteProp>();
  const scanResult = route?.params?.barcodeEvent;

  return (
    <View style={styles.container}>
      <ScanResult scanResult={scanResult} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
