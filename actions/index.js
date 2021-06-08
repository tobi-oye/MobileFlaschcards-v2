import { getAllDecks } from "../utils/api";

export const ALL_DECKS = "ALL_DECKS";
export const ADD_DECK = "ADD_DECK";
export const ADD_CARD = "ADD_CARD";

export const allDecks = (allDecks) => {
  return { type: ALL_DECKS, allDecks };
};

export const addDeck = (deckTitle) => {
  return {
    type: ADD_DECK,
    deckTitle,
  };
};

export const addCard = (id, card) => {
  return {
    type: ADD_CARD,
    id,
    card,
  };
};

export const handleInitialData = () => (dispatch) =>
  getAllDecks().then((response) => {
    return dispatch(allDecks(response));
  });
