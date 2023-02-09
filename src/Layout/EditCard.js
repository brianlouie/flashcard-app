import React from "react";
import Form from "./Form";
function EditCard({ decks, cards, setCards, deck, setDeck }) {

  return (
<Form decks={decks} cards={cards} setCards={setCards} deck={deck} setDeck={setDeck}/>
  );
}

export default EditCard;