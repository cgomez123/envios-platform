import { Hero } from '@/components/Hero'
import { Features } from '@/components/Features'
import { ShippingCalculator } from '@/components/ShippingCalculator'
import TrackingSearch from '@/components/TrackingSearch'
import { Stats } from '@/components/Stats'
import { Testimonials } from '@/components/Testimonials'
import { CTA } from '@/components/CTA'

export default function Home() {
  return (
    <>
      <Hero />
      
      {/* Sección principal con tabs */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              💰 Cotizar Envío
            </h2>
            <ShippingCalculator />
          </div>
          
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              🔍 Rastrear Paquete
            </h2>
            <TrackingSearch />
          </div>
        </div>
      </div>
      
      <Stats />
      <Features />
      <Testimonials />
      <CTA />
    </>
  )
}
