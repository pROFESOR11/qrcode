import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View, StyleSheet } from "react-native";
import { ScannerScreen } from "../../screens/ScannerScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { ScanResultScreen } from "../../screens/ScanResultScreen";
import defaultOptions from "./defaultStackOptions";

const Stack = createStackNavigator();

const ScannerStack: React.FC = () => {
  return (
    <Stack.Navigator {...defaultOptions}>
      <Stack.Screen
        name="Scan"
        component={ScannerScreen}
        options={{
          headerLeft: (props) => (
            <View style={styles.headerLeft}>
              <MaterialCommunityIcons
                style={styles.headerLeftIcon}
                name="flashlight"
                size={30}
                color="white"
              />
              <Ionicons
                name="md-reverse-camera"
                size={30}
                color="white"
                style={styles.headerLeftIcon}
              />
            </View>
          ),
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
      <Stack.Screen component={ScanResultScreen} name="ScanResult" />
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

export default ScannerStack;
