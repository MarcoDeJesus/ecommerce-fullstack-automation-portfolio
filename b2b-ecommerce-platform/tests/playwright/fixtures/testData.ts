export interface ProductData {
  name: string;
  price: number;
  stock: number;
  description?: string;
}

export const VALIDATION_MESSAGES = {
  nameRequired: 'El nombre es obligatorio',
  pricePositive: 'El precio debe ser mayor que 0',
  stockPositive: 'El stock debe ser mayor que 0',
} as const;

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
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
