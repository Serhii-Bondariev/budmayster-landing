// routes/auth.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import multer from "multer";
import Joi from "joi";

const router = express.Router();

// **Налаштування для multer** (обмеження типів файлів)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only images are allowed"), false);
    }
    cb(null, true);
  },
});

// **Схеми валідації з Joi**
const registerSchema = Joi.object({
  name: Joi.string().required().min(3).max(30),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// **Логін**
router.post("/login", async (req, res) => {
  console.log("Login attempt:", req.body.email);

  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log(`Failed login attempt for non-existing email: ${email}`);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      console.log(`Invalid password attempt for email: ${email}`);
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user._id, name: user.name, role: user.role, email: user.email }, // Додали email
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    // const token = jwt.sign(
    //   { id: user._id, name: user.name, role: user.role },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "1h" }
    // );
    console.log("Token generated:", token);

    return res.json({ token });
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// **Реєстрація користувача**
router.post("/register", upload.single("avatar"), async (req, res) => {
  console.log("Request body:", req.body);
  console.log("Uploaded file:", req.file);

  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({
      name,
      email,
      password, // Передаємо пароль безпосередньо, модель хешує його автоматично
      avatar: req.file ? `/uploads/${req.file.filename}` : undefined,
    });

    await user.save();
    console.log("User saved:", user);

    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.name, email: user.email }, // Додали email
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // const token = jwt.sign(
    //   { id: user._id, role: user.role },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "1h" }
    // );

    res.status(201).json({ token, user });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already in use" });
    }
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

// // auth.js
// import express from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";  // Ваше визначення моделі користувача
// import multer from "multer";

// const router = express.Router();

// // Налаштування для multer
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + file.originalname);  // Генерація унікального імені для файлів
//   },
// });

// const upload = multer({ storage });

// // Логін
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   console.log('Login attempt:', email); // Логування отриманого email

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       console.log('User not found'); // Логування, якщо користувач не знайдений
//       return res.status(400).json({ message: 'User not found' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       console.log('Invalid credentials'); // Логування, якщо пароль не збігається
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     console.log('Token generated:', token); // Логування згенерованого токена

//     return res.json({ token });
//   } catch (err) {
//     console.error('Error during login:', err);
//     return res.status(500).json({ message: 'Server error' });
//   }
// });


// // Реєстрація користувача
// router.post('/register', upload.single('avatar'), async (req, res) => {
//   console.log('Request body:', req.body);
//   console.log('Uploaded file:', req.file);

//   const { name, email, password } = req.body;

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 12);
//     const user = new User({
//       name,
//       email,
//       password: hashedPassword,
//       avatar: req.file ? `/uploads/${req.file.filename}` : undefined,
//     });

//     await user.save();
//     console.log('User saved:', user);

//     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     res.status(201).json({ token, user });
//   } catch (error) {
//     console.error('Error during registration:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// export default router;
