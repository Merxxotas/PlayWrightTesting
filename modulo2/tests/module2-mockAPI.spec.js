// Importamos las funciones principales de Playwright Test
const { expect, test } = require("@playwright/test");

/**
 * Test: Llamadas a APIs mockeadas, validando la respuesta y la actualización de la UI.
 */
test("Test: Llamadas a APIs", async ({ page }) => {
  // Configuramos el mock de la API para interceptar la llamada y devolver datos personalizados
  await page.route("https://randomuser.me/api/", async (route) => {
    const mockResponse = {
      results: [
        {
          name: {
            first: "Brayan",
            last: "Marin",
          },
        },
      ],
    };
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(mockResponse),
    });
  });

  // Interceptamos la respuesta de la API y validamos los datos recibidos
  page.on("response", (response) => {
    if (response.url().includes("randomuser.me/api/")) {
      response.body().then((body) => {
        const responseData = JSON.parse(body);
        console.log(responseData);

        // Validamos que los datos recibidos sean los esperados
        expect(responseData.results[0].name.first).toBe("Brayan");
        expect(responseData.results[0].name.last).toBe("Marin");
      });
    }
  });

  // Navegamos a la página que consume la API mockeada
  await page.goto("http://127.0.0.1:5500/modulo2/apiCall.html");
  // Disparamos la llamada a la API haciendo click en el botón
  await page.click("#btn");
  // Verificamos que el texto se actualiza correctamente en la UI
  const userData = await page.locator("p");
  await expect(userData).toHaveText(" The new user name is Brayan");
});
