import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { BottomTabNavigator } from "./navigation/tab/BottomNavigator";
import { StatusBar } from "react-native";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <BottomTabNavigator />
    </NavigationContainer>
  );
}
