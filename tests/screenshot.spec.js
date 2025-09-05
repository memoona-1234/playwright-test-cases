import { test, expect, chromium } from '@playwright/test';

test('launch browser with context', async () => {
  // Launch browser
  const browser = await chromium.launch({ headless: true }); // set true for CI

  // Create a new isolated context
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    // storageState: 'storage-state.json', // optionally reuse auth/session
    // userAgent: 'MyCustomAgent/1.0',
  });

  // Open a page in this context
  const page = await context.newPage();
  await page.goto('https://playwright.dev/docs/locators');
//   This will take a screenshot of the full page and save it
//   const fullScreenshot = await page.screenshot({ path: 'screenshot.png' });
//   This will take a screenshot of a specific element and save it
//   const specificElementScreenShot = page.getByRole('heading', { name: 'Locators', exact: true });
//   await specificElementScreenShot.screenshot({path: 'Screenshot-element.png'});

  await page.pause();
  // Cleanup
  await context.close();
  await browser.close();
});