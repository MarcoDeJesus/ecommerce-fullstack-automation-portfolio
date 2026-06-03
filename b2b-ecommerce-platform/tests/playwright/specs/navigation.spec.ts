import { test, expect } from '@playwright/test';
import { randomProduct } from '../fixtures/testData';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('Navigation', () => {
  let productsPage: ProductsPage;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
    await productsPage.goto();
  });

  test('homepage loads with title and B2B Ecommerce heading', async ({ page }) => {
    await expect(page).toHaveTitle(/B2B Ecommerce/);
    await productsPage.expectPageLoaded();
  });

  test('main sections are visible', async ({ page }) => {
    await productsPage.expectPageLoaded();
    await expect(page.getByRole('columnheader', { name: 'Name' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Price' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Stock' })).toBeVisible();
  });

  test('open edit modal and cancel closes the modal', async () => {
    const product = randomProduct();

    await productsPage.createProduct(product);
    await productsPage.clickEdit(product.name);
    await productsPage.editForm.expectVisible();
    await productsPage.editForm.cancel();
    await productsPage.editForm.container.waitFor({ state: 'hidden' });
    await productsPage.expectProductInTable(product);
  });

  test('open delete modal and cancel closes the modal', async () => {
    const product = randomProduct();

    await productsPage.createProduct(product);
    await productsPage.clickDelete(product.name);
    await productsPage.deleteModal.expectOpen(product.name);
    await productsPage.deleteModal.cancel();
    await productsPage.deleteModal.expectClosed();
    await productsPage.expectProductInTable(product);
  });
});
