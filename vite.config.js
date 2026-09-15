import { cpSync, copyFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const root = import.meta.dirname
const output = resolve(root, 'dist')

function copyStaticSiteAssets() {
  return {
    name: 'copy-static-site-assets',
    closeBundle() {
      mkdirSync(resolve(output, 'assets'), { recursive: true })

      for (const directory of ['images', 'sponsors']) {
        cpSync(resolve(root, 'assets', directory), resolve(output, 'assets', directory), {
          recursive: true,
          filter: source => !/\.jpe?g$/i.test(source),
        })
      }

      for (const file of ['_headers', 'robots.txt', 'sitemap.xml']) {
        copyFileSync(resolve(root, file), resolve(output, file))
      }
    },
  }
}

export default defineConfig({
  plugins: [vue(), copyStaticSiteAssets()],
  publicDir: false,
  ssgOptions: {
    includedRoutes: () => [
      '/',
      '/uniform',
      '/seasons/powerplay',
      '/seasons/centerstage',
      '/seasons/into-the-deep',
      '/seasons/decode',
    ],
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
