const { expect, test } = require("@playwright/test");

//Esta prueba específica verifica la funcionalidad de seleccionar un elemento mediante una combinación de clase e ID utilizando un selector CSS.
test("1. Test#1: Selector CSS - seleccionar clase por una combinacion de ID", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:5500/modulo2/demoPage.html");
  const element = await page.locator(".info#first-paragraph");
  await expect(element).toHaveText("This is the first paragraph.");
});

// Esta prueba específica está verificando la funcionalidad de seleccionar un elemento por su ID usando un selector CSS.
test("2. Test#2: Selector CSS - seleccionar clase por un ID", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:5500/modulo2/demoPage.html");
  const homelink = await page.locator("#home-link");
  await expect(homelink).toHaveText("Go to Home");
});

// Esta prueba específica está verificando el color de fondo de un elemento de la página con la clase "container".
test("3. Test#3: Selector CSS - verificar el color de fondo de la página", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:5500/modulo2/demoPage.html");
  const containerDiv = await page.locator(".container");
  await expect(containerDiv).toHaveCSS(
    "background-color",
    "rgb(255, 255, 255)"
  );
});
