import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Test from "../screens/Test";

const Stack = createStackNavigator();

export const ScanStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Test} />
    </Stack.Navigator>
  );
};
