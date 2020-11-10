import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { View, Text } from "react-native";

const Drawer = createDrawerNavigator();

const TempDrawerScreeen = () => {
  return (
    <View>
      <Text>TempDrawerScreeen</Text>
    </View>
  );
};

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator drawerPosition="right">
      <Drawer.Screen name="Drawer1" component={TempDrawerScreeen} />
      <Drawer.Screen name="Drawer2" component={TempDrawerScreeen} />
    </Drawer.Navigator>
  );
}
