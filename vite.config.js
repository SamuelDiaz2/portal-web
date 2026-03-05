import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/portal-web/' // Asegúrate de que esta ruta coincida con tu configuración de GitHub Pages
});
