import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, processColor } from "react-native";
import { BarCodeEvent, BarCodeScanner } from "expo-barcode-scanner";
import { saveBarcodeEvent } from "../lib/barcodeEvents";
import mockBarcodes from "../mock/mockBarcodes";
import { ScanResult } from "../components/ScanResult";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import theme from "../theme";
import {
  ScanScreenNavigationProp,
  ScanScreenRouteProp,
} from "../navigation/navigationTypes";
import { Camera } from "expo-camera";
import { detectBarcodeTypes } from "../utils/detectBarcodeType";

interface ScannerScreenProps {}

export const ScannerScreen: React.FC<ScannerScreenProps> = ({}) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const navigation = useNavigation<ScanScreenNavigationProp>();

  const isFocussed = useIsFocused();

  const route = useRoute<ScanScreenRouteProp>();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = (barcodeEvent: BarCodeEvent) => {
    try {
      const detectedBarcodeTypes = detectBarcodeTypes(barcodeEvent.data);
      const barcodeEventWithTypes = {
        ...barcodeEvent,
        details: detectedBarcodeTypes,
      };
      const id = saveBarcodeEvent(barcodeEventWithTypes);
      id &&
        navigation.navigate("ScanResult", {
          id,
        });
    } catch (err) {
      console.log("err", err);
    }
  };

  async function mockQRScan() {
    try {
      const _scanned = await BarCodeScanner.scanFromURLAsync(
        mockBarcodes.qr.sms
      );
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
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        {isFocussed && (
          <Camera
            flashMode={route.params?.isTorchOn ? "torch" : undefined}
            onBarCodeScanned={handleBarCodeScanned}
            type={route.params?.cameraType || "back"}
            style={StyleSheet.absoluteFillObject}
          />
        )}

        <View style={{ backgroundColor: "rgba(178, 178, 178, 0.5)" }}>
          <Text
            style={{ padding: 10, textAlign: "center", color: theme.greyish }}
          >
            Hold over a barcode or QR code
          </Text>
          {__DEV__ && (
            <Text
              style={{
                padding: 10,
                textAlign: "center",
                color: theme.primaryDark,
              }}
              onPress={mockQRScan}
            >
              Mock QR Code
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};
