import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ['react', 'react-dom', '@tanstack/react-query'],
  },
  build: {
    sourcemap: false,            // Blocks memory leaks during the Render build
    chunkSizeWarningLimit: 1000, // Minimizes internal logging overhead
    rollupOptions: {
      maxParallelFileOps: 3,     // Restricts parallel tasks to stay under 8GB RAM
    }
  }
})
