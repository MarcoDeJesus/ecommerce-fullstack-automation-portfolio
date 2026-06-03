import apiClient from './client'
import { isStaticDemo } from '../config'
import {
  demoCreateProduct,
  demoDeleteProduct,
  demoGetProducts,
  demoUpdateProduct,
} from '../demo/demoStore'
import type { Product, ProductRequest } from '../types/product'

export async function getProducts(): Promise<Product[]> {
  if (isStaticDemo) return demoGetProducts()
  const { data } = await apiClient.get<Product[]>('/products')
  return data
}

export async function createProduct(payload: ProductRequest): Promise<Product> {
  if (isStaticDemo) return demoCreateProduct(payload)
  const { data } = await apiClient.post<Product>('/products', payload)
  return data
}

export async function updateProduct(id: number, payload: ProductRequest): Promise<Product> {
  if (isStaticDemo) return demoUpdateProduct(id, payload)
  const { data } = await apiClient.put<Product>(`/products/${id}`, payload)
  return data
}

export async function deleteProduct(id: number): Promise<void> {
  if (isStaticDemo) return demoDeleteProduct(id)
  await apiClient.delete(`/products/${id}`)
}
