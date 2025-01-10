// components/Map.tsx
import React from "react";
import { Platform, View, StyleSheet, Text } from "react-native";

const Map = () => {
  if (Platform.OS === "web") {
    return (
      <View style={styles.webFallback}>
        <Text style={styles.text}>Map is not supported on Web.</Text>
      </View>
    );
  }

  // Importar apenas em dispositivos móveis
  const MapView = require("react-native-maps").default;
  const Marker = require("react-native-maps").Marker;

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }} />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
    height: 200,
  },
  webFallback: {
    flex: 1,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  text: {
    fontSize: 14,
    color: "#555",
  },
});

export default Map;
