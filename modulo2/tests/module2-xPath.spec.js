const { expect, test } = require("@playwright/test");

test("Test #1: Selector XPath - Primeros usos de Xpath-1", async ({ page }) => {
  await page.goto("http://127.0.0.1:5500/modulo2/demoPage.html");
  /**
   * Localizador para el segundo elemento <a> dentro del <div> principal de la página.
   * Normalmente representa el enlace "About" en la navegación.
   *
   * @type {import('@playwright/test').Locator}
   */
  const aboutLink = await page.locator("//html/body/div/a[2]");
  await expect(aboutLink).toBeVisible();
  await expect(aboutLink).toHaveText("About Us");
});

test("Test #2: Selector XPath - Primeros usos de Xpath-2", async ({ page }) => {
  await page.goto("http://127.0.0.1:5500/modulo2/demoPage.html");
  /**
   * Localiza el segundo párrafo en la página utilizando XPath.
   *
   * @type {import('@playwright/test').Locator}
   * @description Utiliza el selector XPath para encontrar el elemento con id 'second-paragraph'.
   */
  const secondParagraph = await page.locator("//*[@id='second-paragraph']");
  await expect(secondParagraph).toBeVisible();
  await expect(secondParagraph).toHaveText("This is the second paragraph.");
});
