'use client'

import { useState } from 'react'

export function SimpleCalculator() {
  const [quotes, setQuotes] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    
    const data = {
      from: formData.get('from') as string,
      to: formData.get('to') as string, 
      weight: formData.get('weight') as string,
      dimensions: {
        length: formData.get('length') as string,
        width: formData.get('width') as string,
        height: formData.get('height') as string
      }
    }

    console.log('📤 Enviando datos:', data)

    try {
      const response = await fetch('/api/shipping/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()
      
      if (result.success) {
        setQuotes(result.quotes)
      } else {
        alert('Error: ' + result.error)
      }
    } catch (error) {
      alert('Error de conexión')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Cotizador Inteligente ⚡ NUEVA VERSION
          </h2>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit}>
            {/* Direcciones */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-lg font-bold text-blue-600 mb-3">
                  🏠 DESDE (Origen) *
                </label>
                              <input
                type="text"
                name="from"
                defaultValue="Ciudad de México, CDMX"
                className="w-full px-4 py-4 text-lg border-4 border-blue-400 rounded-xl focus:border-blue-600 bg-blue-50 font-bold"
                required
                onClick={(e) => {
                  e.currentTarget.readOnly = false;
                  e.currentTarget.disabled = false;
                  e.currentTarget.select();
                }}
                onFocus={(e) => e.currentTarget.select()}
                style={{ 
                  fontSize: '18px', 
                  fontWeight: 'bold',
                  pointerEvents: 'all',
                  userSelect: 'text'
                }}
              />
              </div>
              <div>
                <label className="block text-lg font-bold text-blue-600 mb-3">
                  🎯 HASTA (Destino) *
                </label>
                              <input
                type="text"
                name="to"
                defaultValue="Guadalajara, JAL"
                className="w-full px-4 py-4 text-lg border-4 border-blue-400 rounded-xl focus:border-blue-600 bg-blue-50 font-bold"
                required
                onClick={(e) => {
                  e.currentTarget.readOnly = false;
                  e.currentTarget.disabled = false;
                  e.currentTarget.select();
                }}
                onFocus={(e) => e.currentTarget.select()}
                style={{ 
                  fontSize: '18px', 
                  fontWeight: 'bold',
                  pointerEvents: 'all',
                  userSelect: 'text'
                }}
              />
              </div>
            </div>

            {/* Dimensiones */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div>
                <label className="block text-lg font-bold text-green-600 mb-3">
                  ⚖️ PESO (kg) *
                </label>
                              <input
                type="number"
                name="weight"
                defaultValue="2.5"
                min="0.1"
                max="100"
                step="0.1"
                className="w-full px-4 py-4 text-xl border-4 border-green-400 rounded-xl focus:border-green-600 bg-green-50 font-bold text-center"
                required
                onClick={(e) => {
                  e.currentTarget.readOnly = false;
                  e.currentTarget.disabled = false;
                  e.currentTarget.select();
                }}
                onFocus={(e) => e.currentTarget.select()}
                style={{ 
                  fontSize: '20px', 
                  fontWeight: 'bold',
                  pointerEvents: 'all',
                  userSelect: 'text'
                }}
              />
              </div>
              <div>
                <label className="block text-lg font-bold text-purple-600 mb-3">
                  📏 LARGO (cm)
                </label>
                <input
                  type="number"
                  name="length"
                  defaultValue="20"
                  className="w-full px-4 py-4 text-xl border-4 border-purple-400 rounded-xl focus:border-purple-600 bg-purple-50 font-bold text-center"
                  onClick={(e) => {
                    e.currentTarget.readOnly = false;
                    e.currentTarget.disabled = false;
                    e.currentTarget.select();
                  }}
                  onFocus={(e) => e.currentTarget.select()}
                  style={{ 
                    fontSize: '20px', 
                    fontWeight: 'bold',
                    pointerEvents: 'all',
                    userSelect: 'text'
                  }}
                />
              </div>
              <div>
                <label className="block text-lg font-bold text-orange-600 mb-3">
                  📐 ANCHO (cm)
                </label>
                <input
                  type="number"
                  name="width"
                  defaultValue="30"
                  className="w-full px-4 py-4 text-xl border-4 border-orange-400 rounded-xl focus:border-orange-600 bg-orange-50 font-bold text-center"
                  style={{ fontSize: '20px', fontWeight: 'bold' }}
                />
              </div>
              <div>
                <label className="block text-lg font-bold text-red-600 mb-3">
                  📦 ALTO (cm)
                </label>
                <input
                  type="number"
                  name="height"
                  defaultValue="15"
                  className="w-full px-4 py-4 text-xl border-4 border-red-400 rounded-xl focus:border-red-600 bg-red-50 font-bold text-center"
                  style={{ fontSize: '20px', fontWeight: 'bold' }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl font-bold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
              style={{ fontSize: '20px' }}
            >
              {loading ? '⏳ Cotizando...' : '🚀 COTIZAR ENVÍO'}
            </button>
          </form>

          {/* Resultados */}
          {quotes.length > 0 && (
            <div className="mt-8 space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                💰 Cotizaciones Disponibles:
              </h3>
              {quotes.map((quote, index) => (
                <div key={index} className="border-4 border-green-200 rounded-xl p-6 bg-green-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-xl font-bold text-gray-900">
                        {quote.carrier} - {quote.service}
                      </div>
                      <div className="text-lg text-gray-600">
                        {quote.deliveryTime}
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-green-600">
                      ${quote.price} {quote.currency}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
