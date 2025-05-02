export const SESSIONS = {};
export const USERS = {}; 

export function isValidUsername(username) {
  return /^[a-zA-Z0-9_]+$/.test(username);
}

export function userExists(username) {
  return USERS[username];  
}

export function registerUser(sid, username) {
  USERS[username] = true;         
  SESSIONS[sid] = username;
}

export function loginUser(sid, username) {
  SESSIONS[sid] = username;
}

export function getUsernameBySid(sid) {
  return SESSIONS[sid];
}

export function deleteSession(sid) {
  delete SESSIONS[sid];
}
