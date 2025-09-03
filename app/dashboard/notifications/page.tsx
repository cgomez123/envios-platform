'use client'

import { useState } from 'react'
import { 
  BellIcon,
  CheckIcon,
  TrashIcon,
  FunnelIcon,
  EnvelopeIcon,
  DevicePhoneMobileIcon
} from '@heroicons/react/24/outline'

interface Notification {
  id: string
  type: 'success' | 'warning' | 'info' | 'error' | 'shipment'
  title: string
  message: string
  timestamp: string
  read: boolean
  category: 'system' | 'shipment' | 'payment' | 'api'
  actionUrl?: string
  actionText?: string
  email?: boolean
  sms?: boolean
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'n1',
      type: 'success',
      title: 'Envío entregado exitosamente',
      message: 'El envío SH-001 para Juan Pérez ha sido entregado en Guadalajara, JAL',
      timestamp: '2024-09-03T14:30:00Z',
      read: false,
      category: 'shipment',
      actionUrl: '/tracking/SH001TRACK',
      actionText: 'Ver detalles',
      email: true,
      sms: false
    },
    {
      id: 'n2',
      type: 'warning',
      title: 'Retraso en ruta FedEx',
      message: 'Demoras reportadas en la ruta CDMX → Monterrey debido a condiciones climáticas',
      timestamp: '2024-09-03T13:15:00Z',
      read: false,
      category: 'system',
      email: true,
      sms: true
    },
    {
      id: 'n3',
      type: 'info',
      title: 'Nueva integración API',
      message: 'Se detectó actividad en tu API key de Shopify - 45 requests en la última hora',
      timestamp: '2024-09-03T12:45:00Z',
      read: true,
      category: 'api',
      actionUrl: '/dashboard/settings?tab=api',
      actionText: 'Ver API keys'
    },
    {
      id: 'n4',
      type: 'shipment',
      title: 'Paquete en centro de clasificación',
      message: 'SH-002 procesado en hub central de Querétaro, en ruta hacia destino final',
      timestamp: '2024-09-03T11:20:00Z',
      read: true,
      category: 'shipment',
      actionUrl: '/tracking/SH002TRACK',
      actionText: 'Rastrear',
      email: false,
      sms: false
    },
    {
      id: 'n5',
      type: 'success',
      title: 'Pago procesado',
      message: 'Se procesó exitosamente el pago de $899 MXN para tu plan Profesional',
      timestamp: '2024-09-02T09:00:00Z',
      read: true,
      category: 'payment',
      actionUrl: '/dashboard/settings?tab=billing',
      actionText: 'Ver facturación'
    }
  ])

  const [filter, setFilter] = useState<string>('all')
  const [showMarkActions, setShowMarkActions] = useState(false)

  const unreadCount = notifications.filter(n => !n.read).length
  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => n.category === filter)

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return '✅'
      case 'warning': 
        return '⚠️'
      case 'error':
        return '❌'
      case 'shipment':
        return '📦'
      default:
        return 'ℹ️'
    }
  }

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'shipment': return 'Envíos'
      case 'system': return 'Sistema'
      case 'payment': return 'Pagos'
      case 'api': return 'API'
      default: return 'General'
    }
  }

  const getTimeAgo = (timestamp: string) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffMs = now.getTime() - time.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    
    if (diffMins < 1) return 'Ahora'
    if (diffMins < 60) return `Hace ${diffMins} min`
    if (diffMins < 1440) return `Hace ${Math.floor(diffMins / 60)} h`
    return `Hace ${Math.floor(diffMins / 1440)} días`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">🔔 Notificaciones</h1>
            <p className="text-gray-600 mt-2">
              Centro de notificaciones y alertas del sistema
              {unreadCount > 0 && (
                <span className="ml-2 bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm">
                  {unreadCount} sin leer
                </span>
              )}
            </p>
          </div>

          <div className="flex space-x-3">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="btn-secondary flex items-center space-x-2"
              >
                <CheckIcon className="h-4 w-4" />
                <span>Marcar todas</span>
              </button>
            )}
            <button
              onClick={() => setShowMarkActions(!showMarkActions)}
              className="btn-secondary"
            >
              Gestionar
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow border p-6 mb-8">
          <div className="flex items-center space-x-4">
            <FunnelIcon className="h-5 w-5 text-gray-500" />
            <div className="flex space-x-2">
              {['all', 'shipment', 'system', 'api', 'payment'].map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    filter === category
                      ? 'bg-primary-100 text-primary-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category === 'all' ? 'Todas' : getCategoryName(category)}
                  {category !== 'all' && (
                    <span className="ml-1">
                      ({notifications.filter(n => n.category === category).length})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white rounded-lg shadow border p-12 text-center">
              <BellIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No hay notificaciones
              </h3>
              <p className="text-gray-600">
                {filter === 'all' 
                  ? 'No tienes notificaciones en este momento'
                  : `No hay notificaciones en la categoría "${getCategoryName(filter)}"`
                }
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-lg shadow border p-6 transition-all hover:shadow-md ${
                  !notification.read ? 'border-l-4 border-l-primary-500 bg-blue-50' : ''
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex space-x-4 flex-1">
                    <div className="text-2xl">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">
                          {notification.title}
                        </h3>
                        <div className="flex items-center space-x-2 ml-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            notification.category === 'shipment' ? 'bg-green-100 text-green-700' :
                            notification.category === 'system' ? 'bg-yellow-100 text-yellow-700' :
                            notification.category === 'api' ? 'bg-blue-100 text-blue-700' :
                            'bg-purple-100 text-purple-700'
                          }`}>
                            {getCategoryName(notification.category)}
                          </span>
                          <span className="text-sm text-gray-500">
                            {getTimeAgo(notification.timestamp)}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-3">
                        {notification.message}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {notification.actionUrl && (
                            <a
                              href={notification.actionUrl}
                              className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                            >
                              {notification.actionText} →
                            </a>
                          )}
                          
                          {(notification.email || notification.sms) && (
                            <div className="flex items-center space-x-2">
                              {notification.email && (
                                <span className="flex items-center space-x-1 text-xs text-gray-500">
                                  <EnvelopeIcon className="h-3 w-3" />
                                  <span>Email</span>
                                </span>
                              )}
                              {notification.sms && (
                                <span className="flex items-center space-x-1 text-xs text-gray-500">
                                  <DevicePhoneMobileIcon className="h-3 w-3" />
                                  <span>SMS</span>
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center space-x-2">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="text-gray-400 hover:text-gray-600"
                              title="Marcar como leída"
                            >
                              <CheckIcon className="h-4 w-4" />
                            </button>
                          )}
                          
                          {showMarkActions && (
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="text-gray-400 hover:text-red-600"
                              title="Eliminar"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Settings */}
        <div className="bg-white rounded-lg shadow border p-8 mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">⚙️ Configuración de Notificaciones</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Canales de Notificación</h3>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="checkbox" />
                  <span className="ml-3">📧 Notificaciones por email</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="checkbox" />
                  <span className="ml-3">📱 Notificaciones SMS</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="checkbox" />
                  <span className="ml-3">🔔 Push notifications</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="checkbox" />
                  <span className="ml-3">🎯 Webhooks a mi sistema</span>
                </label>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Tipos de Eventos</h3>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="checkbox" />
                  <span className="ml-3">📦 Cambios en envíos</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="checkbox" />
                  <span className="ml-3">💰 Eventos de facturación</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="checkbox" />
                  <span className="ml-3">🔧 Alertas del sistema</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="checkbox" />
                  <span className="ml-3">🔗 Actividad de API</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <button className="btn-primary">
              Guardar Configuración
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
