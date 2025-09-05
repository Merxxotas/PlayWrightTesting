// Importamos las funciones principales de Playwright Test
const { expect, test } = require("@playwright/test");

/**
 * test.describe agrupa una serie de pruebas relacionadas con autenticación.
 * Se recomienda agrupar los tests en vez de hacerlos separados para mantener el contexto y reutilizar lógica.
 */
test.describe("Serie de tests de autenticación", async () => {
  /**
   * Antes de cada test, navegamos a la página de login para asegurar el estado inicial.
   */
  test.beforeEach(async ({ page }) => {
    await page.goto("http://127.0.0.1:5500/modulo2/login.html");
  });

  /**
   * Test: Verifica que el login sea exitoso con credenciales válidas y que se genere la cookie de autenticación.
   */
  test("Test: Debería logear correctamente.", async ({ page }) => {
    // Llenamos los campos de usuario y contraseña con datos válidos
    await page.fill("#username", "user");
    await page.fill("#password", "pass");
    // Enviamos el formulario
    await page.click("button[type='submit']");
    // Verificamos el mensaje de éxito
    await expect(page.locator("#message")).toHaveText("Login successful!");

    // Obtenemos las cookies del contexto y verificamos la cookie de autenticación
    const cookies = await page.context().cookies();
    const authCookie = cookies.find((cookie) => cookie.name === "authToken");
    expect(authCookie).toBeTruthy();
    expect(authCookie.value).toBe("validToken");
  });

  /**
   * Test: Verifica el tratamiento de intentos de login incorrectos.
   */
  test("Test: tratamiento de login incorrectos", async ({ page }) => {
    // Llenamos los campos con credenciales inválidas
    await page.fill("#username", "ajskf");
    await page.fill("#password", "pass1232235345");
    // Enviamos el formulario
    await page.click("button[type='submit']");
    // Verificamos el mensaje de error
    await expect(page.locator("#message")).toHaveText("Invalid credentials");
  });

  /**
   * Test: Verifica el uso y persistencia de cookies entre diferentes contextos de navegador.
   */
  test("Test: uso de cookies", async ({ browser }) => {
    // Creamos el primer contexto y realizamos login
    const context1 = await browser.newContext();
    const page1 = await context1.newPage();

    await page1.goto("http://127.0.0.1:5500/modulo2/login.html");
    await page1.fill("#username", "user");
    await page1.fill("#password", "pass");
    await page1.click("button[type='submit']");
    await expect(page1.locator("#message")).toHaveText("Login successful!");

    // Extraemos las cookies generadas tras el login
    const cookies = await context1.cookies();
    await context1.close();

    // Creamos un nuevo contexto y agregamos las cookies extraídas
    const context2 = await browser.newContext();
    await context2.addCookies(cookies);
    const page2 = await context2.newPage();
    // Navegamos nuevamente a la página de login y verificamos que el usuario sigue autenticado
    await page2.goto("http://127.0.0.1:5500/modulo2/login.html");
    await expect(page2.locator("#message")).toHaveText("Login successful!");

    await context2.close();
  });
});
