import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, processColor } from "react-native";
import { BarCodeEvent, BarCodeScanner } from "expo-barcode-scanner";
import { saveBarcodeEvent } from "../lib/barcodeEvents";
import mockBarcodes from "../mock/mockBarcodes";
import { ScanResult } from "../components/ScanResult";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

interface ScannerScreenProps {}

export const ScannerScreen: React.FC<ScannerScreenProps> = ({}) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isScanActive, setisScanActive] = useState(true);
  const [scannedQR, setscannedQR] = useState<BarCodeEvent>();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = (barcodeEvent: BarCodeEvent) => {
    try {
      setscannedQR(barcodeEvent);
      setisScanActive(false);
      saveBarcodeEvent(barcodeEvent);
    } catch (err) {
      console.log("err", err);
    }
  };

  async function mockQRScan() {
    try {
      const _scanned = await BarCodeScanner.scanFromURLAsync(mockBarcodes.test);
      if (!_scanned) return;
      const scanned = _scanned[0];
      handleBarCodeScanned(scanned);
    } catch (error) {
      console.error(error);
    }
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: "column",
      }}
    >
      {!isScanActive && (
        <Button
          title={"Tap to Scan Again"}
          onPress={() => setisScanActive(true)}
        />
      )}

      {isScanActive && (
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )}

      {__DEV__ && isScanActive && (
        <Button title="Mock QR Scan" onPress={mockQRScan} />
      )}

      {!isScanActive && scannedQR && <ScanResult scanResult={scannedQR} />}
    </SafeAreaView>
  );
};
