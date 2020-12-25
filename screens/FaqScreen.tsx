import React from "react";
import { Text, SafeAreaView, StyleSheet, View } from "react-native";
import { Accordion } from "native-base";
import theme from "../theme";

interface FaqScreenProps {}

const dataArray = [
  {
    title: "Is it safe to scan QR codes with confidential data?",
    content:
      "Yes, definitely. All data is kept on your own device, not on anywhere else.",
  },
  {
    title: "How do I know if a QR code is working?",
    content:
      "Scan the QR Code by opening the app and face the phone camera towards your code. If your QR Code is readable, the encoded address or action will be accessed automatically. It is important to test the QR Code printed in its actual size.",
  },
  {
    title: "Why is my QR code scanner not working?",
    content:
      "Your phone's camera may have trouble scanning the code if it's tilted at an angle. Make sure it's level with the surface that the code is printed on. If you're holding your phone too close or too far away, it won't scan the code. Try holding your phone about a foot away and slowly moving it towards the QR code.",
  },
  {
    title: "Does a screenshot of a QR code work?",
    content:
      "No person would read the QR code, it will be a scanner (or more) doing that, so for the scanner it makes no difference if it's printed or on your phone. A screenshot will work, so long as the reader can read the code you'll be fine.",
  },
  {
    title: "How can I reach previously scanned QR codes?",
    content:
      "If you need a previously scanned QR code again, no problem! You can use history screen to see previously scanned QR codes.",
  },
  {
    title: "How can I reach easily a QR code?",
    content:
      "If you need a QR code regularly, you can add it to favorites. You will find your favorites in the Favorites screen, where you can remove it from the favorites list, if you don't need it anymore.",
  },
  {
    title: "How can I remove a QR code data?",
    content:
      "Normally, all scanned QR codes are saved to your device memory, in case you need them again. This means that this data is kept and only accessible from your own device. If you still want to remove the data, you can delete in Favorites or History screens.",
  },
];

export const FaqScreen: React.FC<FaqScreenProps> = ({}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Accordion
        dataArray={dataArray}
        expanded={0}
        headerStyle={{ paddingHorizontal: 5 }}
        iconStyle={{ color: "blue" }}
        renderContent={(item, index) => (
          <View style={{ paddingHorizontal: 10, paddingBottom: 15  }}>
            <Text
              style={{
                color: "gray",
              }}
            >
              {item.content}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 4,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  regular: {
    fontSize: 12,
  },
});
