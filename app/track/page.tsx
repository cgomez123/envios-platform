import TrackingSearch from '@/components/TrackingSearch'
import Link from 'next/link'

export default function TrackPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-xl font-bold text-gray-900">ShipMaster Pro</span>
            </Link>
            
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-16">
        <TrackingSearch />
        
        {/* Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-blue-600 font-bold">📍</span>
            </div>
            <h3 className="font-medium text-gray-900">Ubicación en Tiempo Real</h3>
            <p className="text-sm text-gray-600 mt-1">
              Ve exactamente dónde está tu paquete
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-green-600 font-bold">🔔</span>
            </div>
            <h3 className="font-medium text-gray-900">Notificaciones</h3>
            <p className="text-sm text-gray-600 mt-1">
              Recibe alertas de cada actualización
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-purple-600 font-bold">📊</span>
            </div>
            <h3 className="font-medium text-gray-900">Historial Completo</h3>
            <p className="text-sm text-gray-600 mt-1">
              Toda la información desde origen hasta destino
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            ¿Necesitas enviar un paquete?
          </p>
          <Link href="/" className="btn-primary">
            Cotizar Envío
          </Link>
        </div>
      </div>
    </div>
  )
}
