The site to be tested:

https://rahvaraamat.ee/en

Useful links

1. https://www.w3.org/TR/wai-aria-1.2/#landmark_roles

Run tests:
npx playwright test tests/bookstore-search.spec.ts --headed

npx playwright test tests/bookstore-search.spec.ts --headed --project=chromium --workers=4

npx playwright test --project=chromium --workers=4
npx playwright test bookstore --project=firefox --workers=4
