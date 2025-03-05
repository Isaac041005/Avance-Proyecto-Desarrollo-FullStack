const express = require("express");
const Transaction = require("../models/Transaction");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// 🔹 Crear transacción (Requiere autenticación)
router.post("/transactions", authMiddleware, async (req, res) => {
    try {
        const { amount, type, category } = req.body;

        if (!amount || !type || !category) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        const transaction = new Transaction({
            userId: req.user.id, // 📌 Se asegura de usar "userId" en lugar de "user"
            amount,
            type,
            category
        });

        await transaction.save();
        res.status(201).json(transaction);
    } catch (error) {
        console.error("❌ Error al crear la transacción:", error);
        res.status(500).json({ message: "Error al crear la transacción" });
    }
});

// 🔹 Obtener todas las transacciones del usuario autenticado
router.get("/transactions", authMiddleware, async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query; // 📌 Parámetros de paginación

        const transactions = await Transaction.find({ userId: req.user.id })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await Transaction.countDocuments({ userId: req.user.id });

        res.json({
            transactions,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (error) {
        console.error("❌ Error al obtener transacciones:", error);
        res.status(500).json({ message: "Error al obtener las transacciones" });
    }
});

module.exports = router;


