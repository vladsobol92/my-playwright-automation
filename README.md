The site to be tested:

https://uk.bookshop.org/

Useful links

1. https://www.w3.org/TR/wai-aria-1.2/#landmark_roles

Run tests:
npx playwright test tests/bookstore-search.spec.ts --headed

npx playwright test tests/bookstore-search.spec.ts --headed --project=chromium
