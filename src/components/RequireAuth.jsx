// src/components/RequireAuth.jsx
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function RequireAuth({ children }) {
  const { token } = useContext(AuthContext);
  const location = useLocation();

  if (!token) {
    // Redirect to login, preserve intended location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
