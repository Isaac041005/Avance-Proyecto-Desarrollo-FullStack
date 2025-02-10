require("dotenv").config(); // Cargar variables de entorno
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// 🔍 Verificar si las variables de entorno se están cargando
console.log("🔍 Verificando variables de entorno...");
console.log("DB_URL:", process.env.DB_URL ? "✅ Definida" : "❌ No definida");

// Conectar a MongoDB
if (!process.env.DB_URL) {
  console.error("❌ ERROR: La variable DB_URL no está definida.");
  process.exit(1); // Detener la aplicación si no hay URL de conexión
}

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Base de datos conectada correctamente"))
  .catch((err) => {
    console.error("❌ Error conectando a MongoDB:", err);
    process.exit(1); // Forzar la detención de la app si falla la conexión
  });

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas de API
app.use("/api/users", require("./users"));
app.use("/api/transactions", require("./transaction"));

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("🚀 API funcionando correctamente");
});

// Iniciar el servidor
app.listen(PORT, () => console.log(`🔥 Servidor corriendo en http://localhost:${PORT}`));


// Iniciar el servidor
app.listen(PORT, () => console.log(`🔥 Servidor corriendo en http://localhost:${PORT}`));
