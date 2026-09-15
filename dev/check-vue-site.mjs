import { createRequire } from 'node:module'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { preview } from 'vite'

const require = createRequire(import.meta.url)
const { chromium } = require('C:/Users/Summer/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')
const root = resolve(import.meta.dirname, '..')

const routes = [
  ['/', '22389 | AE86 Elite Robotics'],
  ['/uniform', 'Team Uniform | AE86 FTC 22389'],
  ['/seasons/powerplay', 'POWERPLAY 2022–2023 | AE86 FTC 22389'],
  ['/seasons/centerstage', 'CENTERSTAGE 2023–2024 | AE86 FTC 22389'],
  ['/seasons/into-the-deep', 'INTO THE DEEP 2024–2025 | AE86 FTC 22389'],
  ['/seasons/decode', 'DECODE 2025–2026 | AE86 FTC 22389'],
]

for (const [routePath, title] of routes) {
  const outputPath = routePath === '/'
    ? resolve(root, 'dist/index.html')
    : resolve(root, `dist${routePath}.html`)
  const html = readFileSync(outputPath, 'utf8')
  if (!html.includes(`<title>${title}</title>`)) throw new Error(`${routePath}: static HTML title is missing`)
  if (!html.includes('data-server-rendered="true"')) throw new Error(`${routePath}: page was not statically rendered`)
  if (!html.includes(`rel="canonical" href="https://www.22389-ae86.com${routePath}"`)) throw new Error(`${routePath}: canonical URL is missing`)
}

const server = await preview({ root, preview: { host: '127.0.0.1', port: 4173, strictPort: false }, logLevel: 'warn' })
const address = server.httpServer.address()
const baseUrl = `http://127.0.0.1:${address.port}`
const browser = await chromium.launch({ headless: true, channel: 'msedge' })

try {
  for (const width of [1440, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } })
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('response', response => {
      if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`)
    })

    for (const [path, title] of routes) {
      await page.goto(`${baseUrl}${path}`, { waitUntil: 'networkidle' })
      await page.locator('img').evaluateAll(images => images.forEach(image => { image.loading = 'eager' }))
      await page.waitForFunction(() => Array.from(document.images).every(image => image.complete))

      if (await page.title() !== title) throw new Error(`${path}: incorrect page title`)

      const brokenImages = await page.locator('img').evaluateAll(images => images
        .filter(image => image.naturalWidth === 0)
        .map(image => image.currentSrc || image.src))
      if (brokenImages.length) throw new Error(`${path}: broken images ${brokenImages.join(', ')}`)

      const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)
      if (hasOverflow) throw new Error(`${path}: horizontal overflow at ${width}px`)

      await page.evaluate(() => window.scrollTo(0, Math.min(1200, document.documentElement.scrollHeight - window.innerHeight)))
      const headerTop = await page.locator('.site-header').evaluate(header => header.getBoundingClientRect().top)
      if (Math.abs(headerTop) > 1) throw new Error(`${path}: navigation is not fixed at ${width}px`)

      await page.getByRole('button', { name: 'Open contact details' }).click()
      if (!await page.locator('#contact-dialog').isVisible()) throw new Error(`${path}: contact dialog did not open`)
      await page.keyboard.press('Escape')

      if (path === '/') {
        await page.locator('.sponsor-contact-card button').click()
        if (!await page.locator('#contact-dialog').isVisible()) throw new Error('Homepage partnership contact did not open')
        await page.keyboard.press('Escape')
      }
    }

    if (errors.length) throw new Error(errors.join('\n'))
    await page.close()
  }

  const navigationPage = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await navigationPage.goto(baseUrl, { waitUntil: 'networkidle' })
  await navigationPage.screenshot({ path: resolve(root, 'dev/vue-home-desktop.png'), fullPage: false })
  await navigationPage.locator('a[href="/uniform"]').click()
  await navigationPage.waitForURL(`${baseUrl}/uniform`)
  await navigationPage.locator('a[href="/#timeline"]').first().click()
  await navigationPage.waitForURL(`${baseUrl}/#timeline`)
  await navigationPage.locator('a[href="/seasons/decode"]').click()
  await navigationPage.waitForURL(`${baseUrl}/seasons/decode`)
  await navigationPage.locator('.archive-title').waitFor()
  await navigationPage.waitForFunction(() => window.scrollY < 5)
  await navigationPage.locator('.cad-frame img').evaluateAll(images => images.forEach(image => { image.loading = 'eager' }))
  await navigationPage.waitForFunction(() => Array.from(document.querySelectorAll('.cad-frame img')).every(image => image.complete && image.naturalWidth > 0))
  await navigationPage.locator('#decode-robot').scrollIntoViewIfNeeded()
  await navigationPage.screenshot({ path: resolve(root, 'dev/vue-decode-desktop.png'), fullPage: false })
  await navigationPage.setViewportSize({ width: 390, height: 900 })
  await navigationPage.goto(baseUrl, { waitUntil: 'networkidle' })
  await navigationPage.screenshot({ path: resolve(root, 'dev/vue-home-mobile.png'), fullPage: false })
  await navigationPage.close()

  console.log('All six Vue routes passed desktop, mobile, image, metadata, contact and navigation checks.')
} finally {
  await browser.close()
  await new Promise((resolveClose, reject) => server.httpServer.close(error => error ? reject(error) : resolveClose()))
}
