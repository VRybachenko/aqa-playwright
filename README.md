# aqa-playwright

A learning project for exploring the [Playwright](https://playwright.dev) test automation framework.

## Project Structure

```
aqa-playwright/
├── config/         # Environment config (reads from .env)
├── pages/          # Page Object classes (HomePage, GaragePage, BasePage)
├── components/     # Reusable UI components (Header, Footer, Hero, SignupModal, Sidebar, GaragePanel, UserNav)
├── fixtures/       # Custom Playwright fixtures (homePage, garagePage, signupModal)
├── helpers/        # Test data generators (userGenerator)
├── tests/
│   └── e2e/        # UI tests
├── .env.example    # Environment variables template
└── playwright.config.js
```

## Installation

```bash
npm install
npx playwright install
```

## Environment Setup

The project supports two environments. Copy `.env.example` and fill in the values:

```bash
cp .env.example .env.qauto1
cp .env.example .env.qauto2
```

| Variable | qauto1 | qauto2 |
|---|---|---|
| `BASE_URL` | `https://qauto.forstudy.space` | `https://qauto2.forstudy.space` |
| `HTTP_USERNAME` | `guest` | `guest` |
| `HTTP_PASSWORD` | `welcome2qauto` | `welcome2qauto` |

> `.env.qauto1` and `.env.qauto2` are git-ignored and never committed. Use `.env.example` as a reference.

## Running Tests on Specific Environment

```bash
# qauto1 (default)
npx playwright test tests/e2e/locatorsActionsAndAssertsHomeWork

# qauto2
ENV=qauto2 npx playwright test tests/e2e/locatorsActionsAndAssertsHomeWork
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
| Base URL | from `.env.qauto1` / `.env.qauto2` → `BASE_URL` |
| Browsers | Chromium, Firefox, WebKit |
| Parallel | `fullyParallel: true` |
| Retries | 2 |
| Timeout | 30s |
| Reporter | Allure + HTML + List |
