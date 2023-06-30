// import fs from "fs/promises";
// import path from "path";
// import { fileURLToPath } from "url";
import { prisma } from "../utils/prisma/utils.ts";
import { LinkedInConfig, CommonConfig } from "../../config/config.ts";
// UTILS
// import getUniqueFilename from "../utils/uniqueFileName.js";
import getRandomInt from "../utils/randomInt.js";
// PLAYWRIGHT SPECIFIC IMPORTS
// Load the stealth plugin and use defaults (all tricks to hide playwright usage)
// Note: playwright-extra is compatible with most puppeteer-extra plugins
import { chromium } from "playwright-extra";
import stealth from "puppeteer-extra-plugin-stealth";
// Add the plugin to playwright (any number of plugins can be added)
// @ts-ignore
chromium.use(stealth);

/**
 * @param {Object} common
 * @param {Object} welcomeToTheJungle
 *
 * @returns {Promise<void>}
 * @description This function is the main function of the wttjgl scrapper.
 * It takes two objects as parameters, one for the common parameters
 * and one for the wttjgl specific parameters.
 * It will launch a chromium browser, go to the wttjgl website,
 * login if the credentials are provided, search for jobs
 * and scrape the data.
 * It will then save the data in a json file.
 * The data will be saved in the data folder.
 *
 */
async function linkedinScrapper({ common, linkedin }: { common: CommonConfig, linkedin: LinkedInConfig }): Promise<void> {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 50,
  });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    userAgent: "Mozilla/5.0 (X11; Linux x86_64)",
    geolocation: { longitude: 2.3488, latitude: 48.8534 },
    permissions: ["geolocation"],
  });
  const page = await context.newPage();
  await page.goto("https://www.linkedin.com/login");
  console.log("Page loaded.");
  // LOGIN BLOCK
  await page.waitForTimeout(getRandomInt(2000, 5000));
  // Focusing on the username field and typing
  await page.locator("#username").type(linkedin.email, { delay: 100 });
  await page.waitForTimeout(getRandomInt(2000, 5000));

  // Focusing on the password field and typing
  await page.locator("#password").type(linkedin.password, { delay: 100 });

  // Clicking on the login button
  await page.locator('[data-litms-control-urn="login-submit"]').click();
  // END OF LOGIN BLOCK

  // Waiting for navigation and then waiting for a random time between 2-5 seconds
  await page.waitForTimeout(getRandomInt(2000, 5000));
  // END OF LOGIN BLOCK
  // Clicking on the job search link
  await page.locator('a[href="https://www.linkedin.com/jobs/?"]').click();
  await page.waitForTimeout(getRandomInt(2000, 5000));
  // SEARCH JOB TYPE BLOCK
  // Entering the job search keyword
  await page
    .getByRole("combobox", { name: "Search by title, skill, or company" })
    .type(common.jobSearch, { delay: 100 });

  await page.waitForTimeout(getRandomInt(2000, 5000));
  // Entering the job search location
  await page
    .getByRole("combobox", { name: "City, state, or zip code" })
    .type(common.location, { delay: 100 });
  await page.keyboard.press("Enter");
  // END OF SEARCH JOB TYPE BLOCK

  // FILTERS BLOCK
  // Will click on the all filters button if one of the filters is set
  if (linkedin.remote || linkedin.datePosted || linkedin.experienceLevel) {
    const filterDiv = page.locator("#search-reusables__filters-bar");
    const allFilterButton = filterDiv.getByText("All filters");
    await allFilterButton.click();
    await page.waitForTimeout(getRandomInt(2000, 5000));

    const modal = page.locator("#artdeco-modal-outlet");
    const ul = modal.locator("ul");

    if (linkedin.datePosted) {
      // select the li element that contains the date posted filter
      const liNumber = linkedin.datePosted + 1;
      const datePostedLists = ul.locator("li:nth-child(3)");
      const ulList = datePostedLists.locator("ul");
      const li = ulList.locator(`li:nth-child(${liNumber})`);
      const label = li.locator("label");
      await label.click();
    }
    await page.waitForTimeout(getRandomInt(2000, 5000));
    if (linkedin.experienceLevel) {
      // select the li element that contains the date posted filter
      const experienceList = ul.locator("li:nth-child(4)");
      const ulList = experienceList.locator("ul");
      // click on the li depending on the date posted filter
      const li = ulList.locator(`li:nth-child(${linkedin.experienceLevel})`);
      const label = li.locator("label");
      await label.click();
    }
    await page.waitForTimeout(getRandomInt(2000, 5000));

    if (linkedin.remote) {
      const remoteList = ul.locator("li:nth-child(6)");
      const ulList = remoteList.locator("ul");
      const li = ulList.locator(`li:nth-child(${linkedin.remote})`);
      const label = li.locator("label");
      await label.click();
    }
    await page.waitForTimeout(getRandomInt(2000, 5000));
    await modal.getByText("Show results").click();
  }
  // END OF FILTERS BLOCK

  let numPages = 2;
  const numOfPages = common?.numOfPages || 2;
  let hasPassedNine = false;
  await page.waitForTimeout(getRandomInt(3000, 5000));
  const jobs = [];
  // BEGINNING OF LOOP through pages and getting the jobs
  for (let index = 0; index < numOfPages; index++) {
    console.log("enter loop page navigation"); //
    await page.waitForTimeout(getRandomInt(2000, 5000));
    const articles = page.locator(".jobs-search-results-list > ul > li");
    for (let j = 0; j < (await articles.count()); j++) {
      let article = articles.nth(j);

      await article.scrollIntoViewIfNeeded();
      const linkLocator = article.locator("a");
      const link = await linkLocator.getAttribute("href");
      await linkLocator.click();
      // We wait for the page to appear
      // await page.waitForTimeout(getRandomInt(1000, 22000));
      const detailsLocator = page.locator("#job-details");
      const details = await detailsLocator.innerText();
      let jobInnerText = await article.innerText();
      const lines = jobInnerText
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line !== "");
      jobs.push(lines);
      let workplace;
      if (
        lines[3] !== "Remote" &&
        lines[3] !== "On-site" &&
        lines[3] !== "Hybrid"
      ) {
        workplace = null;
      } else {
        workplace = lines[3];
      }
      let job = {
        company: lines[1] ?? null,
        title: lines[0] ?? null,
        link: link ?? null,
        location: lines[2] ?? null,
        tags: workplace ? [workplace] : null,
        details: details ?? null,
      };
      jobs.push(job);
      let jobPrisma = await prisma.job.create({
        data: {
          company: lines[1] ?? null,
          title: lines[0] ?? null,
          link: link ?? null,
          location: lines[2] ?? null,
          tags: workplace ? workplace : null,
          details: details ?? null,
        },
      });
      console.log(job);
    }

    await page.waitForTimeout(getRandomInt(2000, 4000));
    let paginationUl = page.locator(".artdeco-pagination__pages--number");
    await paginationUl.scrollIntoViewIfNeeded();
    // get the text content of the last li elementQ
    if (numPages > 9 || hasPassedNine) {
      numPages = 7;
      hasPassedNine = true;
    }
    await paginationUl.locator(`li:nth-child(${numPages})`).click();
    numPages++;
  }

  await browser.close();
}
// export the function

