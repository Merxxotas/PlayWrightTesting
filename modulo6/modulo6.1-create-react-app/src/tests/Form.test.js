import { expect, test } from "@playwright/test";

test("Test: Debería enviar el formulario con la data de manera correcta", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/");
  await page.fill('input[placeholder="Escribe algo..."]', "Hola Mundo");
  await page.click("button[type='submit']");
  const outDiv = await page.locator("#out").innerText();
  expect(outDiv).toBe("Hola Mundo");
});
