// Importamos las funciones principales de Playwright Test
const { expect, test } = require("@playwright/test");

/**
 * Test: Verifica la funcionalidad de los botones de incremento y decremento de un contador en la UI.
 */
test("Test: Probando contadores", async ({ page }) => {
  // Navegamos a la página demo
  await page.goto("http://127.0.0.1:5500/modulo2/demoPage.html");
  // Seleccionamos los elementos de la UI: botón de sumar, botón de restar y display del contador
  const incrementBtn = await page.locator("#add");
  const decrementBtn = await page.locator("#sub");
  const display = await page.locator(".display");

  // Verificamos que el contador inicia en 0
  await expect(display).toHaveText("0");
  // Verificamos que los botones sean visibles
  await expect(incrementBtn).toBeVisible();
  await expect(decrementBtn).toBeVisible();
  // Hacemos click en el botón de sumar y verificamos el resultado
  await incrementBtn.click();
  await expect(display).toHaveText("1");
  // Hacemos dos clicks en el botón de restar y verificamos el resultado final
  await decrementBtn.click();
  await decrementBtn.click();
  await expect(display).toHaveText("-1");
});
