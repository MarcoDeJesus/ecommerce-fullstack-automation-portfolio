import apiClient from './client'
import type { Product, ProductRequest } from '../types/product'

export async function getProducts(): Promise<Product[]> {
  const { data } = await apiClient.get<Product[]>('/products')
  return data
}

export async function createProduct(payload: ProductRequest): Promise<Product> {
  const { data } = await apiClient.post<Product>('/products', payload)
  return data
}

export async function updateProduct(id: number, payload: ProductRequest): Promise<Product> {
  const { data } = await apiClient.put<Product>(`/products/${id}`, payload)
  return data
}

export async function deleteProduct(id: number): Promise<void> {
  await apiClient.delete(`/products/${id}`)
}
