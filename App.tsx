import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { StatusBar } from "react-native";
import { RootNavigator } from "./navigation/root/RootNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <RootNavigator />
    </NavigationContainer>
  );
}
