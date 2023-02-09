import React, { useEffect, useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import Study from "./Study"
import CreateDeck from "./CreateDeck"
import Deck from "./Deck"
import EditDeck from "./EditDeck";
import EditCard from "./EditCard";
import AddCard from "./AddCard";
import { Route, Switch } from "react-router-dom";
import { listDecks } from "../utils/api";

function Layout() {
  
const [decks, setDecks] = useState([]);
const [cards, setCards] = useState([]);
const [deck, setDeck] = useState([]);
const [currentDecks, setCurrentDecks] = useState([]);


  
 
  
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route path="/decks/new">
            <CreateDeck decks={decks} setDecks={setDecks}/>
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
           <EditCard setDeck={setDeck} deck={deck} cards={cards} setCards={setCards}/>
          </Route>
          <Route path ="/decks/:deckId/cards/new">
            <AddCard decks={decks} cards={cards} setCards={setCards} deck={deck} setDeck={setDeck}/>
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck decks={decks} setDeck={setDeck} deck={deck} setDecks={setDecks}/>
          </Route>
        <Route path="/decks/:deckId/study">
        <Study decks={decks} cards={cards} setCards={setCards}/>
        </Route>
        <Route exact path="/decks/:deckId">
          <Deck decks={decks} cards={cards} setDeck={setDeck} deck={deck} setCards={setCards} setDecks={setDecks} setCurrentDecks={setCurrentDecks}/>
        </Route>
          <Route exact path="/">
        <Home decks={decks} setDecks={setDecks} cards={cards} setCards={setCards} currentDecks={currentDecks} setCurrentDecks={setCurrentDecks}/>
        </Route>
        <NotFound />
        </Switch>
      </div>
    </>
  );
}

export default Layout;
