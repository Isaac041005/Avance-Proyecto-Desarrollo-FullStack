const request = require("supertest");
const app = require("../server"); // 📌 Asegúrate de que la ruta es correcta
const mongoose = require("mongoose");
const User = require("../models/User");
const Transaction = require("../models/Transaction");

let token;

beforeAll(async () => {
    await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    // Crear un usuario y obtener el token
    await request(app)
        .post("/api/auth/register")
        .send({
            username: "testuser",
            email: "testuser@example.com",
            password: "password123",
            role: "user"
        });

    const res = await request(app)
        .post("/api/auth/login")
        .send({
            email: "testuser@example.com",
            password: "password123"
        });

    token = res.body.token;
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("Finance API", () => {
    it("should create a new transaction", async () => {
        const res = await request(app)
            .post("/api/finance/transactions")
            .set("Authorization", `Bearer ${token}`)
            .send({
                amount: 100,
                type: "income",
                category: "salary"
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("amount", 100);
    });

    it("should get all transactions", async () => {
        const res = await request(app)
            .get("/api/finance/transactions")
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("transactions");
    });
});
