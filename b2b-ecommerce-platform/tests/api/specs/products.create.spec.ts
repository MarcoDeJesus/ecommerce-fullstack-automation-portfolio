import { expect } from 'chai';
import { api, apiConfig, productsUrl } from '../config/api.config.js';
import {
  buildValidProduct,
  buildInvalidProduct,
  cleanupProducts,
  trackProduct,
  expectFieldError,
  type ErrorResponse,
  type ProductResponse,
} from '../helpers/testData.js';

describe('POST /api/products', () => {
  afterEach(async () => {
    await cleanupProducts();
  });

  it('creates a product successfully', async () => {
    const payload = buildValidProduct();

    const response = await api
      .post(productsUrl())
      .send(payload)
      .timeout(apiConfig.timeout)
      .expect(201);

    const product = response.body as ProductResponse;
    trackProduct(product.id);

    expect(product.id).to.be.a('number');
    expect(product.name).to.equal(payload.name);
    expect(product.price).to.equal(payload.price);
    expect(product.description).to.equal(payload.description);
    expect(product.stock).to.equal(payload.stock);
    expect(product.createdAt).to.be.a('string');
  });

  it('returns 400 when name is missing', async () => {
    const response = await api
      .post(productsUrl())
      .send(buildInvalidProduct('missingName'))
      .timeout(apiConfig.timeout)
      .expect(400);

    expectFieldError(response.body as ErrorResponse, 'name');
  });

  it('returns 400 when price is null', async () => {
    const response = await api
      .post(productsUrl())
      .send(buildInvalidProduct('nullPrice'))
      .timeout(apiConfig.timeout)
      .expect(400);

    expectFieldError(response.body as ErrorResponse, 'price');
  });

  it('returns 400 when price is zero', async () => {
    const response = await api
      .post(productsUrl())
      .send(buildInvalidProduct('zeroPrice'))
      .timeout(apiConfig.timeout)
      .expect(400);

    expectFieldError(response.body as ErrorResponse, 'price', 'greater than 0');
  });

  it('returns 400 when price is negative', async () => {
    const response = await api
      .post(productsUrl())
      .send(buildInvalidProduct('negativePrice'))
      .timeout(apiConfig.timeout)
      .expect(400);

    expectFieldError(response.body as ErrorResponse, 'price', 'greater than 0');
  });

  it('returns 400 when stock is missing', async () => {
    const response = await api
      .post(productsUrl())
      .send(buildInvalidProduct('missingStock'))
      .timeout(apiConfig.timeout)
      .expect(400);

    expectFieldError(response.body as ErrorResponse, 'stock');
  });

  it('returns 400 when stock is zero', async () => {
    const response = await api
      .post(productsUrl())
      .send(buildInvalidProduct('zeroStock'))
      .timeout(apiConfig.timeout)
      .expect(400);

    expectFieldError(response.body as ErrorResponse, 'stock', 'greater than 0');
  });
});
