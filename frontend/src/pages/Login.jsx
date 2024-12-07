import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/api';

const Login = ({ setAuth, setUser }) => { // Отримуємо setUser через пропси
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const defaultAvatar = 'https://i.pravatar.cc/300'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Виклик API для логіну
      const { data } = await loginUser({ email, password });

      // Збереження токена в Local Storage
      localStorage.setItem('token', data.token);

      // Розкодування токена та оновлення стану
      const decodedToken = JSON.parse(atob(data.token.split('.')[1]));
      setAuth(true); // Установка isAuthenticated у true
      setUser({
        name: decodedToken.name,
        role: decodedToken.role,
        email: decodedToken.email,
        avatar: decodedToken.avatar || defaultAvatar
      });

      // alert('Login successful!');
      navigate('/'); // Перенаправлення на головну сторінку
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      setError('Login failed! Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;


// // frontend/src/pages/Login.jsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { loginUser } from '../api/api';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();



//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       // Виклик API для логіну
//       const { data } = await loginUser({ email, password });

//       // Збереження токена в Local Storage
//       localStorage.setItem('token', data.token);

//       alert('Login successful!');
//       navigate('/'); // Перенаправлення на головну сторінку
//     } catch (error) {
//       console.error('Login error:', error.response?.data || error.message);
//       setError('Login failed! Please check your credentials.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         {error && <div className="alert alert-danger">{error}</div>}
//         <div className="mb-3">
//           <label>Email:</label>
//           <input
//             type="email"
//             className="form-control"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label>Password:</label>
//           <input
//             type="password"
//             className="form-control"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary" disabled={loading}>
//           {loading ? 'Logging in...' : 'Login'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;
