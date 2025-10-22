export function fetchFlashcards(deckId) {
    return fetch(`/api/decks/${deckId}/flashcards`)
      .catch(() => Promise.reject({ error: 'Network error' }))
      .then((res) => res.ok ? res.json() : res.json().then(err => Promise.reject(err)));
  }
  
  export function addFlashcard(deckId, front , back) {
    return fetch(`/api/decks/${deckId}/flashcards`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ front , back }),
    })
      .catch(() => Promise.reject({ error: 'Network error' }))
      .then((res) => res.ok ? res.json() : res.json().then(err => Promise.reject(err)));
  }
  
  export function updateFlashcard(deckId, cardId, front, back) {
    return fetch(`/api/decks/${deckId}/flashcards/${cardId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ front, back }),
    })
      .catch(() => Promise.reject({ error: 'Network error' }))
      .then((res) => res.ok ? res.json() : res.json().then(err => Promise.reject(err)));
  }
  
  export function deleteFlashcard(deckId, cardId) {
    return fetch(`/api/decks/${deckId}/flashcards/${cardId}`, {
      method: 'DELETE',
    })
      .catch(() => Promise.reject({ error: 'Network error' }))
      .then((res) => {
        if (!res.ok && res.status !== 204) {
          return res.json().then(err => Promise.reject(err));
        }
      });
  }
  