const { test, expect } = require("@playwright/test");

const testCases = [
  { input: "test1", expected: "result1" },
  { input: "test2", expected: "result2" },
  { input: "test3", expected: "No result" },
];

test.describe("Serie de Test: Pruebas de búsqueda parametrizadas", () => {
  testCases.forEach(({ input, expected }) => {
    test(`Test: debería mostrar el resultado correcto para la entrada"${input}"`, async ({
      page,
    }) => {
      await page.goto("http://127.0.0.1:5500/modulo3/dataDriven.html");

      await page.fill('input[name="search"]', input);

      await page.click('button[type="submit"]');

      const resultText = await page.textContent("#result");

      expect(resultText).toBe(expected);
    });
  });
});
