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
  await page.goto('https://www.qa-practice.com/elements/select/single_select');
  const dropdown = page.getByLabel('Choose Language');
  await dropdown.waitFor({timeout: 60000});
  await dropdown.selectOption({label: 'Ruby'});
  await expect(dropdown).toHaveValue('2');

  const submitButton = page.getByRole('button', { name: 'Submit'});
  await submitButton.click();
  await expect(page.getByText('You selected Ruby')).toBeVisible();
  
  await page.pause();
  // Cleanup
  await context.close();
  await browser.close();
});