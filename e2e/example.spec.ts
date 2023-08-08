import { test, expect } from '@playwright/test';

test('if search are on the document', async ({ page }) => {

  await page.goto("https://www.welcometothejungle.com/en");
  await page.mainFrame().waitForSelector("header");
  expect(page).toHaveTitle(/toto/i)

});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
});
