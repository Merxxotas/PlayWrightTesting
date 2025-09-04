const { expect, test } = require("@playwright/test");

test.describe("Serie de tests: Data Fetching", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/");
  });
  test('Test: Debería mostrar el estado "Cargando" inicialmente', async ({
    page,
  }) => {
    await expect(page.locator("h2")).toHaveText("Cargando...");
  });

  test("Test: Debería mostrar los datos después de la carga", async ({
    page,
  }) => {
    // Mock de la respuesta de la API
    await page.route(
      "https://jsonplaceholder.typicode.com/todos/1",
      (route) => {
        route.fulfill({
          json: { title: "Mock Title" },
          status: 200,
        });
      }
    );
    await page.reload();
    await expect(page.locator("h2")).toHaveText("Mock Title");
  });
});
