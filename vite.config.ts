import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [],
  server: { host: '0.0.0.0', port: 8222 },
  clearScreen: false,
  base: '/ori-game-phaser3/',
})
