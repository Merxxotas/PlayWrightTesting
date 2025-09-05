// Importamos las funciones principales de Playwright Test
const { expect, test } = require("@playwright/test");

/**
 * Test #1: Configuración de mock para API de usuario y navegación a la página.
 */
test("Test: #1 Configuración de mock para API de usuario", async ({ page }) => {
  // Configuramos el mock de la API
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

  // Navegamos a la página que consume la API mockeada
  await page.goto("http://127.0.0.1:5500/modulo2/apiCall.html");
});

/**
 * Test #2: Intercepta y valida la respuesta de la API mockeada, comprobando los datos recibidos.
 */
test("Test: #2 Interceptar y validar respuesta de API", async ({ page }) => {
  // Configuramos el mock de la API
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
  const responsePromise = page.waitForResponse((response) =>
    response.url().includes("randomuser.me/api/")
  );

  // Navegamos y disparamos la llamada a la API
  await page.goto("http://127.0.0.1:5500/modulo2/apiCall.html");
  await page.click("#btn");

  // Procesamos la respuesta interceptada
  const response = await responsePromise;
  const body = await response.body();
  const responseData = JSON.parse(body);
  console.log("Datos de respuesta interceptados:", responseData);

  // Validamos los datos recibidos
  expect(responseData.results[0].name.first).toBe("Brayan");
  expect(responseData.results[0].name.last).toBe("Marin");
});

/**
 * Test #3: Verifica que la UI se actualiza correctamente después de la llamada a la API mockeada.
 */
test("Test: #3 Verificar actualización de UI después de llamada a API", async ({
  page,
}) => {
  // Configuramos el mock de la API
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

  // Navegamos y disparamos la llamada a la API
  await page.goto("http://127.0.0.1:5500/modulo2/apiCall.html");
  await page.click("#btn");

  // Verificamos que el texto se actualiza correctamente en la UI
  const userData = await page.locator("p");
  await expect(userData).toHaveText(" The new user name is Brayan");
});

/**
 * Test #4: Flujo completo de llamada a API mockada, validando datos y actualización de la UI.
 */
test("Test: #4 Flujo completo de llamada a API mockada", async ({ page }) => {
  // Configuramos el mock de la API
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

  // Interceptamos y validamos la respuesta de la API
  const responsePromise = page.waitForResponse((response) =>
    response.url().includes("randomuser.me/api/")
  );

  // Navegamos y disparamos la llamada a la API
  await page.goto("http://127.0.0.1:5500/modulo2/apiCall.html");
  await page.click("#btn");

  // Procesamos la respuesta interceptada
  const response = await responsePromise;
  const body = await response.body();
  const responseData = JSON.parse(body);
  console.log("Flujo completo - Datos recibidos:", responseData);

  // Validamos los datos recibidos
  expect(responseData.results[0].name.first).toBe("Brayan");
  expect(responseData.results[0].name.last).toBe("Marin");

  // Verificamos el resultado final en la UI
  const userData = await page.locator("p");
  await expect(userData).toHaveText(" The new user name is Brayan");
});
