'use client'

import { useState, useEffect } from 'react'
import { use } from 'react'
import { 
  TruckIcon, 
  MapPinIcon, 
  ClockIcon, 
  CheckCircleIcon,
  ExclamationTriangleIcon 
} from '@heroicons/react/24/outline'

interface TimelineEvent {
  status: string
  date: string
  time: string
  location: string
  description: string
  icon: 'truck' | 'map' | 'check' | 'warning'
}

const mockTimelineData: Record<string, TimelineEvent[]> = {
  default: [
    {
      status: 'delivered',
      date: '2024-09-05',
      time: '14:30',
      location: 'Guadalajara, JAL',
      description: 'Paquete entregado exitosamente al destinatario',
      icon: 'check'
    },
    {
      status: 'out_for_delivery',
      date: '2024-09-05',
      time: '08:15',
      location: 'Guadalajara, JAL - Centro de distribución',
      description: 'Paquete en ruta de entrega',
      icon: 'truck'
    },
    {
      status: 'in_transit',
      date: '2024-09-04',
      time: '18:45',
      location: 'León, GTO - Centro de clasificación',
      description: 'Paquete en tránsito hacia destino final',
      icon: 'truck'
    },
    {
      status: 'in_transit',
      date: '2024-09-03',
      time: '23:20',
      location: 'Querétaro, QRO - Hub central',
      description: 'Paquete procesado en centro de clasificación',
      icon: 'map'
    },
    {
      status: 'picked_up',
      date: '2024-09-03',
      time: '16:30',
      location: 'Ciudad de México, CDMX',
      description: 'Paquete recolectado del remitente',
      icon: 'truck'
    },
    {
      status: 'created',
      date: '2024-09-03',
      time: '10:15',
      location: 'Ciudad de México, CDMX',
      description: 'Envío creado y etiqueta generada',
      icon: 'check'
    }
  ]
}

export default function TrackingPage({ params }: { params: Promise<{ trackingNumber: string }> }) {
  const { trackingNumber } = use(params)
  const [timeline, setTimeline] = useState<TimelineEvent[]>([])
  const [shipmentInfo, setShipmentInfo] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchTrackingInfo = async () => {
      setLoading(true)
      try {
        // Simulación de llamada a API de tracking
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // Datos simulados realistas
        setShipmentInfo({
          trackingNumber,
          carrier: 'FedEx Express',
          status: 'delivered',
          statusLabel: 'Entregado',
          from: 'Ciudad de México, CDMX',
          to: 'Guadalajara, JAL',
          estimatedDelivery: '2024-09-05',
          actualDelivery: '2024-09-05',
          weight: '2.5 kg',
          recipient: 'Ana García López'
        })
        
        setTimeline(mockTimelineData.default)
      } catch (err) {
        setError('Error al obtener información de tracking')
      } finally {
        setLoading(false)
      }
    }

    fetchTrackingInfo()
  }, [trackingNumber])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-100'
      case 'out_for_delivery': return 'text-blue-600 bg-blue-100'
      case 'in_transit': return 'text-yellow-600 bg-yellow-100'
      case 'picked_up': return 'text-purple-600 bg-purple-100'
      case 'created': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'truck': return <TruckIcon className="h-5 w-5" />
      case 'map': return <MapPinIcon className="h-5 w-5" />
      case 'check': return <CheckCircleIcon className="h-5 w-5" />
      case 'warning': return <ExclamationTriangleIcon className="h-5 w-5" />
      default: return <ClockIcon className="h-5 w-5" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Obteniendo información de tracking...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto" />
          <h1 className="mt-4 text-2xl font-bold text-gray-900">Error de Tracking</h1>
          <p className="mt-2 text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 btn-primary"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Seguimiento de Envío</h1>
          <p className="text-gray-600 mt-2">Rastrea tu paquete en tiempo real</p>
        </div>

        {/* Shipment Summary */}
        {shipmentInfo && (
          <div className="bg-white rounded-lg shadow border p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Información del Envío</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><span className="font-medium">Tracking:</span> {shipmentInfo.trackingNumber}</p>
                  <p><span className="font-medium">Paquetería:</span> {shipmentInfo.carrier}</p>
                  <p><span className="font-medium">Peso:</span> {shipmentInfo.weight}</p>
                  <p><span className="font-medium">Destinatario:</span> {shipmentInfo.recipient}</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">Ruta</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><span className="font-medium">Desde:</span> {shipmentInfo.from}</p>
                  <p><span className="font-medium">Hacia:</span> {shipmentInfo.to}</p>
                  <p><span className="font-medium">Estimado:</span> {shipmentInfo.estimatedDelivery}</p>
                  {shipmentInfo.actualDelivery && (
                    <p><span className="font-medium">Entregado:</span> {shipmentInfo.actualDelivery}</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">Estado Actual</h3>
                <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(shipmentInfo.status)}`}>
                  {shipmentInfo.statusLabel}
                </span>
                {shipmentInfo.status === 'delivered' && (
                  <p className="text-green-600 text-sm mt-2 font-medium">
                    ✅ Entrega confirmada
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Timeline */}
        <div className="bg-white rounded-lg shadow border p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Historial de Tracking</h2>
          
          <div className="flow-root">
            <ul className="-mb-8">
              {timeline.map((event, eventIdx) => (
                <li key={eventIdx}>
                  <div className="relative pb-8">
                    {eventIdx !== timeline.length - 1 ? (
                      <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white ${
                        event.status === 'delivered' ? 'bg-green-500 text-white' :
                        event.status === 'out_for_delivery' ? 'bg-blue-500 text-white' :
                        event.status === 'in_transit' ? 'bg-yellow-500 text-white' :
                        event.status === 'picked_up' ? 'bg-purple-500 text-white' :
                        'bg-gray-500 text-white'
                      }`}>
                        {getIcon(event.icon)}
                      </div>
                      <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{event.description}</p>
                          <p className="text-sm text-gray-500">{event.location}</p>
                        </div>
                        <div className="whitespace-nowrap text-right text-sm text-gray-500">
                          <time dateTime={event.date}>
                            {event.date} - {event.time}
                          </time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={() => window.print()}
            className="btn-secondary"
          >
            Imprimir Tracking
          </button>
          <button
            onClick={() => window.location.href = `/api/shipments/${shipmentInfo?.id || 'demo'}/label`}
            className="btn-primary"
          >
            Descargar Etiqueta PDF
          </button>
        </div>
      </div>
    </div>
  )
}
