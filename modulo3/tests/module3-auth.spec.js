const { expect, test } = require("@playwright/test");

// TEST.DESCRIBE REALIZA UNA SERIE DE TESTS, Y NO HACER TESTS "SEPARADOS"
test.describe("Serie de tests de autenticación", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://127.0.0.1:5500/modulo2/login.html");
  });

  test("Test: Debería logear correctamente.", async ({ page }) => {
    await page.fill("#username", "user");
    await page.fill("#password", "pass");
    await page.click("button[type='submit']");
    await expect(page.locator("#message")).toHaveText("Login successful!");

    const cookies = await page.context().cookies();
    const authCookie = cookies.find((cookie) => cookie.name === "authToken");
    expect(authCookie).toBeTruthy();
    expect(authCookie.value).toBe("validToken");
  });

  test("Test: tratamiento de login incorrectos", async ({ page }) => {
    await page.fill("#username", "ajskf");
    await page.fill("#password", "pass1232235345");
    await page.click("button[type='submit']");
    await expect(page.locator("#message")).toHaveText("Invalid credentials");
  });

  test("Test: uso de cookies", async ({ browser }) => {
    //primer context
    const context1 = await browser.newContext();
    const page1 = await context1.newPage();

    await page1.goto("http://127.0.0.1:5500/modulo2/login.html");
    await page1.fill("#username", "user");
    await page1.fill("#password", "pass");
    await page1.click("button[type='submit']");
    await expect(page1.locator("#message")).toHaveText("Login successful!");

    //Extraer las cookies
    const cookies = await context1.cookies();
    await context1.close();

    // Create a new context
    const context2 = await browser.newContext();
    await context2.addCookies(cookies);
    const page2 = await context2.newPage();
    await page2.goto("http://127.0.0.1:5500/modulo2/login.html");
    await expect(page2.locator("#message")).toHaveText("Login successful!");

    await context2.close();
  });
});
