import { browser, $, expect } from '@wdio/globals' // Adjust import according to your setup
import { writeFileSync } from 'fs'; // Use ES module syntax for importing fs

describe('ExxonMobil career page', () => {
  it('should login with valid standard user', async () => {
    // Mark the function as async
    const keywordTextBox = await $('//input[@aria-label="Search by keyword"]')
    const searchbtn = await $('//input[@class="btn keywordsearch-button"]')
    // const loginButton = $('#login-button') // Corrected selector for login button

    await browser.url('https://jobs.exxonmobil.com/')

    await keywordTextBox.setValue('remote')
    await searchbtn.click()

    await browser.pause(5000);

    const tableRows = await $$('table tbody tr');
    console.log(`Number of rows found: ${tableRows.length}`);

    // Initialize an array to hold the extracted data
    const jobListings = [];

    for (const row of tableRows) {
      const jobRoleElement = await row.$('.colTitle a');
      const jobRole = await row.$('.colTitle').getText();
      const location = await row.$('.colLocation.hidden-phone').getText();
      const careerField = await row.$('.colDepartment.hidden-phone').getText();
      const dateOfPosting = await row.$('.colDate.hidden-phone').getText();
      const detailLink = await jobRoleElement.getAttribute('href');

      jobListings.push({
          jobRole,
          location,
          careerField,
          dateOfPosting,
          detailLink
      });
    }

    // Save the extracted data to a file
    const filePath = './jobListings.json';
    writeFileSync(filePath, JSON.stringify(jobListings, null, 2));

    console.log(`Job listings data saved to ${filePath}`);

  })
})
