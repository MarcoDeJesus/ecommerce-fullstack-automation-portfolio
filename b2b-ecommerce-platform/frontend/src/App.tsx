import { useCallback, useEffect, useState } from 'react'
import { getErrorMessage } from './api/client'
import { isStaticDemo } from './config'
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from './api/products'
import DeleteConfirmationModal from './components/DeleteConfirmationModal'
import ProductForm from './components/ProductForm'
import ProductList from './components/ProductList'
import type { Product, ProductRequest } from './types/product'

const reportHref = (path: string) =>
  `${import.meta.env.BASE_URL}${path}`.replace(/\/+/g, '/')

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getProducts()
      setProducts(data)
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const handleCreate = async (data: ProductRequest) => {
    setIsSubmitting(true)
    setError(null)
    try {
      await createProduct(data)
      await fetchProducts()
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdate = async (data: ProductRequest) => {
    if (!editingProduct) return
    setIsSubmitting(true)
    setError(null)
    try {
      await updateProduct(editingProduct.id, data)
      setEditingProduct(null)
      await fetchProducts()
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteConfirm = async () => {
    if (!deletingProduct) return
    setIsDeleting(true)
    setError(null)
    try {
      await deleteProduct(deletingProduct.id)
      setDeletingProduct(null)
      await fetchProducts()
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">B2B Ecommerce</h1>
          <p className="mt-1 text-gray-600">Product management</p>
        </header>

        {isStaticDemo && (
          <>
            <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              <strong>Static demo on GitHub Pages.</strong> Data is stored only in your
              browser. For a live API with PostgreSQL, run{' '}
              <code className="rounded bg-amber-100 px-1">make up</code> locally.
            </div>
            <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900">
              <strong>Test reports:</strong>{' '}
              <a
                href={reportHref('reports/allure/')}
                className="font-medium text-blue-700 underline hover:text-blue-900"
              >
                Allure
              </a>
              {' · '}
              <a
                href={reportHref('reports/playwright/')}
                className="font-medium text-blue-700 underline hover:text-blue-900"
              >
                Playwright
              </a>
              {' · '}
              <a
                href={reportHref('reports/')}
                className="font-medium text-blue-700 underline hover:text-blue-900"
              >
                All reports
              </a>
            </div>
          </>
        )}

        {error && (
          <div className="mb-6 flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm text-red-700">{error}</p>
            <button
              type="button"
              onClick={fetchProducts}
              className="ml-4 rounded-md bg-red-100 px-3 py-1.5 text-sm font-medium text-red-800 hover:bg-red-200"
            >
              Retry
            </button>
          </div>
        )}

        <div className="mb-6">
          <ProductForm
            mode="create"
            isOpen
            isSubmitting={isSubmitting && !editingProduct}
            onSubmit={handleCreate}
            onCancel={() => {}}
          />
        </div>

        <ProductList
          products={products}
          loading={loading}
          onEdit={setEditingProduct}
          onDelete={setDeletingProduct}
        />

        <ProductForm
          mode="edit"
          initialData={editingProduct ?? undefined}
          isOpen={editingProduct !== null}
          isSubmitting={isSubmitting && editingProduct !== null}
          onSubmit={handleUpdate}
          onCancel={() => setEditingProduct(null)}
        />

        <DeleteConfirmationModal
          product={deletingProduct}
          isOpen={deletingProduct !== null}
          isDeleting={isDeleting}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeletingProduct(null)}
        />
      </div>
    </div>
  )
}

export default App
