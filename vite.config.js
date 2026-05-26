import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('scheduler')) {
              return 'vendor-react'
            }
            if (id.includes('react-router') || id.includes('remix')) {
              return 'vendor-router'
            }
            if (id.includes('react-helmet-async')) {
              return 'vendor-helmet'
            }
            if (id.includes('lenis')) {
              return 'vendor-lenis'
            }
          }
        }
      }
    }
  }
})
