import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HistoryScreen } from "../../screens/HistoryScreen";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { FavouritesScreen } from "../../screens/FavouritesScreen";
import HistoryStack from "../stack/HistoryStack";
import ScannerStack from "../stack/ScannerStack";
import FavouritesStack from "../stack/FavouritesStack";
import theme from "../../theme";

const BottomTab = createBottomTabNavigator();

export function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      tabBarOptions={{
        activeTintColor: theme.primaryLight,
        inactiveBackgroundColor: theme.primary,
        activeBackgroundColor: theme.primaryDark,
        inactiveTintColor: theme.white,
        showLabel: false,
      }}
    >
      <BottomTab.Screen
        name="Scan"
        component={ScannerStack}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="md-qr-scanner" size={size} color={color} />
          ),
          title: "Scan",
        }}
      />
      <BottomTab.Screen
        name="History"
        component={HistoryStack}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome name="history" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Favourites"
        component={FavouritesStack}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome name="star" size={size} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
