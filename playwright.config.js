const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 60000,
  retries: 1,
  use: {
    baseURL: "https://www.saucedemo.com",
    headless: false,
    screenshot: "only-on-failure",
    trace: "on-first-retry"
  },
  reporter: [
    ["list"],
    ["html", { outputFolder: "playwright-report", open: "never" }]
  ],
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] }
    }
  ]
});
