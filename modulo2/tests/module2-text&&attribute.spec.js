// Importamos las funciones principales de Playwright Test
const { expect, test } = require("@playwright/test");

/**
 * Test #1: Verifica la visibilidad de un texto específico usando el selector de texto.
 */
test('Test: Manejo de textos usando "selection"', async ({ page }) => {
  // Navegamos a la página demo
  await page.goto("http://localhost:5500/modulo2/demoPage.html");
  // Seleccionamos el elemento que contiene el texto 'Welcome to Basic Testing'
  const heading = await page.locator("text='Welcome to Basic Testing'");
  // Verificamos que el elemento sea visible
  await expect(heading).toBeVisible();
});

/**
 * Test #2: Verifica la visibilidad de un elemento usando un selector de atributo (href).
 */
test('Test: Manejo de textos usando "atributes"', async ({ page }) => {
  // Navegamos a la página demo
  await page.goto("http://localhost:5500/modulo2/demoPage.html");
  // Seleccionamos el elemento con el atributo href igual a 'mailto:info@example.com'
  const contactMail = await page.locator("[href='mailto:info@example.com']");
  // Verificamos que el elemento sea visible
  await expect(contactMail).toBeVisible();
});
