const { expect, test } = require("@playwright/test");

test("Test: #1 Configuración de mock para API de usuario", async ({ page }) => {
  // Configurar el mock de la API
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

  await page.goto("http://127.0.0.1:5500/modulo3/apiCall.html");
});

test("Test: #2 Interceptar y validar respuesta de API", async ({ page }) => {
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

  // Interceptar la respuesta de la API y validar datos
  const responsePromise = page.waitForResponse((response) =>
    response.url().includes("randomuser.me/api/")
  );

  await page.goto("http://127.0.0.1:5500/modulo3/apiCall.html");
  await page.click("#btn");

  const response = await responsePromise;
  const body = await response.body();
  const responseData = JSON.parse(body);
  console.log("Datos de respuesta interceptados:", responseData);

  expect(responseData.results[0].name.first).toBe("Brayan");
  expect(responseData.results[0].name.last).toBe("Marin");
});

test("Test: #3 Verificar actualización de UI después de llamada a API", async ({
  page,
}) => {
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

  await page.goto("http://127.0.0.1:5500/modulo3/apiCall.html");
  await page.click("#btn");

  // Verificar que el texto se actualiza correctamente en la UI
  const userData = await page.locator("p");
  await expect(userData).toHaveText(" The new user name is Brayan");
});

test("Test: #4 Flujo completo de llamada a API mockada", async ({ page }) => {
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

  // Interceptar y validar la respuesta
  const responsePromise = page.waitForResponse((response) =>
    response.url().includes("randomuser.me/api/")
  );

  await page.goto("http://127.0.0.1:5500/modulo3/apiCall.html");
  await page.click("#btn");

  const response = await responsePromise;
  const body = await response.body();
  const responseData = JSON.parse(body);
  console.log("Flujo completo - Datos recibidos:", responseData);

  expect(responseData.results[0].name.first).toBe("Brayan");
  expect(responseData.results[0].name.last).toBe("Marin");

  // Verificar el resultado final en la UI
  const userData = await page.locator("p");
  await expect(userData).toHaveText(" The new user name is Brayan");
});
