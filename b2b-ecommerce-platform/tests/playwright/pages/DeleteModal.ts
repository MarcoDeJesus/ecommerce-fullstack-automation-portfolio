import { expect, type Locator, type Page } from '@playwright/test';

export class DeleteModal {
  readonly page: Page;
  readonly container: Locator;
  readonly confirmButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.container = page
      .locator('.fixed.inset-0')
      .filter({ has: page.getByRole('heading', { name: 'Confirmar eliminación' }) });
    this.confirmButton = this.container.getByRole('button', { name: 'Confirmar eliminación' });
    this.cancelButton = this.container.getByRole('button', { name: 'Cancelar' });
  }

  async expectOpen(productName: string): Promise<void> {
    await expect(this.container).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Confirmar eliminación' })).toBeVisible();
    await expect(this.container.getByText(productName)).toBeVisible();
  }

  async confirm(): Promise<void> {
    await this.confirmButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  async expectClosed(): Promise<void> {
    await expect(this.container).not.toBeVisible();
  }
}
