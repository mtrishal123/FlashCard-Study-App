const userDecks = {}; // maps username → array of decks with cards

function getFlashcards(username, deckId) {
  const deck = getDeckById(username, deckId);
  return deck ? deck.cards : [];
}

function addFlashcard(username, deckId, front, back) {
  const deck = getDeckById(username, deckId);
  if (!deck) {
    return null;
  }
  const cardId = crypto.randomUUID();
  const card = { id: cardId, front, back };
  deck.cards.push(card);
  return card;
}

function deleteFlashcard(username, deckId, cardId) {
  const deck = getDeckById(username, deckId);
  if (!deck) {
    return false;
  }
  const index = deck.cards.findIndex((card) => card.id === cardId);
  if (index !== -1) {
    deck.cards.splice(index, 1);
    return true;
  }
  return false;
}

// Utility function to get the correct deck (reuse if needed)
function getDeckById(username, deckId) {
  const decks = userDecks[username] || [];
  return decks.find((deck) => deck.id === deckId);
}

export {
  getFlashcards,
  addFlashcard,
  deleteFlashcard,
};
