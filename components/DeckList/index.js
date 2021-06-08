import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";

import { handleInitialData } from "../../actions";
import { pink, white } from "../../utils/colors";
import Deck from "./components/Deck";

const DeckList = ({ decks, handleInitialData, navigation }) => {
  useEffect(() => {
    handleInitialData();
  }, []);

  return (
    <>
      {!decks ? (
        <Text>Loading...</Text>
      ) : (
        <ScrollView style={styles.container}>
          <Text style={styles.textHeader}>My Mobile Flashcards</Text>
          {Object.values(decks).map((deck) => (
            <TouchableOpacity
              key={deck.title}
              onPress={() => {
                return navigation.navigate("DeckInfo", { title: deck.title });
              }}
            >
              <Deck title={deck.title} deckLength={deck.questions.length} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: pink,
  },
  textHeader: {
    color: white,
    fontSize: 40,
    textAlign: "center",
  },
});

const mapStateToProps = (state) => {
  return { decks: state };
};

export default connect(mapStateToProps, { handleInitialData })(DeckList);
