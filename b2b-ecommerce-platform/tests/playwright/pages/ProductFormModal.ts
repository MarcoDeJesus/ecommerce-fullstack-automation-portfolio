import { expect, type Locator, type Page } from '@playwright/test';
import type { ProductData } from '../fixtures/testData';

type FormMode = 'create' | 'edit';

export class ProductFormModal {
  readonly page: Page;
  readonly mode: FormMode;
  readonly container: Locator;
  readonly nameInput: Locator;
  readonly priceInput: Locator;
  readonly stockInput: Locator;
  readonly descriptionInput: Locator;
  readonly submitButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page, mode: FormMode) {
    this.page = page;
    this.mode = mode;

    if (mode === 'edit') {
      this.container = page
        .locator('.fixed.inset-0')
        .filter({ has: page.getByRole('heading', { name: 'Editar producto' }) });
    } else {
      this.container = page
        .locator('.rounded-lg.border')
        .filter({ has: page.getByRole('heading', { name: 'Nuevo producto' }) });
    }

    this.nameInput = page.locator(`#${mode}-name`);
    this.priceInput = page.locator(`#${mode}-price`);
    this.stockInput = page.locator(`#${mode}-stock`);
    this.descriptionInput = page.locator(`#${mode}-description`);
    this.submitButton =
      mode === 'create'
        ? page.getByRole('button', { name: 'Crear producto' })
        : this.container.getByRole('button', { name: 'Guardar cambios' });
    this.cancelButton = this.container.getByRole('button', { name: 'Cancelar' });
  }

  async expectVisible(): Promise<void> {
    if (this.mode === 'edit') {
      await expect(this.container).toBeVisible();
      await expect(this.page.getByRole('heading', { name: 'Editar producto' })).toBeVisible();
    } else {
      await expect(this.page.getByRole('heading', { name: 'Nuevo producto' })).toBeVisible();
    }
  }

  async fill(data: Partial<ProductData>): Promise<void> {
    if (data.name !== undefined) {
      await this.nameInput.fill(data.name);
    }
    if (data.price !== undefined) {
      await this.priceInput.fill(String(data.price));
    }
    if (data.stock !== undefined) {
      await this.stockInput.fill(String(data.stock));
    }
    if (data.description !== undefined) {
      await this.descriptionInput.fill(data.description);
    }
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }

  async disableHtmlValidation(): Promise<void> {
    await this.container.locator('form').evaluate((form: HTMLFormElement) => {
      form.setAttribute('novalidate', '');
    });
  }

  async submitForValidationTest(): Promise<void> {
    await this.disableHtmlValidation();
    await this.submit();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  async expectValidationError(message: string): Promise<void> {
    await expect(this.container.getByText(message)).toBeVisible();
  }
}
