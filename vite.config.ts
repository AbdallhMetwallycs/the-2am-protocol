import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages serves this site from a project sub-path, so built asset URLs
// are relative. The dev and preview servers stay at the document root.
export default defineConfig(({ command }) => ({
  base: command === "serve" ? "/" : "./",
  plugins: [react()],
  resolve: { alias: { "@": fileURLToPath(new URL(".", import.meta.url)) } },
  server: { host: "127.0.0.1" },
  preview: { host: "127.0.0.1" },
  build: { outDir: "dist", target: "es2022" },
}));
