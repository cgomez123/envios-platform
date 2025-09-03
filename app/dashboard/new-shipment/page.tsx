'use client'

import { useState } from 'react'
import { TruckIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline'

export default function NewShipment() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Sender info
    senderName: '',
    senderCompany: '',
    senderAddress: '',
    senderCity: '',
    senderState: '',
    senderZip: '',
    senderPhone: '',
    senderEmail: '',
    
    // Recipient info  
    recipientName: '',
    recipientCompany: '',
    recipientAddress: '',
    recipientCity: '',
    recipientState: '',
    recipientZip: '',
    recipientPhone: '',
    recipientEmail: '',
    
    // Package info
    weight: '',
    length: '',
    width: '',
    height: '',
    description: '',
    value: '',
    
    // Shipping options
    selectedCarrier: '',
    serviceType: '',
    insurance: false,
    signature: false
  })

  const [quotes, setQuotes] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const handleGetQuotes = async () => {
    setLoading(true)
    
    try {
      const response = await fetch('/api/shipping/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: `${formData.senderCity}, ${formData.senderState}`,
          to: `${formData.recipientCity}, ${formData.recipientState}`,
          weight: formData.weight,
          dimensions: {
            length: formData.length,
            width: formData.width,
            height: formData.height
          }
        }),
      })

      const data = await response.json()
      if (data.success) {
        setQuotes(data.quotes)
        setStep(3)
      }
    } catch (error) {
      alert('Error al obtener cotizaciones')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateShipment = async () => {
    setLoading(true)
    
    try {
      const response = await fetch('/api/shipments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          selectedCarrier: formData.selectedCarrier,
        }),
      })

      const data = await response.json()
      
      if (data.success) {
        alert(`¡Envío creado exitosamente!\nID: ${data.shipment.id}\nTracking: ${data.shipment.trackingNumber}`)
        
        // Descargar etiqueta automáticamente
        window.open(`/api/shipments/${data.shipment.id}/label`, '_blank')
        
        // Redirect al dashboard
        window.location.href = '/dashboard/shipments'
      } else {
        alert('Error creando envío: ' + data.error)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error al crear envío')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span className="font-medium">Información</span>
            </div>
            
            <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="font-medium">Paquete</span>
            </div>
            
            <div className={`flex items-center space-x-2 ${step >= 3 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}>
                3
              </div>
              <span className="font-medium">Cotización</span>
            </div>

            <div className={`flex items-center space-x-2 ${step >= 4 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 4 ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}>
                4
              </div>
              <span className="font-medium">Confirmación</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow border p-6">
          {/* Step 1: Contact Information */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Información de Contacto
              </h2>
              
              <div className="space-y-8">
                {/* Sender */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Remitente</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Nombre completo"
                      className="input-field"
                      value={formData.senderName}
                      onChange={(e) => setFormData({...formData, senderName: e.target.value})}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Empresa (opcional)"
                      className="input-field"
                      value={formData.senderCompany}
                      onChange={(e) => setFormData({...formData, senderCompany: e.target.value})}
                    />
                    <input
                      type="text"
                      placeholder="Dirección completa"
                      className="input-field md:col-span-2"
                      value={formData.senderAddress}
                      onChange={(e) => setFormData({...formData, senderAddress: e.target.value})}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Ciudad"
                      className="input-field"
                      value={formData.senderCity}
                      onChange={(e) => setFormData({...formData, senderCity: e.target.value})}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Estado"
                      className="input-field"
                      value={formData.senderState}
                      onChange={(e) => setFormData({...formData, senderState: e.target.value})}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Código Postal"
                      className="input-field"
                      value={formData.senderZip}
                      onChange={(e) => setFormData({...formData, senderZip: e.target.value})}
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Teléfono"
                      className="input-field"
                      value={formData.senderPhone}
                      onChange={(e) => setFormData({...formData, senderPhone: e.target.value})}
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="input-field"
                      value={formData.senderEmail}
                      onChange={(e) => setFormData({...formData, senderEmail: e.target.value})}
                      required
                    />
                  </div>
                </div>

                {/* Recipient */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Destinatario</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Nombre completo"
                      className="input-field"
                      value={formData.recipientName}
                      onChange={(e) => setFormData({...formData, recipientName: e.target.value})}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Empresa (opcional)"
                      className="input-field"
                      value={formData.recipientCompany}
                      onChange={(e) => setFormData({...formData, recipientCompany: e.target.value})}
                    />
                    <input
                      type="text"
                      placeholder="Dirección completa"
                      className="input-field md:col-span-2"
                      value={formData.recipientAddress}
                      onChange={(e) => setFormData({...formData, recipientAddress: e.target.value})}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Ciudad"
                      className="input-field"
                      value={formData.recipientCity}
                      onChange={(e) => setFormData({...formData, recipientCity: e.target.value})}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Estado"
                      className="input-field"
                      value={formData.recipientState}
                      onChange={(e) => setFormData({...formData, recipientState: e.target.value})}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Código Postal"
                      className="input-field"
                      value={formData.recipientZip}
                      onChange={(e) => setFormData({...formData, recipientZip: e.target.value})}
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Teléfono"
                      className="input-field"
                      value={formData.recipientPhone}
                      onChange={(e) => setFormData({...formData, recipientPhone: e.target.value})}
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email (opcional)"
                      className="input-field"
                      value={formData.recipientEmail}
                      onChange={(e) => setFormData({...formData, recipientEmail: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <button
                  onClick={() => setStep(2)}
                  className="btn-primary"
                  disabled={!formData.senderName || !formData.senderCity || !formData.recipientName || !formData.recipientCity}
                >
                  Siguiente: Información del Paquete
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Package Information */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Información del Paquete
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Dimensiones</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Peso (kg) *
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="0.1"
                        placeholder="2.5"
                        className="input-field"
                        value={formData.weight}
                        onChange={(e) => setFormData({...formData, weight: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Largo (cm)
                        </label>
                        <input
                          type="number"
                          min="1"
                          placeholder="30"
                          className="input-field"
                          value={formData.length}
                          onChange={(e) => setFormData({...formData, length: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Ancho (cm)
                        </label>
                        <input
                          type="number"
                          min="1"
                          placeholder="20"
                          className="input-field"
                          value={formData.width}
                          onChange={(e) => setFormData({...formData, width: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Alto (cm)
                        </label>
                        <input
                          type="number"
                          min="1"
                          placeholder="15"
                          className="input-field"
                          value={formData.height}
                          onChange={(e) => setFormData({...formData, height: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Contenido</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Descripción del contenido *
                      </label>
                      <textarea
                        placeholder="Ej: Ropa, electrónicos, documentos..."
                        className="input-field h-20 resize-none"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Valor declarado (MXN)
                      </label>
                      <input
                        type="number"
                        min="0"
                        placeholder="1500"
                        className="input-field"
                        value={formData.value}
                        onChange={(e) => setFormData({...formData, value: e.target.value})}
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Para cálculo de seguro
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setStep(1)}
                  className="btn-secondary"
                >
                  Anterior
                </button>
                <button
                  onClick={handleGetQuotes}
                  disabled={!formData.weight || !formData.description || loading}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Obteniendo cotizaciones...</span>
                    </div>
                  ) : (
                    'Obtener Cotizaciones'
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Select Carrier */}
          {step === 3 && quotes.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Selecciona tu Opción de Envío
              </h2>

              <div className="space-y-4 mb-8">
                {quotes.map((quote, index) => (
                  <div
                    key={index}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.selectedCarrier === quote.carrier
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setFormData({...formData, selectedCarrier: quote.carrier})}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          quote.color === 'green' ? 'bg-green-100' : 
                          quote.color === 'blue' ? 'bg-blue-100' : 'bg-purple-100'
                        }`}>
                          <span className={`font-bold text-sm ${
                            quote.color === 'green' ? 'text-green-600' : 
                            quote.color === 'blue' ? 'text-blue-600' : 'text-purple-600'
                          }`}>
                            {quote.icon}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{quote.carrier}</div>
                          <div className="text-sm text-gray-600">{quote.time}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">${quote.price}</div>
                        <div className="text-sm text-gray-600">MXN</div>
                      </div>
                    </div>
                    
                    {quote.features && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {quote.features.map((feature: string, fIndex: number) => (
                          <span key={fIndex} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Additional Options */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Opciones Adicionales</h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      checked={formData.insurance}
                      onChange={(e) => setFormData({...formData, insurance: e.target.checked})}
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Seguro adicional (+$15 MXN)
                    </span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      checked={formData.signature}
                      onChange={(e) => setFormData({...formData, signature: e.target.checked})}
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Requerir firma (+$10 MXN)
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setStep(2)}
                  className="btn-secondary"
                >
                  Anterior
                </button>
                <button
                  onClick={handleCreateShipment}
                  disabled={!formData.selectedCarrier}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <DocumentArrowDownIcon className="h-5 w-5" />
                  <span>Crear Envío y Generar Etiqueta</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
