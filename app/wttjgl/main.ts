// NODE JS IMPORTS
// import fs from "fs/promises";
// import path from "path";
// import { fileURLToPath } from "url";
import { WelcomeToTheJungleConfig, CommonConfig } from "../../config/config.ts";
// PRisma 
import { prisma } from "../utils/prisma/utils.ts";
// use `prisma` in your application to read and write data in your DB

// UTILS
// import getUniqueFilename from "../utils/uniqueFileName.ts";
import getContractTypeId from "./utils.ts";
import getRandomInt from "../utils/randomInt.ts";
import convertTimeString from "../utils/timeConverter.ts";
// PLAYWRIGHT SPECIFIC IMPORTS
// Load the stealth plugin and use defaults (all tricks to hide playwright usage)
// Note: playwright-extra is compatible with most puppeteer-extra plugins
import { chromium } from "playwright-extra";
import stealth from "puppeteer-extra-plugin-stealth";
// Add the plugin to playwright (any number of plugins can be added)
// disable typescript next line
// @ts-ignore
chromium.use(stealth);


export async function wttjglScrapper({
  common,
  welcomeToTheJungle,
}: {
  common: CommonConfig;
  welcomeToTheJungle?: WelcomeToTheJungleConfig
}): Promise<void> {
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
  await page.goto("https://www.welcometothejungle.com/en");
  // time out to wait for the page to load
  await page.mainFrame().waitForSelector("header");
  // LOGIN BLOCK
  if ((welcomeToTheJungle?.account?.email && welcomeToTheJungle?.account?.password)) {
    const loginButtons = page.locator(
      '[data-testid="header-user-button-login"]'
    );
    if ((await loginButtons.count()) > 0) {
      const firstLoginButton = loginButtons.nth(0); // If you want the second, use nth(1)

      // Wait for the button to be attached to the DOM
      await firstLoginButton.waitFor({ state: "attached" });

      // Click on the button
      await firstLoginButton.click();

      // Wait for the email input field to be rendered
      const emailInput = page.locator('[data-testid="login-field-email"]');
      await emailInput.waitFor({ state: "visible" });

      // Type into the email input field with a delay between key presses
      await emailInput.type(welcomeToTheJungle.account.email, {
        delay: getRandomInt(50, 150),
      });

      // Wait for the password input field to be rendered
      const passwordInput = page.locator(
        '[data-testid="login-field-password"]'
      );
      await passwordInput.waitFor({ state: "visible" });

      // Type into the password input field with a delay between key presses
      await passwordInput.type(welcomeToTheJungle.account.password, {
        delay: getRandomInt(50, 150),
      });

      // Random delay

      // Wait for the submit button to be rendered
      const submitButton = page.locator('[data-testid="login-button-submit"]');
      await submitButton.waitFor({ state: "visible" });

      // Click the submit button
      await submitButton.click();
    }
  }
  // END OF LOGIN BLOCK
  //
  // Go to the job page
  const jobLink = page.getByRole("link", {
    name: "Find a job",
    exact: true,
  });
  await jobLink.waitFor({ state: "attached" });
  await jobLink.click();

  const jobSearchButton = page.locator(
    '[data-testid="jobs-home-search-field-query"]'
  );
  await jobSearchButton.waitFor({ state: "visible" });
  await jobSearchButton.focus();
  await jobSearchButton.type(common.jobSearch, {
    delay: getRandomInt(100, 500),
  });
  await jobSearchButton.press("Enter");

  await page.waitForTimeout(getRandomInt(2000, 5000));
  // CLEAR INPUT LOCATION
  const clearLocationButton = page.getByLabel('Clear all').nth(1)
  await clearLocationButton.click({ delay: getRandomInt(100, 500) });

  await page.waitForTimeout(getRandomInt(2000, 5000));

  const locationInput = page.getByTestId('jobs-home-search-field-location')
  await locationInput.focus();
  await locationInput.type(common.location, {
    delay: getRandomInt(100, 500),
  });
  await locationInput.press("Enter");
  // FILTERS BLOCK
  // if (Object.keys(welcomeToTheJungle).length > 0) {
  if (welcomeToTheJungle?.filters &&
    Object.keys(welcomeToTheJungle?.filters).length > 0) {
    const filtersAllButton = page.locator("#jobs-search-filter-all");
    await filtersAllButton.click({ delay: getRandomInt(100, 500) });
    // FILTERS CONTRAT TYPE
    if (
      welcomeToTheJungle?.filters?.contractType
      && Object.keys(welcomeToTheJungle?.filters?.contractType).length > 0
      && welcomeToTheJungle?.filters?.contractType !== "all"
    ) {
      // await page
      //   .locator('[data-testid="jobs-search-select-filter-contract"]')
      //   .click({ delay: getRandomInt(100, 500) });

      const buttonId = getContractTypeId(welcomeToTheJungle.filters.contractType);
      if (Array.isArray(buttonId)) {
        for (const id of buttonId) {
          await page.locator(`#${id}`).click({ delay: getRandomInt(100, 500) });
        }
      } else {
        await page
          .locator(`#${buttonId}`)
          .click({ delay: getRandomInt(100, 500) });
      }
    }
    // END FILTERS CONTRACT TYPE
    // FILTERS REMOTE
    if (
      welcomeToTheJungle?.filters?.remote !== undefined &&
      welcomeToTheJungle?.filters.remote !== null &&
      welcomeToTheJungle?.filters.remote !== "all"
    ) {

      const remoteWorkOptions = {
        no: "#jobs-search-all-modal-remote-no",
        punctual: "#jobs-search-all-modal-remote-punctual",
        partial: "#jobs-search-all-modal-remote-partial",
        fulltime: "#jobs-search-all-modal-remote-fulltime",
      };

      const remoteChoice = welcomeToTheJungle?.filters?.remote as keyof typeof remoteWorkOptions;
      await page
        .locator(remoteWorkOptions[remoteChoice])
        .click({ delay: getRandomInt(100, 500) });
      // END OF BLOCK CONTRACT JOBS
    }
    const experienceOptions = [
      "#jobs-search-all-modal-experience-0-1",
      "#jobs-search-all-modal-experience-1-3",
      "#jobs-search-all-modal-experience-3-5",
      "#jobs-search-all-modal-experience-5-10",
    ]
    if (welcomeToTheJungle?.filters?.experienceLevel !== undefined &&
      welcomeToTheJungle?.filters?.experienceLevel.length > 0) {
      for (const experience of welcomeToTheJungle?.filters?.experienceLevel) {
        await page
          .locator(experienceOptions[experience])
          .click({ delay: getRandomInt(100, 500) });
      }
      const getUnknown = page.getByTestId('jobs-search-all-modal-experience').getByTestId('include-unknown-checkbox')
      await getUnknown.click({ delay: getRandomInt(100, 500) });
    }
    await page.locator("#jobs-search-modal-search-button").click({ delay: getRandomInt(100, 500) });
    // END FILTERS REMOTE
  }
  interface Job {
    company: string | null;
    title: string | null;
    link: string | null;
    location: string | null;
    time: string | null;
    tags: string[] | null;
  }
  const jobs: Job[] = [];
  const numOfPages = common.numOfPages || 1;
  for (let i = 0; i < numOfPages; i++) {
    await page.waitForSelector(".ais-Hits-list-item");

    const articles = page.locator(".ais-Hits-list-item");
    for (let j = 0; j < (await articles.count()); j++) {
      let article = articles.nth(j);
      // name of the company
      const companyNameLocator = article.locator(
        "div:nth-child(1) > div:nth-child(2) > div:nth-child(1)"
      );
      const jobCompanyName = await companyNameLocator.textContent();
      // name of the job
      const titleLocator = article.locator("h4");
      const jobTitle = await titleLocator.textContent();
      // location of the job
      const locationLocator = article.locator(
        "div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > p"
      );
      const jobLocation = await locationLocator.textContent();
      // link to the job
      const anchorLocator = article.locator(
        "div > div:nth-child(2) > div:nth-child(2) > a"
      );
      const href = await anchorLocator.getAttribute("href");
      const jobLink = href ? `https://www.welcometothejungle.com${href}` : null;
      // time when job was posted
      const timeDiv = article.locator(
        "div > div:nth-child(2) > div:nth-child(2) > div:nth-child(4)"
      );
      const jobTime = await timeDiv.textContent();
      // const jobFormatedTime = convertTimeString(jobTime);
      const tagsLocators = article.locator(
        "div > div:nth-child(2) > div:nth-child(2) > div:nth-child(3) > div"
      );
      let tags = [];
      for (let k = 0; k < (await tagsLocators.count()); k++) {
        let tagContent = await tagsLocators.nth(k).textContent();
        if (tagContent) {
          tags.push(tagContent);
        }
      }
      jobs.push({
        company: jobCompanyName,
        title: jobTitle,
        link: jobLink,
        location: jobLocation,
        time: jobTime,
        tags: tags,
      });
    }
    await page.waitForTimeout(getRandomInt(1000, 3000));
    const nextButton = page.locator(
      'nav[aria-label="Pagination"] > ul > li:last-child > a'
    );

    if (await nextButton.count()) {
      await nextButton.click({ delay: getRandomInt(100, 500) });
    }
  }
  const maxConcurrentsPages = 5;
  const pagesQueue = jobs.slice(1);
  const openPages = [];
  const jobsWithSections = [];
  // While there are jobs to process
  while (pagesQueue.length) {
    // while there are open pages and there are jobs to process
    // and the number of open pages is less than the max number of concurrent pages
    while (openPages.length < maxConcurrentsPages && pagesQueue.length) {
      const page = await context.newPage();
      // get the first job from the queue
      const job = pagesQueue.shift();
      if (!job || !job.link) {
        break;
      }
      await page.goto(job.link);
      // add the page to the open pages array and
      // Store the page and the job in the same object, so they're linked
      openPages.push({ page, job });
      await page.waitForTimeout(getRandomInt(1000, 3000));
    }
    // Now that we've hit our concurrency limit or exhausted the queue, we can perform the scraping
    for (const { page, job } of openPages) {
      // Perform the scraping operation here
      await page.waitForSelector("main section");

      const sectionsFromJob = await page.$$eval("main section", (sections) => {
        return sections.map((section) => section.textContent).join(". ");
      });
      jobsWithSections.push({ ...job, details: sectionsFromJob });

      const tagsAsString = JSON.stringify(job.tags ?? null)
      const jobWithDetails = await prisma.job.create({
        data: {
          company: job.company,
          title: job.title,
          link: job.link,
          location: job.location,
          time: job.time,
          tags: tagsAsString,
          details: sectionsFromJob,
        },
      });
      console.log(jobWithDetails)
      // Close the page when we're done with it
      await page.close();
    }
    // Clear the openPages array for the next batch
    openPages.length = 0;
  }
  await browser.close();
}
