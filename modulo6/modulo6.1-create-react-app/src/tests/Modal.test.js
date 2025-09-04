const { expect, test } = require("@playwright/test");

test("Test: Debería abrir y cerrar el modal", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.click('button:has-text("Abrir Modal")');
  expect(await page.isVisible(".modal")).toBe(true);
  await page.click('button:has-text("Cerrar el modal")');
  expect(await page.isVisible(".modal")).toBe(false);
});
