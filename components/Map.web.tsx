// components/WebMap.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const WebMap = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Google Maps or Placeholder for Web</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eaeaea",
  },
  text: {
    color: "#555",
  },
});

export default WebMap;
