import { Ionicons } from "@expo/vector-icons";
import React from "react";

import { Button, ButtonProps } from "react-native-elements";

export const Btn: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      buttonStyle={{
        backgroundColor: "#628B43",
        ...(props.buttonStyle as object),
      }}
      {...props}
    />
  );
};
