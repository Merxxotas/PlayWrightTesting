// Importamos las funciones principales de Playwright Test
const { expect, test } = require("@playwright/test");

/**
 * Test #1: Verifica la funcionalidad de seleccionar un elemento mediante una combinación de clase e ID utilizando un selector CSS.
 */
test("1. Test#1: Selector CSS - seleccionar clase por una combinacion de ID", async ({
  page,
}) => {
  // Navegamos a la página demo
  await page.goto("http://127.0.0.1:5500/modulo2/demoPage.html");
  // Seleccionamos el elemento con clase 'info' y ID 'first-paragraph'
  const element = await page.locator(".info#first-paragraph");
  // Verificamos que el texto del elemento sea el esperado
  await expect(element).toHaveText("This is the first paragraph.");
});

/**
 * Test #2: Verifica la funcionalidad de seleccionar un elemento por su ID usando un selector CSS.
 */
test("2. Test#2: Selector CSS - seleccionar clase por un ID", async ({
  page,
}) => {
  // Navegamos a la página demo
  await page.goto("http://127.0.0.1:5500/modulo2/demoPage.html");
  // Seleccionamos el elemento con ID 'home-link'
  const homelink = await page.locator("#home-link");
  // Verificamos que el texto del elemento sea el esperado
  await expect(homelink).toHaveText("Go to Home");
});

/**
 * Test #3: Verifica el color de fondo de un elemento de la página con la clase "container".
 */
test("3. Test#3: Selector CSS - verificar el color de fondo de la página", async ({
  page,
}) => {
  // Navegamos a la página demo
  await page.goto("http://127.0.0.1:5500/modulo2/demoPage.html");
  // Seleccionamos el elemento con clase 'container'
  const containerDiv = await page.locator(".container");
  // Verificamos que el color de fondo sea blanco (rgb(255, 255, 255))
  await expect(containerDiv).toHaveCSS(
    "background-color",
    "rgb(255, 255, 255)"
  );
});
