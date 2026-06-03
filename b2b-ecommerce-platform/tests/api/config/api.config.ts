import request from 'supertest';

export const apiConfig = {
  baseUrl: process.env.API_BASE_URL ?? 'http://localhost:8080',
  timeout: 10_000,
  productsPath: '/api/products',
} as const;

export const api = request(apiConfig.baseUrl);

export function productsUrl(id?: number): string {
  return id === undefined
    ? apiConfig.productsPath
    : `${apiConfig.productsPath}/${id}`;
}
