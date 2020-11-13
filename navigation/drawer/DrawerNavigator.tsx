import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";

import { BottomTabNavigator } from "../tab/BottomNavigator";
import theme from "../../theme";
import { View } from "react-native";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerPosition="right"
      drawerStyle={{
        backgroundColor: "#23638E",
      }}
      drawerContentOptions={{
        activeBackgroundColor: theme.primaryDark,
        labelStyle: { color: theme.white },
      }}
    >
      <Drawer.Screen name="Home" component={BottomTabNavigator} />
    </Drawer.Navigator>
  );
}
