'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { TruckIcon, ClockIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

interface Quote {
  carrier: string;
  price: number;
  time: string;
  icon: string;
  color: string;
  features: string[];
  service?: string;
  trackingIncluded?: boolean;
  insuranceIncluded?: boolean;
}

export function ShippingCalculator() {
  const [formData, setFormData] = useState({
    from: 'Ciudad de México, CDMX',
    to: 'Guadalajara, JAL',
    weight: '2.5',
    dimensions: { length: '20', width: '30', height: '15' }
  })
  
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState(false)

  const handleCalculate = async () => {
    // Validar que todos los campos estén llenos
    if (!formData.from || !formData.to || !formData.weight) {
      alert('Por favor completa todos los campos obligatorios')
      return
    }

    setLoading(true)
    
    try {
      const response = await fetch('/api/shipping/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Real-API': 'true'
        },
        body: JSON.stringify({
          from: formData.from,
          to: formData.to,
          weight: formData.weight,
          dimensions: formData.dimensions
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al obtener cotizaciones')
      }

      if (data.success && data.quotes) {
        // Transformar para nuestro componente
        const transformedQuotes = data.quotes.map((quote: any) => ({
          carrier: quote.carrier,
          price: quote.price,
          time: quote.deliveryTime,
          icon: quote.icon,
          color: quote.color,
          features: quote.features,
          service: quote.service,
          trackingIncluded: quote.trackingIncluded,
          insuranceIncluded: quote.insuranceIncluded
        }))
        
        setQuotes(transformedQuotes)
      } else {
        throw new Error('No se encontraron cotizaciones disponibles')
      }

    } catch (error) {
      console.error('Error:', error)
      alert('Error al obtener cotizaciones. Inténtalo de nuevo.')
      setQuotes([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Cotiza tu Envío al Instante
          </h2>
          <p className="text-lg text-gray-600">
            Compara precios de múltiples paqueterías y encuentra la mejor opción
          </p>
        </div>

        <div className="card">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Desde (Origen) *
              </label>
              <input
                type="text"
                placeholder="Ej: Ciudad de México, CDMX"
                className="input-field bg-white cursor-text"
                value={formData.from}
                onChange={(e) => setFormData({...formData, from: e.target.value})}
                onClick={(e) => e.currentTarget.focus()}
                onFocus={(e) => e.currentTarget.select()}
                required
              />
              <p className="text-xs text-gray-500 mt-1">Ciudad, Estado</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hasta (Destino) *
              </label>
              <input
                type="text"
                placeholder="Ej: Guadalajara, JAL"
                className="input-field bg-white cursor-text"
                value={formData.to}
                onChange={(e) => setFormData({...formData, to: e.target.value})}
                onClick={(e) => e.currentTarget.focus()}
                onFocus={(e) => e.currentTarget.select()}
                required
              />
              <p className="text-xs text-gray-500 mt-1">Ciudad, Estado</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Peso (kg) *
              </label>
              <input
                type="number"
                placeholder="2.5"
                min="0.1"
                max="100"
                step="0.1"
                className="input-field bg-white"
                value={formData.weight}
                onChange={(e) => setFormData({...formData, weight: e.target.value})}
                onClick={(e) => e.currentTarget.focus()}
                onFocus={(e) => e.currentTarget.select()}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Largo (cm)
              </label>
              <input
                type="number"
                placeholder="30"
                className="input-field bg-white cursor-text"
                value={formData.dimensions.length}
                onChange={(e) => setFormData({...formData, dimensions: {...formData.dimensions, length: e.target.value}})}
                onClick={(e) => e.currentTarget.focus()}
                onFocus={(e) => e.currentTarget.select()}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ancho (cm)
              </label>
              <input
                type="number"
                placeholder="20"
                className="input-field bg-white cursor-text"
                value={formData.dimensions.width}
                onChange={(e) => setFormData({...formData, dimensions: {...formData.dimensions, width: e.target.value}})}
                onClick={(e) => e.currentTarget.focus()}
                onFocus={(e) => e.currentTarget.select()}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alto (cm)
              </label>
              <input
                type="number"
                placeholder="15"
                className="input-field bg-white cursor-text"
                value={formData.dimensions.height}
                onChange={(e) => setFormData({...formData, dimensions: {...formData.dimensions, height: e.target.value}})}
                onClick={(e) => e.currentTarget.focus()}
                onFocus={(e) => e.currentTarget.select()}
              />
            </div>
          </div>

          <button
            onClick={handleCalculate}
            disabled={loading}
            className="w-full btn-primary flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Calculando...</span>
              </>
            ) : (
              <>
                <TruckIcon className="h-5 w-5" />
                <span>Cotizar Envío</span>
              </>
            )}
          </button>

          {/* Results */}
          {quotes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Opciones Disponibles
              </h3>
              <div className="space-y-3">
                {quotes.map((quote: Quote, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex justify-between items-center p-4 ${quote.color === 'green' ? 'bg-green-50 border-green-200' : quote.color === 'blue' ? 'bg-blue-50 border-blue-200' : 'bg-purple-50 border-purple-200'} rounded-lg hover:shadow-md transition-shadow`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 ${quote.color === 'green' ? 'bg-green-100' : quote.color === 'blue' ? 'bg-blue-100' : 'bg-purple-100'} rounded-full flex items-center justify-center`}>
                        <span className={`${quote.color === 'green' ? 'text-green-600' : quote.color === 'blue' ? 'text-blue-600' : 'text-purple-600'} font-bold text-sm`}>
                          {quote.icon}
                        </span>
                      </div>
                      <div>
                        <div className={`font-medium ${quote.color === 'green' ? 'text-green-900' : quote.color === 'blue' ? 'text-blue-900' : 'text-purple-900'}`}>
                          {quote.carrier}
                        </div>
                        <div className={`text-sm ${quote.color === 'green' ? 'text-green-600' : quote.color === 'blue' ? 'text-blue-600' : 'text-purple-600'} flex items-center space-x-1`}>
                          <ClockIcon className="h-4 w-4" />
                          <span>{quote.time}</span>
                        </div>
                        {quote.features && quote.features.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {quote.features.map((feature: string, featureIndex: number) => (
                              <span
                                key={featureIndex}
                                className={`text-xs px-2 py-1 rounded-full ${
                                  quote.color === 'green' ? 'bg-green-100 text-green-700' :
                                  quote.color === 'blue' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                                }`}
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${quote.color === 'green' ? 'text-green-900' : quote.color === 'blue' ? 'text-blue-900' : 'text-purple-900'}`}>
                        ${quote.price}
                      </div>
                      <button className={`text-sm ${quote.color === 'green' ? 'bg-green-600 hover:bg-green-700' : quote.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-purple-600 hover:bg-purple-700'} text-white px-4 py-1 rounded-full transition-colors`}>
                        Seleccionar
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
