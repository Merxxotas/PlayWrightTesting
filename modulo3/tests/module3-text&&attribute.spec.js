const { expect, test } = require("@playwright/test");

test('Test: Manejo de textos usando "selection"', async ({ page }) => {
  await page.goto("http://localhost:5500/modulo3/demoPage.html");
  const heading = await page.locator("text='Welcome to Basic Testing'");
  await expect(heading).toBeVisible();
});
test('Test: Manejo de textos usando "atributes"', async ({ page }) => {
  await page.goto("http://localhost:5500/modulo3/demoPage.html");
  const contactMail = await page.locator("[href='mailto:info@example.com']");
  await expect(contactMail).toBeVisible();
  //   await expect(contactMail).toBe("mailto:info@example.com");
});
