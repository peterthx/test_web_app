# test_web_app

Playwright end-to-end tests for a demo shopping workflow.

**Prerequisites**

- Node.js (>=16) and `npm` installed

**Install**

Run the following to install dependencies and browsers used by Playwright:

```bash
npm install
npx playwright install
```

**Run tests**

- Run all tests (headless):

```bash
npx playwright test
```

- Run tests in headed mode:

```bash
npx playwright test --headed
```

- Run tests for a specific project (example: Desktop Chrome):

```bash
npx playwright test --project=chromium
```

- Run a single test file:

```bash
npx playwright test tests/test-shopping.spec.ts
```

- Start the Playwright interactive runner/UI:

```bash
npx playwright test --ui
```

**View report**

After a test run, open the HTML report with:

```bash
npx playwright show-report
```

**Recommended package.json scripts**

You can add these to `package.json` to simplify running tests:

```json
"scripts": {
  "test": "npx playwright test",
  "test:headed": "npx playwright test --headed",
  "test:chromium": "npx playwright test --project=chromium",
  "test:report": "npx playwright show-report"
}
```

**Notes & Tips**

- These tests target an external site; they may be flaky if the site changes or rate-limits requests. For CI stability prefer fixtures or a controlled test environment when possible.
- Avoid hard-coded timeouts in tests — prefer Playwright's built-in waiting and `expect(locator).toBeVisible()` / `toBeHidden()` assertions.
- To debug a failing test, run with `--headed --debug` and add `test.step()` blocks or `console.log` temporarily.

**Files of interest**

- `tests/test-shopping.spec.ts` — test scenarios for the shopping flow
- `playwright.config.ts` — Playwright configuration

**Contributing**

Feel free to open issues or PRs with improvements to tests, selectors, or CI integration.
# test_web_app
```
npx playwright test
    Runs the end-to-end tests.

  npx playwright test --ui
    Starts the interactive UI mode.

  npx playwright test --project=chromium
    Runs the tests only on Desktop Chrome.

  npx playwright test example
    Runs the tests in a specific file.

  npx playwright test --debug
    Runs the tests in debug mode.

  npx playwright codegen
    Auto generate tests with Codegen.

We suggest that you begin by typing:

    npx playwright test

And check out the following files:
  - ./tests/example.spec.ts - Example end-to-end test
  - ./tests-examples/demo-todo-app.spec.ts - Demo Todo App end-to-end tests
  - ./playwright.config.ts - Playwright Test configuration

  ```