'use client'

import { useState } from 'react'
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  ClockIcon,
  TruckIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  GlobeAmericasIcon
} from '@heroicons/react/24/outline'

export default function AdvancedTracking() {
  const [searchTerm, setSearchTerm] = useState('')
  const [trackingData, setTrackingData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [mapView, setMapView] = useState(false)

  // Datos simulados súper realistas
  const mockTrackingData = {
    tracking_number: 'BULK123ABC789',
    status: 'in_transit',
    progress: 65,
    
    shipment_info: {
      id: 'SH-ADV-001',
      created_at: '2024-09-01T10:30:00Z',
      carrier: 'FedEx Express',
      service: 'Express International',
      from: {
        name: 'TechStore México',
        address: 'Av. Reforma 123, Col. Centro',
        city: 'Ciudad de México',
        state: 'CDMX',
        country: 'MX'
      },
      to: {
        name: 'Juan Carlos Pérez',
        address: 'Calle Principal 456, Col. Centro', 
        city: 'Guadalajara',
        state: 'JAL',
        country: 'MX'
      },
      package: {
        weight: '2.8 kg',
        dimensions: '30x25x15 cm',
        description: 'Productos electrónicos',
        value: '$2,500 MXN'
      }
    },
    
    current_location: {
      city: 'León',
      state: 'Guanajuato', 
      facility: 'Centro de Clasificación León',
      coordinates: { lat: 21.1619, lng: -101.6739 }
    },
    
    estimated_delivery: {
      date: '2024-09-05',
      time_window: '10:00 - 14:00',
      confidence: 'high'
    },
    
    events: [
      {
        id: 1,
        status: 'in_transit',
        timestamp: '2024-09-03T14:30:00Z',
        location: 'León, GTO - Centro de clasificación',
        facility: 'Centro de Clasificación León',
        description: 'Paquete en tránsito hacia centro de distribución destino',
        details: 'El paquete fue procesado y está en ruta hacia el siguiente punto de distribución',
        is_current: true,
        coordinates: { lat: 21.1619, lng: -101.6739 }
      },
      {
        id: 2,
        status: 'in_transit',
        timestamp: '2024-09-02T23:45:00Z', 
        location: 'Querétaro, QRO - Hub central',
        facility: 'Hub Central Bajío',
        description: 'Paquete procesado en centro de clasificación nacional',
        details: 'Clasificación automática completada, enviado hacia región destino',
        is_current: false,
        coordinates: { lat: 20.5888, lng: -100.3899 }
      },
      {
        id: 3,
        status: 'picked_up',
        timestamp: '2024-09-01T16:15:00Z',
        location: 'Ciudad de México, CDMX',
        facility: 'Sucursal Polanco',
        description: 'Paquete recolectado del remitente',
        details: 'Recolección programada completada exitosamente, paquete en excelentes condiciones',
        is_current: false,
        coordinates: { lat: 19.4326, lng: -99.1332 }
      },
      {
        id: 4,
        status: 'label_created',
        timestamp: '2024-09-01T10:30:00Z',
        location: 'Ciudad de México, CDMX',
        facility: 'Plataforma ShipMaster Pro',
        description: 'Envío creado y etiqueta generada',
        details: 'Documentación completada, listo para recolección',
        is_current: false,
        coordinates: { lat: 19.4326, lng: -99.1332 }
      }
    ],
    
    // Predicciones IA
    ai_insights: {
      delivery_confidence: 94,
      potential_delays: ['Tráfico pesado en zona metropolitana de Guadalajara'],
      recommended_actions: ['Notificar al destinatario sobre ventana de entrega'],
      cost_optimization: 'Este envío tiene un ahorro del 18% vs competencia'
    },
    
    // Información adicional
    carrier_details: {
      phone: '01 800 GO FEDEX',
      website: 'https://www.fedex.com/mx',
      tracking_url: 'https://www.fedex.com/fedextrack/?trknbr=BULK123ABC789'
    }
  }

  const trackShipment = async () => {
    if (!searchTerm.trim()) {
      alert('Por favor ingresa un número de tracking')
      return
    }

    setLoading(true)
    
    // Simular API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setTrackingData(mockTrackingData)
    setLoading(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-100'
      case 'in_transit': return 'text-blue-600 bg-blue-100'
      case 'picked_up': return 'text-yellow-600 bg-yellow-100' 
      case 'exception': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getEventIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircleIcon className="h-6 w-6 text-green-500" />
      case 'in_transit':
        return <TruckIcon className="h-6 w-6 text-blue-500" />
      case 'picked_up':
        return <MapPinIcon className="h-6 w-6 text-yellow-500" />
      default:
        return <ClockIcon className="h-6 w-6 text-gray-400" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">🔍 Tracking Avanzado</h1>
          <p className="text-gray-600 mt-2">
            Seguimiento detallado con predicciones IA y mapas en tiempo real
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow border p-8 mb-8">
          <div className="flex space-x-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Ingresa número de tracking (ej: BULK123ABC789)"
                className="input-field"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value.toUpperCase())}
                onKeyPress={(e) => e.key === 'Enter' && trackShipment()}
              />
            </div>
            <button
              onClick={trackShipment}
              disabled={loading}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
              <span>{loading ? 'Buscando...' : 'Rastrear'}</span>
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-lg shadow border p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Consultando múltiples fuentes de datos...</p>
          </div>
        )}

        {/* Tracking Results */}
        {trackingData && !loading && (
          <div className="space-y-8">
            {/* Header with current status */}
            <div className="bg-white rounded-lg shadow border p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    📦 {trackingData.tracking_number}
                  </h2>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(trackingData.status)}`}>
                      {trackingData.status === 'in_transit' ? '🚚 En Tránsito' : trackingData.status}
                    </span>
                    <span className="text-gray-600">
                      por {trackingData.shipment_info.carrier}
                    </span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm text-gray-500">Entrega estimada:</div>
                  <div className="text-lg font-bold text-gray-900">
                    {new Date(trackingData.estimated_delivery.date).toLocaleDateString('es-MX')}
                  </div>
                  <div className="text-sm text-gray-600">
                    {trackingData.estimated_delivery.time_window}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progreso del envío</span>
                  <span>{trackingData.progress}% completado</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${trackingData.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Current Location */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <MapPinIcon className="h-6 w-6 text-red-500" />
                  <div>
                    <div className="font-semibold text-gray-900">Ubicación Actual</div>
                    <div className="text-sm text-gray-600">
                      {trackingData.current_location.facility}, {trackingData.current_location.city}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setMapView(!mapView)}
                  className="btn-secondary text-sm"
                >
                  {mapView ? '📄 Lista' : '🗺️ Mapa'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Timeline */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow border p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">📍 Timeline Detallado</h3>
                  
                  <div className="space-y-6">
                    {trackingData.events.map((event: any, index: number) => (
                      <div key={event.id} className="flex space-x-4">
                        <div className="flex flex-col items-center">
                          <div className={`p-2 rounded-full ${event.is_current ? 'bg-primary-100' : 'bg-gray-100'}`}>
                            {getEventIcon(event.status)}
                          </div>
                          {index < trackingData.events.length - 1 && (
                            <div className="w-0.5 h-12 bg-gray-200 mt-2"></div>
                          )}
                        </div>
                        
                        <div className="flex-1 pb-6">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-gray-900">{event.description}</h4>
                            <span className="text-sm text-gray-500">
                              {new Date(event.timestamp).toLocaleDateString('es-MX', {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-2">{event.details}</p>
                          
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>📍 {event.location}</span>
                            <span>🏢 {event.facility}</span>
                          </div>
                          
                          {event.is_current && (
                            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                              <p className="text-blue-800 font-medium text-sm">
                                🎯 Estado actual: El paquete está siendo transportado hacia el siguiente punto de distribución
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* AI Insights & Details */}
              <div className="space-y-6">
                {/* AI Predictions */}
                <div className="bg-white rounded-lg shadow border p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-purple-600 font-bold">🤖</span>
                    </div>
                    <h3 className="font-bold text-gray-900">IA Insights</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 mb-1">
                        Confianza de Entrega
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${trackingData.ai_insights.delivery_confidence}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-bold text-green-600">
                          {trackingData.ai_insights.delivery_confidence}%
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium text-gray-900 mb-2">
                        Recomendaciones
                      </div>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {trackingData.ai_insights.recommended_actions.map((action: string, index: number) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-blue-500">•</span>
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {trackingData.ai_insights.potential_delays.length > 0 && (
                      <div className="p-3 bg-yellow-50 rounded-lg">
                        <div className="text-sm font-medium text-yellow-800 mb-1">
                          ⚠️ Alertas
                        </div>
                        <ul className="text-xs text-yellow-700">
                          {trackingData.ai_insights.potential_delays.map((delay: string, index: number) => (
                            <li key={index}>• {delay}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Shipment Details */}
                <div className="bg-white rounded-lg shadow border p-6">
                  <h3 className="font-bold text-gray-900 mb-4">📋 Detalles del Envío</h3>
                  
                  <div className="space-y-4 text-sm">
                    <div>
                      <div className="text-gray-500">De:</div>
                      <div className="font-medium text-gray-900">
                        {trackingData.shipment_info.from.name}
                      </div>
                      <div className="text-gray-600">
                        {trackingData.shipment_info.from.city}, {trackingData.shipment_info.from.state}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-gray-500">Para:</div>
                      <div className="font-medium text-gray-900">
                        {trackingData.shipment_info.to.name}
                      </div>
                      <div className="text-gray-600">
                        {trackingData.shipment_info.to.city}, {trackingData.shipment_info.to.state}
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="text-gray-500">Paquete:</div>
                      <div className="space-y-1 text-gray-600">
                        <div>📏 {trackingData.shipment_info.package.dimensions}</div>
                        <div>⚖️ {trackingData.shipment_info.package.weight}</div>
                        <div>📦 {trackingData.shipment_info.package.description}</div>
                        <div>💰 {trackingData.shipment_info.package.value}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Carrier Contact */}
                <div className="bg-white rounded-lg shadow border p-6">
                  <h3 className="font-bold text-gray-900 mb-4">📞 Contacto Paquetería</h3>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-3">
                      <span className="text-gray-500">📱</span>
                      <a 
                        href={`tel:${trackingData.carrier_details.phone}`}
                        className="text-primary-600 hover:underline"
                      >
                        {trackingData.carrier_details.phone}
                      </a>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className="text-gray-500">🌐</span>
                      <a 
                        href={trackingData.carrier_details.website}
                        target="_blank"
                        className="text-primary-600 hover:underline"
                      >
                        Sitio web oficial
                      </a>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className="text-gray-500">🔗</span>
                      <a 
                        href={trackingData.carrier_details.tracking_url}
                        target="_blank"
                        className="text-primary-600 hover:underline"
                      >
                        Tracking oficial
                      </a>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="bg-white rounded-lg shadow border p-6">
                  <h3 className="font-bold text-gray-900 mb-4">⚡ Acciones</h3>
                  
                  <div className="space-y-3">
                    <button className="w-full btn-primary text-sm">
                      📱 Notificar al Destinatario
                    </button>
                    <button className="w-full btn-secondary text-sm">
                      📧 Enviar Actualización
                    </button>
                    <button className="w-full btn-secondary text-sm">
                      📄 Descargar Reporte
                    </button>
                    <button className="w-full btn-secondary text-sm text-red-600">
                      🚫 Reportar Problema
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Map View (Simulation) */}
            {mapView && (
              <div className="bg-white rounded-lg shadow border p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">🗺️ Mapa de Ruta</h3>
                  <button
                    onClick={() => setMapView(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <GlobeAmericasIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Mapa Interactivo</p>
                    <p className="text-sm text-gray-500">
                      En producción: Integración con Google Maps / Mapbox
                    </p>
                    <div className="mt-4 space-y-2 text-left max-w-md mx-auto">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">CDMX → Querétaro ✅</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-600">León (actual) 📍</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                        <span className="text-sm text-gray-600">León → Guadalajara ⏳</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Quick Demo */}
        {!trackingData && !loading && (
          <div className="bg-white rounded-lg shadow border p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">🎮 Probar Demo</h2>
            <p className="text-gray-600 mb-6">
              Usa estos números de tracking de ejemplo para ver el sistema avanzado:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['BULK123ABC789', 'EXPRESS456DEF', 'STANDARD789GHI'].map((demo, index) => (
                <button
                  key={demo}
                  onClick={() => {
                    setSearchTerm(demo)
                    setTimeout(trackShipment, 100)
                  }}
                  className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
                >
                  <div className="font-mono text-sm text-gray-900">{demo}</div>
                  <div className="text-xs text-gray-600 mt-1">
                    {index === 0 ? 'En tránsito' : index === 1 ? 'Entregado' : 'Recolectado'}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
