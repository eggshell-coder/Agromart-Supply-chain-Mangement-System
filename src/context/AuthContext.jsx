// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { login as apiLogin } from "../api/client";

export const AuthContext = createContext({
  user: null,
  token: null,
  login: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Load user profile if token exists (optional endpoint)
  useEffect(() => {
    if (token) {
      // Placeholder: fetch user profile if backend provides /api/me
      // fetch(`${import.meta.env.VITE_API_URL}/api/me`)...
      setUser({}); // dummy user
    }
  }, [token]);

  const login = async (email, password) => {
    const data = await apiLogin(email, password);
    if (data.token) {
      setToken(data.token);
      localStorage.setItem("token", data.token);
      setUser(data.user || {});
    }
    return data;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
