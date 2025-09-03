'use client'

import { useState } from 'react'
import { MagnifyingGlassIcon, TruckIcon } from '@heroicons/react/24/outline'

export default function TrackingSearch() {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [loading, setLoading] = useState(false)

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!trackingNumber.trim()) {
      alert('Por favor ingresa un número de tracking')
      return
    }

    setLoading(true)
    
    // Redirect a página de tracking
    window.location.href = `/tracking/${trackingNumber.trim()}`
  }

  // Ejemplos de tracking numbers para demo
  const exampleTrackings = [
    'FDX123456789',
    'DHL987654321', 
    'EST456789123',
    'UPS789123456'
  ]

  return (
    <div className="bg-white rounded-lg shadow-lg border p-6">
      <div className="text-center mb-6">
        <TruckIcon className="h-12 w-12 text-primary-600 mx-auto mb-3" />
        <h2 className="text-2xl font-bold text-gray-900">Rastrea tu Envío</h2>
        <p className="text-gray-600 mt-2">
          Ingresa tu número de tracking para ver el estado de tu paquete
        </p>
      </div>

      <form onSubmit={handleTrack} className="space-y-4">
        <div className="relative">
          <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Ej: FDX123456789, DHL987654321..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
            maxLength={20}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Buscando...</span>
            </div>
          ) : (
            'Rastrear Envío'
          )}
        </button>
      </form>

      {/* Examples for demo */}
      <div className="mt-6 border-t pt-4">
        <p className="text-sm text-gray-500 mb-3">
          <span className="font-medium">Para probar</span> (números de tracking demo):
        </p>
        <div className="flex flex-wrap gap-2">
          {exampleTrackings.map((example, index) => (
            <button
              key={index}
              onClick={() => setTrackingNumber(example)}
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-md transition-colors"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
