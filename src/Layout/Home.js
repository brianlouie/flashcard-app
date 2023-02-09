import React, { useEffect } from "react";
import { deleteDeck, listDecks } from "../utils/api/index";
import { useHistory } from "react-router-dom";

function Home({setCards, currentDecks, setCurrentDecks }) {


  const history = useHistory();
  async function deleteHandler(ID) {
    if (window.confirm("Delete?")) {

      await deleteDeck(ID);
      const response = await listDecks();
      setCurrentDecks(response);
      history.push(`/`);
    }
  }

  useEffect(() => {
    async function placeDecks() {
        try {
            const response = await listDecks();
            setCurrentDecks(response);
        } catch (error) {
            console.log(error);
        }
    }
    placeDecks();
}, [setCurrentDecks]);

  if (!currentDecks) {

  }
  return (
    <>
      <button
        onClick={() => history.push(`/decks/new`)}
        className="btn btn-warning"
      >
        Create Deck
      </button>
      <ul>
        {currentDecks.map((deck) => (
          <li key={deck.id}>
            <div className="card mt-3">
              <div className="card-body">
                <h3 className="card-text">{deck.name}</h3>
                <p className="card-text">{deck.description}</p>
                <p className="card-text">{deck.cards.length} cards</p>
                <button
                  onClick={() => history.push(`/decks/${deck.id.toString()}`)}
                  className="btn btn-warning"
                >
                  View
                </button>
                <button
                  onClick={() =>
                    history.push(`/decks/${deck.id.toString()}/study`)
                  }
                  className="btn btn-warning"
                >
                  Study
                </button>
                <button
                  onClick={() => deleteHandler(deck.id)}
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

export default Home;
