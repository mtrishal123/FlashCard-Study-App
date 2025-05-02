import { useEffect, useState } from 'react';
import { fetchFlashcards } from '../../services/flashcards';
import '../styles/ReviewMode.css';

function ReviewMode({ deckId, onBack, bestScore, updateBestScore, enableTimer = false, timeLimit = 15 }) {
  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [timer, setTimer] = useState(timeLimit);

  useEffect(() => {
    fetchFlashcards(deckId).then((data) => {
      setCards(data.flashcards || []);
      setScore(0);
      setIndex(0);
      setUserAnswer('');
      setFeedback('');
      setHasSubmitted(false);
      setTimer(timeLimit);
    });
  }, [deckId, timeLimit]);

  useEffect(() => {
    if (!enableTimer || hasSubmitted || feedback === 'done') return;

    const countdown = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(countdown);
          setFeedback('incorrect');
          setHasSubmitted(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [hasSubmitted, feedback, enableTimer]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!userAnswer.trim() || hasSubmitted) return;

    const correctAnswer = cards[index]?.back.trim().toLowerCase();
    if (userAnswer.trim().toLowerCase() === correctAnswer) {
      setScore((prev) => prev + 1);
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
    setHasSubmitted(true);
  }

  function nextCard() {
    const next = index + 1;
    if (next < cards.length) {
      setIndex(next);
      setUserAnswer('');
      setFeedback('');
      setHasSubmitted(false);
      setTimer(timeLimit);
    } else {
      updateBestScore(score);
      setFeedback('done');
    }
  }

  if (cards.length === 0) {
    return (
      <section className="review-section">
        <h2>Review Flashcards</h2>
        <p>No cards available for review.</p>
        <button className="back-button" onClick={onBack}>← Back to Decks</button>
      </section>
    );
  }

  return (
    <section className="review-section">
      <div className="review-container">
        <h2>Review Flashcards</h2>
        <button className="back-button" onClick={onBack}>← Back to Decks</button>

        {feedback === 'done' ? (
          <div className="message">
            <h3>Review Complete</h3>
          </div>
        ) : (
          <>
            <p><strong>Q:</strong> {cards[index]?.front}</p>
            {enableTimer && !hasSubmitted && (
              <p className="timer">⏱️ Time Left: {timer}s</p>
            )}

            {!hasSubmitted && (
              <form className="answer-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="answer-input"
                  placeholder="Your answer"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  required
                />
                <button type="submit" className="submit-button">Submit</button>
              </form>
            )}

            {feedback === 'correct' && (
              <div className="feedback success">
                ✅ Correct!
                <button onClick={nextCard}>Next</button>
              </div>
            )}

            {feedback === 'incorrect' && (
              <div className="feedback error">
                ❌ Incorrect. Correct answer: {cards[index]?.back}
                <button onClick={nextCard}>Next</button>
              </div>
            )}
          </>
        )}

        <div className="score-panel">
          <p>Score: {score}</p>
          <p>Best Score: {bestScore}</p>
        </div>
      </div>
    </section>
  );
}

export default ReviewMode;
