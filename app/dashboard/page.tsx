import Link from 'next/link'
import { 
  TruckIcon, 
  ChartBarIcon, 
  DocumentTextIcon, 
  Cog6ToothIcon,
  PlusIcon
} from '@heroicons/react/24/outline'

const stats = [
  { name: 'Envíos este mes', value: '127', icon: TruckIcon, color: 'blue' },
  { name: 'Ahorro total', value: '$4,250', icon: ChartBarIcon, color: 'green' },
  { name: 'En tránsito', value: '23', icon: DocumentTextIcon, color: 'yellow' },
  { name: 'Entregados', value: '104', icon: Cog6ToothIcon, color: 'purple' },
]

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Gestiona todos tus envíos desde aquí
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Link
            href="/dashboard/new-shipment"
            className="bg-primary-600 text-white p-6 rounded-xl hover:bg-primary-700 transition-colors group"
          >
            <div className="flex items-center space-x-3">
              <PlusIcon className="h-8 w-8 group-hover:scale-110 transition-transform" />
              <div>
                <div className="font-semibold">Nuevo Envío</div>
                <div className="text-sm opacity-90">Crear envío</div>
              </div>
            </div>
          </Link>

          <Link
            href="/dashboard/tracking"
            className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow group"
          >
            <div className="flex items-center space-x-3">
              <TruckIcon className="h-8 w-8 text-primary-600 group-hover:scale-110 transition-transform" />
              <div>
                <div className="font-semibold text-gray-900">Tracking</div>
                <div className="text-sm text-gray-600">Rastrear envíos</div>
              </div>
            </div>
          </Link>

          <Link
            href="/dashboard/analytics"
            className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow group"
          >
            <div className="flex items-center space-x-3">
              <ChartBarIcon className="h-8 w-8 text-primary-600 group-hover:scale-110 transition-transform" />
              <div>
                <div className="font-semibold text-gray-900">Analytics</div>
                <div className="text-sm text-gray-600">Ver reportes</div>
              </div>
            </div>
          </Link>

          <Link
            href="/dashboard/settings"
            className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow group"
          >
            <div className="flex items-center space-x-3">
              <Cog6ToothIcon className="h-8 w-8 text-primary-600 group-hover:scale-110 transition-transform" />
              <div>
                <div className="font-semibold text-gray-900">Configuración</div>
                <div className="text-sm text-gray-600">Ajustes</div>
              </div>
            </div>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="card">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${
                  stat.color === 'blue' ? 'bg-blue-100' :
                  stat.color === 'green' ? 'bg-green-100' :
                  stat.color === 'yellow' ? 'bg-yellow-100' : 'bg-purple-100'
                }`}>
                  <stat.icon className={`h-6 w-6 ${
                    stat.color === 'blue' ? 'text-blue-600' :
                    stat.color === 'green' ? 'text-green-600' :
                    stat.color === 'yellow' ? 'text-yellow-600' : 'text-purple-600'
                  }`} />
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-500">
                    {stat.name}
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Shipments */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Envíos Recientes</h2>
            <Link href="/dashboard/shipments" className="text-primary-600 hover:text-primary-700 font-medium">
              Ver todos
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Destinatario</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Paquetería</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Estado</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Costo</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-sm text-gray-900">SH-001</td>
                  <td className="py-3 px-4 text-sm text-gray-900">Juan Pérez</td>
                  <td className="py-3 px-4 text-sm text-gray-900">FedEx</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
                      Entregado
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">$245.50</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-sm text-gray-900">SH-002</td>
                  <td className="py-3 px-4 text-sm text-gray-900">Ana López</td>
                  <td className="py-3 px-4 text-sm text-gray-900">DHL</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
                      En tránsito
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">$180.75</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm text-gray-900">SH-003</td>
                  <td className="py-3 px-4 text-sm text-gray-900">Carlos Méndez</td>
                  <td className="py-3 px-4 text-sm text-gray-900">Estafeta</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded-full">
                      Procesando
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">$145.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
