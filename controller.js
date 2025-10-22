// controller.js
import { randomUUID } from 'crypto';
import {
  registerUser,
  loginUser,
  getUsernameBySid,
  deleteSession,
  isValidUsername,
  userExists,
} from './server/models/session.js';
import {
  getDecks,
  createDeck,
  deleteDeck,
  getDeckById,
  addFlashcard,
  updateFlashcard,
  deleteFlashcard,
} from './server/models/decks.js';

export function createServerRoutes(app) {
  // SESSION ROUTES
  app.post('/api/register', (req, res) => {
    const { username } = req.body;

    if (!isValidUsername(username)) {
      return res.status(400).json({ error: 'Invalid username. Use only letters, numbers, or underscores.' });
    }
    if (username === 'dog') {
      return res.status(403).json({ error: 'User not allowed.' });
    }
    if (userExists(username)) {
      return res.status(409).json({ error: 'Username already taken. Please try another.' });
    }

    const sid = randomUUID();
    registerUser(sid, username); // Save user in USERS
    res.status(201).json({ message: `Username '${username}' created. Please login.` });

  });

  app.post('/api/session', (req, res) => {
    const { username } = req.body;

    if (!isValidUsername(username)) {
      return res.status(400).json({ error: 'Invalid username.' });
    }
    if (username === 'dog') {
      return res.status(403).json({ error: 'User not allowed.' });
    }
    if (!userExists(username)) {
      return res.status(401).json({ error: 'Username not found. Please register first.' });
    }

    const sid = randomUUID();
    loginUser(sid, username);
    res.cookie('sid', sid);
    res.status(200).json({ username });
  });

  app.get('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = getUsernameBySid(sid);
    if (!username) {
      return res.status(401).json({ error: 'AUTH_MISSING' });
    }
    res.json({ username });
  });

  app.delete('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    deleteSession(sid);
    res.clearCookie('sid');
    res.status(204).end();
  });

  // DECK ROUTES
  app.get('/api/decks', (req, res) => {
    const sid = req.cookies.sid;
    const username = getUsernameBySid(sid);
    if (!username) return res.status(401).json({ error: 'AUTH_MISSING' });
    res.json({ decks: getDecks(username) });
  });

  app.post('/api/decks', (req, res) => {
    const sid = req.cookies.sid;
    const username = getUsernameBySid(sid);
    const { title } = req.body;
    if (!username) return res.status(401).json({ error: 'AUTH_MISSING' });
    if (!title || !/^[\w\s-]{1,40}$/.test(title)) {
      return res.status(400).json({
        error: 'Deck title must be 1–40 characters and contain only letters, numbers, spaces, dashes, or underscores.',
      });
    }
    const deck = createDeck(username, title);
    res.status(201).json({ deck });
  });

  app.delete('/api/decks/:deckId', (req, res) => {
    const sid = req.cookies.sid;
    const username = getUsernameBySid(sid);
    const { deckId } = req.params;
    if (!username) return res.status(401).json({ error: 'AUTH_MISSING' });
    const success = deleteDeck(username, deckId);
    if (!success) return res.status(404).json({ error: 'Deck not found' });
    res.status(204).end();
  });

  // FLASHCARD ROUTES
  app.get('/api/decks/:deckId/flashcards', (req, res) => {
    const sid = req.cookies.sid;
    const username = getUsernameBySid(sid);
    const { deckId } = req.params;
    if (!username) return res.status(401).json({ error: 'AUTH_MISSING' });
    const deck = getDeckById(username, deckId);
    if (!deck) return res.status(404).json({ error: 'Deck not found' });
    res.json({ flashcards: deck.cards });
  });

  app.post('/api/decks/:deckId/flashcards', (req, res) => {
    const sid = req.cookies.sid;
    const username = getUsernameBySid(sid);
    const { deckId } = req.params;
    const { front, back } = req.body;
    if (!username) return res.status(401).json({ error: 'AUTH_MISSING' });
    if (!front || !back || front.length > 100 || back.length > 100) {
      return res.status(400).json({ error: 'Question and answer must be 1-100 characters.' });
    }
    const card = addFlashcard(username, deckId, front, back);
    if (!card) return res.status(404).json({ error: 'Deck not found' });
    res.status(201).json({ card });
  });

  app.put('/api/decks/:deckId/flashcards/:cardId', (req, res) => {
    const sid = req.cookies.sid;
    const username = getUsernameBySid(sid);
    const { deckId, cardId } = req.params;
    const { front, back } = req.body;
    if (!username) return res.status(401).json({ error: 'AUTH_MISSING' });
    if (!front || !back || front.length > 100 || back.length > 100) {
      return res.status(400).json({ error: 'Invalid question/answer format' });
    }
    const updated = updateFlashcard(username, deckId, cardId, front, back);
    if (!updated) return res.status(404).json({ error: 'Flashcard not found' });
    res.status(200).json({ card: updated });
  });

  app.delete('/api/decks/:deckId/flashcards/:cardId', (req, res) => {
    const sid = req.cookies.sid;
    const username = getUsernameBySid(sid);
    const { deckId, cardId } = req.params;
    if (!username) return res.status(401).json({ error: 'AUTH_MISSING' });
    const success = deleteFlashcard(username, deckId, cardId);
    if (!success) return res.status(404).json({ error: 'Flashcard not found' });
    res.status(204).end();
  });
}
