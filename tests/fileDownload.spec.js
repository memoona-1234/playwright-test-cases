import { test, expect, chromium } from '@playwright/test';

// Add this line to skip the test specifically for WebKit
test.skip(({ browserName }) => browserName === 'webkit', 'This feature is not critical or is unstable on WebKit');

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
  await page.goto('https://demo.automationtesting.in/FileDownload.html');
  const downloadFile = page.getByRole('link', { name: 'Download', exact: true }).click();
  const downloadPromise = page.waitForEvent('download');
  const dowonload = await downloadPromise;

  await page.pause();
  // Cleanup
  await context.close();
  await browser.close();
});