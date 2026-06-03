import { test } from '@playwright/test';
import { randomProduct, VALIDATION_MESSAGES } from '../fixtures/testData';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('Form validations', () => {
  let productsPage: ProductsPage;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
    await productsPage.goto();
  });

  test('empty name - shows validation error', async () => {
    const product = randomProduct();

    await productsPage.createForm.fill({ ...product, name: '   ' });
    await productsPage.createForm.submitForValidationTest();
    await productsPage.createForm.expectValidationError(VALIDATION_MESSAGES.nameRequired);
    await productsPage.expectProductNotInTable(product.name);
  });

  test('negative price - shows validation error', async () => {
    const product = randomProduct();

    await productsPage.createForm.fill({ ...product, price: -1 });
    await productsPage.createForm.submitForValidationTest();
    await productsPage.createForm.expectValidationError(VALIDATION_MESSAGES.pricePositive);
    await productsPage.expectProductNotInTable(product.name);
  });

  test('zero price - shows validation error', async () => {
    const product = randomProduct();

    await productsPage.createForm.fill({ ...product, price: 0 });
    await productsPage.createForm.submitForValidationTest();
    await productsPage.createForm.expectValidationError(VALIDATION_MESSAGES.pricePositive);
    await productsPage.expectProductNotInTable(product.name);
  });
});
