const { defineConfig, devices } = require('@playwright/test');
const envConfig = require('./config/env.config');
module.exports = defineConfig({
  globalSetup: './config/global-setup',

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
    ['allure-playwright', { resultsDir: `allure-results-${process.env.ENV || 'qauto1'}` }],
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
      name: 'setup',
      testMatch: '**/setup/auth.setup.js',
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testIgnore: ['**/playwrightFixturesAndStorageStateHomeWork/**', '**/playwrightNetworkApiRequestHomeWork/**'],
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      testIgnore: ['**/playwrightFixturesAndStorageStateHomeWork/**', '**/playwrightNetworkApiRequestHomeWork/**'],
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      testIgnore: ['**/playwrightFixturesAndStorageStateHomeWork/**', '**/playwrightNetworkApiRequestHomeWork/**'],
    },
    {
      name: 'chromium:auth',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup'],
      testMatch: ['**/playwrightFixturesAndStorageStateHomeWork/task1.spec.js', '**/playwrightNetworkApiRequestHomeWork/**'],
    },
    {
      name: 'firefox:auth',
      use: { ...devices['Desktop Firefox'] },
      dependencies: ['setup'],
      testMatch: ['**/playwrightFixturesAndStorageStateHomeWork/task1.spec.js', '**/playwrightNetworkApiRequestHomeWork/**'],
    },
    {
      name: 'webkit:auth',
      use: { ...devices['Desktop Safari'] },
      dependencies: ['setup'],
      testMatch: ['**/playwrightFixturesAndStorageStateHomeWork/task1.spec.js', '**/playwrightNetworkApiRequestHomeWork/**'],
    },
  ],
});