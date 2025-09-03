'use client'

import { useState } from 'react'

export default function ShopifySimulation() {
  const [cartItems] = useState([
    {
      id: 1,
      name: 'iPhone 15 Pro',
      price: 25999,
      quantity: 1,
      weight: 0.5, // kg
      image: 'https://via.placeholder.com/80x80?text=📱'
    },
    {
      id: 2, 
      name: 'AirPods Pro',
      price: 6499,
      quantity: 2,
      weight: 0.2,
      image: 'https://via.placeholder.com/80x80?text=🎧'
    }
  ])

  const [shippingQuotes, setShippingQuotes] = useState<any[]>([])
  const [selectedQuote, setSelectedQuote] = useState<any>(null)
  const [destinationZip, setDestinationZip] = useState('')
  const [loading, setLoading] = useState(false)

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const totalWeight = cartItems.reduce((sum, item) => sum + (item.weight * item.quantity), 0)

  const calculateShipping = async () => {
    if (!destinationZip || destinationZip.length !== 5) {
      alert('Por favor ingresa un código postal válido de 5 dígitos')
      return
    }

    setLoading(true)
    
    try {
      // Simular API de ShipMaster integrada
      const response = await fetch('/api/v1/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': 'sk_demo_shopify_integration'
        },
        body: JSON.stringify({
          from: { city: 'Ciudad de México', state: 'CDMX', zip: '01000' },
          to: { city: 'Ciudad destino', state: 'Estado', zip: destinationZip },
          packages: cartItems.map(item => ({
            id: item.id.toString(),
            weight: item.weight * item.quantity,
            description: item.name,
            declared_value: item.price * item.quantity
          })),
          options: { source: 'shopify_checkout_demo' }
        })
      })

      const data = await response.json()
      
      if (data.success) {
        setShippingQuotes(data.data.quotes)
      } else {
        alert('Error obteniendo cotizaciones')
      }
    } catch (error) {
      alert('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🛒 Simulación de Checkout Shopify
          </h1>
          <p className="text-gray-600">
            Así se ve la integración de ShipMaster Pro en tu tienda
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow border p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Tu Carrito</h2>
              
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-gray-600">Cantidad: {item.quantity}</p>
                      <p className="text-sm text-gray-500">Peso: {item.weight}kg c/u</p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">
                        ${(item.price * item.quantity).toLocaleString()} MXN
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ShipMaster Plugin Simulation */}
            <div className="bg-white rounded-lg shadow border p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold">S</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Opciones de Envío</h2>
                  <p className="text-sm text-gray-600">Powered by ShipMaster Pro</p>
                </div>
              </div>

              <div className="mb-4">
                <label className="block font-semibold text-gray-900 mb-2">
                  Código Postal de Entrega:
                </label>
                <div className="flex space-x-3">
                  <input
                    type="text"
                    placeholder="Ej: 44100"
                    maxLength={5}
                    className="input-field flex-1"
                    value={destinationZip}
                    onChange={(e) => setDestinationZip(e.target.value.replace(/\D/g, ''))}
                  />
                  <button
                    onClick={calculateShipping}
                    disabled={loading}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? '⏳' : '📊'} Calcular
                  </button>
                </div>
              </div>

              {/* Shipping Options */}
              {shippingQuotes.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">Selecciona tu opción:</h3>
                  {shippingQuotes.map((quote, index) => (
                    <div
                      key={index}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedQuote?.quote_id === quote.quote_id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedQuote(quote)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold text-gray-900">
                            {quote.carrier} - {quote.service}
                          </div>
                          <div className="text-sm text-gray-600">{quote.delivery_time}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">
                            ${quote.total_price}
                          </div>
                          <div className="text-sm text-gray-600">{quote.currency}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {loading && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
                  <p className="text-gray-600 mt-2">Obteniendo opciones de envío...</p>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow border p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Resumen de Orden</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold text-gray-900">
                    ${totalPrice.toLocaleString()} MXN
                  </span>
                </div>
                
                {selectedQuote && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Envío:</span>
                    <span className="font-semibold text-gray-900">
                      ${selectedQuote.total_price} MXN
                    </span>
                  </div>
                )}
                
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-900">Total:</span>
                    <span className="text-lg font-bold text-gray-900">
                      ${(totalPrice + (selectedQuote?.total_price || 0)).toLocaleString()} MXN
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-sm text-gray-600 mb-6">
                <p>📦 Peso total: {totalWeight}kg</p>
                <p>🏪 Tienda: Mi Tienda Demo</p>
                {selectedQuote && (
                  <p>🚚 Envío: {selectedQuote.carrier}</p>
                )}
              </div>

              <button
                className="w-full btn-primary"
                disabled={!selectedQuote}
              >
                {selectedQuote ? '✅ Finalizar Compra' : '⚠️ Selecciona envío'}
              </button>

              {selectedQuote && (
                <p className="text-center text-sm text-green-600 mt-3">
                  ✅ Plugin ShipMaster funcionando perfectamente
                </p>
              )}
            </div>

            {/* Integration Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
              <h3 className="font-semibold text-blue-900 mb-2">💡 ¿Cómo funciona?</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>✅ Se instala automáticamente</li>
                <li>✅ Calcula envío en tiempo real</li>
                <li>✅ Se integra con checkout de Shopify</li>
                <li>✅ Sin cambios en tu flujo actual</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-8">
          <a href="/shopify" className="text-primary-600 hover:underline">
            ← Volver a la guía de instalación
          </a>
        </div>
      </div>
    </div>
  )
}
