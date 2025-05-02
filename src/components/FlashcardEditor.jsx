import { useEffect, useState } from 'react';
import {
  fetchFlashcards,
  addFlashcard,
  deleteFlashcard,
  updateFlashcard,
} from '../../services/flashcards';
import Loader from './Loader';
import '../styles/FlashcardEditor.css';

function FlashcardEditor({ deckId, onBack, decks }) {
  const [flashcards, setFlashcards] = useState([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [editId, setEditId] = useState(null);
  const [editQuestion, setEditQuestion] = useState('');
  const [editAnswer, setEditAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const maxLength = 100;
  const deckTitle = decks.find(deck => deck.id === deckId)?.title || 'Unknown Deck';

  useEffect(() => {
    loadCards();
  }, [deckId]);

  function loadCards() {
    fetchFlashcards(deckId)
      .then((data) => {
        setFlashcards(data.flashcards || []);
        setError('');
      })
      .catch((err) => {
        setError(err?.error || 'Could not fetch flashcards');
      })
      .finally(() => setIsLoading(false));
  }

  function handleAddFlashcard(e) {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) {
      setError('Both question and answer are required');
      return;
    }
    if (question.length > maxLength || answer.length > maxLength) {
      setError('Character length exceeded (100 max)');
      return;
    }

    addFlashcard(deckId, question, answer)
      .then(() => {
        setQuestion('');
        setAnswer('');
        loadCards();
      })
      .catch((err) => {
        setError(err?.error || 'Failed to add flashcard');
      });
  }

  function handleDelete(id) {
    deleteFlashcard(deckId, id)
      .then(() => loadCards())
      .catch((err) => setError(err?.error || 'Failed to delete flashcard'));
  }

  function startEdit(id, front, back) {
    setEditId(id);
    setEditQuestion(front);
    setEditAnswer(back);
  }

  function cancelEdit() {
    setEditId(null);
    setEditQuestion('');
    setEditAnswer('');
  }

  function saveEdit(id) {
    if (!editQuestion.trim() || !editAnswer.trim()) {
      setError('Both question and answer are required');
      return;
    }

    updateFlashcard(deckId, id, editQuestion, editAnswer)
      .then(() => {
        cancelEdit();
        loadCards();
      })
      .catch((err) => setError(err?.error || 'Failed to update flashcard'));
  }

  return (
    <section className="editor-section">
      <button className="back-button" onClick={onBack}>← Back to Decks</button>
      <h2>Flashcard Editor</h2>
      <p className="deck-indicator">Deck: <strong>{deckTitle}</strong></p>

      {isLoading ? <Loader /> : (
        <>
          <form onSubmit={handleAddFlashcard} className="flashcard-form">
            <label htmlFor="question">Question</label>
            <input
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value.slice(0, maxLength))}
            />
            <p className="char-counter">{question.length}/{maxLength}</p>

            <label htmlFor="answer">Answer</label>
            <input
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value.slice(0, maxLength))}
            />
            <p className="char-counter">{answer.length}/{maxLength}</p>

            <button type="submit">Add Flashcard</button>
          </form>

          {flashcards.length > 0 ? (
            <div className="flashcard-grid">
              {flashcards.map(({ id, front, back }) => (
                <div key={id} className="flashcard-card">
                  {editId === id ? (
                    <>
                      <input
                        className="edit-input"
                        value={editQuestion}
                        onChange={(e) => setEditQuestion(e.target.value.slice(0, maxLength))}
                      />
                      <input
                        className="edit-input"
                        value={editAnswer}
                        onChange={(e) => setEditAnswer(e.target.value.slice(0, maxLength))}
                      />
                      <div className="edit-actions">
                        <button onClick={() => saveEdit(id)}>💾 Save</button>
                        <button onClick={cancelEdit}>✖ Cancel</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="card-text">
                        <strong>Ques:</strong> {front}<br />
                        <strong>Ans:</strong> {back}
                      </div>
                      <div className="edit-actions">
                        <button onClick={() => startEdit(id, front, back)}>✏️</button>
                        <button onClick={() => handleDelete(id)}>🗑️</button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="empty">No flashcards yet</p>
          )}
        </>
      )}

      {error && <p className="error">{error}</p>}
    </section>
  );
}

export default FlashcardEditor;
