// Builds assets/a-tavola/downloads/a-tavola-strategy-guide.pdf from guide.html.
// Run from the repository root: node tools/strategy-guide/build.cjs
const { chromium } = require('playwright');
const { pathToFileURL } = require('node:url');
const path = require('node:path');

(async () => {
  const out = path.resolve(__dirname, '../../assets/a-tavola/downloads/a-tavola-strategy-guide.pdf');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(pathToFileURL(path.join(__dirname, 'guide.html')).href);
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: out, format: 'A4', printBackground: true, preferCSSPageSize: true });
  await browser.close();
  console.log('wrote', out);
})();
