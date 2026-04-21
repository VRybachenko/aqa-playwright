# aqa-playwright

A learning project for exploring the [Playwright](https://playwright.dev) test automation framework.

## Project Structure

```
aqa-playwright/
├── config/         # Environment config (reads from .env)
├── pages/          # Page Object classes (HomePage, GaragePage, ProfilePage, BasePage)
├── components/     # Reusable UI components (Header, Footer, Hero, SignupModal, Sidebar, GaragePanel, UserNav, ProfilePanel)
├── controllers/    # API controller classes (CarsController)
├── fixtures/       # Custom Playwright fixtures (homePage, garagePage, signupModal, userGaragePage, userProfilePage, userApiContext)
├── helpers/        # Test data generators (userGenerator)
├── test-data/      # Shared constants and storage state
│   └── constants.js           # STORAGE_STATE path
│   └── user.storageState.json # saved auth session (git-ignored)
├── tests/
│   ├── setup/      # Auth setup (registers user, saves storageState)
│   └── e2e/        # UI and API tests
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

| Variable | Description |
|---|---|
| `BASE_URL` | Base URL of the environment (stored in GitHub Secrets) |
| `HTTP_USERNAME` | Basic Auth username (stored in GitHub Secrets) |
| `HTTP_PASSWORD` | Basic Auth password (stored in GitHub Secrets) |

> `.env.qauto1` and `.env.qauto2` are git-ignored and never committed. Use `.env.example` as a reference.

## Running Tests

```bash
npm test                  # run all tests (headless)
npm run test:headed       # run with browser open
npm run test:ui           # open Playwright UI Mode
```

Run specific folder, file, or browser:

```bash
npx playwright test tests/e2e/locatorsActionsAndAssertsHomeWork              # specific folder
npx playwright test tests/e2e/locatorsActionsAndAssertsHomeWork/task1.spec.js # specific file
npx playwright test --project=chromium                                        # single browser
npx playwright test --workers=10                                              # set workers count
```

Run by tag:

```bash
npx playwright test --grep @smoke         # smoke tests only
npx playwright test --grep-invert @smoke  # all tests except smoke
```

Run on specific environment:

```bash
# qauto1 (default)
npx playwright test

# qauto2
ENV=qauto2 npx playwright test
```

## Authentication & Storage State

Tests in `playwrightFixturesAndStorageStateHomeWork/`, `playwrightNetworkApiRequestHomeWork/` use a pre-authenticated user via Playwright's `storageState`.

How it works:
1. `setup` project runs `tests/setup/auth.setup.js` — registers a random user and saves the browser session to `test-data/user.storageState.json`
2. `userGaragePage`, `userProfilePage`, `userApiContext` fixtures load the saved session into a new browser/API context — the user is already logged in
3. `chromium:auth`, `firefox:auth`, `webkit:auth` projects run auth tests with `dependencies: ['setup']`

```
setup (register user + save storageState)
  ↓
chromium:auth → playwrightFixturesAndStorageStateHomeWork/
firefox:auth  → playwrightFixturesAndStorageStateHomeWork/
webkit:auth   → playwrightFixturesAndStorageStateHomeWork/
              → playwrightNetworkApiRequestHomeWork/
```

> `user.storageState.json` is git-ignored — it contains session tokens and is regenerated on every test run.

## API Testing

API tests use Playwright's `APIRequestContext` via the `userApiContext` fixture and controller classes from `controllers/`.

Controllers wrap all API calls for a given resource — analogous to Page Objects for UI:

```js
const carsController = new CarsController(userApiContext);
const response = await carsController.create({ carBrandId: 1, carModelId: 1, mileage: 122 });
```

For unauthenticated scenarios the built-in `request` fixture is used (has `baseURL` + `httpCredentials` from config, but no session cookie).

## Allure Report

```bash
# qauto1
npx playwright test tests/e2e/locatorsActionsAndAssertsHomeWork
npx allure generate allure-results-qauto1 --clean -o allure-report-qauto1 && npx allure open allure-report-qauto1

# qauto2
ENV=qauto2 npx playwright test tests/e2e/locatorsActionsAndAssertsHomeWork
npx allure generate allure-results-qauto2 --clean -o allure-report-qauto2 && npx allure open allure-report-qauto2

# quick serve (generate + open in one command)
npx allure serve allure-results-qauto1
```

## CI / GitHub Actions

Runs automatically on every push and pull request via GitHub Actions on both environments (`qauto1`, `qauto2`) in parallel.

Only tests tagged `@smoke` are executed in CI. To mark a test as smoke — add `@smoke` to its name:

```js
test('[Test][Positive] : Some test @smoke', async ({ page }) => { ... });
```

Required GitHub secrets:

| Secret | Description |
|---|---|
| `BASE_URL_QAUTO1` | Base URL for qauto1 environment |
| `BASE_URL_QAUTO2` | Base URL for qauto2 environment |
| `HTTP_USERNAME` | Basic Auth username (stored in GitHub Secrets) |
| `HTTP_PASSWORD` | Basic Auth password (stored in GitHub Secrets) |

## Tests

| File | Suite | Tests |
|---|---|---|
| `locatorsActionsAndAssertsHomeWork/task1.spec.js` | Registration modal | 9 — successful registration, field validation |
| `locatorsActionsAndAssertsHomeWork/task2.spec.js` | Footer social icons | 8 — visibility, href, target="_blank" |
| `locatorsActionsAndAssertsHomeWork/task3.spec.js` | Hero section | 6 — title, description, Sign up button, video iframe |
| `locatorsActionsAndAssertsHomeWork/task4.spec.js` | Header | 12 — logo, nav links, Sign In / Guest log in buttons |
| `locatorsActionsAndAssertsHomeWork/task5.spec.js` | Garage page (guest) | 13 — guest bar, header nav, dropdown, sidebar |
| `playwrightFixturesAndStorageStateHomeWork/task1.spec.js` | Garage page (authorized) | 3 — heading, Add car button, no guest bar |
| `playwrightNetworkApiRequestHomeWork/task1.spec.js` | Profile page – network mock | 1 — mocked name/lastName displayed on profile page |
| `playwrightNetworkApiRequestHomeWork/task2.spec.js` | POST /api/cars | 3 — create car (201), invalid brandId (404), unauthenticated (401) |

## Configuration

Key settings in `playwright.config.js`:

| Setting | Value |
|---|---|
| Base URL | from `.env.qauto1` / `.env.qauto2` → `BASE_URL` |
| Browsers | Chromium, Firefox, WebKit |
| Auth browsers | Chromium:auth, Firefox:auth, Webkit:auth (depend on setup) |
| Parallel | `fullyParallel: true` |
| Retries | 2 |
| Timeout | 30s |
| Reporter | Allure + HTML + List |