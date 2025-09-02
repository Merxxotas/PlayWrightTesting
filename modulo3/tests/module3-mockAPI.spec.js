const { expect, test } = require("@playwright/test");

test("Test: Llamadas a APIs", async ({ page }) => {
  await page.route("https://randomuser.me/api/", async (route) => {
    const mockResponse = {
      results: [
        {
          name: {
            first: "Brayan",
            last: "Marin",
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

  // Interceptar la data solicitada
  page.on("response", (response) => {
    if (response.url().includes("randomuser.me/api/")) {
      response.body().then((body) => {
        const responseData = JSON.parse(body);
        console.log(responseData);

        expect(responseData.results[0].name.first).toBe("Brayan");
        expect(responseData.results[0].name.last).toBe("Marin");
      });
    }
  });

  await page.goto("http://127.0.0.1:5500/modulo3/apiCall.html");
  await page.click("#btn");
  const userData = await page.locator("p");
  await expect(userData).toHaveText(" The new user name is Brayan");
});
