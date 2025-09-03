import { CheckCircleIcon, TruckIcon } from '@heroicons/react/24/outline'

const carriers = [
  {
    name: 'FedEx',
    description: 'Envíos express nacionales e internacionales',
    logo: '🚚',
    features: ['Tracking en tiempo real', 'Seguro incluido', 'Entrega rápida'],
    coverage: 'Nacional e Internacional',
    avgDelivery: '1-2 días',
    status: 'active'
  },
  {
    name: 'DHL',
    description: 'Líder mundial en logística express',
    logo: '📦',
    features: ['Express mundial', 'Documentos y paquetes', 'Red global'],
    coverage: 'Internacional',
    avgDelivery: '2-3 días',
    status: 'active'
  },
  {
    name: 'Estafeta',
    description: 'Paquetería líder en México',
    logo: '🇲🇽',
    features: ['Cobertura nacional', 'Precios competitivos', 'Red amplia'],
    coverage: 'Nacional',
    avgDelivery: '2-4 días',
    status: 'active'
  },
  {
    name: 'UPS',
    description: 'Soluciones logísticas globales',
    logo: '🌎',
    features: ['Logística integrada', 'Tracking avanzado', 'Flexibilidad'],
    coverage: 'Nacional e Internacional',
    avgDelivery: '1-3 días',
    status: 'active'
  },
  {
    name: 'Correos de México',
    description: 'Servicio postal nacional',
    logo: '📮',
    features: ['Económico', 'Cobertura nacional', 'Servicio básico'],
    coverage: 'Nacional',
    avgDelivery: '5-8 días',
    status: 'active'
  },
  {
    name: '99 Minutos',
    description: 'Entregas same-day en principales ciudades',
    logo: '⚡',
    features: ['Entrega mismo día', 'Ciudades principales', 'Last mile'],
    coverage: 'CDMX, GDL, MTY',
    avgDelivery: 'Mismo día',
    status: 'coming_soon'
  }
]

const ecommerceIntegrations = [
  {
    name: 'Shopify',
    description: 'Plugin nativo para Shopify',
    logo: '🛍️',
    status: 'active',
    installTime: '5 minutos'
  },
  {
    name: 'WooCommerce',
    description: 'Extensión para WordPress',
    logo: '🔌',
    status: 'active',
    installTime: '10 minutos'
  },
  {
    name: 'Magento',
    description: 'Módulo para Magento 2',
    logo: '🏪',
    status: 'beta',
    installTime: '15 minutos'
  },
  {
    name: 'Mercado Libre',
    description: 'Integración con ML',
    logo: '💛',
    status: 'coming_soon',
    installTime: 'Próximamente'
  }
]

export default function Integrations() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Integraciones Disponibles
          </h1>
          <p className="text-xl text-gray-600">
            Conecta con múltiples paqueterías y plataformas de e-commerce
          </p>
        </div>

        {/* Carriers Section */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <TruckIcon className="h-8 w-8 text-primary-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">
              Paqueterías Disponibles
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {carriers.map((carrier) => (
              <div
                key={carrier.name}
                className={`bg-white rounded-lg shadow-md p-6 border ${
                  carrier.status === 'active' ? 'border-green-200' : 'border-yellow-200'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{carrier.logo}</span>
                    <div>
                      <h3 className="font-bold text-gray-900">{carrier.name}</h3>
                      <p className="text-sm text-gray-600">{carrier.description}</p>
                    </div>
                  </div>
                  {carrier.status === 'active' ? (
                    <CheckCircleIcon className="h-6 w-6 text-green-500" />
                  ) : (
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                      Próximamente
                    </span>
                  )}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Cobertura:</span>
                    <span className="font-medium text-gray-900">{carrier.coverage}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tiempo promedio:</span>
                    <span className="font-medium text-gray-900">{carrier.avgDelivery}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {carrier.features.map((feature, index) => (
                    <span
                      key={index}
                      className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* E-commerce Integrations */}
        <section>
          <div className="flex items-center mb-8">
            <div className="text-primary-600 mr-3 text-2xl">🔌</div>
            <h2 className="text-2xl font-bold text-gray-900">
              Plugins para E-commerce
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ecommerceIntegrations.map((integration) => (
              <div
                key={integration.name}
                className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
              >
                <div className="text-center mb-4">
                  <span className="text-4xl block mb-2">{integration.logo}</span>
                  <h3 className="font-bold text-gray-900">{integration.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{integration.description}</p>
                </div>

                <div className="text-center">
                  {integration.status === 'active' ? (
                    <div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mb-2">
                        <CheckCircleIcon className="h-4 w-4 mr-1" />
                        Disponible
                      </span>
                      <p className="text-sm text-gray-600">
                        Instalación: {integration.installTime}
                      </p>
                    </div>
                  ) : integration.status === 'beta' ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Beta
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Próximamente
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-primary-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              ¿Necesitas una integración específica?
            </h3>
            <p className="text-primary-100 mb-6">
              Nuestro equipo puede desarrollar integraciones personalizadas para tu negocio
            </p>
            <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Contactar Equipo Técnico
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
