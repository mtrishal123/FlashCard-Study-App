import { BASE_URL } from '../api';

export function fetchFlashcards(deckId) {
  return fetch(`${BASE_URL}/api/decks/${deckId}/flashcards`, {
    credentials: "include", // ✅ this ensures cookie is sent
  })
    .catch(() => Promise.reject({ error: 'Network error' }))
    .then((res) => res.ok ? res.json() : res.json().then(err => Promise.reject(err)));
}

export function addFlashcard(deckId, front, back) {
  return fetch(`${BASE_URL}/api/decks/${deckId}/flashcards`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ front, back }),
    credentials: "include",
  })
    .catch(() => Promise.reject({ error: 'Network error' }))
    .then((res) => res.ok ? res.json() : res.json().then(err => Promise.reject(err)));
}

export function updateFlashcard(deckId, cardId, front, back) {
  return fetch(`${BASE_URL}/api/decks/${deckId}/flashcards/${cardId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ front, back }),
    credentials: "include",
  })
    .catch(() => Promise.reject({ error: 'Network error' }))
    .then((res) => res.ok ? res.json() : res.json().then(err => Promise.reject(err)));
}

export function deleteFlashcard(deckId, cardId) {
  return fetch(`${BASE_URL}/api/decks/${deckId}/flashcards/${cardId}`, {
    method: 'DELETE',
    credentials: "include",
  })
    .catch(() => Promise.reject({ error: 'Network error' }))
    .then((res) => {
      if (!res.ok && res.status !== 204) {
        return res.json().then(err => Promise.reject(err));
      }
    });
}
