const { test, expect } = require("@playwright/test");

test("user can log in and see products", async ({ page }) => {
  await page.goto("/");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.getByText("Products")).toBeVisible();
});

test("user can add a product to cart", async ({ page }) => {
  await page.goto("/");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page).toHaveURL(/inventory\.html/);
  const firstAddToCartButton = page.getByRole("button", { name: /add to cart/i }).first();
  await firstAddToCartButton.click();
  await page.getByRole("link", { name: "Shopping Cart" }).click();
  await expect(page).toHaveURL(/cart\.html/);
  const cartItems = page.locator(".cart_item");
  await expect(cartItems).toHaveCount(1);
});
