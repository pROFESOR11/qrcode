import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import Markdown from "react-native-markdown-renderer";
import privacyPolicy from "../assets/docs/privacyPolicy";
import terms from "../assets/docs/terms";
import { DocsScreenRouteProp, DocsScreenNavigationProp } from "../navigation/navigationTypes";
import theme from "../theme";

const DocsScreen: React.FC = () => {
  const route = useRoute<DocsScreenRouteProp>();
  const navigation = useNavigation<DocsScreenNavigationProp>()

  const docType = route.params.type

  const getDoc = () => {
      if (docType === "privacy") {
          return privacyPolicy
      } else {
          return terms
      }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ padding: 20 }}
      >
        <Markdown style={styles}>{getDoc()}</Markdown>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading: {
    borderBottomWidth: 1,
    borderColor: "#000000",
  },
  heading1: {
    fontSize: 32,
    backgroundColor: "#000000",
    color: "#FFFFFF",
  },
  heading2: {
    fontSize: 24,
  },
  heading3: {
    fontSize: 18,
  },
  heading4: {
    fontSize: 16,
  },
  heading5: {
    fontSize: 13,
  },
  heading6: {
    fontSize: 11,
  },
});

export default DocsScreen