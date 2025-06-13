**Description:**

Small project to demonstrate automation facilities with Playwright and TypeScript

**Facilities:**
1. Test run
2. Parallel run
3. before and after hooks
4. Fixtures with custom baseTest
5. Reporting
6. Screenshot and video saving


**Object of testing:**
https://rahvaraamat.ee/en

**Tests scope:**
- Cart
- Login
- Search

**Useful links**

1. https://www.w3.org/TR/wai-aria-1.2/#landmark_roles
2. https://playwright.dev/

**Example of commands to run tests**
```
- npx playwright test --project=chromium --workers=4
- npx playwright test bookstore --project=firefox --workers=4
- npx playwright test tests/bookstore-search.spec.ts --headed
- npx playwright test tests/bookstore-search.spec.ts --headed --project=chromium --workers=4
```
