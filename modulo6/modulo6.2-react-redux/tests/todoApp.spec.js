// tests/todo-app.spec.js
import { expect, test } from "@playwright/test";

test.describe("Serie de tests para: Todo App", () => {
  test.beforeEach(async ({ page }) => {
    // Ir a la página de la aplicación antes de cada test
    await page.goto("http://localhost:5173"); // reemplaza con la URL correcta cuando hagas 'npm run dev'
  });

  test("Test: Debería mostrar el título", async ({ page }) => {
    // Validar que el título se muestra correctamente
    const title = await page.locator("h1");
    await expect(title).toHaveText("TODO APP");
  });

  test("Test: Debería permitir a los usuarios agregar un todo", async ({
    page,
  }) => {
    // Añadir un nuevo elemento al Todo
    await page.fill(
      'input[placeholder="Añadir un todo"]',
      "Añadiendo un elemento al Todo mediante Playwright"
    );
    await page.click('button:has-text("Añadir")');

    // Check if the todo is displayed
    const todoItem = await page.locator("li", {
      hasText: "Añadiendo un elemento al Todo mediante Playwright",
    });
    await expect(todoItem).toBeVisible();
  });

  test("Test: Debería permitir a los usuarios completar(tachar) un todo", async ({
    page,
  }) => {
    await page.fill(
      'input[placeholder="Añadir un todo"]',
      "Tachando un elemento al Todo mediante Playwright"
    );
    await page.click('button:has-text("Añadir")');

    const toggleButton = page.locator(
      'li >> button:has-text("Completar (Tachar)")'
    );
    await toggleButton.click();

    const todoItem = page.locator("li", {
      hasText: "Tachando un elemento al Todo mediante Playwright",
    });
    await expect(todoItem).toHaveCSS(
      "text-decoration",
      "line-through rgb(33, 53, 71)"
    );
  });

  test("Test: Debería permitir a los usuarios borrar un todo", async ({
    page,
  }) => {
    await page.fill(
      'input[placeholder="Añadir un todo"]',
      "Borrando un elemento al Todo mediante Playwright"
    );
    await page.click('button:has-text("Añadir")');

    // Borrar un elemento del Todo
    const deleteButton = page.locator('li >> button:has-text("Borrar")');
    await deleteButton.click();

    // Validar si el elemento ha sido borrado
    const todoItem = page.locator("li", {
      hasText: "Borrando un elemento al Todo mediante Playwright",
    });
    await expect(todoItem).not.toBeVisible();
  });
});
