// Importamos únicamente los navegadores que existen en Playwright
const { chromium, firefox } = require("playwright");

/**
 * Función principal para automatizar la apertura de navegadores y realizar acciones básicas.
 * @param {object} browserType - El tipo de navegador (chromium, firefox).
 * @param {object} launchOptions - Opciones adicionales para el lanzamiento del navegador.
 * @returns {Promise<void>} - No retorna nada, pero realiza acciones de automatización.
 */
const automation = async (browserType, launchOptions = {}) => {
  // Definimos las opciones de lanzamiento, por defecto el navegador NO será headless
  const options = { headless: false, ...launchOptions };
  // Lanzamos el navegador con las opciones especificadas
  const browser = await browserType.launch(options);
  // Creamos un nuevo contexto de navegador (aislamiento de sesión)
  const context = await browser.newContext();
  // Abrimos una nueva página dentro del contexto
  const page = await context.newPage();
  // Obtenemos el nombre del navegador, usando el canal si está definido
  const browserName = launchOptions.channel || browserType.name();
  // Navegamos a la página de ejemplo
  await page.goto("https://example.com");
  // Mostramos el título de la página en consola, indicando el navegador usado
  console.log(
    `El título de la página en ${browserName} es: `,
    await page.title()
  );
  // Tomamos una captura de pantalla y la guardamos en la carpeta screenshots
  await page.screenshot({
    path: `screenshots/example-${browserName}.png`,
  });
  // Esperamos 3 segundos antes de cerrar el navegador (para visualizar la acción)
  await new Promise((resolve) => setTimeout(resolve, 3000));
  // Cerramos el navegador
  await browser.close();
};

// Ejecutamos la automatización en diferentes navegadores y canales
// Chromium por defecto
automation(chromium);
// Firefox por defecto
automation(firefox);
// Google Chrome (usando el canal "chrome")
automation(chromium, { channel: "chrome" });
// Microsoft Edge (usando el canal "msedge")
automation(chromium, { channel: "msedge" });
