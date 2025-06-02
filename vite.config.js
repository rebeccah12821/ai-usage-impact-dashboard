import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    allowedHosts: [
      "b533d72f-c6e2-480f-b4dd-702aa59ac96c-00-os2lfa4parl7.riker.replit.dev"
    ]
  }
})
