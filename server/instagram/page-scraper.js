const scraperObject = {
  url: "https://www.instagram.com/memenepal/",
  async scraper(browser) {
    let page = await browser.newPage();
    await page.setExtraHTTPHeaders({
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
      "upgrade-insecure-requests": "1",
      "accept-encoding": "gzip, deflate, br",
      "accept-language": "en-US,en;q=0.9,en;q=0.8",
    });
    await page.setViewport({ width: 960, height: 768 });
    await page.goto(this.url, { waitUntil: "domcontentloaded" });
    let scrapedData = [];

    async function scrapeCurrentPage() {
      const newPage = (link) => {
        return new Promise(async (resolve, reject) => {
          let newPage = await browser.newPage();
          let newObj = {};
          await newPage.setExtraHTTPHeaders({
            accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "user-agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
            "upgrade-insecure-requests": "1",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9,en;q=0.8",
          });
          await newPage.setViewport({ width: 960, height: 768 });
          await newPage.goto(link);
          // await newPage.screenshot({ fullPage: true, path: "screenshot-1.png" });
          try {
            await newPage.waitForSelector(".E3X2T");
          } catch (error) {
            console.log("Error on child element");
          }
          try {
            const div = await newPage.$eval(".KL4Bh > img", (ref) => ref.src);
            const dateTime = await newPage.$eval(
              "._1o9PC",
              (item) => item.datetime
            );
            newObj["link"] = link;
            newObj["url"] = div;
            newObj["date"] = dateTime;
            await newPage.close();
            resolve(newObj);
          } catch (error) {
            await newPage.close();
            resolve();
          }
        });
      };
      // await page.screenshot({ fullPage: true, path: "screenshot.png" });
      try {
        await page.waitForSelector(".SCxLW");
      } catch (error) {
        console.log("Error finding element");
      }
      const hrefs = await page.$$eval("a", (as) => as.map((a) => a.href));
      const urls = hrefs.filter((href) =>
        href.startsWith("https://www.instagram.com/p/")
      );
      for (link in urls) {
        let currentPageData = await newPage(urls[link]);
        if (currentPageData) {
          scrapedData.push(currentPageData);
        }
      }
      return scrapedData;
    }
    let data = await scrapeCurrentPage();
    return data;
  },
};

module.exports = scraperObject;
