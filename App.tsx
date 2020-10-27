import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ScanStack } from "./navigation/ScanStack";

export default function App() {
  return (
    <NavigationContainer>
      <ScanStack />
    </NavigationContainer>
  );
}
