require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const financeRoutes = require('./routes/financeRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Conexión a la base de datos
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Base de datos conectada'))
  .catch(err => console.error('Error conectando a la base de datos:', err));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/finance', financeRoutes);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Error interno del servidor' });
});

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
