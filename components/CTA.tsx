import Link from 'next/link'

export function CTA() {
  return (
    <section className="py-16 bg-gradient-to-r from-primary-600 to-blue-600">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold text-white mb-4">
          ¿Listo para revolucionar tus envíos?
        </h2>
        <p className="text-xl text-primary-100 mb-8">
          Únete a más de 5,000 empresas que ya optimizaron su logística
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/signup"
            className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Empezar Gratis - 14 días
          </Link>
          <Link
            href="/contact"
            className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
          >
            Hablar con Ventas
          </Link>
        </div>

        <div className="mt-8 text-primary-100 text-sm">
          Sin tarjeta de crédito • Configuración en 5 minutos • Soporte 24/7
        </div>
      </div>
    </section>
  )
}
