import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Permite acceso externo
    port: 3006, // Define el puerto 3000
    strictPort: true, // Asegura que se use este puerto sin cambios
    cors: true, // Habilita CORS para permitir conexiones externas
    hmr: {
      clientPort: 443, // Necesario para conexiones HTTPS en Replit
    },
    allowedHosts: [
      "6dea2c8c-fa8f-4d41-8714-6db7880772d7-00-73xfsod681a1.picard.replit.dev", // URL de tu proyecto en Replit
      ".replit.dev", // Permitir todas las subdominios de Replit
    ],
  },
});
