// src/components/Login.jsx
import { useState } from 'react';
import '../styles/Login.css';
import { fetchLogin, fetchRegister } from '../services/session.js';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  function handleChange(e) {
    setUsername(e.target.value);
    setError('');
    setRegistrationSuccess(false); // clear green message on typing
  }

  function handleLogin(e) {
    e.preventDefault();
    setError('');
    setRegistrationSuccess(false);

    fetchLogin(username)
      .then(() => {
        onLogin(username);
      })
      .catch((err) => {
        if (err?.error === 'User not registered.') {
          setError('Username not found. Please register first.');
        } else {
          setError(err?.error || 'Login failed');
        }
      });
  }

  function handleRegister(e) {
    e.preventDefault();
    setError('');
    setRegistrationSuccess(false);

    fetchRegister(username)
      .then(() => {
        setRegistrationSuccess(true);
        setError('');
        // do not auto login; prompt user to login
      })
      .catch((err) => {
        if (err?.error === 'User not allowed.') {
          setError('Sorry, this user is not allowed.');
        } else if (err?.error === 'Invalid username. Use only letters, numbers, or underscores.') {
          setError('Invalid username. Please use only letters, numbers, or underscores.');
        } else {
          setError(err?.error || 'Registration failed');
        }
      });
  }

  return (
    <section className="login-container">
      <h1 className="login-title">Flashcard App</h1>
      <form className="login-form">
        <label htmlFor="username">Enter Username:</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={handleChange}
        />
        <div className="button-row">
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleRegister}>Register</button>
        </div>
      </form>
      {registrationSuccess && <p className="success">User "{username}" created. Please log in.</p>}
      {error && <p className="error">{error}</p>}
    </section>
  );
}

export default Login;
