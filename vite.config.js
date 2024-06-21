import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
 plugins: [react()], 
  optimizeDeps: {
    include: ['jspdf', 'jspdf-autotable'], // Ensure these are included in optimization
  },
})