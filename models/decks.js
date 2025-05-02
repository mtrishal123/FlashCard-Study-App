// ✅ models/decks.js (BACKEND MODEL)
const userDecks = {}; // maps username → array of decks with cards

function getDecks(username) {
  return userDecks[username] || [];
}

function createDeck(username, title) {
  const id = crypto.randomUUID();
  const newDeck = { id, title, cards: [] };
  if (!userDecks[username]) {
    userDecks[username] = [];
  }
  userDecks[username].push(newDeck);
  return newDeck;
}

function deleteDeck(username, deckId) {
  const decks = userDecks[username] || [];
  const index = decks.findIndex((deck) => deck.id === deckId);
  if (index !== -1) {
    decks.splice(index, 1);
    return true;
  }
  return false;
}

function getDeckById(username, deckId) {
  const decks = userDecks[username] || [];
  return decks.find((deck) => deck.id === deckId);
}

function addFlashcard(username, deckId, front, back) {
  const deck = getDeckById(username, deckId);
  if (!deck) return null;
  const card = { id: crypto.randomUUID(), front, back };
  deck.cards.push(card);
  return card;
}

function deleteFlashcard(username, deckId, cardId) {
  const deck = getDeckById(username, deckId);
  if (!deck) return false;
  const index = deck.cards.findIndex((c) => c.id === cardId);
  if (index !== -1) {
    deck.cards.splice(index, 1);
    return true;
  }
  return false;
}

function updateFlashcard(username, deckId, cardId, front, back) {
  const deck = getDeckById(username, deckId);
  if (!deck) return null;
  const card = deck.cards.find((c) => c.id === cardId);
  if (!card) return null;
  card.front = front;
  card.back = back;
  return card;
}

export {
  getDecks,
  createDeck,
  deleteDeck,
  getDeckById,
  addFlashcard,
  deleteFlashcard,
  updateFlashcard,
};