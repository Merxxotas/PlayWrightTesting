// Importamos las funciones principales de Playwright Test
const { test, expect } = require("@playwright/test");

// Los siguientes casos de prueba utilizan las páginas https://example.com y https://playwright.dev/

/**
 * Primer Test: Verifica que el título de la página https://example.com sea "Example Domain"
 */
test("Primer Test: Nuestro primer test", async ({ page }) => {
  // Navegamos a la página de ejemplo
  await page.goto("https://example.com");
  // Obtenemos el título de la página
  const tittle = await page.title();
  // Comprobamos que el título sea exactamente "Example Domain"
  expect(tittle).toBe("Example Domain");
});

/**
 * Segundo Test: Verifica que el elemento h1 de https://example.com tenga contenido
 */
test("Segundo Test: Probando que el h1 de example.com tenga algún contenido", async ({
  page,
}) => {
  // Navegamos a la página de ejemplo
  await page.goto("https://example.com");
  // Obtenemos el texto del elemento h1
  const h1_text = await page.textContent("h1");
  // Comprobamos que el texto no esté vacío
  expect(h1_text).not.toBe("");
});

/**
 * Tercer Test: Verifica que el título de la página de Playwright contenga la palabra "Playwright"
 */
test("Tercer Test: Verificando el título de la página de Playwright", async ({
  page,
}) => {
  // Navegamos a la página oficial de Playwright
  await page.goto("https://playwright.dev/");
  // Comprobamos que el título contenga la palabra "Playwright"
  await expect(page).toHaveTitle(/Playwright/);
});

/**
 * Cuarto Test: Navega al link 'Get Started' y verifica que el encabezado 'Installation' sea visible
 */
test("Cuarto Test: obtener el link 'Get Started'", async ({ page }) => {
  // Navegamos a la página oficial de Playwright
  await page.goto("https://playwright.dev/");
  // Hacemos click en el link 'Get Started'
  await page.getByRole("link", { name: "Get started" }).click();
  // Verificamos que el encabezado 'Installation' esté visible en la nueva página
  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible();
});

/**
 * Quinto Test: Verifica que el atributo href del enlace principal sea el esperado
 */
test("Quinto Test: Comparar con que el atributo href sea el correcto", async ({
  page,
}) => {
  // Navegamos a la página de ejemplo
  await page.goto("https://example.com");
  // Comprobamos que el enlace tenga el atributo href correcto
  await expect(page.locator("a")).toHaveAttribute(
    "href",
    "https://www.iana.org/domains/example"
  );
});
