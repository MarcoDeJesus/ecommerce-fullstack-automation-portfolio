import { expect } from 'chai';
import { api, apiConfig, productsUrl } from '../config/api.config.js';
import {
  createProduct,
  cleanupProducts,
  trackProduct,
  NON_EXISTENT_PRODUCT_ID,
  type ErrorResponse,
} from '../helpers/testData.js';

describe('DELETE /api/products/:id', () => {
  afterEach(async () => {
    await cleanupProducts();
  });

  it('deletes a product and confirms it no longer exists', async () => {
    const created = await createProduct();

    await api
      .delete(productsUrl(created.id))
      .timeout(apiConfig.timeout)
      .expect(204);

    const getResponse = await api
      .get(productsUrl(created.id))
      .timeout(apiConfig.timeout)
      .expect(404);

    const body = getResponse.body as ErrorResponse;
    expect(body.message).to.include(String(created.id));
  });

  it('returns 404 when product does not exist', async () => {
    const response = await api
      .delete(productsUrl(NON_EXISTENT_PRODUCT_ID))
      .timeout(apiConfig.timeout)
      .expect(404);

    const body = response.body as ErrorResponse;
    expect(body.status).to.equal(404);
    expect(body.message).to.include(String(NON_EXISTENT_PRODUCT_ID));
  });

  it('returns 404 on second delete after product was removed', async () => {
    const created = await createProduct();
    trackProduct(created.id);

    await api
      .delete(productsUrl(created.id))
      .timeout(apiConfig.timeout)
      .expect(204);

    const secondDelete = await api
      .delete(productsUrl(created.id))
      .timeout(apiConfig.timeout)
      .expect(404);

    expect((secondDelete.body as ErrorResponse).status).to.equal(404);
  });
});
