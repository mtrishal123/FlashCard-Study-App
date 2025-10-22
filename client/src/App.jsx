// src/App.jsx
import { useState, useEffect } from 'react';
import './styles/App.css';

import Loader from './components/Loader.jsx';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';
import { fetchSession, fetchLogout } from './services/session.js';

function App() {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [networkErrorShown, setNetworkErrorShown] = useState(false);

  useEffect(() => {
    fetchSession()
      .then((data) => {
        setUsername(data.username);
        setIsLoggedIn(true);
        setError('');
      })
      .catch((err) => {
        if (err?.error === 'AUTH_MISSING') {
          setIsLoggedIn(false);
          setUsername('');
        } else if (err?.error === 'Network error' && !networkErrorShown) {
          setError('Network error. Please check your connection.');
          setNetworkErrorShown(true);
        } else {
          setError(err?.error || 'An error occurred');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  function handleLogin(username) {
    setUsername(username);
    setIsLoggedIn(true);
    setError('');
  }

  function handleLogout() {
    fetchLogout()
      .then(() => {
        setUsername('');
        setIsLoggedIn(false);
        setError('');
        setNetworkErrorShown(false); // Reset network error flag on logout
      })
      .catch((err) => {
        setError(err?.error || 'Logout failed');
      });
  }

  return (
    <div className="app">
      {isLoading ? (
        <Loader />
      ) : isLoggedIn ? (
        <Dashboard username={username} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;
