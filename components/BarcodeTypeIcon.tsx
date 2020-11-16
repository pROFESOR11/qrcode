import { Icon } from "react-native-elements";
import theme from "../theme";
import React from "react";

export const BarcodeTypeIcon = ({ item }: { item: any }) => {
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
