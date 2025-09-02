const { test, expect } = require("@playwright/test");

test("Test: tomando un screenshot screenshot", async ({ page }) => {
  await page.goto("https://www.example.com/");

  const screenshot = await page.screenshot();

  expect(screenshot).toMatchSnapshot("example.png");
});

test("Test: Tomando un screenshot de manera responsive (móvil)", async ({
  page,
}) => {
  const viewPorts = [
    { width: 320, height: 480 },
    { width: 768, height: 1024 },
    { width: 1920, height: 1080 },
  ];

  for (const viewPort of viewPorts) {
    await page.setViewportSize(viewPort);
    await page.goto("https://www.example.com");
    const screenshot = await page.screenshot();
    expect(screenshot).toMatchSnapshot(
      `Screenshot de tamaño: ${viewPort.width} x ${viewPort.height}.png`
    );
  }
});
