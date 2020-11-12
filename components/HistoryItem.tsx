import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon, ListItem } from "react-native-elements";
import { AsyncStorageBarcodeEvent } from "../lib/useBarcodeEvents";
import theme from "../theme";

const renderItemIcon = (item: AsyncStorageBarcodeEvent) => {
  return (
    <Icon
      type="material-community"
      name="barcode"
      reverse
      iconStyle={{
        fontSize: 33,
      }}
      color={theme.primary}
      raised
    />
  );
};

interface HistoryItemProps {
  item: AsyncStorageBarcodeEvent;
}

export const HistoryItem: React.FC<HistoryItemProps> = ({ item }) => {
  return (
    <ListItem bottomDivider>
      {renderItemIcon(item)}

      <ListItem.Content>
        <ListItem.Title>Barcode</ListItem.Title>
        <ListItem.Subtitle style={{ fontWeight: "bold" }}>
          7257969970556
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Content right>
        <Text style={{ color: theme.primary }}>12/29/2014</Text>
      </ListItem.Content>
    </ListItem>
    // <View style={styles.container}>
    //   <View style={styles.leftContainer}>
    //     {renderItemIcon(item)}
    //     <View style={styles.details}>
    //       <Text>Barcode</Text>
    //       <View style={styles.data}>
    //         <Text>data here</Text>
    //       </View>
    //     </View>
    //   </View>
    //   <View style={styles.rightContainer}>
    //     <Text>date here</Text>
    //   </View>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftContainer: {
    padding: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  details: {
    padding: 2,
    marginLeft: 10,
    flexDirection: "column",
    overflow: "hidden",
  },
  data: {
    marginTop: 5,
  },
  rightContainer: {
    alignItems: "flex-start",
  },
});
