import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ['react', 'react-dom', '@tanstack/react-query'],
  },
  optimizeDeps: {
    disabled: true,
  },
  build: {
    sourcemap: false,      
    minify: 'esbuild',      
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      maxParallelFileOps: 2, 
    }
  },
})
