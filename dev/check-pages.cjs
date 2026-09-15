const { chromium } = require('C:/Users/Summer/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const pages = [
  'index.html',
  'uniform.html',
  'seasons/powerplay.html',
  'seasons/centerstage.html',
  'seasons/into-the-deep.html',
  'seasons/decode.html'
];

for (const pageName of pages) {
  const html = fs.readFileSync(path.join(root, pageName), 'utf8');
  for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    const ref = match[1];
    if (/^(?:https?:|mailto:|#)/.test(ref)) continue;
    const localPath = ref.split('#')[0];
    if (!localPath) continue;
    const resolved = path.resolve(path.dirname(path.join(root, pageName)), localPath);
    if (!fs.existsSync(resolved)) throw new Error(`${pageName}: missing ${ref}`);
  }
}

(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  for (const width of [1440, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.route(/^https?:\/\//, route => route.abort());
    await page.addInitScript(() => {
      window.ScrollTrigger = { refresh() {} };
      window.gsap = {
        registerPlugin() {},
        utils: { toArray: selector => Array.from(document.querySelectorAll(selector)) },
        fromTo(_targets, _from, options) {
          options.scrollTrigger?.trigger?.setAttribute('data-reveal-test', 'bound');
        },
        to(state, options) { options.onComplete?.(); return { kill() {} }; }
      };
    });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const pageName of pages) {
      await page.goto(`file:///${root.replaceAll('\\', '/').replaceAll(' ', '%20')}/${pageName}`);
      await page.waitForTimeout(900);
      await page.locator('img').evaluateAll(images => images.forEach(image => { image.loading = 'eager'; }));
      await page.waitForTimeout(500);
      const brokenImages = await page.locator('img').evaluateAll(images => images.filter(image => !image.complete || image.naturalWidth === 0).map(image => image.src));
      if (brokenImages.length) throw new Error(`${pageName}: broken images ${brokenImages.join(', ')}`);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
      if (overflow) throw new Error(`${pageName}: horizontal overflow at ${width}px`);
      await page.evaluate(() => window.scrollTo(0, Math.min(1200, document.documentElement.scrollHeight - innerHeight)));
      await page.waitForTimeout(100);
      const headerTop = await page.locator('.site-header').evaluate(header => header.getBoundingClientRect().top);
      if (Math.abs(headerTop) > 1) throw new Error(`${pageName}: navigation is not fixed at ${width}px`);
      if (pageName.startsWith('seasons/')) {
        const missingReveal = await page.locator('.archive-section > *:not([data-reveal-test="bound"])').count();
        if (missingReveal) throw new Error(`${pageName}: ${missingReveal} archive blocks are missing scroll reveal`);
      }
      await page.locator('[data-open-contact]').first().click();
      if (!await page.locator('#contact-dialog').isVisible()) throw new Error(`${pageName}: contact dialog did not open`);
      await page.keyboard.press('Escape');
      if (pageName === 'index.html') {
        await page.locator('[data-open-contact]').last().click();
        if (!await page.locator('#contact-dialog').isVisible()) throw new Error('index.html: sponsor contact did not open the shared dialog');
        await page.keyboard.press('Escape');
      }
    }
    if (errors.length) throw new Error(errors.join('\n'));
    await page.close();
  }

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.route(/^https?:\/\//, route => route.abort());
  await page.addInitScript(() => {
    window.ScrollTrigger = { refresh() {} };
    window.gsap = { registerPlugin() {}, utils: { toArray: () => [] }, fromTo() {}, to() { return { kill() {} }; } };
  });
  await page.goto(`file:///${root.replaceAll('\\', '/').replaceAll(' ', '%20')}/index.html#team-intro`);
  await page.locator('#team-intro').screenshot({ path: path.join(root, 'dev', 'team-intro-check.png') });
  await page.locator('#sponsors').screenshot({ path: path.join(root, 'dev', 'sponsors-contact-check.png') });
  await page.goto(`file:///${root.replaceAll('\\', '/').replaceAll(' ', '%20')}/uniform.html`);
  await page.locator('img').evaluateAll(images => images.forEach(image => { image.loading = 'eager'; }));
  await page.waitForTimeout(700);
  await page.locator('.uniform-page-main').screenshot({ path: path.join(root, 'dev', 'uniform-desktop-check.png') });
  await page.setViewportSize({ width: 390, height: 900 });
  await page.locator('.uniform-page-main').screenshot({ path: path.join(root, 'dev', 'uniform-mobile-check.png') });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`file:///${root.replaceAll('\\', '/').replaceAll(' ', '%20')}/index.html#timeline`);
  await page.locator('a[href="seasons/into-the-deep.html"]').first().click();
  await page.waitForURL(/into-the-deep\.html$/);
  await page.screenshot({ path: path.join(root, 'dev', 'season-page-check.png'), fullPage: false });
  await page.locator('a[href="../index.html#timeline"]').first().click();
  await page.waitForURL(/index\.html#timeline$/);
  await page.goto(`file:///${root.replaceAll('\\', '/').replaceAll(' ', '%20')}/seasons/decode.html`);
  await page.locator('#decode-robot').screenshot({ path: path.join(root, 'dev', 'decode-robot-check.png') });
  await page.locator('#decode-records').screenshot({ path: path.join(root, 'dev', 'decode-records-check.png') });
  await page.goto(`file:///${root.replaceAll('\\', '/').replaceAll(' ', '%20')}/seasons/into-the-deep.html`);
  await page.locator('#intothedeep-robot').screenshot({ path: path.join(root, 'dev', 'into-the-deep-robot-check.png') });
  await page.locator('#intothedeep-people').screenshot({ path: path.join(root, 'dev', 'into-the-deep-people-check.png') });
  await page.goto(`file:///${root.replaceAll('\\', '/').replaceAll(' ', '%20')}/seasons/centerstage.html`);
  await page.locator('#centerstage-moments').screenshot({ path: path.join(root, 'dev', 'centerstage-photo-check.png') });
  await page.goto(`file:///${root.replaceAll('\\', '/').replaceAll(' ', '%20')}/seasons/powerplay.html`);
  await page.locator('#powerplay-moments').screenshot({ path: path.join(root, 'dev', 'powerplay-photo-check.png') });
  console.log('Six pages passed local-link, image, desktop, mobile, contact and navigation checks.');
  await browser.close();
})().catch(error => {
  console.error(error);
  process.exit(1);
});
