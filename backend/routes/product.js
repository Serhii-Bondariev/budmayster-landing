// product.js
import express from 'express';
import Product from '../models/Product.js';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Додавання нового товару
router.post("/add", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1]; // Отримуємо токен з заголовку

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Перевірка токена
        const user = await User.findById(decoded.id); // Отримуємо користувача

        if (!user || !user.isAdmin) {
            return res.status(403).json({ message: "Unauthorized" }); // Якщо користувач не адміністратор
        }

        const { name, description, price } = req.body; // Дані товару
        const existingProduct = await Product.findOne({ name });
        if (existingProduct) {
            return res.status(400).json({ message: 'Product with this name already exists' });
        }

        const newProduct = new Product({ name, description, price });
        await newProduct.save();

        res.status(201).json({ message: "Product added successfully", newProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Оновлення продукту
router.put("/edit/:id", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
      return res.status(401).json({ message: "No token provided" });
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);

      if (!user || !user.isAdmin) {
          return res.status(403).json({ message: "Unauthorized" });
      }

      const product = await Product.findById(req.params.id);
      if (!product) {
          return res.status(404).json({ message: "Product not found" });
      }

      const { name, description, price } = req.body;
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;

      await product.save();
      res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
  }
});

router .delete("/delete/:id", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
      return res.status(401).json({ message: "No token provided" });
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);

      if (!user || !user.isAdmin) {
          return res.status(403).json({ message: "Unauthorized" });
      }

      const product = await Product.findById(req.params.id);
      if (!product) {
          return res.status(404).json({ message: "Product not found" });
      }

      await product.remove();
      res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
  }
});

router .get("/all", async (req, res) => {
  try {
      const products = await Product.find();
      res.status(200).json({ products });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
  }
});

export default router;
