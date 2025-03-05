const express = require("express");
const Transaction = require("../models/Transaction");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const validationMiddleware = require("../middleware/validationMiddleware"); // 📌 Importar middleware de validación
const router = express.Router();

// 🔹 Crear transacción (Requiere autenticación, rol de usuario y validación de datos)
router.post("/transactions", authMiddleware, roleMiddleware(["user", "admin"]), validationMiddleware, async (req, res) => {
    try {
        const { amount, type, category } = req.body;

        const transaction = new Transaction({
            userId: req.user.id,
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

// 🔹 Obtener todas las transacciones del usuario autenticado (Requiere autenticación y rol de usuario)
router.get("/transactions", authMiddleware, roleMiddleware(["user", "admin"]), async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

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


