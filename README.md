# **Flashcard Study App**

The **Flashcard Study App** is a full-stack single-page application (SPA) built with **React (Vite)** on the frontend and **Node.js (Express)** on the backend.  
It enables users to **create decks**, manage **flashcards**, and **review them quiz-style** — complete with **session-based authentication**, **form validation**, and a smooth, responsive UI.  
The app is now fully **deployed on Render** at  
👉 **[https://flashcard-study-app-z340.onrender.com](https://flashcard-study-app-z340.onrender.com)**  

---

## 🧠 **Key Features**

### ✅ Authentication & Session
- Register → Login workflow using **cookie-based sessions**.
- Persistent authentication via secure **SID** cookie.
- `"dog"` username is explicitly **banned**.
- Automatic logout and redirect on session expiration (`AUTH_MISSING`).

### 🗂️ Deck & Flashcard Management
- Create, edit, or delete **decks** (1–40 characters).
- Add, edit, or delete **flashcards** (question + answer, up to 100 characters).
- Real-time validation and character counters on inputs.

### 📝 Quiz / Review Mode
- Flip through flashcards interactively.
- Submit answers and get instant feedback.
- Score tracked live with **best-score persistence**.
- Optional **per-question timer**.

### 🔥 User Feedback & Validation
- Clear error messages for invalid input.
- “Network error” shown only once until recovery.
- Distinct UI feedback for:
  - Empty decks / empty flashcards  
  - Successful registration / deletion / update

---

### 🧪 Using the App

-Go to https://flashcard-study-app-z340.onrender.com

-Register a username (except "dog")

-Log in — your session cookie authenticates you automatically

-Create a deck and add flashcards

-Enter Review Mode to quiz yourself

-Track and improve your score in real time

---

## 🧱 **Technology Stack**

| Layer | Technology |
|-------|-------------|
| Frontend | React (Vite) |
| State Management | React Hooks (`useState`, `useEffect`) |
| Backend | Node.js + Express |
| Session | `cookie-parser` |
| Styling | Modular CSS |
| Build Tool | Vite |
| Deployment | Render (Fullstack App) |

---

## ⚙️ **Environment Setup**

### `client/.env`
change it to
VITE_API_BASE_URL=http://localhost:3000

### `server/.env`
PORT=3000
CORS_ORIGIN=http://localhost:5173


*(These are for local development only — production values are configured on Render.)*

---

## 🧩 **Local Development**

Run frontend and backend in parallel:

```bash
# Terminal 1 – Backend
cd server
npm install
npm run dev

# Terminal 2 – Frontend
cd client
npm install
npm run dev

Visit ➡️ http://localhost:5173

🔨 Production Build & Start

# From project root
npm run build
npm start

npm start
This will:

Build the frontend (client/dist)

Serve it through Express (server/services/server.js)

Start the app on http://localhost:3000

##  📸  Assets & Licensing

loading.svg and logout.svg from Google Fonts Icons
 — free for use with attribution.

All other icons and visuals are self-made or open-licensed.