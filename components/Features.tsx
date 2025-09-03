import {
  CloudArrowUpIcon,
  CogIcon,
  TruckIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  BoltIcon,
} from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Múltiples Paqueterías',
    description: 'Conecta con +50 carriers: FedEx, DHL, UPS, Estafeta y más.',
    icon: TruckIcon,
  },
  {
    name: 'API Robusta',
    description: 'Integra fácilmente con tu sistema existente usando nuestra API REST.',
    icon: CogIcon,
  },
  {
    name: 'Plugins E-commerce',
    description: 'Shopify, WooCommerce, Magento y más. Instalación en 1 click.',
    icon: DevicePhoneMobileIcon,
  },
  {
    name: 'Tracking en Tiempo Real',
    description: 'Rastrea todos tus envíos desde un solo dashboard.',
    icon: GlobeAltIcon,
  },
  {
    name: 'Analytics Avanzados',
    description: 'Reportes detallados, costos, tiempos y rendimiento.',
    icon: ChartBarIcon,
  },
  {
    name: 'Seguro de Envíos',
    description: 'Protección automática para todos tus paquetes.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Deploy Automático',
    description: 'Optimizado para Vercel con edge functions globales.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Súper Rápido',
    description: 'Cotizaciones en menos de 2 segundos.',
    icon: BoltIcon,
  },
]

export function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Todo lo que necesitas para dominar tus envíos
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Combina lo mejor de las plataformas líderes en una sola solución
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.name}
              className="group relative p-6 bg-gray-50 rounded-xl hover:bg-primary-50 transition-all duration-300"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-primary-600 rounded-lg mb-4 group-hover:bg-primary-700 transition-colors">
                <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.name}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
