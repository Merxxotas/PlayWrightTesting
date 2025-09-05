import { test } from "@playwright/test";

import percySnapshot from "@percy/playwright";

test("Test: Debería capturar un 'snapshot' de la imagen.", async ({ page }) => {
  await page.goto("http://localhost:5173");
  await percySnapshot(page, "Homepage");
});
