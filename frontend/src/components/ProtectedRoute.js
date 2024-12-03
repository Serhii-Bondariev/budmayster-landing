// frontend/src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token'); // Перевіряємо токен
  const userRole = localStorage.getItem('role'); // Отримуємо роль користувача

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />; // Якщо роль не співпадає, перенаправляємо
  }

  return children;
};

export default ProtectedRoute;
