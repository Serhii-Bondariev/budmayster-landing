// server.js
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import chalk from "chalk";
import path from 'path';
import helmet from "helmet";
import morgan from "morgan";
import multer from 'multer';
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/product.js";

dotenv.config();

const app = express();
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(cors({ origin: "http://localhost:3000", methods: ["GET", "POST", "PUT", "DELETE"] }));

// Налаштування для multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Генерація унікального імені для файлів
  },
});

const upload = multer({ storage });

// Статична папка для завантажень
const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Підключення до бази даних
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(chalk.bgYellowBright("Connected to MongoDB")))
  .catch((err) => {
    console.error(chalk.red("Error connecting to MongoDB:", err));
    process.exit(1); // Завершуємо сервер при помилці
  });

// Підключення маршрутів
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Обробка неіснуючих маршрутів
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Централізована обробка помилок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(chalk.bgBlue(`Server running on port ${PORT}`)));
