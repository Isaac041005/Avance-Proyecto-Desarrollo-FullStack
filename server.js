require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error de conexión:", err));

// Rutas
app.use("/api/users", require("./users"));
app.use("/api/transactions", require("./transaction"));

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("API funcionando correctamente 🚀");
});

app.listen(PORT, () => console.log(`🔥 Servidor corriendo en http://localhost:${PORT}`));
