import '../styles/DeckList.css';

function DeckList({ decks = [], onSelectDeck, onCreateDeck, onEditDeck, onDeleteDeck }) {
    return (
      <section className="deck-list">
        <header className="deck-header">
          <h1>Your Decks</h1>
        </header>
  
        <ul className="deck-items">
          {decks.length === 0 ? (
            <li className="deck-empty">No decks yet. Create your first one!</li>
          ) : (
            decks.map((deck) => (
              <li key={deck.id} className="deck-item">
                <div className="deck-button-group">
                  <button onClick={() => onSelectDeck(deck.id)} className="deck-button">
                    {deck.title}
                  </button>
                  <button onClick={() => onEditDeck(deck.id)} className="edit-button">✏️ Edit</button>
                  <button className="delete-button" onClick={() => onDeleteDeck(deck.id)}>🗑️</button>
                </div>
              </li>
            ))
          )}
        </ul>
  
        <div className="deck-actions">
          <button onClick={onCreateDeck} className="create-deck-button">+ New Deck</button>
        </div>
      </section>
    );
  }
  
  export default DeckList;
  