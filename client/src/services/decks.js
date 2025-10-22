import { BASE_URL } from '../api';

export function fetchDecks() {
  return fetch(`${BASE_URL}/api/decks`, {
    credentials: "include", // ✅ this ensures cookie is sent
  })
    .catch(() => Promise.reject({ error: 'Network error' }))
    .then((res) => res.ok ? res.json() : res.json().then((err) => Promise.reject(err)));
}

export function createDeck(title) {
  return fetch(`${BASE_URL}/api/decks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
    credentials: "include",
  })
    .catch(() => Promise.reject({ error: 'Network error' }))
    .then((res) => res.ok ? res.json() : res.json().then((err) => Promise.reject(err)));
}

export function deleteDeck(deckId) {
  return fetch(`${BASE_URL}/api/decks/${deckId}`, { 
        method: 'DELETE', 
        credentials: "include", 
    })
    .catch(() => Promise.reject({ error: 'Network error' }))
    .then((res) => {
      if (!res.ok && res.status !== 204) {
        return res.json().then((err) => Promise.reject(err));
      }
    });
}
