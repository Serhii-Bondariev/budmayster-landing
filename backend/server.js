import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import chalk from "chalk";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Підключення до бази даних
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(chalk.bgYellowBright("Connected to MongoDB"))) // Зелене повідомлення при успішному підключенні
  .catch((err) => console.error(chalk.red("Error connecting to MongoDB:", err))); // Червоне повідомлення при помилці

// Підключення маршрутів
import authRoutes from "./routes/auth.js"; // Заміна require на import
import productRoutes from "./routes/product.js"; // Заміна require на import
app.use("/api/auth", authRoutes); // Маршрути авторизації
app.use("/api/products", productRoutes); // Маршрути продуктів

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(chalk.bgBlue(`Server running on port ${PORT}`))); // Синє повідомлення про запуск сервера
