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
            userId: req.user.id, // 🔹 Corregido: Ahora coincide con el modelo
            amount,
            type,
            category,
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
        const transactions = await Transaction.find({ userId: req.user.id }); // 🔹 Corregido
        res.json(transactions);
    } catch (error) {
        console.error("❌ Error al obtener transacciones:", error);
        res.status(500).json({ message: "Error al obtener las transacciones" });
    }
});

// 🔹 Eliminar una transacción (Protegido con JWT)
router.delete("/transactions/:id", authMiddleware, async (req, res) => {
    try {
        await Transaction.findByIdAndDelete(req.params.id);
        res.json({ message: "Transacción eliminada" });
    } catch (error) {
        console.error("❌ Error al eliminar la transacción:", error);
        res.status(500).json({ message: "Error al eliminar la transacción" });
    }
});

module.exports = router;

