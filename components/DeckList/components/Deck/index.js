import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { blue, white } from "../../../../utils/colors";

const Deck = ({ title, deckLength }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headerText}> {title}</Text>
      </View>
      <View>
        <Text style={styles.bodyText}>
          {deckLength} {deckLength > 1 ? "cards" : "card"}
        </Text>
      </View>
    </View>
  );
};

export default Deck;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: blue,
    borderRadius: 5,
    padding: 30,
    margin: 10,
  },
  headerText: {
    fontSize: 30,
    color: white,
  },
  bodyText: {
    fontSize: 10,
    color: white,
  },
});
