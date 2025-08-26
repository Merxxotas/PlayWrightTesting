const { test, expect } = require("@playwright/test");

test("Nuestro primer test", async ({ page }) => {
  await page.goto("https://example.com");
  const tittle = await page.title();
  expect(tittle).toBe("Example Domain");
});
