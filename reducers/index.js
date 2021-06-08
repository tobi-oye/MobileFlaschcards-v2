import { ADD_CARD, ADD_DECK, ALL_DECKS } from "../actions";

const reducers = (state, action) => {
  switch (action.type) {
    case ALL_DECKS:
      return {
        ...state,
        ...action.allDecks,
      };
    case ADD_DECK:
      const { deckTitle } = action;
      return {
        ...state,
        [deckTitle]: {
          title: deckTitle,
          questions: [],
        },
      };
    case ADD_CARD:
      const { id, card } = action;
      return {
        ...state,
        [id]: {
          ...state[id],
          questions: [...state[id].questions].concat(card),
        },
      };
  }
};

export default reducers;
