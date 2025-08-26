const { chromium, firefox } = require("playwright"); // Solo importamos los que existen

/**
 * @param {object} browserType - El tipo de navegador (chromium, firefox).
 * @param {object} launchOptions - Opciones adicionales para el lanzamiento.
 */
const automation = async (browserType, launchOptions = {}) => {
  const options = { headless: false, ...launchOptions };
  const browser = await browserType.launch(options);
  const context = await browser.newContext();
  const page = await context.newPage();
  const browserName = launchOptions.channel || browserType.name();
  await page.goto("https://example.com");
  console.log(
    `El título de la página en ${browserName} es: `,
    await page.title()
  );
  await page.screenshot({
    path: `screenshots/example-${browserName}.png`,
  });
  await new Promise((resolve) => setTimeout(resolve, 3000));
  await browser.close();
};

automation(chromium);
automation(firefox);
automation(chromium, { channel: "chrome" });
automation(chromium, { channel: "msedge" });
