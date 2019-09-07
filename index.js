const puppeteer = require("puppeteer");

const runFunction = async ({ index, page }) => {
  await page.waitForSelector("#seeAll-link > a");
  await page.click("#seeAll-link > a");
  await page.$eval(`#othermakes > div:nth-child(${index}) > p > a`, el =>
    console.log(`Clicking on ${el.textContent}`)
  );
  await page.waitFor(1000);
  await page.click(`#othermakes > div:nth-child(${index}) > p > a`);
  await page.waitFor(1000);
  await page.goBack();
};

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.mudah.my/malaysia/cars-for-sale/toyota");
  await page.waitFor(5000);
  page.on("console", msg => {
    for (let i = 0; i < msg.args().length; ++i)
      console.log(`${i}: ${msg.args()[i]}`);
  });
  let i;
  for (i = 1; i <= 112; i++) {
    await runFunction({ index: i, page });
  }
  await browser.close();
})();
