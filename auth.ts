import { chromium } from 'playwright';

(async () => {
  const userDataDir = './tmp';
  const context = await chromium.launchPersistentContext(userDataDir, { headless: false });
  const page = await context.newPage();

  await page.goto(process.env.URL);
  await page.pause();
  await page.close();
})();
