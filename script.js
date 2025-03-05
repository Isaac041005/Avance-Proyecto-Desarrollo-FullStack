const API_URL = "https://tu-app-en-render.onrender.com/api";  // Cambia esto con la URL de tu backend en Render

// 🔹 REGISTRAR USUARIO
async function register() {
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;

    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    alert(data.message);
}

// 🔹 INICIAR SESIÓN
async function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "index.html";
    } else {
        alert("Error en el inicio de sesión.");
    }
}

// 🔹 CERRAR SESIÓN
function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}

// 🔹 OBTENER TRANSACCIONES
async function fetchTransactions(page = 1) {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "login.html";
        return;
    }

    const response = await fetch(`${API_URL}/finance/transactions?page=${page}`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
    });

    const data = await response.json();
    const list = document.getElementById("transaction-list");
    list.innerHTML = "";

    data.transactions.forEach(t => {
        const li = document.createElement("li");
        li.textContent = `${t.type === "income" ? "➕" : "➖"} ${t.amount} - ${t.description}`;
        list.appendChild(li);
    });

    // 📌 Manejo de botones de paginación
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    for (let i = 1; i <= data.totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.onclick = () => fetchTransactions(i);
        pagination.appendChild(button);
    }
}

// 🔹 Cargar transacciones al cargar la página
window.onload = () => {
    if (window.location.pathname.includes("index.html")) {
        fetchTransactions();
    }
};

// 🔹 AGREGAR TRANSACCIÓN
async function addTransaction() {
    const amount = document.getElementById("amount").value;
    const type = document.getElementById("type").value;
    const description = document.getElementById("description").value;

    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "login.html";
        return;
    }

    const response = await fetch(`${API_URL}/finance/transactions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ amount, type, description })
    });

    const data = await response.json();
    alert("Transacción agregada");
    fetchTransactions();
}

// 🔹 Cargar transacciones al cargar la página
window.onload = () => {
    if (window.location.pathname.includes("index.html")) {
        fetchTransactions();
    }
};
