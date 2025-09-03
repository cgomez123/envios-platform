'use client'

import { useState } from 'react'
import {
  PlusIcon,
  Cog6ToothIcon,
  ArrowsPointingOutIcon,
  ChartBarIcon,
  TruckIcon,
  CurrencyDollarIcon,
  UsersIcon
} from '@heroicons/react/24/outline'

interface Widget {
  id: string
  title: string
  type: 'chart' | 'metric' | 'list' | 'map'
  position: { x: number, y: number, w: number, h: number }
  config: any
  data: any
}

export default function DashboardWidgets() {
  const [widgets, setWidgets] = useState<Widget[]>([
    {
      id: 'widget_1',
      title: 'Envíos del Día',
      type: 'metric',
      position: { x: 0, y: 0, w: 2, h: 1 },
      config: { color: 'blue', icon: 'truck' },
      data: { value: 47, change: '+12%', trend: 'up' }
    },
    {
      id: 'widget_2', 
      title: 'Ingresos Hoy',
      type: 'metric',
      position: { x: 2, y: 0, w: 2, h: 1 },
      config: { color: 'green', icon: 'dollar' },
      data: { value: 28470, change: '+18%', trend: 'up' }
    },
    {
      id: 'widget_3',
      title: 'Top Rutas',
      type: 'chart',
      position: { x: 0, y: 1, w: 4, h: 2 },
      config: { chartType: 'bar' },
      data: {
        routes: [
          { route: 'CDMX → GDL', shipments: 23, revenue: 8900 },
          { route: 'CDMX → MTY', shipments: 18, revenue: 7200 },
          { route: 'GDL → CDMX', shipments: 15, revenue: 5800 },
          { route: 'MTY → GDL', shipments: 12, revenue: 4600 }
        ]
      }
    }
  ])

  const [editMode, setEditMode] = useState(false)
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null)

  const addWidget = (type: string) => {
    const newWidget: Widget = {
      id: `widget_${Date.now()}`,
      title: `Nuevo ${type}`,
      type: type as any,
      position: { x: 0, y: widgets.length, w: 2, h: 1 },
      config: { color: 'blue' },
      data: { value: 0 }
    }
    
    setWidgets(prev => [...prev, newWidget])
  }

  const renderWidget = (widget: Widget) => {
    switch (widget.type) {
      case 'metric':
        return (
          <div className={`p-6 bg-gradient-to-br ${
            widget.config.color === 'green' ? 'from-green-500 to-green-600' :
            widget.config.color === 'blue' ? 'from-blue-500 to-blue-600' :
            widget.config.color === 'purple' ? 'from-purple-500 to-purple-600' :
            'from-gray-500 to-gray-600'
          } text-white rounded-lg`}>
            <div className="flex justify-between items-start">
              <div>
                <div className="text-white/80 text-sm">{widget.title}</div>
                <div className="text-3xl font-bold">
                  {widget.config.icon === 'dollar' ? '$' : ''}
                  {typeof widget.data.value === 'number' ? 
                    widget.data.value.toLocaleString() : 
                    widget.data.value
                  }
                </div>
                {widget.data.change && (
                  <div className="text-white/90 text-sm mt-1">
                    {widget.data.change} vs ayer
                  </div>
                )}
              </div>
              <div className="text-white/60">
                {widget.config.icon === 'truck' ? <TruckIcon className="h-8 w-8" /> :
                 widget.config.icon === 'dollar' ? <CurrencyDollarIcon className="h-8 w-8" /> :
                 <ChartBarIcon className="h-8 w-8" />}
              </div>
            </div>
          </div>
        )

      case 'chart':
        return (
          <div className="p-6 bg-white border rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-4">{widget.title}</h3>
            <div className="space-y-3">
              {widget.data.routes?.map((route: any, index: number) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-gray-900">{route.route}</div>
                    <div className="text-sm text-gray-600">{route.shipments} envíos</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">
                      ${route.revenue.toLocaleString()}
                    </div>
                    <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-primary-500 h-2 rounded-full"
                        style={{ width: `${(route.shipments / 25) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      default:
        return (
          <div className="p-6 bg-white border rounded-lg">
            <h3 className="font-semibold text-gray-900">{widget.title}</h3>
            <p className="text-gray-600 mt-2">Widget personalizado</p>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">📊 Dashboard Personalizable</h1>
            <p className="text-gray-600 mt-2">
              Crea y organiza widgets según tus necesidades
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => setEditMode(!editMode)}
              className={`btn-secondary flex items-center space-x-2 ${
                editMode ? 'bg-primary-100 text-primary-700' : ''
              }`}
            >
              <Cog6ToothIcon className="h-4 w-4" />
              <span>{editMode ? 'Salir de edición' : 'Modo edición'}</span>
            </button>

            {editMode && (
              <div className="flex space-x-2">
                <button
                  onClick={() => addWidget('metric')}
                  className="btn-primary text-sm"
                >
                  + Métrica
                </button>
                <button
                  onClick={() => addWidget('chart')}
                  className="btn-primary text-sm"
                >
                  + Gráfico
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Widgets Grid */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {widgets.map((widget) => (
              <div 
                key={widget.id}
                className={`relative group ${
                  editMode ? 'border-2 border-dashed border-gray-300 hover:border-primary-500' : ''
                }`}
                onClick={() => editMode && setSelectedWidget(widget.id)}
              >
                {renderWidget(widget)}
                
                {editMode && (
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1 bg-white rounded-full shadow-md text-gray-500 hover:text-gray-700">
                      <ArrowsPointingOutIcon className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Widget Gallery */}
          {editMode && (
            <div className="bg-white rounded-lg shadow border p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">🎨 Galería de Widgets</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div 
                  onClick={() => addWidget('metric')}
                  className="p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 cursor-pointer transition-colors text-center"
                >
                  <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <div className="font-semibold text-gray-900">Widget de Métrica</div>
                  <div className="text-sm text-gray-600">KPIs y números clave</div>
                </div>

                <div 
                  onClick={() => addWidget('chart')}
                  className="p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 cursor-pointer transition-colors text-center"
                >
                  <TruckIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <div className="font-semibold text-gray-900">Gráfico de Rutas</div>
                  <div className="text-sm text-gray-600">Top rutas y performance</div>
                </div>

                <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 cursor-not-allowed transition-colors text-center opacity-50">
                  <UsersIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <div className="font-semibold text-gray-900">Widget de Clientes</div>
                  <div className="text-sm text-gray-600">Próximamente</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Presets */}
        <div className="bg-white rounded-lg shadow border p-8 mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">🎯 Layouts Predefinidos</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button className="p-6 border rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-left">
              <div className="font-semibold text-gray-900 mb-2">📊 Ejecutivo</div>
              <div className="text-sm text-gray-600 mb-3">
                KPIs principales y métricas de alto nivel
              </div>
              <div className="text-xs text-gray-500">
                4 widgets de métricas + gráfico de tendencias
              </div>
            </button>

            <button className="p-6 border rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-left">
              <div className="font-semibold text-gray-900 mb-2">🚚 Operativo</div>
              <div className="text-sm text-gray-600 mb-3">
                Enfocado en envíos y tracking
              </div>
              <div className="text-xs text-gray-500">
                Mapa en vivo + lista de envíos + alertas
              </div>
            </button>

            <button className="p-6 border rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-left">
              <div className="font-semibold text-gray-900 mb-2">💰 Financiero</div>
              <div className="text-sm text-gray-600 mb-3">
                Ingresos, costos y rentabilidad
              </div>
              <div className="text-xs text-gray-500">
                Gráficos de ingresos + análisis de costos
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
