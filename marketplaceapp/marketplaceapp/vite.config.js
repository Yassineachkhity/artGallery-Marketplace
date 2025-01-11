// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react({
    babel: {
      plugins: ['babel-plugin-glsl'],
    },
    server: {
      proxy: {
          '/api': {
              target: 'http://localhost:8000',
              changeOrigin: true,
              secure: false,
          },
      },
  },

  })],
});



