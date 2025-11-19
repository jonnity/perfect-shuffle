import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0", // WSL/devcontainer環境で外部からアクセス可能にする
    port: 5173,
    allowedHosts: ["dev.perfect-shuffle.jonnity.com"],
  },
  // @ts-expect-error - Vite config types don't include test config, but it works at runtime
  test: {
    environment: "jsdom",
    globals: true,
  },
})
