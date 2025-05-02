import { useEffect, useState } from 'react';
import DeckList from './DeckList.jsx';
import DeckForm from './DeckForm.jsx';
import ReviewMode from './ReviewMode.jsx';
import FlashcardEditor from './FlashcardEditor.jsx';
import { fetchDecks, createDeck, deleteDeck } from '../../services/decks.js';
import Header from './Header.jsx';
import '../styles/Dashboard.css';

function Dashboard({ username, onLogout }) {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedDeckId, setSelectedDeckId] = useState(null);
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState('');
  const [bestScores, setBestScores] = useState(() => {
    const saved = localStorage.getItem('bestScores');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    fetchDecks()
      .then((data) => {
        setDecks(data.decks);
        setError('');
      })
      .catch((err) => {
        setError(err?.error || 'Failed to load decks');
      });
  }, []);

  useEffect(() => {
    localStorage.setItem('bestScores', JSON.stringify(bestScores));
  }, [bestScores]);

  function handleStartReview(deckId) {
    setSelectedDeckId(deckId);
    setCurrentScreen('review');
  }

  function handleEditDeck(deckId) {
    setSelectedDeckId(deckId);
    setCurrentScreen('editor');
  }

  function handleCreateDeck(title) {
    createDeck(title)
      .then((data) => {
        setDecks([...decks, data.deck]);
        setCurrentScreen('home');
      })
      .catch((err) => {
        setError(err?.error || 'Failed to create deck');
      });
  }

  function handleDeleteDeck(deckId) {
    deleteDeck(deckId)
      .then(() => {
        setDecks(decks.filter(deck => deck.id !== deckId));
      })
      .catch((err) => {
        setError(err?.error || 'Failed to delete deck');
      });
  }

  function handleGoHome() {
    setCurrentScreen('home');
    setError('');
  }

  function updateBestScore(deckId, newScore) {
    setBestScores(prev => {
      const currentBest = prev[deckId] || 0;
      if (newScore > currentBest) {
        return { ...prev, [deckId]: newScore };
      }
      return prev;
    });
  }

  useEffect(() => {
    const cookieExists = document.cookie.includes('sid=');
    if (!cookieExists) {
      onLogout();
    }
  }, [currentScreen]);

  useEffect(() => {
    const handleReconnect = () => {
      setError('');
    };
    window.addEventListener('online', handleReconnect);
    return () => window.removeEventListener('online', handleReconnect);
  }, []);

  return (
    <section className="dashboard">
      <Header username={username} onLogout={onLogout} />

      <div className="dashboard-content">
        {currentScreen === 'home' && (
          <DeckList
            decks={decks}
            onSelectDeck={handleStartReview}
            onEditDeck={handleEditDeck}
            onDeleteDeck={handleDeleteDeck}
            onCreateDeck={() => setCurrentScreen('create')}
          />
        )}

        {currentScreen === 'review' && (
          <ReviewMode
            deckId={selectedDeckId}
            onBack={handleGoHome}
            bestScore={bestScores[selectedDeckId] || 0}
            updateBestScore={(score) => updateBestScore(selectedDeckId, score)}
            enableTimer={true}
            timeLimit={15}
          />
        )}

        {currentScreen === 'create' && (
          <DeckForm
            onCreate={handleCreateDeck}
          />
        )}

        {currentScreen === 'editor' && (
          <FlashcardEditor
            deckId={selectedDeckId}
            onBack={handleGoHome}
            decks={decks}
          />
        )}

        {error && <p className="error">{error}</p>}
      </div>
    </section>
  );
}

export default Dashboard;
