import { test, expect } from '@playwright/test';
import { randomProduct } from '../fixtures/testData';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('Navigation', () => {
  let productsPage: ProductsPage;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
    await productsPage.goto();
  });

  test('homepage carga con título y heading B2B Ecommerce', async ({ page }) => {
    await expect(page).toHaveTitle(/B2B Ecommerce/);
    await productsPage.expectPageLoaded();
  });

  test('secciones principales visibles', async ({ page }) => {
    await productsPage.expectPageLoaded();
    await expect(page.getByRole('columnheader', { name: 'Nombre' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Precio' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Stock' })).toBeVisible();
  });

  test('abrir modal editar y cancelar cierra el modal', async () => {
    const product = randomProduct();

    await productsPage.createProduct(product);
    await productsPage.clickEdit(product.name);
    await productsPage.editForm.expectVisible();
    await productsPage.editForm.cancel();
    await productsPage.editForm.container.waitFor({ state: 'hidden' });
    await productsPage.expectProductInTable(product);
  });

  test('abrir modal eliminar y cancelar cierra el modal', async () => {
    const product = randomProduct();

    await productsPage.createProduct(product);
    await productsPage.clickDelete(product.name);
    await productsPage.deleteModal.expectOpen(product.name);
    await productsPage.deleteModal.cancel();
    await productsPage.deleteModal.expectClosed();
    await productsPage.expectProductInTable(product);
  });
});
