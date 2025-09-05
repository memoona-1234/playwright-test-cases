import { test, expect } from '@playwright/test';

test('iframes testing', async ({page}) => {
  

  // Open a page in this context
  //const page = await context.newPage();
  await page.goto('https://practice-automation.com/iframes');
  //await page.pause();
 
  const frameLocator = await page.locator('iframe[name="top-iframe"]');
  await frameLocator.waitFor({timeout: 60000});
  const frameElement = await frameLocator.contentFrame().getByRole('link', { name: 'Docs' });
  await frameElement.click();
  await frameElement.waitFor({timeout: 60000});


  await page.pause();

  // Cleanup
//   await context.close();
//   await browser.close();
});