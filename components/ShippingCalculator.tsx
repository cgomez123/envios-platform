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
}

export function ShippingCalculator() {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    weight: '',
    dimensions: { length: '', width: '', height: '' }
  })
  
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState(false)

  const handleCalculate = async () => {
    setLoading(true)
    // Simular llamada a API
    setTimeout(() => {
      setQuotes([
        {
          carrier: 'FedEx Express',
          price: 245,
          time: '1-2 días',
          icon: 'FX',
          color: 'green',
          features: ['Rastreo en tiempo real', 'Seguro incluido']
        },
        {
          carrier: 'DHL Standard',
          price: 180,
          time: '2-3 días',
          icon: 'DH',
          color: 'blue',
          features: ['Mejor precio', 'Confiable']
        },
        {
          carrier: 'Estafeta',
          price: 145,
          time: '3-4 días',
          icon: 'ES',
          color: 'purple',
          features: ['Económico', 'Nacional']
        }
      ])
      setLoading(false)
    }, 1500)
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
                Desde (Origen)
              </label>
              <input
                type="text"
                placeholder="Ciudad de México, CDMX"
                className="input-field"
                value={formData.from}
                onChange={(e) => setFormData({...formData, from: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hasta (Destino)
              </label>
              <input
                type="text"
                placeholder="Guadalajara, JAL"
                className="input-field"
                value={formData.to}
                onChange={(e) => setFormData({...formData, to: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Peso (kg)
              </label>
              <input
                type="number"
                placeholder="2.5"
                className="input-field"
                value={formData.weight}
                onChange={(e) => setFormData({...formData, weight: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Largo (cm)
              </label>
              <input
                type="number"
                placeholder="30"
                className="input-field"
                value={formData.dimensions.length}
                onChange={(e) => setFormData({...formData, dimensions: {...formData.dimensions, length: e.target.value}})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ancho (cm)
              </label>
              <input
                type="number"
                placeholder="20"
                className="input-field"
                value={formData.dimensions.width}
                onChange={(e) => setFormData({...formData, dimensions: {...formData.dimensions, width: e.target.value}})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alto (cm)
              </label>
              <input
                type="number"
                placeholder="15"
                className="input-field"
                value={formData.dimensions.height}
                onChange={(e) => setFormData({...formData, dimensions: {...formData.dimensions, height: e.target.value}})}
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
