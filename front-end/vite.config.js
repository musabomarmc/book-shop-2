
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { Target } from 'lucide-react'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    Proxy: {
      "api": {
        Target: "http://localhost:4000",
        secure: false
      }
    }
  }
})
