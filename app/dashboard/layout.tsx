import Link from 'next/link'
import { 
  HomeIcon,
  TruckIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  BellIcon,
  DocumentTextIcon,
  UsersIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline'
import { NotificationCenter } from '@/components/NotificationCenter'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const navigation = [
    { name: 'Inicio', href: '/dashboard', icon: HomeIcon },
    { name: 'Nuevo Envío', href: '/dashboard/new-shipment', icon: PlusIcon },
    { name: 'Mis Envíos', href: '/dashboard/shipments', icon: TruckIcon },
    { name: 'Tracking Pro', href: '/dashboard/tracking-advanced', icon: MagnifyingGlassIcon },
    { name: 'Analytics', href: '/dashboard/analytics', icon: ChartBarIcon },
    { name: 'Dashboard Pro', href: '/dashboard/advanced', icon: RocketLaunchIcon },
    { name: 'Envíos Masivos', href: '/dashboard/bulk-shipments', icon: DocumentTextIcon },
    { name: 'Notificaciones', href: '/dashboard/notifications', icon: BellIcon },
    { name: 'Configuración', href: '/dashboard/settings', icon: Cog6ToothIcon },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-xl font-bold text-gray-900">ShipMaster Pro</span>
            </Link>

            <div className="flex items-center space-x-4">
              <NotificationCenter />
              <span className="text-gray-700">Bienvenido, Carlos</span>
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">CG</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6">
            <nav className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-primary-100 hover:text-primary-700 transition-colors"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Quick Stats in Sidebar */}
          <div className="px-6 pb-6">
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg p-4 text-white">
              <h3 className="font-semibold text-white/90 mb-3">📊 Resumen Rápido</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/80">Envíos hoy:</span>
                  <span className="font-bold">47</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Ingresos:</span>
                  <span className="font-bold">$28.4k</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">En tránsito:</span>
                  <span className="font-bold">234</span>
                </div>
              </div>
              <Link
                href="/dashboard/advanced"
                className="block mt-3 bg-white/20 text-white text-center py-2 rounded-md text-sm font-medium hover:bg-white/30 transition-colors"
              >
                Ver completo →
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  )
}
