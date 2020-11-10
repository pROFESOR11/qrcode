import { FontAwesome5 } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View, StyleSheet } from "react-native";
import { HistoryScreen } from "../../screens/HistoryScreen";
import defaultOptions from "./defaultStackOptions";

const Stack = createStackNavigator();

const HistoryStack: React.FC = () => {
  return (
    <Stack.Navigator {...defaultOptions}>
      <Stack.Screen
        name="History"
        component={HistoryScreen}
        options={{
          headerRight: (props) => (
            <FontAwesome5
              name="question-circle"
              size={30}
              color="white"
              style={styles.headerRightIcon}
            />
          ),
        }}
      />
      {/* <Stack.Screen component={ScanResultScreen} name="ScanResult" /> */}
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

export default HistoryStack;
