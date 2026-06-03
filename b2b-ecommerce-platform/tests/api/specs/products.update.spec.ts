import { expect } from 'chai';
import { api, apiConfig, productsUrl } from '../config/api.config.js';
import {
  createProduct,
  cleanupProducts,
  buildValidProduct,
  NON_EXISTENT_PRODUCT_ID,
  expectFieldError,
  type ProductResponse,
  type ErrorResponse,
} from '../helpers/testData.js';

describe('PUT /api/products/:id', () => {
  let createdProduct: ProductResponse;

  beforeEach(async () => {
    createdProduct = await createProduct();
  });

  afterEach(async () => {
    await cleanupProducts();
  });

  it('updates a product successfully', async () => {
    const updatedPayload = buildValidProduct({
      name: `Updated ${createdProduct.name}`,
      price: 99.99,
      description: 'Updated description',
      stock: 50,
    });

    const response = await api
      .put(productsUrl(createdProduct.id))
      .send(updatedPayload)
      .timeout(apiConfig.timeout)
      .expect(200);

    const product = response.body as ProductResponse;
    expect(product.id).to.equal(createdProduct.id);
    expect(product.name).to.equal(updatedPayload.name);
    expect(product.price).to.equal(updatedPayload.price);
    expect(product.description).to.equal(updatedPayload.description);
    expect(product.stock).to.equal(updatedPayload.stock);
  });

  it('returns 404 when product does not exist', async () => {
    const response = await api
      .put(productsUrl(NON_EXISTENT_PRODUCT_ID))
      .send(buildValidProduct())
      .timeout(apiConfig.timeout)
      .expect(404);

    const body = response.body as ErrorResponse;
    expect(body.status).to.equal(404);
    expect(body.message).to.include(String(NON_EXISTENT_PRODUCT_ID));
  });

  it('returns 400 when request body is invalid', async () => {
    const response = await api
      .put(productsUrl(createdProduct.id))
      .send(buildValidProduct({ price: -1 }))
      .timeout(apiConfig.timeout)
      .expect(400);

    expectFieldError(response.body as ErrorResponse, 'price', 'greater than 0');
  });
});
