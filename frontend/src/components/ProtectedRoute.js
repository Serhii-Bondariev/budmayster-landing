
// frontend/src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole, user }) => {
  const token = localStorage.getItem('token'); // Перевіряємо токен
  const userRole = user?.role || localStorage.getItem('role'); // Отримуємо роль користувача

  // Якщо токен відсутній, перенаправляємо на сторінку входу
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Якщо необхідна роль не співпадає з роллю користувача, перенаправляємо на головну
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  // Якщо все ок, відображаємо дочірні елементи (компоненти)
  return children;
};

export default ProtectedRoute;
