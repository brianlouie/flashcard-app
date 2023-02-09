import React from "react";
import Form from "./Form";

function AddCard({ decks, cards, setCards, deck, setDeck }) {

  return (
<Form decks={decks} cards={cards} setCards={setCards} deck={deck} setDeck={setDeck}/>
  );
}

export default AddCard;
