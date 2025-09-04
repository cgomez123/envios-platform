import Link from 'next/link'
import { CheckIcon } from '@heroicons/react/24/solid'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const tiers = [
  {
    name: 'Starter',
    id: 'tier-starter',
    href: '/signup?plan=starter',
    price: 'Gratis',
    description: 'Perfecto para empezar y probar la plataforma.',
    features: [
      '100 envíos gratis por mes',
      'Cotización en tiempo real',
      'Tracking básico',
      'Soporte por email',
      'API básica',
    ],
    mostPopular: false,
  },
  {
    name: 'Professional',
    id: 'tier-professional', 
    href: '/signup?plan=professional',
    price: '$299',
    priceDescription: 'por mes',
    description: 'Para empresas que necesitan más volumen y funcionalidades.',
    features: [
      '1,000 envíos incluidos',
      'Todas las funcionalidades',
      'Integración Shopify/WooCommerce',
      'Analytics avanzados',
      'API completa con webhooks',
      'Soporte prioritario',
      'Etiquetas personalizadas',
    ],
    mostPopular: true,
  },
  {
    name: 'Enterprise',
    id: 'tier-enterprise',
    href: '/contact?plan=enterprise',
    price: 'Personalizado',
    description: 'Soluciones a medida para grandes volúmenes.',
    features: [
      'Envíos ilimitados',
      'Integración personalizada',
      'Account manager dedicado',
      'SLA garantizado',
      'Reportes personalizados',
      'Soporte 24/7',
      'On-premise opcional',
    ],
    mostPopular: false,
  },
]

export default function Pricing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Precios transparentes para cada necesidad
              </h1>
              <p className="text-xl text-gray-600">
                Empieza gratis y escala cuando necesites más funcionalidades
              </p>
            </div>

            {/* Pricing tiers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {tiers.map((tier) => (
                <div
                  key={tier.id}
                  className={`rounded-2xl border ${
                    tier.mostPopular
                      ? 'border-primary-500 ring-2 ring-primary-500 shadow-lg'
                      : 'border-gray-200'
                  } bg-white p-8 relative`}
                >
                  {tier.mostPopular && (
                    <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Más Popular
                    </span>
                  )}
                  
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-900">{tier.name}</h3>
                    <p className="mt-4 text-sm text-gray-600">{tier.description}</p>
                    <div className="mt-6">
                      <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                      {tier.priceDescription && (
                        <span className="text-base text-gray-600 ml-1">{tier.priceDescription}</span>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="mt-8 space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-primary-500 shrink-0 mt-0.5" />
                        <span className="ml-3 text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <div className="mt-8">
                    <Link
                      href={tier.href}
                      className={`block w-full rounded-lg px-4 py-3 text-center text-sm font-semibold transition-colors ${
                        tier.mostPopular
                          ? 'bg-primary-600 text-white hover:bg-primary-700'
                          : 'bg-gray-50 text-gray-900 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      {tier.name === 'Enterprise' ? 'Contactar Ventas' : 'Empezar Ahora'}
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ Section */}
            <div className="mt-20 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                ¿Necesitas ayuda para elegir?
              </h2>
              <p className="text-gray-600 mb-6">
                Nuestro equipo te ayudará a encontrar el plan perfecto para tu negocio
              </p>
              <Link
                href="/contact"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Contáctanos y te ayudamos
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}