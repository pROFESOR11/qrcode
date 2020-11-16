import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import { BarCodeEvent, BarCodeScannerResult } from "expo-barcode-scanner";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { HistoryItem } from "../components/HistoryItem";
import { ScanResult } from "../components/ScanResult";
import { ScanResultScreenRouteProp } from "../navigation/navigationTypes";
import theme from "../theme";
import { ParsedBarcodeEvent } from "../types/barcodeEvent";
import { DetectedBarcodeTypes } from "../utils/detectBarcodeType";
import { parseBarcode } from "../utils/parseBarcode";

export const ScanResultScreen: React.FC = () => {
  const route = useRoute<ScanResultScreenRouteProp>();
  const id = route?.params?.id;
  const [isLoading, setisLoading] = React.useState(true);
  const [barcodeEventWithTypes, setbarcodeEventWithTypes] = React.useState<
    ParsedBarcodeEvent
  >();

  React.useEffect(() => {
    AsyncStorage.getItem(id)
      .then((data) => data && JSON.parse(data))
      .then((parsedData) => setbarcodeEventWithTypes(parsedData))
      .then(() => setisLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      {isLoading && (
        <ActivityIndicator size="large" color={theme.primaryDark} />
      )}
      {barcodeEventWithTypes && (
        <HistoryItem parsedItem={barcodeEventWithTypes} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
