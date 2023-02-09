import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { deleteCard, deleteDeck, readDeck, listDecks} from "../utils/api/index";

function Deck({ decks, cards, setCards, setCurrentDecks}) {
  const [currentDeck, setCurrentDeck] = useState([]);
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function placeDeck(){
      setCurrentDeck([])
      try{
       const response = await readDeck(deckId)
       setCurrentDeck(response)
      } catch (error) {
        console.log(error)
      }
      
    }
    placeDeck()
    }, [deckId, decks, cards]);

    async function loadCards() {
      const abortController = new AbortController();
      try {
        const response = await fetch(
          "http://localhost:8080/cards",
          { signal: abortController.signal }
        );
        const cardsFromAPI = await response.json();
        setCards(cardsFromAPI);
      } catch (error) {
        if (error.name === "AbortError") {
        } else {
          throw error;
        }
      }
    }

   async function deleteHandler(ID) {
    if (window.confirm("Delete?")) {
      await deleteDeck(ID);
      const response = await listDecks();
      setCurrentDecks(response);
      loadCards();
      history.push(`/`);
    }
  }

 async function deleteCardHandler(ID) {
    if (window.confirm("Delete?")) {
      const newCardList = cards.filter((card) => {
        return card.id !== ID;
      });

    await deleteCard(ID);
      setCards(newCardList);
      history.push(`/decks/${deckId}`);
    }
  }


  if (!currentDeck.cards) {
    return null;
  }
  // if (!currentCards) {
  //   return null;
  // }

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:" onClick={() => history.push(`/`)}>
              Home
            </a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {currentDeck.name}
          </li>
        </ol>
      </nav>
      <div className="card mt-3">
        <div className="card-body">
          <h3 className="card-text">{currentDeck.name}</h3>
          <p className="card-text">{currentDeck.description}</p>
          <button
            onClick={() => history.push(`/decks/${currentDeck.id}/edit`)}
            className="btn btn-warning"
          >
            Edit
          </button>
          <button
            onClick={() => history.push(`/decks/${currentDeck.id}/study`)}
            className="btn btn-warning"
          >
            Study
          </button>
          <a
            href="javascript:"
            onClick={() => history.push(`/decks/${deckId}/cards/new`)}
            className="btn btn-warning"
          >
            Add Cards
          </a>
          <button
            onClick={() => deleteHandler(currentDeck.id)}
            className="btn btn-warning"
          >
            Delete
          </button>
        </div>
      </div>
      <h1>Cards</h1>
      <ul>
        {currentDeck.cards.map((card) => (
          <li key={card.id}>
            <div className="card mt-3">
              <div className="card-body">
                <h3 className="card-text">Front</h3>
                <p className="card-text">{card.front}</p>
                <h3 className="card-text">Back</h3>
                <p className="card-text">{card.back}</p>
                <button
                  onClick={() =>
                    history.push(`/decks/${currentDeck.id}/cards/${card.id}/edit`)
                  }
                  className="btn btn-warning"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteCardHandler(card.id)}
                  className="btn btn-warning"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Deck;
