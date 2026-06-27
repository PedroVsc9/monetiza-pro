import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

function getUsers() {
  try { return JSON.parse(localStorage.getItem('_users') || '{}'); } catch { return {}; }
}
function saveUsers(u) { localStorage.setItem('_users', JSON.stringify(u)); }
function getUserData(email, key, fallback) {
  try { return JSON.parse(localStorage.getItem(`${email}:${key}`) ?? 'null') ?? fallback; } catch { return fallback; }
}
function setUserData(email, key, value) { localStorage.setItem(`${email}:${key}`, JSON.stringify(value)); }

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem('_session') || 'null'); } catch { return null; }
  });
  const [error, setError] = useState('');

  const login = (email, password) => {
    const users = getUsers();
    const e = email.trim().toLowerCase();
    if (!users[e]) { setError('Email não encontrado.'); return false; }
    if (users[e].password !== password) { setError('Senha incorreta.'); return false; }
    const u = { email: e, name: users[e].name };
    setUser(u);
    sessionStorage.setItem('_session', JSON.stringify(u));
    setError('');
    return true;
  };

  const register = (name, email, password) => {
    const users = getUsers();
    const e = email.trim().toLowerCase();
    if (!name.trim()) { setError('Informe seu nome.'); return false; }
    if (!e.includes('@')) { setError('Email inválido.'); return false; }
    if (password.length < 6) { setError('Senha precisa ter ao menos 6 caracteres.'); return false; }
    if (users[e]) { setError('Email já cadastrado.'); return false; }
    users[e] = { name: name.trim(), password };
    saveUsers(users);
    const u = { email: e, name: name.trim() };
    setUser(u);
    sessionStorage.setItem('_session', JSON.stringify(u));
    setError('');
    return true;
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('_session');
  };

  const get = (key, fallback) => getUserData(user?.email, key, fallback);
  const set = (key, value) => { setUserData(user?.email, key, value); };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, error, setError, get, set }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
