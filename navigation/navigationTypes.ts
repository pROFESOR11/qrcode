import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type ScanStackParamList = {
  Landing: undefined;
  Scanner: undefined;
};

export type LandingScreenRouteProp = RouteProp<ScanStackParamList, "Landing">;

export type LandingScreenNavigationProp = StackNavigationProp<
  ScanStackParamList,
  "Landing"
>;

export type ScannerScreenRouteProp = RouteProp<ScanStackParamList, "Scanner">;

export type ScannerScreenNavigationProp = StackNavigationProp<
  ScanStackParamList,
  "Scanner"
>;
