import type { Product } from '../types/product'

interface DeleteConfirmationModalProps {
  product: Product | null
  isOpen: boolean
  isDeleting: boolean
  onConfirm: () => void
  onCancel: () => void
}

export default function DeleteConfirmationModal({
  product,
  isOpen,
  isDeleting,
  onConfirm,
  onCancel,
}: DeleteConfirmationModalProps) {
  if (!isOpen || !product) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-2 text-lg font-semibold text-gray-900">Confirm deletion</h2>
        <p className="mb-6 text-sm text-gray-600">
          Delete <span className="font-medium text-gray-900">{product.name}</span>?
          This action cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isDeleting ? 'Deleting...' : 'Confirm deletion'}
          </button>
        </div>
      </div>
    </div>
  )
}
