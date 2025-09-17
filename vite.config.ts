import { fileURLToPath } from 'node:url'
import { URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

function mdRaw() {
  return {
    name: 'markdown-raw',
    transform(code: string, id: string) {
      if(/\.md$/.test(id)) {
        const json = JSON.stringify(code)
        .replace(/\u2028/g, '\\u2028')
        .replace(/\u2029/g, '\\u2029');
        return {
          code: `export default ${json}`
        }
      }
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/cv-2/',
  plugins: [vue(), vueJsx(), mdRaw()],
  resolve: {
    alias: {
      '@': './src'
    }
  }
})
