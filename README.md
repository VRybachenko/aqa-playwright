# aqa-playwright

A learning project for exploring the [Playwright](https://playwright.dev) test automation framework.

## Project Structure

```
aqa-playwright/
├── pages/          # Page Object classes
├── fixtures/       # Custom Playwright fixtures
├── tests/
│   ├── e2e/        # UI tests
│   └── api/        # API tests
└── test-data/      # Test data (JSON files)
```

## Installation

```bash
npm install
npx playwright install
```

## Running Tests

```bash
npm test                  # run all tests (headless)
npm run test:headed       # run with browser open
npm run test:ui           # open Playwright UI Mode
npm run report            # open HTML report
```

Run specific tests:

```bash
npx playwright test tests/e2e                        # e2e tests only
npx playwright test tests/api                        # api tests only
npx playwright test --project=chromium               # single browser
npx playwright test --debug                          # debug mode
npx playwright codegen <url>                         # record tests by clicking
```

Run a specific test folder or file and open its report:

```bash
npx playwright test tests/e2e/exampleTest                        # run exampleTest folder
npx playwright test tests/e2e/exampleTest/example.spec.js        # run specific file
npx playwright show-report                                       # open report after run
```

Or in one command:

```bash
npx playwright test tests/e2e/exampleTest && npx playwright show-report                        # folder
npx playwright test tests/e2e/exampleTest/example.spec.js && npx playwright show-report        # specific file
```