'use client'

import { useState } from 'react'
import { DocumentDuplicateIcon, CheckIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

export default function ShopifyIntegration() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(1)

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedCode(section)
      setTimeout(() => setCopiedCode(null), 2000)
    })
  }

  const installationCode = `<meta name="shipmaster-api-key" content="sk_demo_shopify_integration">
<meta name="shipmaster-debug" content="true">

<!-- Antes del </body> -->
<script src="https://envios-platform.vercel.app/shopify-plugin/shipmaster-plugin.js"></script>`

  const customCode = `<script>
// Inicialización personalizada
const shipmaster = new ShipMasterShopify('tu_api_key', {
    debug: true,
    autoShow: true,
    baseUrl: 'https://envios-platform.vercel.app'
});

// Crear envío desde orden de Shopify
document.addEventListener('checkout:completed', async (event) => {
    const order = event.detail;
    
    const shipment = await shipmaster.createShipment({
        quote_id: order.selectedQuote,
        sender: {
            name: 'Mi Tienda',
            address: 'Mi dirección',
            city: 'Ciudad de México',
            state: 'CDMX'
        },
        recipient: {
            name: order.shipping_address.name,
            address: order.shipping_address.address1,
            city: order.shipping_address.city,
            state: order.shipping_address.province
        },
        package_info: {
            weight: order.total_weight / 1000, // Gramos a kg
            description: 'Productos de tienda online'
        }
    });
    
    console.log('Envío creado automáticamente:', shipment);
});
</script>`

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-2xl">🛒</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Integración con Shopify
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Agrega cotizaciones automáticas de envío a tu tienda Shopify en minutos
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= step ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`w-8 h-0.5 ${
                    currentStep > step ? 'bg-primary-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1 */}
        <div className="bg-white rounded-lg shadow border p-8 mb-6">
          <div className="flex items-center mb-4">
            <span className="bg-primary-100 text-primary-600 w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">1</span>
            <h2 className="text-xl font-bold text-gray-900">Obtener API Key</h2>
          </div>
          
          <p className="text-gray-600 mb-4">
            Primero necesitas una API key gratuita de ShipMaster Pro:
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-500">1.</span>
              <span>Regístrate en</span>
              <a href="/signup" target="_blank" className="text-primary-600 hover:underline font-medium">
                ShipMaster Pro
              </a>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-500">2.</span>
              <span>Ve a Dashboard → Configuración → API Keys</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-500">3.</span>
              <span>Crea nueva API key para Shopify</span>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-900 mb-2">
              <strong>🚀 Para empezar inmediatamente</strong>, usa esta API key de demo:
            </p>
            <div className="flex items-center justify-between bg-white p-3 rounded border">
              <code className="font-mono text-sm">sk_demo_shopify_integration</code>
              <button
                onClick={() => copyToClipboard('sk_demo_shopify_integration', 'demo-key')}
                className="text-blue-600 hover:text-blue-700"
              >
                {copiedCode === 'demo-key' ? (
                  <CheckIcon className="h-4 w-4" />
                ) : (
                  <DocumentDuplicateIcon className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button 
              onClick={() => setCurrentStep(2)}
              className="btn-primary"
            >
              Siguiente: Instalar Plugin
            </button>
          </div>
        </div>

        {/* Step 2 */}
        {currentStep >= 2 && (
          <div className="bg-white rounded-lg shadow border p-8 mb-6">
            <div className="flex items-center mb-4">
              <span className="bg-primary-100 text-primary-600 w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">2</span>
              <h2 className="text-xl font-bold text-gray-900">Descargar Plugin</h2>
            </div>
            
            <p className="text-gray-600 mb-6">
              Descarga e instala el plugin en tu tienda Shopify:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <a
                href="/shopify-plugin/shipmaster-plugin.js"
                download
                className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-primary-500 hover:bg-primary-50 transition-colors group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📥</div>
                <div className="font-semibold text-gray-900 mb-2">Descargar Plugin</div>
                <div className="text-sm text-gray-600">shipmaster-plugin.js</div>
              </a>

              <a
                href="/shopify-plugin/installation-guide.html"
                target="_blank"
                className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-green-500 hover:bg-green-50 transition-colors group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📖</div>
                <div className="font-semibold text-gray-900 mb-2">Guía Completa</div>
                <div className="text-sm text-gray-600">Instrucciones paso a paso</div>
                <ArrowTopRightOnSquareIcon className="h-4 w-4 inline ml-1" />
              </a>
            </div>

            <div className="flex justify-between">
              <button 
                onClick={() => setCurrentStep(1)}
                className="btn-secondary"
              >
                Anterior
              </button>
              <button 
                onClick={() => setCurrentStep(3)}
                className="btn-primary"
              >
                Siguiente: Configurar
              </button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {currentStep >= 3 && (
          <div className="bg-white rounded-lg shadow border p-8 mb-6">
            <div className="flex items-center mb-4">
              <span className="bg-primary-100 text-primary-600 w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">3</span>
              <h2 className="text-xl font-bold text-gray-900">Agregar al Theme</h2>
            </div>
            
            <p className="text-gray-600 mb-6">
              En tu admin de Shopify, agrega este código a tu theme:
            </p>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">En theme.liquid o cart.liquid:</h4>
                  <button
                    onClick={() => copyToClipboard(installationCode, 'installation')}
                    className="flex items-center space-x-2 text-gray-500 hover:text-gray-700"
                  >
                    {copiedCode === 'installation' ? (
                      <CheckIcon className="h-4 w-4" />
                    ) : (
                      <DocumentDuplicateIcon className="h-4 w-4" />
                    )}
                    <span className="text-sm">Copiar</span>
                  </button>
                </div>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{installationCode}</code>
                </pre>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800">
                  <strong>📍 Ubicación:</strong> Online Store → Themes → Actions → Edit Code → theme.liquid
                </p>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button 
                onClick={() => setCurrentStep(2)}
                className="btn-secondary"
              >
                Anterior
              </button>
              <button 
                onClick={() => setCurrentStep(4)}
                className="btn-primary"
              >
                Siguiente: Personalizar
              </button>
            </div>
          </div>
        )}

        {/* Step 4 */}
        {currentStep >= 4 && (
          <div className="bg-white rounded-lg shadow border p-8 mb-6">
            <div className="flex items-center mb-4">
              <span className="bg-primary-100 text-primary-600 w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">4</span>
              <h2 className="text-xl font-bold text-gray-900">Personalización Avanzada (Opcional)</h2>
            </div>
            
            <p className="text-gray-600 mb-6">
              Para integración más avanzada con tu checkout:
            </p>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">Código personalizado:</h4>
                <button
                  onClick={() => copyToClipboard(customCode, 'custom')}
                  className="flex items-center space-x-2 text-gray-500 hover:text-gray-700"
                >
                  {copiedCode === 'custom' ? (
                    <CheckIcon className="h-4 w-4" />
                  ) : (
                    <DocumentDuplicateIcon className="h-4 w-4" />
                  )}
                  <span className="text-sm">Copiar</span>
                </button>
              </div>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{customCode}</code>
              </pre>
            </div>

            <div className="flex justify-between mt-6">
              <button 
                onClick={() => setCurrentStep(3)}
                className="btn-secondary"
              >
                Anterior
              </button>
              <button className="btn-primary bg-green-600 hover:bg-green-700">
                ✅ ¡Instalación Completa!
              </button>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="bg-white rounded-lg shadow border p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🎯 Características del Plugin</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold">⚡</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Instalación automática</div>
                  <div className="text-sm text-gray-600">Se activa automáticamente en el carrito</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold">💰</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Cotizaciones en tiempo real</div>
                  <div className="text-sm text-gray-600">Precios actualizados de múltiples paqueterías</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold">🎨</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Diseño personalizable</div>
                  <div className="text-sm text-gray-600">Se adapta al diseño de tu tema</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 font-bold">📦</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Multi-paquete</div>
                  <div className="text-sm text-gray-600">Calcula envío para carrito completo</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 font-bold">🔄</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Auto-actualización</div>
                  <div className="text-sm text-gray-600">Se actualiza cuando cambia el carrito</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-indigo-600 font-bold">🔗</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">API completa</div>
                  <div className="text-sm text-gray-600">Acceso a toda la funcionalidad</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Demo */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg p-8 text-white mt-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">🎮 Ver Demo en Vivo</h2>
            <p className="text-primary-100 mb-6">
              Prueba cómo se ve el plugin en acción
            </p>
            <a
              href="/demo/shopify-simulation"
              className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
            >
              <span>🛒 Ver Simulación de Checkout</span>
              <ArrowTopRightOnSquareIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Support */}
        <div className="bg-white rounded-lg shadow border p-8 mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">💬 Soporte</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Documentación</h3>
              <p className="text-gray-600 mb-3">Guías completas y ejemplos</p>
              <a href="/developers" className="text-primary-600 hover:underline">
                Ver documentación completa →
              </a>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Soporte Técnico</h3>
              <p className="text-gray-600 mb-3">Ayuda directa de nuestro equipo</p>
              <a href="mailto:developers@shipmaster.pro" className="text-primary-600 hover:underline">
                developers@shipmaster.pro →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
