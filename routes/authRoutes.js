const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");  
const router = express.Router();

// 📌 REGISTRAR USUARIO
router.post("/register", async (req, res) => {
    try {
        console.log("📥 Datos recibidos en el registro:", req.body); // 🔍 Debug

        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        let user = await User.findOne({ username });
        if (user) return res.status(400).json({ message: "El usuario ya existe" });

        user = new User({ username, password });
        await user.save();

        res.status(201).json({ message: "Usuario registrado correctamente" });
    } catch (error) {
        console.error("❌ Error en el registro:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
});

module.exports = router;

