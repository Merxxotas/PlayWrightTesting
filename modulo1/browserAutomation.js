const { chromium, firefox } = require("playwright");

const automation = async (browserType) => {
  const browser = await browserType.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://example.com");
  console.log(
    "El título de la página es : ",
    browserType.name(),
    await page.title()
  );
  await page.screenshot({
    path: `screenshots/example-${browserType.name()}.png`,
  });
  await new Promise((resolve) => setTimeout(resolve, 5000));
  await browser.close();
};

automation(chromium);
automation(firefox);
