import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const defaultAvatar = 'https://avatar.iran.liara.run/public/11'
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({ role: '', name: '', avatar: '', email: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Декодування токена
        const avatarFromToken = decodedToken?.avatar || defaultAvatar;
        localStorage.setItem('avatar', avatarFromToken);

        setIsAuthenticated(true);
        setUser({
          role: decodedToken.role || 'Guest',
          name: decodedToken.name || 'Guest',
          email: decodedToken.email || 'Email',
          avatar: avatarFromToken,
        });
      } catch (error) {
        console.error('Invalid token:', error);
        setIsAuthenticated(false);
        setUser({ role: '', name: '', avatar: '', email: '' });
      }
    }
  }, []);

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     try {
  //       const decodedToken = JSON.parse(atob(token.split('.')[1])); // Розкодування токена
  //       console.log(decodedToken); // Перевіряємо вміст токена в консолі
  //       const emailFromToken = decodedToken?.email || 'Email'; // Якщо email відсутній, виводимо 'Guest'
  //       const avatarFromToken = decodedToken?.avatar || `defaltAvatar`;
  //       localStorage.setItem('avatar', avatarFromToken);

  //       setIsAuthenticated(true);
  //       setUser({
  //         role: decodedToken.role || 'Guest',
  //         name: decodedToken.name || 'Guest',
  //         email: decodedToken.email || 'Email',
  //         avatar: localStorage.getItem('avatar') || `defaltAvatar`,
  //       });
  //     } catch (error) {
  //       console.error('Invalid token:', error);
  //       setIsAuthenticated(false);
  //       setUser({ role: '', name: '', avatar: '', email: '' });
  //     }
  //   }
  // }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUser({ role: '', name: '', avatar: '', email: '' });
  };

  return (
    <Router>
      <Navbar
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={handleLogout}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login setAuth={setIsAuthenticated} setUser={setUser} />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin" user={user}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
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
// import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
// import Home from './pages/Home';
// import ProtectedRoute from './components/ProtectedRoute';

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userRole, setUserRole] = useState(null);

//   // Перевірка токена у localStorage
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       try {
//         const { role } = JSON.parse(atob(token.split('.')[1])); // Декодуємо токен
//         setIsAuthenticated(true); // Встановлюємо статус авторизації
//         setUserRole(role); // Зберігаємо роль користувача
//       } catch (error) {
//         console.error('Invalid token', error);
//         setIsAuthenticated(false);
//       }
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('token'); // Видаляємо токен
//     setIsAuthenticated(false); // Скидаємо авторизацію
//     setUserRole(null); // Очищаємо роль
//   };

//   return (
//     <Router>
//       <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
//       <Routes>
//         {/* Головна сторінка */}
//         <Route path="/" element={<Home />} />

//         {/* Сторінка входу */}
//         <Route path="/login" element={<Login setAuth={setIsAuthenticated} setRole={setUserRole} />} />

//         {/* Сторінка реєстрації */}
//         <Route path="/register" element={<Register />} />

//         {/* Адмін панель доступна лише для адмінів */}
//         <Route
//   path="/admin"
//   element={
//     <ProtectedRoute requiredRole="admin">
//       <AdminDashboard />
//     </ProtectedRoute>
//   }
// />
//         {/* <Route
//           path="/admin"
//           element={
//             <ProtectedRoute isAllowed={userRole === 'admin'}>
//               <AdminDashboard />
//             </ProtectedRoute>
//           }
//         /> */}

//         {/* Редирект для невідомих маршрутів */}
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;