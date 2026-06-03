import { test, expect } from '@playwright/test';

test.describe('Smoke tests', () => {
  test('homepage loads with B2B Ecommerce title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/B2B Ecommerce/);
    await expect(page.getByRole('heading', { name: 'B2B Ecommerce' })).toBeVisible();
  });

  // TODO: Implementar flujos B2B (login empresa, pedido mínimo, catálogo, checkout)
});
