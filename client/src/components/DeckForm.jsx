import { useState } from 'react';
import '../styles/DeckForm.css';

function DeckForm({ onCreate }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    const trimmedName = name.trim();
    if (!trimmedName) {
      setError('Deck name cannot be empty.');
      return;
    }

    onCreate(trimmedName);
    setName('');
  }

  return (
    <section className="deck-form-section">
      <form onSubmit={handleSubmit} className="deck-form">
        <label htmlFor="deck-name">New Deck Name:</label>
        <input
          id="deck-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Create Deck</button>
      </form>
      {error && <p className="error">{error}</p>}
    </section>
  );
}

export default DeckForm;
