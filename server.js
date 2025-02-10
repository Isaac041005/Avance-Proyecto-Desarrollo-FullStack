require("dotenv").config(); // Cargar variables de entorno
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// 📌 Verificar que DB_URL se está cargando correctamente
console.log("🔍 Conectando a MongoDB con la URL:", process.env.DB_URL);

// Conectar a MongoDB
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
