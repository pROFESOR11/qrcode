import { CommonActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { FavouritesScreen } from "../../screens/FavouritesScreen";
import {
  FavouritesScreenNavigationProp,
  FavouritesScreenRouteProp,
  FavouritesStackParamList,
} from "../navigationTypes";
import defaultOptions from "./defaultStackOptions";

const Stack = createStackNavigator<FavouritesStackParamList>();

const FavouritesStack: React.FC = () => {
  return (
    <Stack.Navigator {...defaultOptions}>
      <Stack.Screen
        name="Favourites"
        component={FavouritesScreen}
        options={({
          route,
          navigation,
        }: {
          navigation: FavouritesScreenNavigationProp;
          route: FavouritesScreenRouteProp;
        }) => ({
          headerRight: (props) => (
            <Icon
              type="font-awesome-5"
              name="question-circle"
              size={30}
              color="white"
              style={styles.headerRightIcon}
              onPress={() => navigation.dispatch(CommonActions.navigate("Faq"))}
            />
          ),
          headerLeft: (props) => (
            <Icon
              type="fontawesome5"
              name="edit"
              size={30}
              color="white"
              style={styles.headerLeftIcon}
              onPress={() =>
                navigation.setParams({
                  editMode: route.params?.editMode === true ? false : true,
                })
              }
            />
          ),
        })}
      />
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

export default FavouritesStack;
