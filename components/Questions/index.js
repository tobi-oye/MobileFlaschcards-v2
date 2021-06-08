import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  View,
  Text,
  Animated,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import PagerView from "react-native-pager-view";
import { connect } from "react-redux";
import { green, pink, red, white } from "../../utils/colors";
import {
  clearLocalNotification,
  setLocalNotification,
} from "../../utils/helpers";

const Questions = ({ deck, navigation }) => {
  useEffect(() => {
    clearLocalNotification().then(setLocalNotification());
  }, []);
  const [toggleView, setToggleView] = useState("question");
  const [result, setResult] = useState({ correct: 0, incorrect: 0 });

  const toggleHandler = () => {
    return toggleView === "question"
      ? setToggleView("answer")
      : setToggleView("question");
  };
  let viewPagerRef;
  const totalAnswered = result.correct + result.incorrect;
  const quizResultDisplay = deck.questions.length > totalAnswered;
  const resultHandler = (result, index, viewPager) => {
    result === "correct"
      ? setResult((prevState) => {
          return { ...prevState, correct: prevState.correct + 1 };
        })
      : setResult((prevState) => ({
          ...prevState,
          incorrect: prevState.incorrect + 1,
        }));
    viewPager.setPage(index + 1);
    return setToggleView("question");
  };
  const questionsLenght = deck.questions.length;
  return (
    <>
      {quizResultDisplay ? (
        <PagerView
          style={styles.pagerView}
          initialPage={0}
          ref={(viewPager) => {
            viewPagerRef = viewPager;
          }}
        >
          {deck.questions.map((question, index) => {
            return (
              <View
                key={index}
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <Text style={styles.questionHeader}>
                  {toggleView.toUpperCase()}
                </Text>
                <Text>{`${index + 1} of ${questionsLenght} questions`}</Text>

                <View
                  style={{
                    borderColor: green,
                    borderWidth: 5,
                    padding: 10,
                    marginBottom: 50,
                    marginTop: 50,
                  }}
                >
                  <Text style={styles.questionText}>
                    {question[toggleView]}
                  </Text>
                </View>

                <TouchableOpacity
                  style={[
                    styles.btnMargin,
                    styles.btn,
                    { backgroundColor: pink },
                  ]}
                  onPress={() => toggleHandler()}
                >
                  <Text style={styles.btnText}>
                    {`Show ${
                      toggleView === "question" ? "Answer" : "Question"
                    }`}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.btnMargin,
                    styles.btn,
                    { backgroundColor: green },
                  ]}
                  onPress={() => resultHandler("correct", index, viewPagerRef)}
                >
                  <Text style={styles.btnText}>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.btnMargin,
                    styles.btn,
                    { backgroundColor: red },
                  ]}
                  onPress={() =>
                    resultHandler("incorrect", index, viewPagerRef)
                  }
                >
                  <Text style={styles.btnText}>InCorrect</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </PagerView>
      ) : questionsLenght === 0 ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: pink,
            flex: 1,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: white }}>
            There are no cards inside this deck
          </Text>
        </View>
      ) : (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text>Results</Text>

          <Text style={[styles.questionText, { marginBottom: 30 }]}>
            {`${result.correct}/${questionsLenght} correct`}{" "}
          </Text>

          <Text
            style={[styles.questionText, { marginBottom: 30 }]}
          >{`${Math.round(
            (result.correct / questionsLenght) * 100
          )}% correct`}</Text>

          <TouchableOpacity
            style={[
              styles.btnMargin,
              { backgroundColor: pink, marginBottom: 30 },
              styles.btn,
            ]}
          >
            <Text
              style={styles.btnText}
              onPress={() => {
                setResult({ correct: 0, incorrect: 0 });
                return navigation.navigate("Home");
              }}
            >
              Home
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnMargin, styles.btn, { backgroundColor: pink }]}
          >
            <Text
              style={styles.btnText}
              onPress={() => {
                return setResult({ correct: 0, incorrect: 0 });
              }}
            >
              Restart
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
  questionHeader: {
    fontSize: 20,
    textAlign: "center",
  },

  questionText: {
    fontSize: 40,
    textAlign: "center",
    fontWeight: "bold",
  },

  btnMargin: {
    marginBottom: 10,
  },

  btnText: {
    color: white,
    fontWeight: "bold",
  },
  btn: {
    padding: 10,
  },
});
const mapStateToProps = (state, { route }) => {
  const title = route.params.title;
  return {
    deck: state[title],
  };
};

export default connect(mapStateToProps)(Questions);
