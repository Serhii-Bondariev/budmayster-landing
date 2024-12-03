import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/api';

const Login = ({ setAuth, setRole }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({ email, password }); // Виклик API
      localStorage.setItem('token', data.token); // Зберігаємо токен
      setAuth(true); // Встановлюємо авторизацію
      setRole(data.role); // Встановлюємо роль

      alert('Login successful!');

      // Перевірка ролі користувача
      if (data.role === 'admin') {
        navigate('/admin'); // Перенаправлення на адмінку
      } else {
        navigate('/'); // Перенаправлення на головну сторінку
      }
    } catch (error) {
      alert('Login failed!');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
