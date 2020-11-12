import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, Button, SearchBar, Icon } from "react-native-elements";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import {
  useBarcodeEvents,
  AsyncStorageBarcodeEvent,
} from "../lib/useBarcodeEvents";
import { useIsFocused, useRoute } from "@react-navigation/native";
import useDebounce from "../lib/useDebounce";
import { HistoryItem } from "../components/HistoryItem";
import theme from "../theme";
import { HistoryScreenRouteProp } from "../navigation/navigationTypes";

interface HistoryScreenProps {}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({}) => {
  const route = useRoute<HistoryScreenRouteProp>();

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
      <FlatList
        stickyHeaderIndices={[0]}
        ListEmptyComponent={
          <View style={styles.listEmptyContainer}>
            <Text style={styles.listEmptyText}>
              {isFilterActive ? "No item with this filter.." : "No history yet"}
            </Text>
          </View>
        }
        ListHeaderComponent={
          <SearchBar
            placeholder="Search by type or description"
            containerStyle={{
              backgroundColor: theme.secondary,
            }}
            inputContainerStyle={{
              backgroundColor: theme.secondary,
            }}
            inputStyle={{
              fontSize: 15,
              color: "white",
              paddingHorizontal: 5,
            }}
            placeholderTextColor="white"
            searchIcon={
              <Icon name="search" type="feather" color="white" size={20} />
            }
            round
            onChangeText={setsearchTerm}
            value={searchTerm}
          />
        }
        data={isFilterActive ? filteredBarcodeEvents : barcodeHistory}
        renderItem={({ item }) => (
          <HistoryItem item={item} editable={route.params?.editMode || false} />
        )}
      />
      {__DEV__ && (
        <Button
          title="Clear AsyncStorage"
          onPress={() => AsyncStorage.clear()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  listEmptyContainer: {
    marginTop: 20,
  },
  listEmptyText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: theme.primaryDark,
  },
});
