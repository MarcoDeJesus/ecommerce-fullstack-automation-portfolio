import type { Product } from '../types/product'

interface ProductListProps {
  products: Product[]
  loading: boolean
  onEdit: (product: Product) => void
  onDelete: (product: Product) => void
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(price)
}

export default function ProductList({
  products,
  loading,
  onEdit,
  onDelete,
}: ProductListProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center rounded-lg border border-gray-200 bg-white p-12">
        <p className="text-gray-500">Cargando productos...</p>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
        <p className="text-gray-500">No hay productos</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              ID
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Nombre
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Precio
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Stock
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                {product.id}
              </td>
              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                {product.name}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700">
                {formatPrice(product.price)}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700">
                {product.stock}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-right text-sm">
                <button
                  type="button"
                  onClick={() => onEdit(product)}
                  className="mr-2 rounded-md bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200"
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(product)}
                  className="rounded-md bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-100"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
