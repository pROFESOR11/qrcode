import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HistoryScreen } from "../screens/HistoryScreen";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { ScannerScreen } from "../screens/ScannerScreen";

const BottomTab = createBottomTabNavigator();

export function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      tabBarOptions={{
        activeTintColor: "green",
        inactiveTintColor: "gray",
        showLabel: false,
      }}
    >
      <BottomTab.Screen
        name="Scan"
        component={ScannerScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="md-qr-scanner" size={size * 1.3} color={color} />
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
    </BottomTab.Navigator>
  );
}
