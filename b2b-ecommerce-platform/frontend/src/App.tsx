import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [healthStatus, setHealthStatus] = useState<string>('checking...')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/health')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data: { status: string }) => setHealthStatus(data.status))
      .catch((err: Error) => setError(err.message))
  }, [])

  return (
    <div className="app">
      <header>
        <h1>B2B Ecommerce</h1>
        <p className="subtitle">Plataforma de comercio B2B</p>
      </header>

      <section className="status-card">
        <h2>Estado del backend</h2>
        {error ? (
          <p className="status error">Error: {error}</p>
        ) : (
          <p className="status">{healthStatus}</p>
        )}
      </section>

      {/* TODO: Implementar rutas, catálogo, carrito B2B y autenticación de empresas */}
    </div>
  )
}

export default App
