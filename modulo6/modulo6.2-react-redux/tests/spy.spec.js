import { expect, test } from "@playwright/test";

test("Test: debería llamar a la función espía al hacer clic en el botón", async ({
  page,
}) => {
  await page.goto("http://localhost:5173");
  // Crear una función espía en el contexto de la página
  await page.evaluate(() => {
    window.__spy = () => {
      if (!window.__spyCalls) {
        window.__spyCalls = 0;
      }
      window.__spyCalls++;
    };
  });
  // Hacer clic específicamente en el botón del SpyFunc usando su texto
  await page.click("button:has-text('Clickeame')");
  // verificar si la función espía fue llamada
  const spyCalls = await page.evaluate(() => window.__spyCalls);
  expect(spyCalls).toBe(1);
});
