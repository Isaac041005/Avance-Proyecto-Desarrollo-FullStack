const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.header("x-auth-token"); // 📌 Asegúrate de que el header sea el correcto

    if (!token) {
        return res.status(401).json({ message: "Acceso denegado, token no proporcionado" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // 📌 Verificar el token
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Token inválido" });
    }
};
