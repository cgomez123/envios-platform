'use client'

import { useState, useEffect } from 'react'
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  TruckIcon,
  ClockIcon,
  BellIcon,
  UsersIcon,
  GlobeAmericasIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

export default function AdvancedDashboard() {
  const [realTimeData, setRealTimeData] = useState({
    activeShipments: 234,
    todayRevenue: 28470,
    avgDeliveryTime: 2.3,
    customerSatisfaction: 4.8,
    
    // Métricas en tiempo real
    liveMetrics: {
      shipmentsLastHour: 12,
      currentOnlineUsers: 847,
      systemStatus: 'operational',
      apiLatency: 145
    },
    
    // Alertas activas
    activeAlerts: [
      {
        id: 1,
        type: 'warning',
        title: 'Retraso en FedEx zona norte',
        message: 'Demoras de 1-2 días en entregas hacia Monterrey',
        timestamp: '2024-09-03T14:30:00Z',
        severity: 'medium'
      },
      {
        id: 2,
        type: 'info', 
        title: 'Nuevo carrier disponible',
        message: 'Redpack ahora disponible para envíos express',
        timestamp: '2024-09-03T10:15:00Z',
        severity: 'low'
      }
    ],
    
    // Performance por región
    regionPerformance: [
      { region: 'Centro', shipments: 89, revenue: 32100, growth: '+12%', status: 'excellent' },
      { region: 'Norte', shipments: 67, revenue: 24500, growth: '+8%', status: 'good' },
      { region: 'Sur', shipments: 45, revenue: 16800, growth: '+15%', status: 'excellent' },
      { region: 'Occidente', shipments: 33, revenue: 12900, growth: '+5%', status: 'moderate' }
    ],
    
    // Top clientes
    topClients: [
      { name: 'TechStore México', shipments: 45, revenue: 12400, growth: '+23%' },
      { name: 'Fashion Boutique', shipments: 38, revenue: 9800, growth: '+18%' },
      { name: 'ElectroMax', shipments: 29, revenue: 8600, growth: '+12%' },
      { name: 'Distribuidora Norte', shipments: 22, revenue: 6200, growth: '+8%' }
    ]
  })
  
  const [selectedTimeRange, setSelectedTimeRange] = useState('today')

  // Simular actualización de datos en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        liveMetrics: {
          ...prev.liveMetrics,
          shipmentsLastHour: prev.liveMetrics.shipmentsLastHour + Math.floor(Math.random() * 2),
          currentOnlineUsers: prev.liveMetrics.currentOnlineUsers + Math.floor(Math.random() * 10 - 5),
          apiLatency: 120 + Math.floor(Math.random() * 50)
        }
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const exportReport = (format: string) => {
    alert(`📊 Exportando reporte en formato ${format.toUpperCase()}...`)
    // En producción: generar archivo real
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header con controles */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Avanzado</h1>
            <p className="text-gray-600 mt-2">
              Métricas en tiempo real y análisis profundo
            </p>
          </div>
          
          <div className="flex space-x-4">
            <select
              className="input-field"
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
            >
              <option value="today">Hoy</option>
              <option value="week">Esta semana</option>
              <option value="month">Este mes</option>
              <option value="quarter">Este trimestre</option>
            </select>
            
            <div className="flex space-x-2">
              <button 
                onClick={() => exportReport('excel')}
                className="btn-secondary flex items-center space-x-2"
              >
                <ChartBarIcon className="h-4 w-4" />
                <span>Excel</span>
              </button>
              <button 
                onClick={() => exportReport('pdf')}
                className="btn-secondary flex items-center space-x-2"
              >
                <ChartBarIcon className="h-4 w-4" />
                <span>PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* Alertas activas */}
        {realTimeData.activeAlerts.length > 0 && (
          <div className="bg-white rounded-lg shadow border p-6 mb-8">
            <div className="flex items-center mb-4">
              <BellIcon className="h-6 w-6 text-red-500 mr-2" />
              <h2 className="text-xl font-bold text-gray-900">Alertas Activas</h2>
            </div>
            
            <div className="space-y-3">
              {realTimeData.activeAlerts.map((alert) => (
                <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
                  alert.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
                  alert.type === 'error' ? 'border-red-500 bg-red-50' :
                  'border-blue-500 bg-blue-50'
                }`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                      <p className="text-sm text-gray-700">{alert.message}</p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(alert.timestamp).toLocaleTimeString('es-MX')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* KPIs principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-500 mb-2">Envíos Activos</div>
                <div className="text-3xl font-bold text-gray-900">{realTimeData.activeShipments}</div>
                <div className="flex items-center mt-2">
                  <ArrowTrendingUpIcon className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600 ml-1">+12% vs ayer</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <TruckIcon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-500 mb-2">Ingresos Hoy</div>
                <div className="text-3xl font-bold text-gray-900">
                  ${realTimeData.todayRevenue.toLocaleString()}
                </div>
                <div className="flex items-center mt-2">
                  <ArrowTrendingUpIcon className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600 ml-1">+18% vs ayer</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CurrencyDollarIcon className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-500 mb-2">Tiempo Promedio</div>
                <div className="text-3xl font-bold text-gray-900">{realTimeData.avgDeliveryTime} días</div>
                <div className="flex items-center mt-2">
                  <ArrowTrendingDownIcon className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600 ml-1">-5% mejor</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <ClockIcon className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-500 mb-2">Satisfacción</div>
                <div className="text-3xl font-bold text-gray-900">{realTimeData.customerSatisfaction}/5</div>
                <div className="flex items-center mt-2">
                  <span className="text-sm text-green-600">⭐⭐⭐⭐⭐</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <UsersIcon className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Métricas en tiempo real */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">🔴 Métricas en Tiempo Real</h2>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Actualizando cada 3 segundos</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {realTimeData.liveMetrics.shipmentsLastHour}
              </div>
              <div className="text-sm text-blue-700">Envíos última hora</div>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-100">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {realTimeData.liveMetrics.currentOnlineUsers}
              </div>
              <div className="text-sm text-green-700">Usuarios online</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-100">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {realTimeData.liveMetrics.apiLatency}ms
              </div>
              <div className="text-sm text-purple-700">Latencia API</div>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex items-center justify-center space-x-2 mb-1">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-semibold text-green-600">Operational</span>
              </div>
              <div className="text-sm text-gray-600">Estado sistema</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Performance por región */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">🌎 Performance por Región</h2>
            
            <div className="space-y-4">
              {realTimeData.regionPerformance.map((region, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-gray-900">{region.region}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      region.status === 'excellent' ? 'bg-green-100 text-green-800' :
                      region.status === 'good' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {region.status === 'excellent' ? '🔥 Excelente' :
                       region.status === 'good' ? '✅ Bueno' : '⚠️ Moderado'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500">Envíos</div>
                      <div className="font-semibold text-gray-900">{region.shipments}</div>
                      <div className={`text-xs ${region.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {region.growth}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500">Ingresos</div>
                      <div className="font-semibold text-gray-900">${region.revenue.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Avg/Envío</div>
                      <div className="font-semibold text-gray-900">
                        ${Math.round(region.revenue / region.shipments)}
                      </div>
                    </div>
                  </div>
                  
                  {/* Mapa de calor visual */}
                  <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        region.status === 'excellent' ? 'bg-green-500' :
                        region.status === 'good' ? 'bg-blue-500' : 'bg-yellow-500'
                      }`}
                      style={{ width: `${Math.min(region.shipments / 100 * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top clientes */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">👑 Top Clientes</h2>
            
            <div className="space-y-4">
              {realTimeData.topClients.map((client, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      index === 0 ? 'bg-yellow-100 text-yellow-600' :
                      index === 1 ? 'bg-gray-100 text-gray-600' :
                      index === 2 ? 'bg-orange-100 text-orange-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      <span className="font-bold">#{index + 1}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{client.name}</div>
                      <div className="text-sm text-gray-600">{client.shipments} envíos</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">${client.revenue.toLocaleString()}</div>
                    <div className="text-sm text-green-600">{client.growth}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-primary-50 rounded-lg">
              <h3 className="font-semibold text-primary-900 mb-2">🎯 Insights</h3>
              <ul className="text-sm text-primary-800 space-y-1">
                <li>• TechStore México creció 23% este mes</li>
                <li>• Clientes VIP generan 68% de ingresos</li>
                <li>• Oportunidad de upsell en Fashion Boutique</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Gráficos avanzados */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">📈 Análisis de Tendencias</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Gráfico de barras simulado */}
            <div className="lg:col-span-2">
              <h3 className="font-semibold text-gray-900 mb-4">Envíos por Día (Última Semana)</h3>
              <div className="flex items-end justify-between h-48 bg-gray-50 rounded-lg p-4">
                {['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'].map((day, index) => {
                  const height = Math.random() * 80 + 20
                  return (
                    <div key={day} className="text-center">
                      <div 
                        className="bg-primary-500 rounded-t-lg mb-2 transition-all hover:bg-primary-600"
                        style={{ 
                          height: `${height}%`,
                          width: '24px',
                          minHeight: '20px'
                        }}
                      ></div>
                      <div className="text-xs text-gray-600">{day}</div>
                      <div className="text-xs font-semibold text-gray-900">
                        {Math.round(height + 20)}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Métricas clave */}
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-green-800 font-semibold">Crecimiento Mensual</div>
                <div className="text-2xl font-bold text-green-900">+24.5%</div>
                <div className="text-sm text-green-700">vs mes anterior</div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-blue-800 font-semibold">Eficiencia de Entrega</div>
                <div className="text-2xl font-bold text-blue-900">96.8%</div>
                <div className="text-sm text-blue-700">entregas a tiempo</div>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="text-purple-800 font-semibold">Ahorro Promedio</div>
                <div className="text-2xl font-bold text-purple-900">23%</div>
                <div className="text-sm text-purple-700">vs competencia</div>
              </div>
            </div>
          </div>
        </div>

        {/* Acciones rápidas avanzadas */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6 mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">⚡ Acciones Avanzadas</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button 
              onClick={() => window.location.href = '/dashboard/bulk-shipments'}
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-center"
            >
              <TruckIcon className="h-8 w-8 text-primary-600 mx-auto mb-2" />
              <div className="font-semibold text-gray-900">Envíos Masivos</div>
              <div className="text-sm text-gray-600">Upload CSV</div>
            </button>

            <button 
              onClick={() => window.location.href = '/dashboard/api-management'}
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors text-center"
            >
              <GlobeAmericasIcon className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="font-semibold text-gray-900">Gestión API</div>
              <div className="text-sm text-gray-600">Keys & Webhooks</div>
            </button>

            <button 
              onClick={() => window.location.href = '/dashboard/team-management'}
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
            >
              <UsersIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="font-semibold text-gray-900">Gestión Equipo</div>
              <div className="text-sm text-gray-600">Usuarios & Roles</div>
            </button>

            <button 
              onClick={() => exportReport('comprehensive')}
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-yellow-500 hover:bg-yellow-50 transition-colors text-center"
            >
              <ChartBarIcon className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <div className="font-semibold text-gray-900">Reporte Completo</div>
              <div className="text-sm text-gray-600">Analytics profundo</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
