export interface Product {
  id: number
  name: string
  price: number
  description: string | null
  stock: number
  createdAt: string
}

export interface ProductRequest {
  name: string
  price: number
  description?: string
  stock: number
}
