import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import {
  H1,
  H2,
  H3,
  H4,
  Lead,
  Large,
  P,
  Small,
} from "~/components/ui/typography";

const HomeScreenHero = ({ entities }) => {
  console.log(entities[0]);
  return (
    <View>
      <Image
        source={{ uri: entities[0].image_url }}
        style={styles.image}
        onError={() =>
          console.log(`Failed to load image: ${entities[0].image_url}`)
        }
      />
      <View className="p-5">
        <Large className="pt-2 pb-5">{entities[0].entity_name}</Large>
        <P className="pb-5">{entities[0].short_description}</P>
        <Small className="pb-5">
          {entities[0].location.location_name} |{" "}
          {entities[0].category.category_name}
        </Small>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 16,
  },
  gradient: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    position: "absolute",
    top: 140,
    left: 0,
    right: 0,
    width: "100%",
    height: 60,
    textAlign: "left",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  description: {
    fontSize: 14,
    padding: 10,
  },
});

export default HomeScreenHero;
