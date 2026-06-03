import { test } from '@playwright/test';
import { randomProduct } from '../fixtures/testData';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('Products CRUD', () => {
  let productsPage: ProductsPage;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
    await productsPage.goto();
  });

  test('crear producto - llenar formulario y verificar en tabla', async () => {
    const product = randomProduct();

    await productsPage.createProduct(product);
    await productsPage.expectProductInTable(product);
  });

  test('editar producto - cambiar precio y confirmar actualización', async () => {
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

  test('eliminar producto - confirmar y verificar desaparición', async () => {
    const product = randomProduct();

    await productsPage.createProduct(product);
    await productsPage.clickDelete(product.name);
    await productsPage.deleteModal.expectOpen(product.name);
    await productsPage.deleteModal.confirm();
    await productsPage.waitForProductsLoaded();

    await productsPage.expectProductNotInTable(product.name);
  });

  test('flujo completo - crear, editar y eliminar', async () => {
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
