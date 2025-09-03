'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusIcon,
  TruckIcon,
  MapPinIcon,
  ClockIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'

const shipments = [
  {
    id: 'SH-2024-001',
    recipient: 'Juan Pérez Martínez',
    company: 'Distribuidora Norte SA',
    from: 'Ciudad de México, CDMX',
    to: 'Guadalajara, JAL',
    carrier: 'FedEx Express',
    status: 'delivered',
    trackingNumber: 'FX123456789MX',
    weight: '2.5 kg',
    cost: '$245.50',
    createdDate: '2024-09-01',
    deliveryDate: '2024-09-03',
    estimatedDelivery: '2024-09-03'
  },
  {
    id: 'SH-2024-002',
    recipient: 'Ana López Rivera',
    company: 'Boutique Fashion',
    from: 'Ciudad de México, CDMX',
    to: 'Monterrey, NL',
    carrier: 'DHL Express',
    status: 'in_transit',
    trackingNumber: 'DH987654321MX',
    weight: '1.8 kg',
    cost: '$180.75',
    createdDate: '2024-09-02',
    deliveryDate: null,
    estimatedDelivery: '2024-09-05'
  },
  {
    id: 'SH-2024-003',
    recipient: 'Carlos Méndez',
    company: 'Tech Solutions',
    from: 'Guadalajara, JAL',
    to: 'Ciudad de México, CDMX',
    carrier: 'Estafeta',
    status: 'processing',
    trackingNumber: 'EST456789123',
    weight: '3.2 kg',
    cost: '$145.00',
    createdDate: '2024-09-03',
    deliveryDate: null,
    estimatedDelivery: '2024-09-07'
  },
  {
    id: 'SH-2024-004',
    recipient: 'María González',
    company: 'Artesanías Mexicanas',
    from: 'Ciudad de México, CDMX',
    to: 'Cancún, QR',
    carrier: 'UPS Express',
    status: 'picked_up',
    trackingNumber: 'UPS789123456',
    weight: '4.1 kg',
    cost: '$320.30',
    createdDate: '2024-09-03',
    deliveryDate: null,
    estimatedDelivery: '2024-09-06'
  }
]

const statusColors = {
  delivered: 'bg-green-100 text-green-800',
  in_transit: 'bg-blue-100 text-blue-800',
  processing: 'bg-yellow-100 text-yellow-800',
  picked_up: 'bg-purple-100 text-purple-800',
  cancelled: 'bg-red-100 text-red-800'
}

const statusLabels = {
  delivered: 'Entregado',
  in_transit: 'En Tránsito', 
  processing: 'Procesando',
  picked_up: 'Recolectado',
  cancelled: 'Cancelado'
}

export default function Shipments() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredShipments = shipments.filter(shipment => {
    const matchesSearch = 
      shipment.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || shipment.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestión de Envíos</h1>
            <p className="text-gray-600 mt-2">
              Administra y rastrea todos tus envíos desde aquí
            </p>
          </div>
          
          <Link
            href="/dashboard/new-shipment"
            className="btn-primary flex items-center space-x-2"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Nuevo Envío</span>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center">
              <TruckIcon className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-500">Total Envíos</div>
                <div className="text-2xl font-bold text-gray-900">{shipments.length}</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center">
              <ClockIcon className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-500">En Tránsito</div>
                <div className="text-2xl font-bold text-gray-900">
                  {shipments.filter(s => s.status === 'in_transit' || s.status === 'picked_up').length}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center">
              <DocumentTextIcon className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-500">Entregados</div>
                <div className="text-2xl font-bold text-gray-900">
                  {shipments.filter(s => s.status === 'delivered').length}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center">
              <MapPinIcon className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-500">Costo Total</div>
                <div className="text-2xl font-bold text-gray-900">
                  ${shipments.reduce((sum, s) => sum + parseFloat(s.cost.replace('$', '').replace(',', '')), 0).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow border mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por ID, destinatario o tracking..."
                  className="pl-10 input-field"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <FunnelIcon className="h-5 w-5 text-gray-400" />
              <select
                className="input-field"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Todos los estados</option>
                <option value="delivered">Entregados</option>
                <option value="in_transit">En tránsito</option>
                <option value="processing">Procesando</option>
                <option value="picked_up">Recolectados</option>
              </select>
            </div>
          </div>
        </div>

        {/* Shipments Table */}
        <div className="bg-white rounded-lg shadow border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Envío
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Destinatario
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ruta
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Paquetería
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Costo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredShipments.map((shipment) => (
                  <tr key={shipment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{shipment.id}</div>
                        <div className="text-sm text-gray-500">Creado: {shipment.createdDate}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{shipment.recipient}</div>
                        <div className="text-sm text-gray-500">{shipment.company}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900">{shipment.from}</div>
                        <div className="text-sm text-gray-500">→ {shipment.to}</div>
                        <div className="text-xs text-gray-400">{shipment.weight}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{shipment.carrier}</div>
                      <div className="text-sm text-gray-500">{shipment.trackingNumber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[shipment.status as keyof typeof statusColors]}`}>
                        {statusLabels[shipment.status as keyof typeof statusLabels]}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        Est: {shipment.estimatedDelivery}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {shipment.cost}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => window.open(`/tracking/${shipment.trackingNumber}`, '_blank')}
                          className="text-primary-600 hover:text-primary-700"
                        >
                          🔍 Ver
                        </button>
                        <button 
                          onClick={() => window.open(`/tracking/${shipment.trackingNumber}`, '_blank')}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          📍 Track
                        </button>
                        <button 
                          onClick={() => window.open(`/api/shipments/${shipment.id}/label`, '_blank')}
                          className="text-green-600 hover:text-green-700"
                        >
                          📄 PDF
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredShipments.length === 0 && (
            <div className="text-center py-12">
              <TruckIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No se encontraron envíos
              </h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Intenta cambiar los filtros de búsqueda'
                  : 'Crea tu primer envío para empezar'
                }
              </p>
              <Link
                href="/dashboard/new-shipment"
                className="btn-primary inline-flex items-center space-x-2"
              >
                <PlusIcon className="h-5 w-5" />
                <span>Crear Primer Envío</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
