const express = require("express");
const router = express.Router();

let transactions = []; // Simulación de base de datos en memoria

// Obtener todas las transacciones
router.get("/", (req, res) => {
  res.json(transactions);
});

// Crear una nueva transacción
router.post("/", (req, res) => {
  const { amount, type, description } = req.body;
  const newTransaction = { id: transactions.length + 1, amount, type, description };
  transactions.push(newTransaction);
  res.status(201).json(newTransaction);
});

module.exports = router;
