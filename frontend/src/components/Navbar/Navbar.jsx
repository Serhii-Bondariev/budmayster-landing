import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ onLogout, user }) => {
  const navigate = useNavigate();
  const isAuthenticated = !!user?.role; // Користувач вважається автентифікованим, якщо у нього є роль
  const isAdmin = user?.role === 'admin'; // Перевірка ролі адміністратора

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      onLogout(); // Викликаємо функцію виходу
      navigate('/login'); // Перенаправлення на сторінку входу
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-lg">
      <div className="container-fluid">
        <Link className="navbar-brand fs-3 fw-bold text-white" to="/">
          My Website
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            {isAuthenticated ? (
              <>
                <li className="nav-item d-flex align-items-center">
                  <img
                    src={user?.avatar || 'hhttps://via.placeholder.com/150'}
                    alt="Avatar"
                    className="rounded-circle me-2 border border-light"
                    style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                  />
                 <span className="text-white me-3">
  {`Welcome back, ${user?.role || 'User'} ${user?.name || 'Guest'}     ${user?.email ? `${user.email}` : ''}`}
</span>

                </li>
                <li className="nav-item">
                  <button className="btn btn-danger nav-link" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
                {isAdmin && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin">
                      Dashboard
                    </Link>
                  </li>
                )}
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;




// const Navbar = ({ onLogout }) => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState({
//     name: '',
//     role: '',
//     avatar: 'https://www.gravatar.com/avatar/?d=mp',
//   });
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const name = localStorage.getItem('name');
//       const role = localStorage.getItem('role');
//       const avatar = localStorage.getItem('avatar') || 'https://www.gravatar.com/avatar/?d=mp';

//       setUser({ name, role, avatar });
//       setIsAuthenticated(true);
//     }
//   }, []);

//   const handleLogout = () => {
//     if (window.confirm('Are you sure you want to log out?')) {
//       localStorage.clear();
//       setIsAuthenticated(false);
//       onLogout();
//       navigate('/login');
//     }
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-lg">
//       <div className="container-fluid">
//         <Link className="navbar-brand fs-3 fw-bold text-white" to="/">
//           My Website
//         </Link>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav ms-auto">
//             <li className="nav-item">
//               <Link className="nav-link" to="/">
//                 Home
//               </Link>
//             </li>
//             {isAuthenticated ? (
//               <>
//                 <li className="nav-item d-flex align-items-center">
//                   <img
//                     src={user.avatar}
//                     alt="Avatar"
//                     className="rounded-circle me-2 border border-light"
//                     onError={(e) => (e.target.src = 'https://www.gravatar.com/avatar/?d=mp')}
//                     style={{ width: '40px', height: '40px', objectFit: 'cover' }}
//                   />
//                   <span className="text-white me-3">{`${user.name} (${user.role})`}</span>
//                 </li>
//                 {user.role === 'admin' && (
//                   <li className="nav-item">
//                     <Link className="nav-link" to="/admin">
//                       Admin Panel
//                     </Link>
//                   </li>
//                 )}
//                 <li className="nav-item">
//                   <button className="btn btn-danger nav-link" onClick={handleLogout}>
//                     Logout
//                   </button>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/login">
//                     Login
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/register">
//                     Register
//                   </Link>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// // components/Navbar/Navbar.jsx
// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const Navbar = ({ onLogout }) => {
//   const navigate = useNavigate();
//   const name = localStorage.getItem('name');
//   // const email = localStorage.getItem('email');
//   const avatar = localStorage.getItem('avatar') || 'https://www.gravatar.com/avatar/?d=mp';
//   const role = localStorage.getItem('role');
//   const token = localStorage.getItem('token'); // Перевірка наявності токена

//   const isAuthenticated = Boolean(token); // Якщо токен є, користувач автентифікований

//   const handleLogout = () => {
//     if (window.confirm('Are you sure you want to log out?')) {
//       localStorage.clear(); // Видаляємо всі дані
//       onLogout(); // Скидаємо стан авторизації
//       navigate('/login'); // Перенаправлення на сторінку логіну
//     }
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-lg">
//       <div className="container-fluid">
//         <Link className="navbar-brand fs-3 fw-bold text-white" to="/">
//           My Website
//         </Link>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav ms-auto">
//             <li className="nav-item">
//               <Link className="nav-link" to="/">
//                 Home
//               </Link>
//             </li>
//             {isAuthenticated ? (
//               <>
//                 <li className="nav-item d-flex align-items-center">
//                   <img
//                     src={avatar}
//                     alt="Avatar"
//                     className="rounded-circle me-2 border border-light"
//                     style={{ width: '40px', height: '40px', objectFit: 'cover' }}
//                   />
//                   <span className="text-white me-3">{`${name} (${role})`}</span>
//                 </li>
//                 <li className="nav-item">
//                   <button className="btn btn-danger nav-link" onClick={handleLogout}>
//                     Logout
//                   </button>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/login">
//                     Login
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/register">
//                     Register
//                   </Link>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
