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
      'Hasta 100 envíos por mes',
      'Cotizaciones en tiempo real',
      '3 paqueterías incluidas',
      'Dashboard básico',
      'Soporte por email',
    ],
    mostPopular: false,
  },
  {
    name: 'Pro',
    id: 'tier-pro',
    href: '/signup?plan=pro',
    price: '$99',
    description: 'Para empresas que necesitan más funcionalidades.',
    features: [
      'Hasta 2,000 envíos por mes',
      'Todas las paqueterías',
      'API completa',
      'Plugins para e-commerce',
      'Analytics avanzados',
      'Soporte prioritario',
      'White-label básico',
    ],
    mostPopular: true,
  },
  {
    name: 'Enterprise',
    id: 'tier-enterprise',
    href: '/contact',
    price: 'Personalizado',
    description: 'Para empresas con alto volumen de envíos.',
    features: [
      'Envíos ilimitados',
      'Todas las funcionalidades',
      'Integraciones personalizadas',
      'White-label completo',
      'Soporte 24/7',
      'Account manager dedicado',
      'SLA garantizado',
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

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative rounded-2xl border ${
                tier.mostPopular
                  ? 'border-primary-500 shadow-xl scale-105'
                  : 'border-gray-200 shadow-lg'
              } p-8`}
            >
              {tier.mostPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-600 text-white px-4 py-1 text-sm font-medium rounded-full">
                    Más Popular
                  </span>
                </div>
              )}

              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900">{tier.name}</h3>
                <div className="mt-4 flex items-center justify-center">
                  <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                  {tier.price !== 'Gratis' && tier.price !== 'Personalizado' && (
                    <span className="text-gray-600 ml-2">/mes</span>
                  )}
                </div>
                <p className="mt-4 text-gray-600">{tier.description}</p>
              </div>

              <ul className="mt-8 space-y-4">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start space-x-3">
                    <CheckIcon className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Link
                  href={tier.href}
                  className={`block w-full text-center py-3 px-6 rounded-lg font-medium transition-colors ${
                    tier.mostPopular
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-primary-50 text-primary-600 hover:bg-primary-100'
                  }`}
                >
                  {tier.name === 'Enterprise' ? 'Contactar Ventas' : 'Empezar Ahora'}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            ¿Tienes preguntas sobre nuestros planes?
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
