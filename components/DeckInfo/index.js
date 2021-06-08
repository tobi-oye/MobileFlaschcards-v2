import React from "react";
import {
  View,
  Text,
  TouchableOpacity as Button,
  StyleSheet,
} from "react-native";
import { connect } from "react-redux";
import { blue, pink, white } from "../../utils/colors";
import Deck from "../DeckList/components/Deck";

const DeckInfo = ({ deckInfo, navigation }) => (
  <View style={{ flex: 1 }}>
    <View style={styles.marginButtom}>
      <Text style={[{ fontSize: 30, textAlign: "center" }]}>
        {deckInfo.title} Deck
      </Text>
      <Deck title={deckInfo.title} deckLength={deckInfo.questions.length} />
    </View>

    <Button
      style={[styles.marginButtom, { backgroundColor: blue }, styles.btn]}
      onPress={() => navigation.navigate("NewCard", { title: deckInfo.title })}
    >
      <Text style={styles.btnText}>Add Card</Text>
    </Button>

    <Button
      style={[styles.marginButtom, { backgroundColor: pink }, styles.btn]}
      onPress={() =>
        navigation.navigate("Questions", { title: deckInfo.title })
      }
    >
      <Text style={styles.btnText}>Start Quiz</Text>
    </Button>
  </View>
);

const styles = StyleSheet.create({
  marginButtom: {
    marginBottom: 30,
  },
  btnText: {
    textAlign: "center",
    color: white,
  },
  btn: {
    height: 40,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = (state, { route }) => {
  const title = route.params.title;
  const deckInfo = state[title];
  return {
    deckInfo,
  };
};

export default connect(mapStateToProps)(DeckInfo);
