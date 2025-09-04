const { test, expect } = require("@playwright/test");

test("Test: Debería mostar un mensaje cuando el botón ha sido clickeado", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/");
  await page.click("button");
  const message = await page.textContent("p");
  expect(message).toBe("¡Has hecho clic en el botón!");
});
