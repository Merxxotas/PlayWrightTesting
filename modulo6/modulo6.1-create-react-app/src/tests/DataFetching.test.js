// Importa las funciones necesarias de Playwright Test
const { expect, test } = require("@playwright/test");

// Agrupa una serie de pruebas relacionadas con la obtención de datos (Data Fetching)
test.describe("Serie de tests: Data Fetching", () => {
  // Antes de cada prueba, navega a la página principal de la aplicación
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/");
  });

  // Prueba que verifica que el estado inicial es "Cargando..."
  test('Test: Debería mostrar el estado "Cargando" inicialmente', async ({
    page,
  }) => {
    // Espera que el elemento h2 contenga el texto "Cargando..." al cargar la página
    await expect(page.locator("h2")).toHaveText("Cargando...");
  });

  // Prueba que verifica que los datos se muestran correctamente después de la carga
  test("Test: Debería mostrar los datos después de la carga", async ({
    page,
  }) => {
    // Simula (mockea) la respuesta de la API para controlar el dato recibido
    await page.route(
      "https://jsonplaceholder.typicode.com/todos/1",
      (route) => {
        // Devuelve una respuesta personalizada con el título "Mock Title"
        route.fulfill({
          json: { title: "Mock Title" },
          status: 200,
        });
      }
    );
    // Recarga la página para que se realice la petición y se obtenga el mock
    await page.reload();
    // Verifica que el elemento h2 contenga el texto del mock
    await expect(page.locator("h2")).toHaveText("Mock Title");
  });
});
