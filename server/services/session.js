export function fetchSession() {
    return fetch('/api/session')
      .catch(() => Promise.reject({ error: 'Network error' }))
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => Promise.reject(err));
        }
        return res.json();
    });
}
  
  export function fetchLogin(username) {
    return fetch('/api/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    })
      .catch(() => Promise.reject({ error: 'Network error' }))
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => Promise.reject(err));
        }
        return res.json();
      });
  }
  
  export function fetchRegister(username) {
    return fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    })
      .catch(() => Promise.reject({ error: 'Network error' }))
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => Promise.reject(err));
        }
        return res.json();
      });
  }
  
  export function fetchLogout() {
    return fetch('/api/session', { method: 'DELETE' })
      .catch(() => Promise.reject({ error: 'Network error' }))
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => Promise.reject(err));
        }
      });
  }
  