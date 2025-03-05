const request = require("supertest");
const app = require("../server"); // 📌 Asegúrate de que la ruta es correcta
const mongoose = require("mongoose");
const User = require("../models/User");

beforeAll(async () => {
    await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("Auth API", () => {
    it("should register a new user", async () => {
        const res = await request(app)
            .post("/api/auth/register")
            .send({
                username: "testuser",
                email: "testuser@example.com",
                password: "password123",
                role: "user"
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("message", "Usuario registrado correctamente");
    });

    it("should login an existing user", async () => {
        const res = await request(app)
            .post("/api/auth/login")
            .send({
                email: "testuser@example.com",
                password: "password123"
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("token");
    });
});
