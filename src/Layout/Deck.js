import { useParams, useRouteMatch } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { deleteCard, deleteDeck, readDeck, listDecks} from "../utils/api/index";

function Deck({ decks, cards, setCards, setDecks, setCurrentDecks}) {
  const [currentCards, setCurrentCards] = useState();
  const [currentDeck, setCurrentDeck] = useState([]);
  const { deckId } = useParams();
  const { url } = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
      async function currentDeck(){
        try {
         const response = await readDeck(deckId)
         setCurrentDeck(response)
         setCurrentCards(response.cards)
    return response
        } catch (error) {
          console.log(error);
        }
    
      }
      currentDeck()
    }, [deckId, decks]);

    async function loadCards() {
      async function currentDeck(){
        try {
         const response = await readDeck(deckId)
         setCurrentDeck(response)
         setCurrentCards(response.cards)
    return response
        } catch (error) {
          console.log(error);
        }
    
      }
      currentDeck()
    }

   async function deleteHandler(ID) {
    if (window.confirm("Delete?")) {
      const newCardList = currentCards.filter((card) => {
        return card.deckId !== ID;
      });

      await deleteDeck(ID);
      const response = await listDecks();
      setCurrentDecks(response);
      loadCards();
      history.push(`/`);
    }
  }

 async function deleteCardHandler(ID) {
    if (window.confirm("Delete?")) {
      const newCardList = currentCards.filter((card) => {
        return card.id !== ID;
      });

    await deleteCard(ID);
      setCurrentCards(newCardList);
      loadCards();
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
