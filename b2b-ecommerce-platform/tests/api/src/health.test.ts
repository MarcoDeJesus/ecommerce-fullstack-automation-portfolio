import axios from 'axios';
import { describe, it, expect } from 'vitest';

const BASE_URL = process.env.API_BASE_URL ?? 'http://localhost:8080';

describe('Health API', () => {
  it('GET /api/health returns status UP', async () => {
    const response = await axios.get(`${BASE_URL}/api/health`);
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ status: 'UP' });
  });
});

// TODO: Implementar tests de productos, autenticación B2B y pedidos
