import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import DeckList from "./components/DeckList";
import reducers from "./reducers";
import NewDeck from "./components/NewDeck";
import DeckInfo from "./components/DeckInfo";
import NewCard from "./components/NewCard";
import Questions from "./components/Questions";
import { useEffect } from "react";
import { setLocalNotification } from "./utils/helpers";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const FlashcardTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="AllDecks" component={DeckList} />
    <Tab.Screen name="NewDeck" component={NewDeck} />
  </Tab.Navigator>
);

const FlashcardStacks = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={FlashcardTabs} />
    <Stack.Screen name="DeckInfo" component={DeckInfo} />
    <Stack.Screen name="NewCard" component={NewCard} />
    <Stack.Screen name="Questions" component={Questions} />
  </Stack.Navigator>
);

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk, logger))
);

export default function App() {
  useEffect(() => setLocalNotification(), []);
  return (
    <Provider store={store}>
      <StatusBar animated={true} hidden={false} />
      <NavigationContainer>
        <FlashcardStacks />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: 0,
    padding: 0,
  },
});
