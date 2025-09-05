import { test, expect } from '@playwright/test';

test('api-testing', async ({request}) => {
  // Launch browser
  //const browser = await chromium.launch({ headless: true }); // set true for CI

  // Create a new isolated context
//   const context = await browser.newContext({
//     viewport: { width: 1280, height: 800 },
//     // storageState: 'storage-state.json', // optionally reuse auth/session
//     // userAgent: 'MyCustomAgent/1.0',
//   });

   const response = await request.get('https://reqres.in/api/users?page=2');
   await expect(response).toBeOK();
   await expect(response.status()).toBe(200);

//    const responseBody = await response.json();
//    expect(responseBody.page).toBe(2);
//    expect(body.data.length).toBeGreaterThan(0);
//     expect(body.data[0]).toHaveProperty('id');
//     expect(body.data[0]).toHaveProperty('email');
  
  //await page.pause();
  // Cleanup
  //await context.close();
  //await browser.close();
});