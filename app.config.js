import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    server: {
    allowedHosts: true
  },
  server: {
    preset: "netlify",
    compatibilityDate: "2024-05-07"
  }
  }
  
});
