# Proyecto Full Stack - Backend 🚀

Este es el backend de la aplicación financiera desarrollado con **Node.js, Express y MongoDB**.

## 📌 Endpoints

### Usuarios (`/api/users`)
- `POST /register` → Registro de usuario
- `POST /login` → Autenticación y generación de JWT

### Transacciones (`/api/transactions`)
- `GET /` → Obtener todas las transacciones
- `POST /` → Crear una transacción nueva

## 🚀 Cómo Ejecutar
1. Instalar dependencias: `npm install`
2. Crear un archivo `.env` con la variable `MONGO_URI`
3. Ejecutar el servidor: `npm start`
