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
  await page.goto('https://demo.automationtesting.in/FileDownload.html');
  
  await page.pause();
  // Cleanup
  await context.close();
  await browser.close();
});