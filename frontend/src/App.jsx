import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  // Перевірка токена у localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const { role } = JSON.parse(atob(token.split('.')[1])); // Декодуємо токен
        setIsAuthenticated(true); // Встановлюємо статус авторизації
        setUserRole(role); // Зберігаємо роль користувача
      } catch (error) {
        console.error('Invalid token', error);
        setIsAuthenticated(false);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Видаляємо токен
    setIsAuthenticated(false); // Скидаємо авторизацію
    setUserRole(null); // Очищаємо роль
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        {/* Головна сторінка */}
        <Route path="/" element={<Home />} />

        {/* Сторінка входу */}
        <Route path="/login" element={<Login setAuth={setIsAuthenticated} setRole={setUserRole} />} />

        {/* Сторінка реєстрації */}
        <Route path="/register" element={<Register />} />

        {/* Адмін панель доступна лише для адмінів */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute isAllowed={userRole === 'admin'}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Редирект для невідомих маршрутів */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;



// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Navbar from './components/Navbar/Navbar';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import AdminDashboard from './pages/AdminDashboard';
// import Home from './pages/Home';
// import ProtectedRoute from './components/ProtectedRoute';

// const App = () => {
//   const [isAdmin, setIsAdmin] = useState(false);

//   // Перевіряємо токен у localStorage під час завантаження програми
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       try {
//         const user = JSON.parse(atob(token.split('.')[1])); // Декодуємо payload токена
//         setIsAdmin(user.isAdmin || false);
//       } catch (error) {
//         console.error('Invalid token format', error);
//         setIsAdmin(false);
//       }
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('token'); // Очищаємо токен
//     setIsAdmin(false); // Скидаємо статус після виходу
//   };

//   return (
//     <Router>
//       <Navbar isAdmin={isAdmin} onLogout={handleLogout} />
//       <Routes>
//         {/* Головна сторінка */}
//         <Route path="/" element={<Home />} />

//         {/* Сторінка входу */}
//         <Route path="/login" element={<Login />} />

//         {/* Сторінка реєстрації */}
//         <Route path="/register" element={<Register />} />

//         {/* Адмінка доступна тільки для адмінів */}
//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute isAllowed={isAdmin}>
//               <AdminDashboard />
//             </ProtectedRoute>
//           }
//         />

//         {/* Якщо немає збігу з маршрутами */}
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
