# test_web_app

Playwright end-to-end tests covering a demo shopping workflow on an external website. These tests demonstrate common Playwright test patterns and can be a starting point for building robust E2E suites.

## Quick start

1. Install Node.js (>=16) and npm
2. Install project dependencies and Playwright browsers:

```bash
npm install
npx playwright install
```

3. Run all tests:

```bash
npx playwright test
```

## Running tests — examples

- Run all tests (headless):

```bash
npx playwright test
```

- Run tests in headed mode (shows browsers):

```bash
npx playwright test --headed
```

- Run tests only on Desktop Chrome (project defined in `playwright.config.ts`):

```bash
npx playwright test --project=chromium
```

- Run a single test file:

```bash
npx playwright test tests/test-shopping.spec.ts
```

- Run a single test by title (use -g for a grep expression):

```bash
npx playwright test -g "Select filter"
```

- Start the Playwright interactive runner / UI:

```bash
npx playwright test --ui
```

## Debugging & Reports

- Run with `--debug --headed` to step-through tests and use the Playwright Inspector:

```bash
npx playwright test --debug --headed
```

- After a test run, open the HTML report with:

```bash
npx playwright show-report
```

## Recommended `package.json` scripts

Add the following scripts for convenience (not applied automatically):

```json
"scripts": {
  "test": "npx playwright test",
  "test:headed": "npx playwright test --headed",
  "test:chromium": "npx playwright test --project=chromium",
  "test:report": "npx playwright show-report",
  "test:ui": "npx playwright test --ui"
}
```

> Tip: If you add the above scripts, run tests quickly with `npm test`, `npm run test:headed`, etc.

## Notes & Best Practices

- These tests navigate an external site. For CI reliability, prefer stable test data, mocks, or a dedicated test environment.
- Avoid arbitrary timeouts such as `waitForTimeout()`; use Playwright's auto-waiting (`locator.waitFor`, `expect(locator).toBeVisible()`) or `await Promise.all([page.waitForNavigation(), clickAction])` when navigation is expected.
- Prefer resilient, semantic locators (e.g., `getByRole`, `getByText`) and avoid fragile DOM-based selectors when possible.
- Use `test.step()` and descriptive names to make reports easier to read.

## Files of interest

- `tests/test-shopping.spec.ts` — E2E tests for the shopping flow (selectors, navigation, and assertions)
- `playwright.config.ts` — Playwright configuration and project definitions

## Troubleshooting

- If tests are slow or failing due to resource limits: run with fewer workers (`npx playwright test --workers=1`).
- If Playwright browsers are missing, run `npx playwright install`.
- If a test fails due to a UI change on the target site, inspect the DOM and update selectors accordingly.

## Contributing

Contributions are welcome — open a PR to update tests, fix flaky selectors, or add CI integration.

## License & Code of Conduct

This repository doesn't contain a license or code of conduct; add `LICENSE`/`CODE_OF_CONDUCT` files if you plan to accept contributions.
# test_web_app

Playwright end-to-end testing suite for the demo shopping workflow.

## 🚀 Getting Started

### Prerequisites

* **Node.js**: Version 16 or higher.
* **npm**: Installed automatically with Node.js.

### Installation

Clone the repository and run the following commands to install dependencies and the necessary browser binaries:

```bash
npm install
npx playwright install

```

## Usage
```
Action	Command	Description
Run All	npx playwright test	Runs all tests in headless mode (default).
Headed Mode	npx playwright test --headed	Runs tests with the browser window visible.
UI Mode	npx playwright test --ui	Opens the interactive Playwright Test UI (recommended for local dev).
Specific Project	npx playwright test --project=chromium	Runs tests on a specific browser (e.g., Chromium, Firefox).
Single File	npx playwright test tests/test-shopping.spec.ts	Runs a specific test file.
Debug Mode	npx playwright test --debug	Runs tests with the Playwright Inspector attached.

```

# Shortcuts
```

"scripts": {
  "test": "npx playwright test",
  "test:ui": "npx playwright test --ui",
  "test:headed": "npx playwright test --headed",
  "test:chrome": "npx playwright test --project=chromium",
  "report": "npx playwright show-report"
}

```