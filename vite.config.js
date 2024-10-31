// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  base: '/raintonic-meteo/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
