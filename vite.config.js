import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'imun_emoji.png', 'pepper_emoji.png'],
      manifest: {
        name: 'ImUn & Pepper Game',
        short_name: 'ImUn&Pepper',
        description: 'ศูนย์รวมเกมฝึกภาษาไทยสนุกๆ สำหรับเด็ก',
        theme_color: '#4a90e2',
        background_color: '#b3e0ff',
        display: 'standalone',
        icons: [
          {
            src: 'imun_emoji.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pepper_emoji.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  server: {
    host: true,
    port: 5173,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
