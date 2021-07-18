const pageScraper = require("./page-scraper");
async function scrapeAll(browserInstance) {
  let browser;
  try {
    browser = await browserInstance;
    let scrapedData = {};
    scrapedData = await pageScraper.scraper(browser);
    await browser.close();
    console.log("Closing the browser......");
    return scrapedData;
  } catch (err) {
    console.log("Could not resolve the browser instance => ", err);
    return {};
  }
}
module.exports = (browserInstance) => scrapeAll(browserInstance);
