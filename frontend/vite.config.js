import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // this is necessary to avoid compile errors
    VITE_BACKEND_URL: JSON.stringify(`${process.env.VITE_BACKEND_URL}`),
  },
  server: {
    host: true,
    port: 5173,
  },
  preview: {
    host: true,
    port: 5173,
  },
});
