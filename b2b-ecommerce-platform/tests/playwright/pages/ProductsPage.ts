import { expect, type Locator, type Page } from '@playwright/test';
import { formatPrice, type ProductData } from '../fixtures/testData';
import { DeleteModal } from './DeleteModal';
import { ProductFormModal } from './ProductFormModal';

export class ProductsPage {
  readonly page: Page;
  readonly createForm: ProductFormModal;
  readonly editForm: ProductFormModal;
  readonly deleteModal: DeleteModal;

  constructor(page: Page) {
    this.page = page;
    this.createForm = new ProductFormModal(page, 'create');
    this.editForm = new ProductFormModal(page, 'edit');
    this.deleteModal = new DeleteModal(page);
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
    await this.waitForProductsLoaded();
  }

  async waitForProductsLoaded(): Promise<void> {
    await expect(this.page.getByText('Cargando productos...')).not.toBeVisible();
  }

  async expectPageLoaded(): Promise<void> {
    await expect(this.page).toHaveTitle(/B2B Ecommerce/);
    await expect(this.page.getByRole('heading', { name: 'B2B Ecommerce' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Nuevo producto' })).toBeVisible();
    await expect(this.page.getByText('Gestión de productos')).toBeVisible();
  }

  getRowByName(name: string): Locator {
    return this.page.getByRole('row').filter({ hasText: name });
  }

  async expectProductInTable(data: ProductData): Promise<void> {
    const row = this.getRowByName(data.name);
    await expect(row).toBeVisible();
    await expect(row).toContainText(data.name);
    await expect(row).toContainText(formatPrice(data.price));
    await expect(row).toContainText(String(data.stock));
  }

  async expectProductNotInTable(name: string): Promise<void> {
    await expect(this.getRowByName(name)).not.toBeVisible();
  }

  async clickEdit(name: string): Promise<void> {
    await this.getRowByName(name).getByRole('button', { name: 'Editar' }).click();
  }

  async clickDelete(name: string): Promise<void> {
    await this.getRowByName(name).getByRole('button', { name: 'Eliminar' }).click();
  }

  async createProduct(data: ProductData): Promise<void> {
    await this.createForm.fill(data);
    await this.createForm.submit();
    await this.waitForProductsLoaded();
  }
}
