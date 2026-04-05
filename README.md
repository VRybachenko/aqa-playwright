# aqa-playwright

A learning project for exploring the [Playwright](https://playwright.dev) test automation framework.

## Project Structure

```
aqa-playwright/
├── pages/          # Page Object classes (HomePage, GaragePage, BasePage)
├── components/     # Reusable UI components (Header, Footer, Hero, SignupModal, Sidebar, GaragePanel, UserNav)
├── fixtures/       # Custom Playwright fixtures (homePage, garagePage, signupModal)
├── helpers/        # Test data generators (userGenerator)
├── tests/
│   └── e2e/        # UI tests
└── playwright.config.js
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
```

Run specific folder or browser:

```bash
npx playwright test tests/e2e/locatorsActionsAndAssertsHomeWork              # specific folder
npx playwright test tests/e2e/locatorsActionsAndAssertsHomeWork/task1.spec.js # specific file
npx playwright test --project=chromium                                        # single browser
npx playwright test --workers=10                                              # set workers count
```

## Allure Report

```bash
# Run tests + generate + open report
npx playwright test tests/e2e/locatorsActionsAndAssertsHomeWork; npx allure generate allure-results --clean && npx allure open

# Clear old reports
rm -rf allure-results allure-report
```

## Tests

| File | Suite | Tests |
|---|---|---|
| `task1.spec.js` | Registration modal | 9 — successful registration, field validation (name, last name, email, password, repeat password), disabled button |
| `task2.spec.js` | Footer social icons | 8 — visibility and href of each social icon, target="_blank", website and email links |
| `task3.spec.js` | Hero section | 6 — title, description, Sign up button, modal opening, video iframe |
| `task4.spec.js` | Header | 12 — logo, nav links, Sign In / Guest log in buttons, modal opening, scroll to sections, redirect |
| `task5.spec.js` | Garage page (guest) | 13 — guest bar, header nav, user nav dropdown, sidebar links, garage heading, Add car button |

**Total: 48 tests** across 3 browsers = **144 test runs**

## Configuration

Key settings in `playwright.config.js`:

| Setting | Value |
|---|---|
| Base URL | `https://qauto.forstudy.space` |
| Browsers | Chromium, Firefox, WebKit |
| Parallel | `fullyParallel: true` |
| Retries | 2 |
| Timeout | 30s |
| Reporter | Allure + HTML + List |
