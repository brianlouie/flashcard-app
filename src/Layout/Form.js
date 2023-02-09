import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { updateCard, readDeck, readCard, createCard } from "../utils/api";
import { useHistory } from "react-router-dom";

function Form({decks, cards, setCards, deck, setDeck}) {
  const initialFormState = {
    front: "",
    back: "",
  };

  const [formData, setFormData] = useState({ ...initialFormState });
  const [currentCards, setCurrentCards] = useState()
  const { deckId, cardId } = useParams();

  const history = useHistory();

  useEffect(() => {
    async function currentDeck(){
      try {
       const response = await readDeck(deckId)
       setDeck(response)
       setCurrentCards(response.cards)
  return response
      } catch (error) {
        console.log(error);
      }
  
    }
    currentDeck()
  }, [deckId, setDeck]);

  useEffect(() => {
    if(cardId){
    async function currentCard() {
      const card = await readCard(cardId);
      return card
    }
    currentCard().then(setFormData);
  }
  }, [cardId]);

  const handleChange = ({ target }) => {
    if(cardId){
      setFormData({
        ...formData,
        [target.name]: target.value,
        id: cardId * 1,
        deckId: deckId * 1,
      });
    } else {
    let newCardID
    if(currentCards.length === 0){newCardID = 1}
    else{
    const sorted = currentCards.sort(function(a, b){return a.id - b.id})
    const lastCard = sorted.slice(-1);
    const lastCardID = lastCard[0].id;
    newCardID = lastCardID + 1;
    }
    setFormData({
      ...formData,
      [target.name]: target.value,
      deckId: deckId,


    });
  }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(cardId){
      await updateCard(formData);
       const updateCards = currentCards.filter((card) => {
         return card.id !== formData.id;
       });

       setFormData({ ...initialFormState });
       history.push(`/decks/${deckId}`);
    } else {
   await createCard(deckId, formData);

    setFormData({ ...initialFormState });
  }
  };

  if (!deck) return null;

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:" onClick={() => history.push(`/`)}>
              Home
            </a>
          </li>
          <li class="breadcrumb-item">
            <a
              href="javascript:"
              onClick={() => history.push(`/decks/${deckId}`)}
            >
              {deck.name}
            </a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {cardId ? `Edit Card ${cardId}` : "Add Card"}
          </li>
        </ol>
      </nav>
      <h2>{cardId ? "Edit Card" : `${deck.name}: Add Card`}</h2>
      <form name="addCard" onSubmit={handleSubmit}>
        <p>Front</p>
        <textarea
          id="front"
          type="textarea"
          name="front"
          onChange={handleChange}
          value={formData.front}
          placeholder={"Front side of card"}
        />
        <div>
          <p>Back</p>
          <textarea
            id="back"
            type="textarea"
            name="back"
            onChange={handleChange}
            value={formData.back}
            placeholder={"Back side of card"}
          />
        </div>
        <a
          href="javascript:"
          onClick={() => history.push(`/decks/${deckId}`)}
          className="btn btn-warning"
        >
          {cardId ? "Cancel" : "Done"}
        </a>
        <button type="submit" className="btn btn-warning">
         {cardId ? "Submit" : "Save"}
        </button>
      </form>
    </>
  );
}

export default Form;
