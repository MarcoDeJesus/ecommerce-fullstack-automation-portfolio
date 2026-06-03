import type { Product, ProductRequest } from '../types/product'

const initialProducts: Product[] = [
  {
    id: 1,
    name: 'Industrial Widget',
    price: 49.99,
    description: 'Heavy-duty widget for B2B orders',
    stock: 500,
    createdAt: '2026-01-15T10:00:00Z',
  },
  {
    id: 2,
    name: 'Steel Bracket Kit',
    price: 129.5,
    description: 'Corrosion-resistant mounting kit',
    stock: 120,
    createdAt: '2026-01-20T14:30:00Z',
  },
  {
    id: 3,
    name: 'Hydraulic Seal Pack',
    price: 24.0,
    description: 'Standard seals for maintenance cycles',
    stock: 800,
    createdAt: '2026-02-01T09:15:00Z',
  },
]

let products = [...initialProducts]
let nextId = products.length + 1

function delay(ms = 150): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function demoGetProducts(): Promise<Product[]> {
  await delay()
  return [...products]
}

export async function demoCreateProduct(payload: ProductRequest): Promise<Product> {
  await delay()
  const product: Product = {
    id: nextId++,
    name: payload.name,
    price: payload.price,
    description: payload.description ?? null,
    stock: payload.stock,
    createdAt: new Date().toISOString(),
  }
  products = [...products, product]
  return product
}

export async function demoUpdateProduct(
  id: number,
  payload: ProductRequest
): Promise<Product> {
  await delay()
  const index = products.findIndex((p) => p.id === id)
  if (index === -1) {
    throw new Error('Product not found')
  }
  const updated: Product = {
    ...products[index],
    name: payload.name,
    price: payload.price,
    description: payload.description ?? null,
    stock: payload.stock,
  }
  products = products.map((p) => (p.id === id ? updated : p))
  return updated
}

export async function demoDeleteProduct(id: number): Promise<void> {
  await delay()
  products = products.filter((p) => p.id !== id)
}
