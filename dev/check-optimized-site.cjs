const { chromium } = require('C:/Users/Summer/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const path = require('path');

const baseUrl = process.env.SITE_BASE_URL || 'http://127.0.0.1:8787';
const pages = ['/', '/uniform', '/seasons/powerplay', '/seasons/centerstage', '/seasons/into-the-deep', '/seasons/decode'];
const allowedPlatformOrigins = new Set(['https://static.cloudflareinsights.com']);

(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'msedge', args: ['--no-proxy-server'] });
  const results = [];

  for (const width of [1440, 390, 320]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.route('https://static.cloudflareinsights.com/**', route => route.fulfill({
      status: 200,
      contentType: 'application/javascript',
      body: ''
    }));
    const failures = [];
    const externalRequests = [];
    page.on('requestfailed', request => failures.push(`${request.url()} — ${request.failure()?.errorText}`));
    page.on('request', request => {
      const url = new URL(request.url());
      if (!request.url().startsWith(baseUrl) && !allowedPlatformOrigins.has(url.origin)) externalRequests.push(request.url());
    });

    for (const pathname of pages) {
      const response = await page.goto(baseUrl + pathname, { waitUntil: 'domcontentloaded' });
      if (!response?.ok()) throw new Error(`${pathname}: HTTP ${response?.status()}`);
      await page.locator('img').evaluateAll(images => images.forEach(image => { image.loading = 'eager'; }));
      await page.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all(Array.from(document.images, image => image.complete ? image.decode().catch(() => {}) : new Promise(resolve => image.addEventListener('load', resolve, { once: true }))));
      });
      const broken = await page.locator('img').evaluateAll(images => images.filter(image => !image.complete || image.naturalWidth === 0).map(image => image.src));
      if (broken.length) throw new Error(`${pathname}: broken images: ${broken.join(', ')}`);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
      if (overflow) throw new Error(`${pathname}: horizontal overflow at ${width}px`);
      if (width <= 640) {
        const navLayout = await page.evaluate(() => {
          const items = Array.from(document.querySelectorAll('.nav-dock .nav-item'));
          const contact = document.querySelector('.header-contact');
          const centers = items.map(item => {
            const rect = item.getBoundingClientRect();
            return rect.top + rect.height / 2;
          });
          const contactRect = contact.getBoundingClientRect();
          const contactCenter = contactRect.top + contactRect.height / 2;
          const lastItemRect = items.at(-1).getBoundingClientRect();
          return {
            maxCenterDelta: Math.max(...centers.map(center => Math.abs(center - contactCenter))),
            gap: contactRect.left - lastItemRect.right
          };
        });
        if (navLayout.maxCenterDelta > 1) throw new Error(`${pathname}: mobile navigation is vertically misaligned by ${navLayout.maxCenterDelta}px`);
        if (navLayout.gap < 4) throw new Error(`${pathname}: mobile navigation overlaps Contact Us by ${Math.abs(navLayout.gap)}px`);
      }
      await page.locator('[data-open-contact]').first().click();
      if (!await page.locator('#contact-dialog').isVisible()) throw new Error(`${pathname}: contact dialog did not open`);
      await page.keyboard.press('Escape');
    }

    if (failures.length) throw new Error(failures.join('\n'));
    if (externalRequests.length) throw new Error(`External runtime requests remain: ${[...new Set(externalRequests)].join(', ')}`);
    results.push(`${width}px: ${pages.length} pages passed`);
    await page.close();
  }

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.route('https://static.cloudflareinsights.com/**', route => route.fulfill({
    status: 200,
    contentType: 'application/javascript',
    body: ''
  }));
  await page.goto(baseUrl, { waitUntil: 'load' });
  await page.waitForTimeout(500);
  const metrics = await page.evaluate(() => {
    const resources = performance.getEntriesByType('resource');
    return {
      resources: resources.length,
      encodedBytes: resources.reduce((sum, entry) => sum + entry.encodedBodySize, 0),
      external: resources.filter(entry => {
        const origin = new URL(entry.name).origin;
        return origin !== location.origin && origin !== 'https://static.cloudflareinsights.com';
      }).map(entry => entry.name)
    };
  });
  const replayTarget = page.locator('.season-card').first();
  await replayTarget.scrollIntoViewIfNeeded();
  await page.waitForTimeout(80);
  if (!await replayTarget.evaluate(element => element.classList.contains('is-visible'))) {
    throw new Error('Scroll reveal did not play on first entry');
  }
  await page.waitForTimeout(1100);
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(120);
  await replayTarget.scrollIntoViewIfNeeded();
  await page.waitForTimeout(80);
  if (!await replayTarget.evaluate(element => element.classList.contains('is-visible'))) {
    throw new Error('Scroll reveal did not replay after re-entry');
  }
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight * 0.65) {
      scrollTo({ top: y, behavior: 'instant' });
      await new Promise(resolve => setTimeout(resolve, 90));
    }
    scrollTo({ top: 0, behavior: 'instant' });
    await new Promise(resolve => setTimeout(resolve, 1200));
  });
  await page.screenshot({ path: path.resolve(__dirname, 'home-optimized-check.png'), fullPage: true });
  await browser.close();
  console.log(`${results.join('; ')}; ${metrics.resources} initial resources, ${(metrics.encodedBytes / 1048576).toFixed(2)} MB, ${metrics.external.length} external.`);
})().catch(error => {
  console.error(error);
  process.exit(1);
});
