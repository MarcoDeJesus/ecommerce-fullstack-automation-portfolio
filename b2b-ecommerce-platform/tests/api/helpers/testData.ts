import { expect } from 'chai';
import { api, apiConfig, productsUrl } from '../config/api.config.js';

export interface ProductRequest {
  name?: string | null;
  price?: number | null;
  description?: string;
  stock?: number | null;
}

export interface ProductResponse {
  id: number;
  name: string;
  price: number;
  description?: string;
  stock: number;
  createdAt: string;
}

export interface FieldError {
  field: string;
  message: string;
}

export interface ErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
  fieldErrors: FieldError[] | null;
}

export const NON_EXISTENT_PRODUCT_ID = 9_999_999_999;

export type InvalidProductVariant =
  | 'missingName'
  | 'nullPrice'
  | 'zeroPrice'
  | 'negativePrice'
  | 'missingStock'
  | 'zeroStock';

const createdIds: number[] = [];

export function buildValidProduct(
  overrides: Partial<ProductRequest> = {},
): ProductRequest {
  const suffix = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  return {
    name: `Test Product ${suffix}`,
    price: 49.99,
    description: 'API test product',
    stock: 100,
    ...overrides,
  };
}

export function buildInvalidProduct(
  variant: InvalidProductVariant,
): ProductRequest {
  const base = buildValidProduct();

  switch (variant) {
    case 'missingName':
      return { ...base, name: undefined };
    case 'nullPrice':
      return { ...base, price: null };
    case 'zeroPrice':
      return { ...base, price: 0 };
    case 'negativePrice':
      return { ...base, price: -1 };
    case 'missingStock':
      return { ...base, stock: undefined };
    case 'zeroStock':
      return { ...base, stock: 0 };
    default:
      return base;
  }
}

export function trackProduct(id: number): void {
  if (!createdIds.includes(id)) {
    createdIds.push(id);
  }
}

export async function cleanupProducts(): Promise<void> {
  await Promise.all(
    createdIds.map((id) =>
      api
        .delete(productsUrl(id))
        .timeout(apiConfig.timeout)
        .catch(() => {}),
    ),
  );
  createdIds.length = 0;
}

export async function createProduct(
  payload: ProductRequest = buildValidProduct(),
): Promise<ProductResponse> {
  const response = await api
    .post(productsUrl())
    .send(payload)
    .timeout(apiConfig.timeout)
    .expect(201);

  const product = response.body as ProductResponse;
  trackProduct(product.id);
  return product;
}

export function expectFieldError(
  body: ErrorResponse,
  field: string,
  messageSubstring?: string,
): void {
  expect(body.status).to.equal(400);
  expect(body.fieldErrors).to.be.an('array');
  const fieldError = body.fieldErrors!.find((e) => e.field === field);
  expect(fieldError, `expected fieldErrors to include "${field}"`).to.exist;
  if (messageSubstring) {
    expect(fieldError!.message.toLowerCase()).to.include(
      messageSubstring.toLowerCase(),
    );
  }
}
