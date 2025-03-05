const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // 📌 Asegúrate de que el modelo está bien importado
const router = express.Router();

// 📌 REGISTRO DE USUARIO
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "El correo ya está registrado" });

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ username, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: "Usuario registrado correctamente" });
    } catch (error) {
        console.error("❌ Error en el registro:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
});

// 📌 INICIO DE SESIÓN
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Usuario no encontrado" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, user: { id: user._id, username: user.username } });
    } catch (error) {
        console.error("❌ Error en el inicio de sesión:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
});

module.exports = router;
