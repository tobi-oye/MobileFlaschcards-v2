import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import React from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import { blue, green, white } from "../../utils/colors";

import { addDeck } from "../../actions";

const NewDeck = ({ addDeck, navigation }) => (
  <View style={styles.container}>
    <Formik
      initialValues={{ deck: "" }}
      onSubmit={(values, { resetForm }) => {
        addDeck(values.deck);
        resetForm();
        navigation.goBack();
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View>
          <Text style={[styles.headerText, styles.marginBottom]}>
            Deck Name
          </Text>
          <TextInput
            onChangeText={handleChange("deck")}
            onBlur={handleBlur("deck")}
            value={values.deck}
            style={[styles.textInput, styles.marginBottom]}
          />
          <Button
            onPress={values.deck ? handleSubmit : null}
            title="Create Deck"
          />
        </View>
      )}
    </Formik>
  </View>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: green,
    justifyContent: "center",
    padding: 30,
  },
  textInput: {
    borderWidth: 1,
    borderColor: white,
    padding: 5,
    fontSize: 15,
  },
  headerText: {
    fontSize: 20,
    color: white,
    textAlign: "center",
  },
  marginBottom: {
    marginBottom: 20,
  },
});

export default connect(null, { addDeck })(NewDeck);
