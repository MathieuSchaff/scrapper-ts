# Job Scraper App Configuration

This repository contains the configuration file for the Job Scraper app. The configuration options allow you to customize various settings for different job platforms.

## Common Configuration

The common configuration applies to all scrapers and includes the following properties:

- `jobSearch`: The keyword for the job search.
- `location`: The desired job location.
- `numOfPages`: The number of pages to scrape for each job platform.

## LinkedIn Configuration

The LinkedIn configuration includes the following properties:

- `email`: Your LinkedIn email address.
- `password`: Your LinkedIn password.
- `remote`: The number representing your preferred date posted filter.

  - `1`: Past 24 hours
  - `2`: Past week
  - `3`: Past month

- `experienceLevel`: The number representing your preferred experience level filter.

  - `1`: Internship
  - `2`: Entry level
  - `3`: Associate
  - `4`: Mid-Senior level
  - `5`: Director
  - `6`: Executive

- `workplaceType`: The number representing your preferred workplace type filter.
  - `1`: On-site
  - `2`: Remote
  - `3`: Hybrid

To configure the LinkedIn options, update the `linkedin` object in the configuration file with your desired values.

**Note**: Make sure to store your LinkedIn email and password securely and avoid committing them to version control.

## Welcome to the Jungle Configuration

I don't recommend login in welcome to the jungle website because the jobs listed while logged in are the same as the job listed while logged out.
But if you really want to login, you can, by specifying a key email and a key password to the welcomeToTheJungle object inside the config obj.
Perhaps you will want to extend the functionnality of this scrapper to enable sending automatic email to the jobs through welcome to the jungle.
I don't recommend login in because it just increase the risk of being detected.

The Welcome to the Jungle configuration includes the following properties:

- `email`: Your Welcome to the Jungle email address.
- `password`: Your Welcome to the Jungle password.
- `contractType`: The contract type filter. Available options:

  1. Permanent contract
  2. Work-study
  3. Internship
  4. Fixed-term / Temporary
  5. Other
  6. Freelance
  7. Part-time
  8. International Corporate Volunteer Program
  9. Graduate program
  10. Volunteer work
  11. IDV

- `remoteWorkOption`: The remote work option filter. Available options:
  - `all`: All remote work options
  - `punctual`: Occasional remote
  - `partial`: Partial remote
  - `fulltime`: Open to full remote

You can also pass an array of number.

For exemple contractType: [6, 7, 4] if you want jobs from different type of contract.

If you want to search by contract type, you can set `contractType` to either the name of the contract type (as a string)
or its number in the list above (as a number).
For example: contractType: "Internship" // is the same as :contractType: 3

If you don't specify a contract type, the script will search for all types of jobs.
You can also specify contractType: "all" but it is not necessary
See: `/app/wttjgl/utils.js`
This is achieved using the `getContractTypeId` function in the script. This function takes the contractType from the config object,
looks up the corresponding id in the `contractTypes` array, and returns the id.
If the specified contract type is a number, the function treats it as an index into the `contractTypes` array.
If the contract type is a string, the function finds the object in the `contractTypes` array with a matching `name` property.

Note: If you specify a contract type that isn't in the list above, or a number that's outside the range of the list,
the `getContractTypeId` function will return `null`, and the script will search for all types of jobs.
