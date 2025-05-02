# **Flashcard Quiz App**

The **Flashcard Quiz App** is a full-stack single-page application (SPA) built with **React (Vite)** on the frontend and **Node.js (Express)** on the backend. It enables users to **create decks**, add/edit **flashcards**, and **review them interactively** like a quiz — with built-in **session-based login**, **form validation**, **auth handling**, and a smooth, responsive UI.

---

## 🧠 **Key Features**

### ✅ Authentication & Session
- Users must **register** and then **log in** to use the app.
- A user with the name `"dog"` is explicitly **banned**.
- Auth is handled using **cookie-based session tracking**.
- Auth persistence across pages using a **secure SID** (stored in cookies).
- **Redirects** to login on session expiration (`AUTH_MISSING`).

### 🗂️ Deck & Flashcard Management
- Users can:
  - Create decks (1–40 char title validation).
  - Edit and delete flashcards within decks.
  - Each flashcard has a **question** and **answer**, limited to **100 characters**.
- Visual feedback and character counters on input fields.

### 📝 Quiz/Review Mode
- Flip through flashcards one by one.
- Submit your answer and get instant feedback.
- Score tracked in real time, with **best score persistence**.
- **Timer per question** (auto-next when time’s up).

### 🔥 User Feedback & Validation
- Invalid inputs are clearly flagged.
- Real-time **character counters**.
- **Network error** messages shown only **once** until recovery.
- Proper messages on:
  - Empty decks
  - Empty flashcards
  - Successful registration

---

## 🧱 Technology Stack

| Layer        | Tech               |
|--------------|--------------------|
| Frontend     | React + Vite       |
| State Mgmt   | React useState     |
| Backend      | Node.js + Express  |
| Session      | `cookie-parser`    |
| Styling      | CSS (modular files)|
| Build Tool   | Vite               |

---

## 🚀 How to Run

### ✅ Prerequisites
- Node.js (v18+)
- npm

### 📦 Installation
```bash
git clone <your-repo>
cd final
npm install
```

### 🔨 Build and Start
```bash
npm run build
npm start     
```

### 💻 Development Mode (Optional)
```bash
npm run dev
```

---

## 🧪 How to Use

1. Visit `http://localhost:3000`
2. Register a new username (except `"dog"`)
3. Login with that username
4. Create a deck and flashcards
5. Enter **Review Mode** to start a quiz
6. Track your score and retry to improve it!

---

## 📁 Project Structure

```
final/
├── controller.js         # Express routes
├── models/               # In-memory DB logic (sessions, decks)
├── server.js             # App entry point (Express + routes)


src/
├── components/           # All React components
├── services/             # API calls (fetch abstraction)
└── styles/               # Modular CSS files
```

---

## 📸 Media & Licensing

- `loading.svg` sourced from [Google Fonts](https://fonts.google.com/icons?selected=Material+Symbols+Outlined:sync:FILL@0;wght@400;GRAD@0;opsz@24&icon.query=loading&icon.size=24&icon.color=%23e3e3e3) – Free license with attribution.
- `logout.svg` sourced from [Google Fonts](https://fonts.google.com/icons?selected=Material+Symbols+Outlined:logout:FILL@0;wght@400;GRAD@0;opsz@24&icon.query=logout&icon.size=24&icon.color=%23e3e3e3) – Free license with attribution.
- All UI assets/icons are self-designed or sourced from free-to-use platforms under open licenses.

---

## 🌟 Implemented Bonus Requirements

### 🔁 Extra Service Interaction Complexity
| Bonus                                 | Where Implemented         |
|--------------------------------------|----------------------------|
| **Additional HTTP Methods** x3       | `controller.js`            |
| **Filtered services by SID/session** | `controller.js`            |
| **Flashcard Add/Delete/Update**      | `controller.js`            |

### 📦 Extra State Complexity
| Bonus                                      | Where Implemented         |
|-------------------------------------------|----------------------------|
| **Multiple visual pages/screens**         | `App.jsx`, `Dashboard.jsx` |
| **Timer per card (interactive state)**    | `ReviewMode.jsx`           |
| **Complex form validation & counters**    | `FlashcardEditor.jsx`      |
| **Session-based redirection**             | `App.jsx`, `Login.jsx`     |
| **Frontend/backend separation of concerns**| `src/` & `controller.js`   |



---

## 💯 Final Thoughts

This project was built with a strong focus on **discoverability**, **clean architecture**, and **interactive UX**. It shows end-to-end skills including:

- Full RESTful API handling
- Persistent state and score logic
- Defensive programming (network issues, auth errors)
- Visual clarity with responsive layout

We hope you enjoy testing it as much as we did building it!