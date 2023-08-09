import { test, expect } from '@playwright/test';

test('if search are on the document', async ({ page }) => {
  await page.goto("https://www.welcometothejungle.com/en");
  await page.mainFrame().waitForSelector("header");
  const jobLink = page.getByRole("link", {
    name: "Find a job",
    exact: true,
  });
  await jobLink.waitFor({ state: "attached" });
  await jobLink.click();
  const jobSearchButton = page.getByTestId("jobs-home-search-field-query");
  await jobSearchButton.waitFor({ state: "visible" });
  await jobSearchButton.focus();
  expect(jobSearchButton).toBeAttached();
  const clearLocationButton = page.getByLabel('Clear all')
  await clearLocationButton.waitFor({ state: "visible" });
  expect(clearLocationButton).toBeAttached();
  await clearLocationButton.click({ delay: 1000 });
  const locationInput = page.getByTestId('jobs-home-search-field-location')
  expect(locationInput).toBeAttached();
  expect(locationInput).toHaveAttribute('value', '')
  await locationInput.press("Enter");
});

test('if filters works', async ({ page }) => {
  await page.goto("https://www.welcometothejungle.com/en/jobs?refinementList%5Boffices.country_code%5D%5B%5D=FR&query=react%20js&page=1")
  const filtersAllButton = page.locator("#jobs-search-filter-all");
  expect(filtersAllButton).toBeVisible();
  await filtersAllButton.click({ delay: 500 });
  const modalFilters = page.locator("#jobs-search-all-modal-contract");
  await modalFilters.waitFor({ state: "visible" });
  expect(modalFilters).toBeVisible();
  const exploreJobs = page.locator("#jobs-search-modal-search-button");
  expect(exploreJobs).toBeVisible();
  const experienceLevel = page.locator("#jobs-search-all-modal-experience");
  expect(experienceLevel).toBeVisible();
  const experienceOptions = [
    "#jobs-search-all-modal-experience-0-1",
    "#jobs-search-all-modal-experience-1-3",
    "#jobs-search-all-modal-experience-3-5",
    "#jobs-search-all-modal-experience-5-10",
  ]
  for (const experienceOption of experienceOptions) {
    await page.waitForSelector(experienceOption);
    const expButton = page.locator(experienceOption);
    expect(expButton).toBeVisible();
    await expButton.click({ delay: 500 });
    expect(expButton.locator("input")).toBeVisible();
    expect(expButton.locator("input")).toHaveAttribute("aria-checked", "true");
  }
  const getUnknown = page.getByTestId('jobs-search-all-modal-experience').getByTestId('include-unknown-checkbox')
  await getUnknown.waitFor({ state: "visible" });
  await getUnknown.click({ delay: 500 });
  await page.waitForTimeout(1000);
  expect(getUnknown).toBeChecked({ checked: true, timeout: 500 });

});
test('if items are displayed', async ({ page }) => {
  await page.goto("https://www.welcometothejungle.com/en/jobs?refinementList%5Boffices.country_code%5D%5B%5D=FR&query=react%20js&page=1");
  await page.waitForSelector(".ais-Hits-list-item");
  const articles = page.locator(".ais-Hits-list-item");
  expect(await articles.count()).toBeGreaterThan(0);
});
