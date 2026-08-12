import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      moment: 'moment/moment.js',
    },
  },
  optimizeDeps: {
    include: ['moment', 'jquery', 'bootstrap-daterangepicker'],
  },
});