import React from "react";
import { Navigate } from "react-router-dom";
import jwt_decode from "jsonwebtoken";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("authToken"); // Obtenemos el token de localStorage
  if (!token) {
    return <Navigate to="/login" />; // Si no hay token, redirigimos al login
  }

  try {
    // Decodificamos el token para asegurarnos de que es válido
    const decoded = jwt_decode(token);
    const expirationTime = decoded.exp * 1000; // Verificamos si el token ha expirado

    if (expirationTime < Date.now()) {
      localStorage.removeItem("authToken"); // Si el token expiró, eliminamos el token
      return <Navigate to="/login" />; // Redirigimos al login
    }

    // Si todo está bien, renderizamos el contenido de la ruta protegida
    return children;
  } catch (error) {
    console.error("Error al verificar el token:", error);
    return <Navigate to="/login" />; // Si hay algún error, redirigimos al login
  }
};

export default ProtectedRoute;
