
// backend/routes/auth.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';  // Якщо в твоєму проекті моделі мають розширення .js, додай його

const router = express.Router();

// Реєстрація нового користувача
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
      }

      const user = new User({ name, email, password, role }); // Зберігаємо роль
      await user.save();

      const token = jwt.sign(
          { id: user._id, role: user.role }, // Додаємо роль у токен
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
      );
      res.status(201).json({ token, role: user.role }); // Повертаємо токен і роль
  } catch (error) {
      res.status(500).json({ message: 'Server error' });
  }
});


// Авторизація користувача
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
          { id: user._id, role: user.role }, // Додаємо роль у токен
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
      );
      res.status(200).json({ token, role: user.role }); // Повертаємо токен і роль
  } catch (error) {
      res.status(500).json({ message: 'Server error' });
  }
});


export default router;  // Експортуємо як дефолт
