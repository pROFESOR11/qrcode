import "react-native-gesture-handler";
import React from "react";
import {
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native";
import * as Analytics from 'expo-firebase-analytics';
import { Container } from "native-base";
import { StatusBar } from "react-native";
import { RootNavigator } from "./navigation/root/RootNavigator";

export default function App() {
  const routeNameRef = React.useRef<string>();
  const navigationRef = React.useRef<NavigationContainerRef>(null);
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() =>
        routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name
      }
      onStateChange={() => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current?.getCurrentRoute()?.name

        if (previousRouteName !== currentRouteName) {
          // The line below uses the expo-firebase-analytics tracker
          // https://docs.expo.io/versions/latest/sdk/firebase-analytics/
          // Change this line to use another Mobile analytics SDK
          Analytics.setCurrentScreen(currentRouteName);
        }

        // Save the current route name for later comparision
        routeNameRef.current = currentRouteName;
      }}
    >
      <Container>
        <StatusBar barStyle="light-content" />
        <RootNavigator />
      </Container>
    </NavigationContainer>
  );
}
