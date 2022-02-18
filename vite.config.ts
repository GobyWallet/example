import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: /^~/, replacement: '' }],
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  server: {
    proxy: {
      "/v1": {
        target: 'https://api.goby.app/',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
