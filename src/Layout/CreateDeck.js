import React, { useState } from "react"
import { createDeck } from "../utils/api";
import { useHistory } from "react-router-dom";

function CreateDeck({decks, setDecks}){

const initialFormState = {
  name: "",
  description: "",
};
const [formData, setFormData] = useState({ ...initialFormState });
const history = useHistory();
const handleChange = ({ target }) => {
  let newDeckID
  if(decks.length === 0){newDeckID = 1}
  else{
  const sorted = decks.sort(function(a, b){return a.id - b.id})
  const lastDeck = sorted.slice(-1)
  const lastDeckID = lastDeck[0].id
  newDeckID = lastDeckID + 1
  }
  setFormData({
    ...formData,
    [target.name]: target.value,
    id: newDeckID,
  });
};

const handleSubmit = async (event) => {
  event.preventDefault();
  let newDeckID
  if(decks.length === 0){newDeckID = 1}
  else{
  const lastDeck = decks.slice(-1)
  const lastDeckID = lastDeck[0].id
  newDeckID = lastDeckID + 1
  }
  await createDeck(formData)
  setDecks([
    ...decks,
    formData,
  ])
  setFormData({ ...initialFormState })
  /* window.location.href = `/decks/${newDeckID}` */
  history.push(`/decks/${newDeckID}`);
}

return (
    <>
    <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="javascript:" onClick={() => history.push(`/`)}>Home</a></li>
      <li class="breadcrumb-item active" aria-current="page">Create Deck</li>
    </ol>
  </nav>
    <h1>Create Deck</h1>
    <form name="addDeck" onSubmit={handleSubmit}>
      <p>Name</p>
<input
id="name"
type="text"
name="name"
onChange={handleChange}
value={formData.name}
placeholder="Deck Name"
/>
<div>
<p>Description</p>
<textarea
id="description"
type="textarea"
name="description"
onChange={handleChange}
value={formData.description}
placeholder="Brief description of the deck"
/>
</div>
<a href="javascript:" onClick={() => history.push(`/`)} className="btn btn-warning">Cancel</a>
<button type="submit" className="btn btn-warning">Submit</button>
    </form>
    </>
)
}

export default CreateDeck;