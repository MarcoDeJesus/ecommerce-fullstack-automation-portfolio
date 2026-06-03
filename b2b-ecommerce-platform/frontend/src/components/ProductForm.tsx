import { useEffect, useState } from 'react'
import type { Product, ProductRequest } from '../types/product'

interface ProductFormProps {
  mode: 'create' | 'edit'
  initialData?: Product
  isOpen: boolean
  isSubmitting: boolean
  onSubmit: (data: ProductRequest) => void
  onCancel: () => void
}

const emptyForm: ProductRequest = {
  name: '',
  price: 0,
  description: '',
  stock: 1,
}

export default function ProductForm({
  mode,
  initialData,
  isOpen,
  isSubmitting,
  onSubmit,
  onCancel,
}: ProductFormProps) {
  const [form, setForm] = useState<ProductRequest>(emptyForm)
  const [validationError, setValidationError] = useState<string | null>(null)

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setForm({
        name: initialData.name,
        price: initialData.price,
        description: initialData.description ?? '',
        stock: initialData.stock,
      })
    } else if (mode === 'create') {
      setForm(emptyForm)
    }
    setValidationError(null)
  }, [mode, initialData, isOpen])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value,
    }))
  }

  const validate = (): boolean => {
    if (!form.name.trim()) {
      setValidationError('Name is required')
      return false
    }
    if (form.price <= 0) {
      setValidationError('Price must be greater than 0')
      return false
    }
    if (form.stock <= 0) {
      setValidationError('Stock must be greater than 0')
      return false
    }
    setValidationError(null)
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    onSubmit({
      name: form.name.trim(),
      price: form.price,
      description: form.description?.trim() || undefined,
      stock: form.stock,
    })
  }

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-4">
      {validationError && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {validationError}
        </p>
      )}

      <div>
        <label htmlFor={`${mode}-name`} className="mb-1 block text-sm font-medium text-gray-700">
          Name *
        </label>
        <input
          id={`${mode}-name`}
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor={`${mode}-price`} className="mb-1 block text-sm font-medium text-gray-700">
            Price *
          </label>
          <input
            id={`${mode}-price`}
            name="price"
            type="number"
            min="0.01"
            step="0.01"
            value={form.price || ''}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor={`${mode}-stock`} className="mb-1 block text-sm font-medium text-gray-700">
            Stock *
          </label>
          <input
            id={`${mode}-stock`}
            name="stock"
            type="number"
            min="1"
            step="1"
            value={form.stock || ''}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor={`${mode}-description`} className="mb-1 block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id={`${mode}-description`}
          name="description"
          rows={3}
          value={form.description ?? ''}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : mode === 'create' ? 'Create product' : 'Save changes'}
        </button>
        {mode === 'edit' && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )

  if (mode === 'create') {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">New product</h2>
        {formContent}
      </div>
    )
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Edit product</h2>
        {formContent}
      </div>
    </div>
  )
}
