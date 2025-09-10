import { test, expect } from '@playwright/test';

// Import the 'dotenv' library to read our .env file
import dotenv from 'dotenv';

// Load the environment variables from the .env file
dotenv.config();

// Describe a group of tests for the login feature
test.describe('Login Feature', () => {

  // This is our first test case
  test('should allow a user to log in with valid credentials', async ({ page }) => {
    
    // 1. Navigate to the login page using the URL from our .env file
    // process.env lets us access the variables we defined
    await page.goto(process.env.STAGING_URL);
    await page.getByRole('link', { name: 'Sign in with password' }).click();


    // 2. Fill in the username field
    await page.getByRole('textbox', { name: 'Email Address ' }).fill(process.env.STAGING_USERNAME);

    // 3. Fill in the password field
    await page.getByRole('textbox', { name: 'Password Password' }).fill(process.env.STAGING_PASSWORD);

    // 4. Click the login button
    await page.getByRole('button', { name: 'Sign in' }).click();

    await page.waitForTimeout(3000);

    // 5. Verify that the login was successful
    // This is the most important part of a test! We need to check for a successful result.
    // For example, we can check that a "Welcome" message is visible on the next page.
    // (You will need to change the locator below to match your application)
    await expect(page.getByRole('heading', { name: 'Insights' })).toBeVisible();
  });
});