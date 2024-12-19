import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'




export default defineConfig({
  css: {
    preprocessorOptions: {
      css: {
        additionalData: '@import "daisyui/dist/full.css";',
      },
    },
  },
  plugins: [react()],
  server: {
    historyApiFallback: true,
  },

});
