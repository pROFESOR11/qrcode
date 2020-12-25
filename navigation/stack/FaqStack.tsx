import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigationState } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { FaqScreen } from "../../screens/FaqScreen";
import { FaqStackParamList } from "../navigationTypes";

import defaultOptions from "./defaultStackOptions";

const Stack = createStackNavigator<FaqStackParamList>();

const FaqStack: React.FC = () => {
  return (
    <Stack.Navigator
      {...defaultOptions}
      screenOptions={({ navigation, route }) => ({
        ...defaultOptions.screenOptions,
        headerLeft: () => (
          <Icon
            name="ios-arrow-back"
            type="ionicon"
            size={30}
            color="white"
            style={styles.headerLeftIcon}
            onPress={() => navigation.goBack()}
          />
        ),
      })}
    >
      <Stack.Screen name="Faq" component={FaqScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerLeft: {
    flexDirection: "row",
  },
  headerLeftIcon: {
    marginLeft: 10,
  },
  headerRight: {},
  headerRightIcon: {
    marginRight: 10,
  },
});

export default FaqStack;
