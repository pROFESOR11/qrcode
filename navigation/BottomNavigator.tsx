import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HistoryScreen } from "../screens/HistoryScreen";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { ScannerScreen } from "../screens/ScannerScreen";
import { FavouritesScreen } from "../screens/FavouritesScreen";

const BottomTab = createBottomTabNavigator();

export function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      tabBarOptions={{
        activeTintColor: "#4498D2",
        inactiveBackgroundColor: "#4AA0DD",
        activeBackgroundColor: "#23638E",
        inactiveTintColor: "#FFFFFF",
        showLabel: false,
      }}
    >
      <BottomTab.Screen
        name="Scan"
        component={ScannerScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="md-qr-scanner" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome name="history" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Favourites"
        component={FavouritesScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome name="star" size={size} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
