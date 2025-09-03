import { Hero } from '@/components/Hero'
import { Features } from '@/components/Features'
import { ShippingCalculator } from '@/components/ShippingCalculator'
import { Stats } from '@/components/Stats'
import { Testimonials } from '@/components/Testimonials'
import { CTA } from '@/components/CTA'

export default function Home() {
  return (
    <>
      <Hero />
      <ShippingCalculator />
      <Stats />
      <Features />
      <Testimonials />
      <CTA />
    </>
  )
}
