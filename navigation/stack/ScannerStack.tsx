import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View, StyleSheet } from "react-native";
import { ScannerScreen } from "../../screens/ScannerScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { ScanResultScreen } from "../../screens/ScanResultScreen";
import defaultOptions from "./defaultStackOptions";
import {
  ScanScreenNavigationProp,
  ScanScreenRouteProp,
  ScanStackParamList,
} from "../navigationTypes";
import { Icon } from "react-native-elements";

const Stack = createStackNavigator<ScanStackParamList>();

const ScannerStack: React.FC = () => {
  return (
    <Stack.Navigator {...defaultOptions}>
      <Stack.Screen
        name="Scan"
        component={ScannerScreen}
        options={({
          route,
          navigation,
        }: {
          navigation: ScanScreenNavigationProp;
          route: ScanScreenRouteProp;
        }) => ({
          headerLeft: (props) => (
            <View style={styles.headerLeft}>
              <Icon
                type="material-community"
                style={styles.headerLeftIcon}
                name="flashlight"
                size={30}
                color="white"
                onPress={() => {
                  navigation.setParams({
                    isTorchOn: route.params?.isTorchOn ? false : true,
                  });
                }}
              />
              <Icon
                type="ionicon"
                name="md-reverse-camera"
                size={30}
                color="white"
                style={styles.headerLeftIcon}
                onPress={() =>
                  navigation.setParams({
                    cameraType:
                      route.params?.cameraType === "front" ? "back" : "front",
                  })
                }
              />
            </View>
          ),
          headerRight: (props) => (
            <Icon
              type="font-awesome-5"
              name="question-circle"
              size={30}
              color="white"
              style={styles.headerRightIcon}
            />
          ),
        })}
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
