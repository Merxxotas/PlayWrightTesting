const { test, expect } = require("@playwright/test");

test("Primer Test: Nuestro primer test", async ({ page }) => {
  await page.goto("https://example.com");
  const tittle = await page.title();
  expect(tittle).toBe("Example Domain");
});

test("Segundo Test: Probando que el h1 de example.com tenga algún contenido", async ({
  page,
}) => {
  await page.goto("https://example.com");
  const h1_text = await page.textContent("h1");
  expect(h1_text).not.toBe("");
});

// Test cases usando la página web https://playwright.dev/
test("Tercer Test: Verificando el título de la página de Playwright", async ({
  page,
}) => {
  await page.goto("https://playwright.dev/");
  //Título contenga la palabra Playwright
  await expect(page).toHaveTitle(/Playwright/);
});

test("Cuarto Test: obtener el link 'Get Started'", async ({ page }) => {
  await page.goto("https://playwright.dev/");
  // Hacemos click en el link 'Get Started'
  await page.getByRole("link", { name: "Get started" }).click();
  // Buscamos que la página en cuestión tenga el encabezado 'Installation'
  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible();
});

test("Quinto Test: Comparar con que el atributo href sea el correcto", async ({
  page,
}) => {
  await page.goto("https://example.com");
  await expect(page.locator("a")).toHaveAttribute(
    "href",
    "https://www.iana.org/domains/example"
  );
});
