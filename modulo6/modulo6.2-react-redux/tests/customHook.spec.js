import { test } from "@playwright/test";

test("Test: Debería incrementar el contador", async ({ page }) => {
  await page.goto("http://localhost:5173");
  await page.waitForSelector("p", { hasText: "Contador: 0" });
  await page.click('button:has-text("Incrementar")');
  await page.waitForSelector("p", { hasText: "Contador: 1" });
});

test("Test: Debería decrementar el contador", async ({ page }) => {
  await page.goto("http://localhost:5173");
  await page.waitForSelector("p", { hasText: "Contador: 0" });
  await page.click('button:has-text("Decrementar")');
  await page.waitForSelector("p", { hasText: "Contador: -1" });
});
