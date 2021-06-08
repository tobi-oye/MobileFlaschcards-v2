import AsyncStorage from "@react-native-async-storage/async-storage";
import { decks } from "./_DATA";

const DECKS_STORAGE_KEY = "Flashcards:decks";
export const getAllDecks = async () => {
  const deckStore = await AsyncStorage.getItem(DECKS_STORAGE_KEY);

  deckStore === null
    ? AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
    : "";

  return deckStore === null ? decks : JSON.parse(deckStore);
};
