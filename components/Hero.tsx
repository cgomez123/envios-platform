'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { TruckIcon, GlobeAltIcon, ChartBarIcon } from '@heroicons/react/24/outline'

export function Hero() {
  return (
    <section className="bg-gradient-to-r from-primary-50 to-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              La plataforma de envíos que{' '}
              <span className="text-primary-600">revoluciona</span>{' '}
              tu logística
            </h1>
            <p className="text-xl text-gray-600 mt-6 leading-relaxed">
              Conecta múltiples paqueterías, compara precios en tiempo real y gestiona 
              todos tus envíos desde una sola plataforma. API robusta, plugins para 
              e-commerce y dashboard intuitivo.
            </p>

            {/* Benefits */}
            <div className="mt-8 grid grid-cols-1 gap-4">
              <div className="flex items-center space-x-3">
                <TruckIcon className="h-6 w-6 text-primary-600" />
                <span className="text-gray-700">+50 paqueterías integradas</span>
              </div>
              <div className="flex items-center space-x-3">
                <GlobeAltIcon className="h-6 w-6 text-primary-600" />
                <span className="text-gray-700">Envíos nacionales e internacionales</span>
              </div>
              <div className="flex items-center space-x-3">
                <ChartBarIcon className="h-6 w-6 text-primary-600" />
                <span className="text-gray-700">Analytics y reportes avanzados</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/signup" className="btn-primary text-center">
                Empezar Gratis - 14 días
              </Link>
              <Link href="/demo" className="btn-secondary text-center">
                Ver Demo en Vivo
              </Link>
            </div>

            {/* Social Proof */}
            <div className="mt-8 text-sm text-gray-500">
              Más de 1,000+ empresas confían en nosotros
            </div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Cotizador Inteligente
                </h3>
              </div>
              
              {/* Mock Interface */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Desde
                    </label>
                    <div className="input-field bg-gray-50">
                      Ciudad de México, CDMX
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hasta
                    </label>
                    <div className="input-field bg-gray-50">
                      Guadalajara, JAL
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Peso
                    </label>
                    <div className="input-field bg-gray-50 text-center">2.5 kg</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Alto
                    </label>
                    <div className="input-field bg-gray-50 text-center">20 cm</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ancho
                    </label>
                    <div className="input-field bg-gray-50 text-center">30 cm</div>
                  </div>
                </div>

                <button className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                  Cotizar Envío
                </button>

                {/* Mock Results */}
                <div className="mt-6 space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-bold text-sm">FX</span>
                      </div>
                      <div>
                        <div className="font-medium text-green-900">FedEx Express</div>
                        <div className="text-sm text-green-600">1-2 días hábiles</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-900">$245</div>
                      <div className="text-sm text-green-600">Más rápido</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-sm">DH</span>
                      </div>
                      <div>
                        <div className="font-medium text-blue-900">DHL Standard</div>
                        <div className="text-sm text-blue-600">2-3 días hábiles</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-blue-900">$180</div>
                      <div className="text-sm text-blue-600">Mejor precio</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
