import { useParams, useRouteMatch } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";

function Study({ decks, cards}) {
  const [deck, setDeck] = useState();
  const [currentCards, setCurrentCards] = useState([]);
  const [isFront, setIsFront] = useState(true);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);


  const { deckId } = useParams();
  const history = useHistory();

  function flipBack() {
    setIsFront(false);
  }

  function nextCard() {
    if (currentCardIndex === currentCards.length - 1) {
      if (
        window.confirm(
          "Restart cards? Click 'cancel' to return to the home page."
        )
      ) {
        setCurrentCardIndex(0);
        setIsFront(true);
      } else {
        history.push(`/`)
      }
    } else {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFront(true);
    }
  }

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
  }, [deckId, decks]);

  useEffect(() => {
    const placeCards = currentCards.filter((card) => {
      return card.deckId.toString() === deckId && card.id !== 7;
    });
    setCurrentCards(placeCards);
  }, [deckId, decks]);

  if (!deck) return null;
  const currentCard = currentCards[currentCardIndex];

  
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:" onClick={() => history.push(`/`)}>Home</a>
          </li>
          <li class="breadcrumb-item">
            <a href="javascript:" onClick={() => history.push(`/decks/${deck.id}`)}>{deck.name}</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <h1>Study: {deck.name}</h1>
      {currentCards.length < 3 ? (
        <div>
          <h2>Not enough cards.</h2>{" "}
          <p>
            You need at least 3 cards to study. There are {currentCards.length}{" "}
            cards in this deck.
          </p>
          <a href="javascript:" onClick={() => history.push(`/decks/${deckId}/cards/new`)} className="btn btn-warning">
            Add Cards
          </a>
        </div>
      ) : (
        <div className="card mt-3">
          <div className="card-body">
            <h3 className="card-text">
              Card {currentCardIndex + 1} of {currentCards.length}
            </h3>
            {isFront ? (
              <p className="card-text">{currentCard.front}</p>
            ) : (
              <p className="card-text">{currentCard.back}</p>
            )}
            <button onClick={flipBack} className="btn btn-warning">
              Flip
            </button>
            {isFront === false ? (
              <button onClick={nextCard} className="btn btn-warning">
                Next
              </button>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}

export default Study;
