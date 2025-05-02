export function fetchDecks() {
    return fetch('/api/decks')
      .catch(() => Promise.reject({ error: 'Network error' }))
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => Promise.reject(err));
        }
        return res.json();
      });
  }
  
  export function createDeck(title) {
    return fetch('/api/decks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    })
      .catch(() => Promise.reject({ error: 'Network error' }))
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => Promise.reject(err));
        }
        return res.json();
      });
  }
  
  export function deleteDeck(deckId) {
    return fetch(`/api/decks/${deckId}`, {
      method: 'DELETE',
    })
      .catch(() => Promise.reject({ error: 'Network error' }))
      .then((res) => {
        if (!res.ok && res.status !== 204) {
          return res.json().then((err) => Promise.reject(err));
        }
      });
  }
  