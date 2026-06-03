import { test } from '@playwright/test';
import { randomProduct } from '../fixtures/testData';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('Products CRUD', () => {
  let productsPage: ProductsPage;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
    await productsPage.goto();
  });

  test('create product - fill form and verify in table', async () => {
    const product = randomProduct();

    await productsPage.createProduct(product);
    await productsPage.expectProductInTable(product);
  });

  test('edit product - change price and confirm update', async () => {
    const product = randomProduct();
    const updatedPrice = 99.99;

    await productsPage.createProduct(product);
    await productsPage.clickEdit(product.name);
    await productsPage.editForm.expectVisible();
    await productsPage.editForm.fill({ price: updatedPrice });
    await productsPage.editForm.submit();
    await productsPage.waitForProductsLoaded();

    await productsPage.expectProductInTable({ ...product, price: updatedPrice });
  });

  test('delete product - confirm and verify removal', async () => {
    const product = randomProduct();

    await productsPage.createProduct(product);
    await productsPage.clickDelete(product.name);
    await productsPage.deleteModal.expectOpen(product.name);
    await productsPage.deleteModal.confirm();
    await productsPage.waitForProductsLoaded();

    await productsPage.expectProductNotInTable(product.name);
  });

  test('full flow - create, edit, and delete', async () => {
    const product = randomProduct();
    const updatedPrice = 49.5;

    await productsPage.createProduct(product);
    await productsPage.expectProductInTable(product);

    await productsPage.clickEdit(product.name);
    await productsPage.editForm.expectVisible();
    await productsPage.editForm.fill({ price: updatedPrice });
    await productsPage.editForm.submit();
    await productsPage.waitForProductsLoaded();
    await productsPage.expectProductInTable({ ...product, price: updatedPrice });

    await productsPage.clickDelete(product.name);
    await productsPage.deleteModal.expectOpen(product.name);
    await productsPage.deleteModal.confirm();
    await productsPage.waitForProductsLoaded();
    await productsPage.expectProductNotInTable(product.name);
  });
});
