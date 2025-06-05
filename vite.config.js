import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
    // 👇 This fixes refresh issues in dev mode (optional)
    historyApiFallback: true
  },
  // 👇 This base is important for Vercel if your routes are root-based
  base: '/'
})
