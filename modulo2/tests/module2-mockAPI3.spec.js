// Importamos las funciones principales de Playwright Test
const { expect, test } = require("@playwright/test");

/**
 * Test #1: Configuración de mock para API de usuario con datos completos y verificación de carga de la página.
 */
test("Test: #1 Configuración de mock para API de usuario", async ({ page }) => {
  // Configuramos el mock de la API con datos completos
  await page.route("https://randomuser.me/api/", async (route) => {
    const mockResponse = {
      results: [
        {
          name: {
            title: "Mr",
            first: "Brayan",
            last: "Marin",
          },
          location: {
            country: "Colombia",
            state: "Bogotá D.C.",
            city: "Bogotá",
            postcode: "110111",
          },
          phone: "+57 310 123 4567",
          cell: "+57 320 987 6543",
          picture: {
            medium: "https://randomuser.me/api/portraits/med/men/1.jpg",
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
  await page.goto("http://127.0.0.1:5500/modulo2/apiCall-upgraded.html");

  // Verificamos que la página carga correctamente y muestra el título esperado
  await expect(page).toHaveTitle("Random User Generator");
  await expect(page.locator("h1")).toHaveText("Random User Generator");
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
            title: "Mr",
            first: "Brayan",
            last: "Marin",
          },
          location: {
            country: "Colombia",
            state: "Bogotá D.C.",
            city: "Bogotá",
            postcode: "110111",
          },
          phone: "+57 310 123 4567",
          cell: "+57 320 987 6543",
          picture: {
            medium: "https://randomuser.me/api/portraits/med/men/1.jpg",
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
  await page.goto("http://127.0.0.1:5500/modulo2/apiCall-upgraded.html");
  await page.click("#btn");

  // Procesamos la respuesta interceptada
  const response = await responsePromise;
  const body = await response.body();
  const responseData = JSON.parse(body);
  console.log("Datos de respuesta interceptados:", responseData);

  // Validamos los datos recibidos
  expect(responseData.results[0].name.first).toBe("Brayan");
  expect(responseData.results[0].name.last).toBe("Marin");
  expect(responseData.results[0].location.country).toBe("Colombia");
  expect(responseData.results[0].location.city).toBe("Bogotá");
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
            title: "Mr",
            first: "Brayan",
            last: "Marin",
          },
          location: {
            country: "Colombia",
            state: "Bogotá D.C.",
            city: "Bogotá",
            postcode: "110111",
          },
          phone: "+57 310 123 4567",
          cell: "+57 320 987 6543",
          picture: {
            medium: "https://randomuser.me/api/portraits/med/men/1.jpg",
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
  await page.goto("http://127.0.0.1:5500/modulo2/apiCall-upgraded.html");
  await page.click("#btn");

  // Esperamos a que aparezca la tarjeta de usuario (animación)
  await page.waitForSelector(".user-card.show", { timeout: 2000 });

  // Verificamos que los datos se actualizan correctamente en la UI
  await expect(page.locator("#firstName")).toHaveText("Brayan");
  await expect(page.locator("#lastName")).toHaveText("Marin");
  await expect(page.locator("#userName")).toHaveText("Brayan Marin");
  await expect(page.locator("#userTitle")).toHaveText("Mr");
  await expect(page.locator("#country")).toHaveText("Colombia");
  await expect(page.locator("#state")).toHaveText("Bogotá D.C.");
  await expect(page.locator("#city")).toHaveText("Bogotá");
  await expect(page.locator("#postcode")).toHaveText("110111");
  await expect(page.locator("#phone")).toHaveText("+57 310 123 4567");
  await expect(page.locator("#cell")).toHaveText("+57 320 987 6543");
});

/**
 * Test #4: Flujo completo de llamada a API mockada, validando datos y actualización de la UI, incluyendo imagen.
 */
test("Test: #4 Flujo completo de llamada a API mockada", async ({ page }) => {
  // Configuramos el mock de la API
  await page.route("https://randomuser.me/api/", async (route) => {
    const mockResponse = {
      results: [
        {
          name: {
            title: "Mr",
            first: "Brayan",
            last: "Marin",
          },
          location: {
            country: "Colombia",
            state: "Bogotá D.C.",
            city: "Bogotá",
            postcode: "110111",
          },
          phone: "+57 310 123 4567",
          cell: "+57 320 987 6543",
          picture: {
            medium: "https://randomuser.me/api/portraits/med/men/1.jpg",
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
  await page.goto("http://127.0.0.1:5500/modulo2/apiCall-upgraded.html");
  await page.click("#btn");

  // Procesamos la respuesta interceptada
  const response = await responsePromise;
  const body = await response.body();
  const responseData = JSON.parse(body);
  console.log("Flujo completo - Datos recibidos:", responseData);

  // Validamos los datos recibidos
  expect(responseData.results[0].name.first).toBe("Brayan");
  expect(responseData.results[0].name.last).toBe("Marin");
  expect(responseData.results[0].location.country).toBe("Colombia");

  // Esperamos a que aparezca la tarjeta de usuario
  await page.waitForSelector(".user-card.show", { timeout: 2000 });

  // Verificamos el resultado final en la UI - múltiples elementos
  await expect(page.locator("#firstName")).toHaveText("Brayan");
  await expect(page.locator("#lastName")).toHaveText("Marin");
  await expect(page.locator("#country")).toHaveText("Colombia");
  await expect(page.locator("#city")).toHaveText("Bogotá");

  // Verificamos que la imagen se carga correctamente
  const userImage = page.locator("#userImage");
  await expect(userImage).toHaveAttribute(
    "src",
    "https://randomuser.me/api/portraits/med/men/1.jpg"
  );
  await expect(userImage).toHaveAttribute("alt", "Brayan Marin");
});
