import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Realizamos la solicitud POST al backend para la autenticación
            const response = await axios.post(
                "http://localhost:3000/api/auth/login",
                { email, password },
            );

            // Guardamos el token JWT que el backend envía al frontend
            const { token } = response.data;
            localStorage.setItem("authToken", token); // Almacenamos el token en el localStorage

            // Redirigimos al usuario a la página de dashboard
            navigate("/dashboard");
        } catch (err) {
            // Si ocurre un error, mostramos un mensaje en pantalla
            setError("Credenciales incorrectas");
        }
    };

    return (
        <div>
            <h2>Página de Inicio de Sesión</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Correo electrónico"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                />
                <button type="submit">Iniciar sesión</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}

export default LoginPage;
