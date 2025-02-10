require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes"); 
const financeRoutes = require("./routes/financeRoutes"); 

const app = express();
const PORT = process.env.PORT || 3000;

// 📌 Middlewares
app.use(cors());
app.use(express.json()); // 📌 IMPORTANTE: Esto permite recibir JSON en las peticiones

// 📌 Middleware para depurar datos recibidos
app.use((req, res, next) => {
    console.log("📥 Petición recibida:", req.method, req.path);
    console.log("📦 Datos enviados:", req.body);
    next();
});

// 📌 Conexión a MongoDB
console.log("🔍 Conectando a MongoDB con la URL:", process.env.DB_URL);
mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Base de datos conectada correctamente"))
  .catch((err) => {
    console.error("❌ Error conectando a MongoDB:", err);
    process.exit(1);
  });

// 📌 Rutas de API
app.use("/api/auth", authRoutes);
app.use("/api/finance", financeRoutes);

// 📌 Ruta de prueba
app.get("/", (req, res) => {
  res.send("🚀 API funcionando correctamente");
});

// 📌 Manejo de errores global
app.use((err, req, res, next) => {
  console.error("❌ Error del servidor:", err.stack);
  res.status(500).json({ message: "Error interno del servidor" });
});

app.listen(PORT, () => console.log(`🔥 Servidor corriendo en el puerto ${PORT}`));
