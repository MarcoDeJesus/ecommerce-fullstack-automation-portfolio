export interface ProductData {
  name: string;
  price: number;
  stock: number;
  description?: string;
}

export const VALIDATION_MESSAGES = {
  nameRequired: 'Name is required',
  pricePositive: 'Price must be greater than 0',
  stockPositive: 'Stock must be greater than 0',
} as const;

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

export function randomProduct(): ProductData {
  const suffix = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
  return {
    name: `Product-${suffix}`,
    price: Math.round((Math.random() * 100 + 1) * 100) / 100,
    stock: Math.floor(Math.random() * 100) + 1,
    description: `Test product ${suffix}`,
  };
}
