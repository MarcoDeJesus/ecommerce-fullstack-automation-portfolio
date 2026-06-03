import { expect } from 'chai';
import { api, apiConfig, productsUrl } from '../config/api.config.js';
import {
  createProduct,
  cleanupProducts,
  NON_EXISTENT_PRODUCT_ID,
  type ProductResponse,
  type ErrorResponse,
} from '../helpers/testData.js';

describe('GET /api/products', () => {
  let createdProduct: ProductResponse;

  beforeEach(async () => {
    createdProduct = await createProduct();
  });

  afterEach(async () => {
    await cleanupProducts();
  });

  it('lists all products including the created one', async () => {
    const response = await api
      .get(productsUrl())
      .timeout(apiConfig.timeout)
      .expect(200);

    const products = response.body as ProductResponse[];
    expect(products).to.be.an('array');

    const found = products.find((p) => p.id === createdProduct.id);
    expect(found).to.exist;
    expect(found!.name).to.equal(createdProduct.name);
  });
});

describe('GET /api/products/:id', () => {
  let createdProduct: ProductResponse;

  beforeEach(async () => {
    createdProduct = await createProduct();
  });

  afterEach(async () => {
    await cleanupProducts();
  });

  it('returns a product by id', async () => {
    const response = await api
      .get(productsUrl(createdProduct.id))
      .timeout(apiConfig.timeout)
      .expect(200);

    const product = response.body as ProductResponse;
    expect(product.id).to.equal(createdProduct.id);
    expect(product.name).to.equal(createdProduct.name);
    expect(product.price).to.equal(createdProduct.price);
    expect(product.stock).to.equal(createdProduct.stock);
  });

  it('returns 404 when product does not exist', async () => {
    const response = await api
      .get(productsUrl(NON_EXISTENT_PRODUCT_ID))
      .timeout(apiConfig.timeout)
      .expect(404);

    const body = response.body as ErrorResponse;
    expect(body.status).to.equal(404);
    expect(body.message).to.include(String(NON_EXISTENT_PRODUCT_ID));
  });
});
