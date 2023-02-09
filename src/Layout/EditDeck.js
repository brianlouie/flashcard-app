import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { updateDeck, readDeck } from "../utils/api";
import { useHistory } from "react-router-dom";

function EditDeck() {
  const initialFormState = {
    name: "",
    description: "",
  };

  const [formData, setFormData] = useState({ ...initialFormState });

  const { deckId } = useParams();
  const history = useHistory();

  const [currentDeck, setCurrentDeck] = useState([]);

  useEffect(() => {
    async function loadDeck() {
      setCurrentDeck([]);
      try {
        const response = await readDeck(deckId);
        setCurrentDeck(response);
        setFormData({
          name: response.name,
          description: response.description,
        })
      } catch (error) {
        console.log(error);
      }
    }


    loadDeck();
  }, [deckId]);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
      id: deckId * 1,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateDeck(formData);

    setFormData({ ...initialFormState });
    history.push(`/decks/${deckId}`);
  };

  if (!currentDeck.id) return null;
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
              onClick={() => history.push(`/decks/${currentDeck.id}`)}
            >
              {currentDeck.name}
            </a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <h1>Edit Deck</h1>
      <form name="editDeck" onSubmit={handleSubmit}>
        <p>Name</p>
        <input
          id="name"
          type="text"
          name="name"
          onChange={handleChange}
          value={formData.name}
          placeholder={currentDeck.name}
        />
        <div>
          <p>Description</p>
          <textarea
            id="description"
            type="textarea"
            name="description"
            onChange={handleChange}
            value={formData.description}
            placeholder={currentDeck.description}
          />
        </div>
        <a
          href="javascript:"
          onClick={() => history.push(`/decks/${currentDeck.id}`)}
          className="btn btn-warning"
        >
          Cancel
        </a>
        <button type="submit" className="btn btn-warning">
          Submit
        </button>
      </form>
    </>
  );
}

export default EditDeck;
