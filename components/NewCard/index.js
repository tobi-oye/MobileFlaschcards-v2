import { NavigationContainer } from "@react-navigation/native";
import { Formik } from "formik";
import React from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { addCard } from "../../actions";

import { blue, green, pink, white } from "../../utils/colors";

const NewCard = ({ addCard, title, navigation }) => (
  <View style={[styles.container, { backgroundColor: pink }]}>
    <Text style={[styles.headerText, { marginBottom: 30 }]}>
      {title} Deck : New Card
    </Text>
    <Formik
      initialValues={{ question: "", answer: "" }}
      onSubmit={(values, { resetForm }) => {
        console.log(values);
        addCard(title, values);
        resetForm();
        return navigation.goBack();
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View>
          <Text style={[styles.headerText, styles.marginBottom]}>Question</Text>
          <TextInput
            onChangeText={handleChange("question")}
            onBlur={handleBlur("question")}
            value={values.quesion}
            style={[styles.textInput, styles.marginBottom]}
          />
          <Text style={[styles.headerText, styles.marginBottom]}>Answer</Text>
          <TextInput
            onChangeText={handleChange("answer")}
            onBlur={handleBlur("answer")}
            value={values.answer}
            style={[styles.textInput, styles.marginBottom]}
          />
          <TouchableOpacity
            onPress={values.question && values.answer ? handleSubmit : null}
            disabled={!values ? true : false}
            style={styles.btn}
          >
            <Text style={styles.btnText}>Create Card</Text>
          </TouchableOpacity>
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
    color: white,
  },
  headerText: {
    fontSize: 20,
    color: white,
    textAlign: "center",
  },
  marginBottom: {
    marginBottom: 20,
  },

  btn: {
    backgroundColor: blue,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    textAlign: "center",
    fontSize: 15,
    color: white,
    padding: 10,
  },
});

const mapStateToProps = (state, { route }) => {
  const title = route.params.title;
  return { deck: state, title };
};

export default connect(mapStateToProps, { addCard })(NewCard);
