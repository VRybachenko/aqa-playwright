const { defineConfig, devices } = require('@playwright/test');
const envConfig = require('./config/env.config');

module.exports = defineConfig({
  //Directory with tests
  testDir: './tests',

  //Run tests in parallel
  fullyParallel: true,

  //Maximum number of retries on test failure
  retries: 2,

  //Timeout per test (30 seconds)
  timeout: 30000,

  //Reporter configuration
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['allure-playwright'],
  ],

  use: {
    //Base URL — allows using page.goto('/') instead of full URL
    baseURL: envConfig.baseUrl,

    //HTTP Basic Auth credentials
    httpCredentials: envConfig.httpCredentials,

    //Save screenshots/video only on failure
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    //Run in headless mode by default
    headless: true,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});