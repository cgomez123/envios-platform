'use client'

import { useState, useEffect } from 'react'
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  TruckIcon,
  CalendarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline'

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('30d')
  const [analytics, setAnalytics] = useState({
    totalShipments: 247,
    totalRevenue: 89750,
    avgShipmentValue: 363,
    topCarrier: 'FedEx Express',
    growthRate: 12.5,
    
    // Data por paquetería
    carrierStats: [
      { name: 'FedEx', shipments: 89, revenue: 32400, avgCost: 364, marketShare: 36 },
      { name: 'DHL', shipments: 67, revenue: 24500, avgCost: 366, marketShare: 27 },
      { name: 'Estafeta', shipments: 54, revenue: 18200, avgCost: 337, marketShare: 22 },
      { name: 'UPS', shipments: 37, revenue: 14650, avgCost: 396, marketShare: 15 }
    ],
    
    // Data mensual
    monthlyData: [
      { month: 'Ene', shipments: 45, revenue: 16200 },
      { month: 'Feb', shipments: 52, revenue: 18900 },
      { month: 'Mar', shipments: 48, revenue: 17100 },
      { month: 'Abr', shipments: 61, revenue: 22400 },
      { month: 'May', shipments: 73, revenue: 26800 },
      { month: 'Jun', shipments: 89, revenue: 32100 }
    ]
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount)
  }

  const downloadReport = () => {
    // Simulación de descarga de reporte
    alert('📊 Reporte descargado exitosamente (Excel)')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics & Reportes</h1>
            <p className="text-gray-600 mt-2">
              Análisis detallado de tus envíos y performance
            </p>
          </div>
          
          <div className="flex space-x-4">
            <select
              className="input-field"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="7d">Últimos 7 días</option>
              <option value="30d">Últimos 30 días</option>
              <option value="90d">Últimos 3 meses</option>
              <option value="1y">Último año</option>
            </select>
            
            <button 
              onClick={downloadReport}
              className="btn-primary flex items-center space-x-2"
            >
              <ChartBarIcon className="h-5 w-5" />
              <span>Exportar Excel</span>
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center">
              <TruckIcon className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-500">Total Envíos</div>
                <div className="text-2xl font-bold text-gray-900">{analytics.totalShipments}</div>
                <div className="flex items-center mt-1">
                  <ArrowTrendingUpIcon className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600 ml-1">+{analytics.growthRate}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center">
              <CurrencyDollarIcon className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-500">Ingresos Totales</div>
                <div className="text-2xl font-bold text-gray-900">{formatCurrency(analytics.totalRevenue)}</div>
                <div className="flex items-center mt-1">
                  <ArrowTrendingUpIcon className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600 ml-1">+18.2%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center">
              <CalendarIcon className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-500">Valor Promedio</div>
                <div className="text-2xl font-bold text-gray-900">{formatCurrency(analytics.avgShipmentValue)}</div>
                <div className="flex items-center mt-1">
                  <ArrowTrendingDownIcon className="h-4 w-4 text-red-500" />
                  <span className="text-sm text-red-600 ml-1">-2.1%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center">
              <ChartBarIcon className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-500">Top Paquetería</div>
                <div className="text-lg font-bold text-gray-900">{analytics.topCarrier}</div>
                <div className="text-sm text-gray-600">36% market share</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Carrier Performance */}
          <div className="bg-white rounded-lg shadow border p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Performance por Paquetería</h2>
            
            <div className="space-y-4">
              {analytics.carrierStats.map((carrier, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-gray-900">{carrier.name}</h3>
                    <span className="text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {carrier.marketShare}% share
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500">Envíos</div>
                      <div className="font-semibold text-gray-900">{carrier.shipments}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Ingresos</div>
                      <div className="font-semibold text-gray-900">{formatCurrency(carrier.revenue)}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Costo Prom.</div>
                      <div className="font-semibold text-gray-900">{formatCurrency(carrier.avgCost)}</div>
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          index === 0 ? 'bg-blue-600' :
                          index === 1 ? 'bg-green-600' :
                          index === 2 ? 'bg-purple-600' : 'bg-yellow-600'
                        }`}
                        style={{ width: `${carrier.marketShare}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Trends */}
          <div className="bg-white rounded-lg shadow border p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Tendencias Mensuales</h2>
            
            <div className="space-y-4">
              {analytics.monthlyData.map((month, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-gray-900">{month.month}</div>
                    <div className="text-sm text-gray-600">{month.shipments} envíos</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{formatCurrency(month.revenue)}</div>
                    <div className="text-sm text-gray-600">
                      {formatCurrency(month.revenue / month.shipments)} promedio
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Growth indicator */}
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <ArrowTrendingUpIcon className="h-6 w-6 text-green-600" />
                <div className="ml-3">
                  <div className="text-sm font-medium text-green-900">
                    Crecimiento sostenido
                  </div>
                  <div className="text-sm text-green-700">
                    +{analytics.growthRate}% vs mes anterior
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow border p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Acciones Rápidas</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              onClick={() => window.location.href = '/dashboard/new-shipment'}
              className="p-4 border rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-left"
            >
              <TruckIcon className="h-6 w-6 text-primary-600 mb-2" />
              <div className="font-semibold text-gray-900">Nuevo Envío</div>
              <div className="text-sm text-gray-600">Crear envío paso a paso</div>
            </button>

            <button 
              onClick={downloadReport}
              className="p-4 border rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors text-left"
            >
              <ChartBarIcon className="h-6 w-6 text-green-600 mb-2" />
              <div className="font-semibold text-gray-900">Exportar Datos</div>
              <div className="text-sm text-gray-600">Descargar reporte Excel</div>
            </button>

            <button 
              onClick={() => window.location.href = '/dashboard/shipments'}
              className="p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
            >
              <CalendarIcon className="h-6 w-6 text-blue-600 mb-2" />
              <div className="font-semibold text-gray-900">Ver Todos</div>
              <div className="text-sm text-gray-600">Gestionar envíos</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
