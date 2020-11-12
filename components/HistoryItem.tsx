import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Icon, ListItem } from "react-native-elements";
import { AsyncStorageBarcodeEvent } from "../lib/useBarcodeEvents";
import theme from "../theme";
import { parseBarcode } from "../utils/parseBarcode";

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
  editable?: boolean;
  setnrOfRenders: React.Dispatch<React.SetStateAction<number>>;
}

export const HistoryItem: React.FC<HistoryItemProps> = ({
  item,
  editable = false,
  setnrOfRenders,
}) => {
  const [isDeleted, setisDeleted] = React.useState(false);
  const historyItem = parseBarcode(item.key, item.value);

  if (isDeleted) return <View />;

  return (
    <ListItem bottomDivider>
      {renderItemIcon(item)}
      <ListItem.Content>
        <ListItem.Title>{historyItem.type}</ListItem.Title>
        <ListItem.Subtitle style={styles.subtitle}>
          {historyItem.data}
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Content right>
        {editable ? (
          <View style={styles.editActionsContainer}>
            <Icon
              style={styles.editActionLeft}
              name="star"
              type="antdesign"
              size={30}
              color={
                historyItem.isFavourite ? theme.favourite : theme.secondary
              }
              onPress={async () => {
                await AsyncStorage.mergeItem(
                  historyItem.key,
                  JSON.stringify({
                    ...historyItem,
                    isFavourite: historyItem.isFavourite ? false : true,
                  })
                );
                setnrOfRenders((i) => i + 1);
              }}
            />
            <Icon
              name="delete"
              type="material"
              size={30}
              color={theme.delete}
              onPress={() => {
                Alert.alert(
                  "Are you sure?",
                  "This is an unreversable operation. It will be deleted forever..",
                  [
                    {
                      text: "Yes",
                      style: "destructive",
                      onPress: () => {
                        AsyncStorage.removeItem(historyItem.key);
                        setisDeleted(true);
                      },
                    },
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                  ]
                );
              }}
            />
          </View>
        ) : (
          <Text style={styles.dateText}>
            {new Date(historyItem.date)?.toLocaleDateString()}
          </Text>
        )}
      </ListItem.Content>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontWeight: "bold",
  },
  editActionsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  editActionLeft: {
    marginRight: 10,
  },
  dateText: {
    color: theme.primary,
  },
});
