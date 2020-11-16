import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Linking, Platform } from "react-native";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Button, Card, Icon, ListItem } from "react-native-elements";
import { AsyncStorageBarcodeEvent } from "../lib/useBarcodeEvents";
import theme from "../theme";
import { ParsedBarcodeEvent } from "../types/barcodeEvent";
import { createCalendarEvent } from "../utils/calendar";
import {
  DetectedBarcodeType,
  DetectedBarcodeTypes,
  getCalendarInfo,
  ValueOf,
} from "../utils/detectBarcodeType";
import { parseBarcode } from "../utils/parseBarcode";
import { BarcodeTypeIcon } from "./BarcodeTypeIcon";
import * as SMS from "expo-sms";
import { createContact } from "../utils/contacts";
import * as Contacts from "expo-contacts";
import { uuidv4 } from "../utils/uuid";

interface HistoryItemProps {
  item?: AsyncStorageBarcodeEvent;
  parsedItem?: ParsedBarcodeEvent;
  editable?: boolean;
  setnrOfRenders?: React.Dispatch<React.SetStateAction<number>>;
}

export const HistoryItem: React.FC<HistoryItemProps> = ({
  item,
  parsedItem,
  editable = false,
  setnrOfRenders,
}) => {
  const [isDeleted, setisDeleted] = React.useState(false);

  const historyItem =
    parsedItem || (item && parseBarcode(item?.key, item?.value));

  function renderActionButton(detail: DetectedBarcodeType) {
    const key = uuidv4();
    let iconName: string;
    let iconType: string;
    let title: string;
    let onPress: () => void;

    switch (detail.type) {
      case "BARCODE_TYPE_CALENDAR":
        iconName = "calendar-plus-o";
        iconType = "font-awesome";
        title = "Add To Calendar";
        onPress = async () =>
          historyItem?.data &&
          (await createCalendarEvent(getCalendarInfo(historyItem.data)));
        break;
      case "BARCODE_TYPE_EMAIL":
        iconName = "send";
        iconType = "font-awesome";
        title = "Send Email";
        onPress = () => Linking.openURL(detail.emailLinkingUrl);
        break;
      case "BARCODE_TYPE_GEO":
        iconName = "map-marked";
        iconType = "font-awesome-5";
        title = "Open in Maps";
        onPress = () => {
          const scheme = Platform.select({
            ios: "maps:0,0?q=",
            android: "geo:0,0?q=",
          });
          const latLng = `${detail.latitude},${detail.longitude}`;
          const label = detail.query;
          const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`,
          });
          url && Linking.openURL(url);
        };
        break;
      case "BARCODE_TYPE_PHONE":
        iconName = "call";
        iconType = "material";
        title = "Call";
        onPress = () => {
          Linking.openURL(`tel:${detail.phoneNumber}`);
        };
        break;
      case "BARCODE_TYPE_SMS":
        iconName = "textsms";
        iconType = "material-icons";
        title = "SMS";
        onPress = async () => {
          const isAvailable = await SMS.isAvailableAsync();
          if (isAvailable) {
            SMS.sendSMSAsync(detail.phoneNumber, detail.message);
          }
        };
        break;
      case "BARCODE_TYPE_URL":
        iconName = "web";
        iconType = "material-community";
        title = "Open Website";
        onPress = () => {
          Linking.openURL(detail.url);
        };
        break;
      case "BARCODE_TYPE_VCARD":
        iconName = "address-card";
        iconType = "font-awesome";
        title = "Add to Contacts";
        onPress = async () => {
          const isSuccess = await createContact(detail);
          console.log("isSuccess", isSuccess);
        };
        break;
      default:
        return <View />;
    }

    return (
      <Button
        style={{
          marginHorizontal: 10,
          marginVertical: 5,
        }}
        key={key}
        title={title}
        titleStyle={{
          fontSize: 12,
        }}
        icon={{
          name: iconName,
          type: iconType,
          size: 20,
          color: theme.white,
        }}
        onPress={onPress}
      />
    );
  }

  function renderActionButtons() {
    return (
      <View style={styles.actionsContainer}>
        {historyItem?.details?.map((detail) => renderActionButton(detail))}
      </View>
    );
  }

  if (isDeleted || !historyItem) return <View />;

  return (
    <Card containerStyle={{ margin: 10 }}>
      <ListItem bottomDivider>
        <BarcodeTypeIcon />
        <ListItem.Content>
          <ListItem.Title>{historyItem.type.split(".").pop()}</ListItem.Title>
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
                  setnrOfRenders && setnrOfRenders((i) => i + 1);
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
      {renderActionButtons()}
    </Card>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    marginTop: 3,
    fontSize: 14,
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
  actionsContainer: {
    flexGrow: 1,
    marginTop: 10,
    justifyContent: "flex-end",
    flexWrap: "wrap",
    flexDirection: "row",
  },
});
