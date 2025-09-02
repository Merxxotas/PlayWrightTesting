const { expect, test } = require("@playwright/test");

test("Test: #1 Configuración de mock para API de usuario", async ({ page }) => {
  // Configurar el mock de la API con datos completos
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

  await page.goto("http://127.0.0.1:5500/modulo3/apiCall-upgraded.html");

  // Verificar que la página carga correctamente
  await expect(page).toHaveTitle("Random User Generator");
  await expect(page.locator("h1")).toHaveText("Random User Generator");
});

test("Test: #2 Interceptar y validar respuesta de API", async ({ page }) => {
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

  // Interceptar la respuesta de la API y validar datos
  const responsePromise = page.waitForResponse((response) =>
    response.url().includes("randomuser.me/api/")
  );

  await page.goto("http://127.0.0.1:5500/modulo3/apiCall-upgraded.html");
  await page.click("#btn");

  const response = await responsePromise;
  const body = await response.body();
  const responseData = JSON.parse(body);
  console.log("Datos de respuesta interceptados:", responseData);

  expect(responseData.results[0].name.first).toBe("Brayan");
  expect(responseData.results[0].name.last).toBe("Marin");
  expect(responseData.results[0].location.country).toBe("Colombia");
  expect(responseData.results[0].location.city).toBe("Bogotá");
});

test("Test: #3 Verificar actualización de UI después de llamada a API", async ({
  page,
}) => {
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

  await page.goto("http://127.0.0.1:5500/modulo3/apiCall-upgraded.html");
  await page.click("#btn");

  // Esperar a que aparezca la tarjeta de usuario (animación)
  await page.waitForSelector(".user-card.show", { timeout: 2000 });

  // Verificar que los datos se actualizan correctamente en la UI
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

test("Test: #4 Flujo completo de llamada a API mockada", async ({ page }) => {
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

  // Interceptar y validar la respuesta
  const responsePromise = page.waitForResponse((response) =>
    response.url().includes("randomuser.me/api/")
  );

  await page.goto("http://127.0.0.1:5500/modulo3/apiCall-upgraded.html");
  await page.click("#btn");

  const response = await responsePromise;
  const body = await response.body();
  const responseData = JSON.parse(body);
  console.log("Flujo completo - Datos recibidos:", responseData);

  expect(responseData.results[0].name.first).toBe("Brayan");
  expect(responseData.results[0].name.last).toBe("Marin");
  expect(responseData.results[0].location.country).toBe("Colombia");

  // Esperar a que aparezca la tarjeta de usuario
  await page.waitForSelector(".user-card.show", { timeout: 2000 });

  // Verificar el resultado final en la UI - múltiples elementos
  await expect(page.locator("#firstName")).toHaveText("Brayan");
  await expect(page.locator("#lastName")).toHaveText("Marin");
  await expect(page.locator("#country")).toHaveText("Colombia");
  await expect(page.locator("#city")).toHaveText("Bogotá");

  // Verificar que la imagen se carga
  const userImage = page.locator("#userImage");
  await expect(userImage).toHaveAttribute(
    "src",
    "https://randomuser.me/api/portraits/med/men/1.jpg"
  );
  await expect(userImage).toHaveAttribute("alt", "Brayan Marin");
});
