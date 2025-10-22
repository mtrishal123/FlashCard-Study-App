import { BASE_URL } from '../api';

export function fetchSession() {
  return fetch(`${BASE_URL}/api/session`, {
    credentials: "include",
  })
    .catch(() => Promise.reject({ error: 'Network error' }))
    .then((res) => (res.ok ? res.json() : res.json().then((err) => Promise.reject(err))));
}

export function fetchLogin(username) {
  return fetch(`${BASE_URL}/api/session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username }),
    credentials: "include",
  })
    .catch(() => Promise.reject({ error: 'Network error' }))
    .then((res) => (res.ok ? res.json() : res.json().then((err) => Promise.reject(err))));
}

export function fetchRegister(username) {
  return fetch(`${BASE_URL}/api/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username }),
    credentials: "include",
  })
    .catch(() => Promise.reject({ error: 'Network error' }))
    .then((res) => (res.ok ? res.json() : res.json().then((err) => Promise.reject(err))));
}

export function fetchLogout() {
  return fetch(`${BASE_URL}/api/session`, { method: 'DELETE', credentials: "include", })
    .catch(() => Promise.reject({ error: 'Network error' }))
    .then((res) => {
      if (!res.ok) {
        return res.json().then((err) => Promise.reject(err));
      }
    });
}
