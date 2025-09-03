'use client'

import { useState, useEffect } from 'react'
import { 
  BellIcon, 
  XMarkIcon, 
  CheckIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  TruckIcon
} from '@heroicons/react/24/outline'

interface Notification {
  id: string
  type: 'success' | 'warning' | 'info' | 'error'
  title: string
  message: string
  timestamp: string
  read: boolean
  actionUrl?: string
  actionText?: string
}

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'notif_1',
      type: 'success',
      title: '✅ Envío entregado',
      message: 'SH-001 entregado exitosamente a Juan Pérez en Guadalajara',
      timestamp: '2024-09-03T14:30:00Z',
      read: false,
      actionUrl: '/tracking/SH001TRACK',
      actionText: 'Ver detalles'
    },
    {
      id: 'notif_2',
      type: 'warning', 
      title: '⚠️ Retraso en envío',
      message: 'SH-002 tiene retraso estimado de 1 día debido a condiciones climáticas',
      timestamp: '2024-09-03T13:15:00Z',
      read: false,
      actionUrl: '/tracking/SH002TRACK',
      actionText: 'Rastrear'
    },
    {
      id: 'notif_3',
      type: 'info',
      title: '💰 Nueva cotización',
      message: 'Cliente "TechStore" solicitó cotización para 15 paquetes',
      timestamp: '2024-09-03T12:45:00Z',
      read: true,
      actionUrl: '/dashboard/quotes',
      actionText: 'Ver cotización'
    }
  ])

  const unreadCount = notifications.filter(n => !n.read).length

  // Simular notificaciones en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% probabilidad cada 10 segundos
        const newNotification: Notification = {
          id: `notif_${Date.now()}`,
          type: Math.random() > 0.5 ? 'success' : 'info',
          title: Math.random() > 0.5 ? '🚚 Nuevo envío creado' : '💰 Nueva cotización',
          message: `${Math.random() > 0.5 ? 'Envío' : 'Cotización'} procesado automáticamente`,
          timestamp: new Date().toISOString(),
          read: false,
          actionUrl: '/dashboard/shipments',
          actionText: 'Ver detalles'
        }

        setNotifications(prev => [newNotification, ...prev.slice(0, 9)]) // Máximo 10
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [])

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

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckIcon className="h-5 w-5 text-green-500" />
      case 'warning':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
      case 'error':
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
      default:
        return <InformationCircleIcon className="h-5 w-5 text-blue-500" />
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
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <BellIcon className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute right-0 top-12 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-900">
                🔔 Notificaciones
                {unreadCount > 0 && (
                  <span className="ml-2 bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs">
                    {unreadCount} nuevas
                  </span>
                )}
              </h3>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    Marcar todas
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <BellIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p>No tienes notificaciones</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 transition-colors ${
                      !notification.read ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div className="font-medium text-gray-900 text-sm">
                            {notification.title}
                          </div>
                          <div className="text-xs text-gray-500 ml-2">
                            {getTimeAgo(notification.timestamp)}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.message}
                        </p>
                        {notification.actionUrl && (
                          <a
                            href={notification.actionUrl}
                            className="inline-block mt-2 text-xs text-primary-600 hover:text-primary-700 font-medium"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {notification.actionText} →
                          </a>
                        )}
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-200">
            <a
              href="/dashboard/notifications"
              className="block text-center text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Ver todas las notificaciones →
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
