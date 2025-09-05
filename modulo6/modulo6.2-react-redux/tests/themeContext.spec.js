import { expect, test } from "@playwright/test";

test("Test: Debería cambiar el color del tema", async ({ page }) => {
  await page.goto("http://localhost:5173");
  //Validar que el tema inicial es "light"
  const themeText = page.locator("p", { hasText: "Tema Actual:" });
  await expect(themeText).toHaveText("Tema Actual: light");
  // click en el botón del tema para cambiar el mismo.
  await page.click('button:has-text("Cambiar Tema")');
  await expect(themeText).toHaveText("Tema Actual: dark");
});
