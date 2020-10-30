import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, Button, SearchBar } from "react-native-elements";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import {
  useBarcodeEvents,
  AsyncStorageBarcodeEvent,
} from "../lib/useBarcodeEvents";
import { useIsFocused } from "@react-navigation/native";
import useDebounce from "../lib/useDebounce";

interface HistoryScreenProps {}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({}) => {
  const [filteredBarcodeEvents, setfilteredBarcodeEvents] = useState<
    AsyncStorageBarcodeEvent[]
  >();

  // refetch history on focus
  const isFocused = useIsFocused();
  const barcodeHistory = useBarcodeEvents(isFocused);

  // raw user input
  const [searchTerm, setsearchTerm] = useState("");

  // wait for debounce, this will prevent unnecessary actions while user is still typing
  const debouncedSearchTerm = useDebounce<String>(searchTerm);

  useEffect(() => {
    // filter values including debounced search term
    const filtered = barcodeHistory?.filter((barcodeHistoryItem) =>
      barcodeHistoryItem.value
        ?.toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase())
    );
    setfilteredBarcodeEvents(filtered);
  }, [debouncedSearchTerm]);

  // check if filter is active, if it is active then render only filtered items
  const isFilterActive = debouncedSearchTerm !== "";

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search.."
        onChangeText={setsearchTerm}
        value={searchTerm}
      />
      {isFilterActive ? (
        filteredBarcodeEvents ? (
          <Text>{JSON.stringify(filteredBarcodeEvents, null, 2)}</Text>
        ) : (
          <Text>No item found</Text>
        )
      ) : barcodeHistory ? (
        <Text>{JSON.stringify(barcodeHistory, null, 2)}</Text>
      ) : (
        <Text>No history found</Text>
      )}
      <Button title="Clear AsyncStorage" onPress={() => AsyncStorage.clear()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
});
