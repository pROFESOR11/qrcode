import { BottomTabNavigator } from "../tab/BottomNavigator";

import React from "react";
import DrawerNavigator from "../drawer/DrawerNavigator";

interface RootNavigatorProps {}

export const RootNavigator: React.FC<RootNavigatorProps> = ({}) => {
  return <DrawerNavigator />;
};
