const { expect, test } = require("@playwright/test");

test("Test: Probando contadores", async ({ page }) => {
  await page.goto("http://127.0.0.1:5500/modulo2/demoPage.html");
  const incrementBtn = await page.locator("#add");
  const decrementBtn = await page.locator("#sub");
  const display = await page.locator(".display");

  await expect(display).toHaveText("0");
  await expect(incrementBtn).toBeVisible();
  await expect(decrementBtn).toBeVisible();
  await incrementBtn.click();
  await expect(display).toHaveText("1");
  await decrementBtn.click();
  await decrementBtn.click();
  await expect(display).toHaveText("-1");
});
