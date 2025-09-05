// Importamos las funciones principales de Playwright Test
const { test, expect } = require("@playwright/test");

/**
 * Test #1: Toma un screenshot de la página y lo compara con una imagen de referencia (snapshot).
 */
test("Test: tomando un screenshot screenshot", async ({ page }) => {
  // Navegamos a la página de ejemplo
  await page.goto("https://www.example.com/");
  // Tomamos un screenshot de la página actual
  const screenshot = await page.screenshot();
  // Comparamos el screenshot con el snapshot guardado ('example.png')
  expect(screenshot).toMatchSnapshot("example.png");
});

/**
 * Test #2: Toma screenshots de la página en diferentes tamaños de pantalla (responsive) y los compara con snapshots.
 */
test("Test: Tomando un screenshot de manera responsive (móvil)", async ({
  page,
}) => {
  // Definimos los tamaños de pantalla a probar
  const viewPorts = [
    { width: 320, height: 480 }, // Móvil
    { width: 768, height: 1024 }, // Tablet
    { width: 1920, height: 1080 }, // Escritorio
  ];

  // Iteramos sobre cada tamaño de pantalla
  for (const viewPort of viewPorts) {
    // Establecemos el tamaño de la ventana
    await page.setViewportSize(viewPort);
    // Navegamos a la página de ejemplo
    await page.goto("https://www.example.com");
    // Tomamos un screenshot
    const screenshot = await page.screenshot();
    // Comparamos el screenshot con el snapshot correspondiente al tamaño
    expect(screenshot).toMatchSnapshot(
      `Screenshot de tamaño: ${viewPort.width} x ${viewPort.height}.png`
    );
  }
});
