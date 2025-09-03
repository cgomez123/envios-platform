'use client'

import { useState } from 'react'
import {
  KeyIcon,
  BellIcon,
  CreditCardIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon
} from '@heroicons/react/24/outline'

export default function Settings() {
  const [activeTab, setActiveTab] = useState('api')
  const [apiKeys] = useState([
    {
      id: 'key_1',
      name: 'Shopify Store',
      key: 'sk_live_1234567890abcdef',
      created: '2024-09-01',
      lastUsed: '2024-09-03T14:30:00Z',
      permissions: ['quotes', 'shipments', 'tracking'],
      status: 'active'
    },
    {
      id: 'key_2', 
      name: 'WooCommerce Site',
      key: 'sk_test_abcdef1234567890',
      created: '2024-08-15',
      lastUsed: '2024-09-02T09:15:00Z',
      permissions: ['quotes', 'tracking'],
      status: 'active'
    }
  ])

  const [notifications, setNotifications] = useState({
    emailOnShipment: true,
    smsOnDelivery: true,
    webhookAlerts: true,
    dailyReports: true,
    marketingEmails: false
  })

  const [profile] = useState({
    name: 'Carlos Gómez',
    email: 'carlos@miempresa.com',
    company: 'Mi Empresa SA de CV',
    phone: '+52 55 1234 5678',
    timezone: 'America/Mexico_City',
    language: 'es'
  })

  const copyApiKey = (key: string) => {
    navigator.clipboard.writeText(key)
    alert('✅ API key copiada al portapapeles')
  }

  const generateNewKey = () => {
    const newKey = `sk_live_${Math.random().toString(36).substring(2, 18)}`
    alert(`🔑 Nueva API key generada: ${newKey}`)
  }

  const tabs = [
    { id: 'api', name: 'API Keys', icon: KeyIcon },
    { id: 'notifications', name: 'Notificaciones', icon: BellIcon },
    { id: 'billing', name: 'Facturación', icon: CreditCardIcon },
    { id: 'team', name: 'Equipo', icon: UserGroupIcon },
    { id: 'security', name: 'Seguridad', icon: ShieldCheckIcon },
    { id: 'general', name: 'General', icon: Cog6ToothIcon }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Configuración</h1>
          <p className="text-gray-600 mt-2">
            Administra tu cuenta, API keys y configuraciones
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="bg-white rounded-lg shadow border p-6">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span className="font-medium">{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {/* API Keys */}
            {activeTab === 'api' && (
              <div className="bg-white rounded-lg shadow border p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">🔑 API Keys</h2>
                  <button onClick={generateNewKey} className="btn-primary">
                    Generar Nueva Key
                  </button>
                </div>

                <div className="space-y-4">
                  {apiKeys.map((apiKey) => (
                    <div key={apiKey.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">{apiKey.name}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                              {apiKey.key.substring(0, 20)}...
                            </code>
                            <button
                              onClick={() => copyApiKey(apiKey.key)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <DocumentDuplicateIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                          {apiKey.status}
                        </span>
                      </div>

                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Creada: {apiKey.created}</p>
                        <p>Último uso: {new Date(apiKey.lastUsed).toLocaleString('es-MX')}</p>
                        <div className="flex space-x-2">
                          <span>Permisos:</span>
                          {apiKey.permissions.map((perm, index) => (
                            <span key={index} className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded text-xs">
                              {perm}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-2 mt-4">
                        <button className="btn-secondary text-sm">Editar</button>
                        <button className="btn-secondary text-sm text-red-600">Revocar</button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">💡 Consejos de Seguridad</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Nunca compartas tus API keys públicamente</li>
                    <li>• Usa diferentes keys para desarrollo y producción</li>
                    <li>• Revoca keys comprometidas inmediatamente</li>
                    <li>• Monitorea el uso regular de tus keys</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeTab === 'notifications' && (
              <div className="bg-white rounded-lg shadow border p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">🔔 Preferencias de Notificaciones</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Notificaciones de Envío</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={notifications.emailOnShipment}
                          onChange={(e) => setNotifications({...notifications, emailOnShipment: e.target.checked})}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <span className="ml-3 text-sm text-gray-700">
                          Email cuando se crea un envío
                        </span>
                      </label>
                      
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={notifications.smsOnDelivery}
                          onChange={(e) => setNotifications({...notifications, smsOnDelivery: e.target.checked})}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <span className="ml-3 text-sm text-gray-700">
                          SMS cuando se entrega un paquete
                        </span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Alertas del Sistema</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={notifications.webhookAlerts}
                          onChange={(e) => setNotifications({...notifications, webhookAlerts: e.target.checked})}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <span className="ml-3 text-sm text-gray-700">
                          Webhook cuando hay problemas de API
                        </span>
                      </label>
                      
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={notifications.dailyReports}
                          onChange={(e) => setNotifications({...notifications, dailyReports: e.target.checked})}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <span className="ml-3 text-sm text-gray-700">
                          Reporte diario por email
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button className="btn-primary">
                    Guardar Preferencias
                  </button>
                </div>
              </div>
            )}

            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="bg-white rounded-lg shadow border p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">⚙️ Configuración General</h2>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre Completo
                      </label>
                      <input
                        type="text"
                        defaultValue={profile.name}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        defaultValue={profile.email}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Empresa
                      </label>
                      <input
                        type="text"
                        defaultValue={profile.company}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        defaultValue={profile.phone}
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Zona Horaria
                      </label>
                      <select defaultValue={profile.timezone} className="input-field">
                        <option value="America/Mexico_City">México (GMT-6)</option>
                        <option value="America/Tijuana">Tijuana (GMT-8)</option>
                        <option value="America/Cancun">Cancún (GMT-5)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Idioma
                      </label>
                      <select defaultValue={profile.language} className="input-field">
                        <option value="es">Español</option>
                        <option value="en">English</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end space-x-4">
                  <button className="btn-secondary">Cancelar</button>
                  <button className="btn-primary">Guardar Cambios</button>
                </div>
              </div>
            )}

            {/* Team Management */}
            {activeTab === 'team' && (
              <div className="bg-white rounded-lg shadow border p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">👥 Gestión de Equipo</h2>
                  <button className="btn-primary">Invitar Usuario</button>
                </div>

                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-primary-600 font-bold">CG</span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">Carlos Gómez</div>
                          <div className="text-sm text-gray-600">carlos@miempresa.com</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                          Administrador
                        </span>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                          Activo
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-gray-600 font-bold">AM</span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">Ana Martínez</div>
                          <div className="text-sm text-gray-600">ana@miempresa.com</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-medium">
                          Usuario
                        </span>
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                          Pendiente
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Roles Disponibles:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="font-medium text-blue-600">Administrador</div>
                      <div className="text-gray-600">Acceso completo</div>
                    </div>
                    <div>
                      <div className="font-medium text-green-600">Manager</div>
                      <div className="text-gray-600">Gestionar envíos y reportes</div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-600">Usuario</div>
                      <div className="text-gray-600">Solo crear envíos</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Billing */}
            {activeTab === 'billing' && (
              <div className="bg-white rounded-lg shadow border p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">💳 Facturación y Planes</h2>

                {/* Current Plan */}
                <div className="border rounded-lg p-6 mb-6 bg-primary-50 border-primary-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold text-primary-900">Plan Profesional</h3>
                      <p className="text-primary-700">Incluye hasta 1,000 envíos mensuales</p>
                      <p className="text-sm text-primary-600 mt-2">
                        Próxima facturación: 15 de octubre, 2024
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary-900">$899</div>
                      <div className="text-sm text-primary-700">MXN/mes</div>
                    </div>
                  </div>
                </div>

                {/* Usage */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Uso Actual</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Envíos este mes</span>
                        <span>247 / 1,000</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-primary-600 h-2 rounded-full" style={{ width: '24.7%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>API Requests (últimas 24h)</span>
                        <span>1,847 / 10,000</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '18.47%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Billing History */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Historial de Facturación</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">Agosto 2024</div>
                        <div className="text-sm text-gray-600">Plan Profesional</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">$899 MXN</div>
                        <button className="text-sm text-primary-600 hover:text-primary-700">
                          Descargar PDF
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">Julio 2024</div>
                        <div className="text-sm text-gray-600">Plan Profesional</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">$899 MXN</div>
                        <button className="text-sm text-primary-600 hover:text-primary-700">
                          Descargar PDF
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-center">
                  <button className="btn-secondary">Cambiar Plan</button>
                </div>
              </div>
            )}

            {/* Security */}
            {activeTab === 'security' && (
              <div className="bg-white rounded-lg shadow border p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">🔒 Configuración de Seguridad</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Autenticación</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 border rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">Autenticación de dos factores</div>
                          <div className="text-sm text-gray-600">Protección extra para tu cuenta</div>
                        </div>
                        <button className="btn-primary text-sm">Activar 2FA</button>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 border rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">Cambiar contraseña</div>
                          <div className="text-sm text-gray-600">Última actualización: hace 45 días</div>
                        </div>
                        <button className="btn-secondary text-sm">Cambiar</button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Actividad Reciente</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">Inicio de sesión</div>
                          <div className="text-sm text-gray-600">IP: 189.217.xxx.xxx</div>
                        </div>
                        <div className="text-sm text-gray-600">
                          Hace 2 horas
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">API Key creada</div>
                          <div className="text-sm text-gray-600">Shopify Integration</div>
                        </div>
                        <div className="text-sm text-gray-600">
                          Ayer
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
