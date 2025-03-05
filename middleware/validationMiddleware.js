module.exports = (req, res, next) => {
    const { amount, type, category } = req.body;

    if (!amount || !type || !category) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    if (typeof amount !== "number" || amount <= 0) {
        return res.status(400).json({ message: "La cantidad debe ser un número positivo" });
    }

    if (!["income", "expense"].includes(type)) {
        return res.status(400).json({ message: "El tipo debe ser 'income' o 'expense'" });
    }

    next();
};
