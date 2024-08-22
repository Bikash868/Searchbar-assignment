import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
    "@": path.resolve(__dirname, "./src"),
    "@data": path.resolve(__dirname, "./src/data"),
    "@views": path.resolve(__dirname, "./src/views"),
    "@assets": path.resolve(__dirname, "./src/assets"),
    "@constants": path.resolve(__dirname, "./src/constants"),
  },
},
})
