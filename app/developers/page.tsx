'use client'

import { useState } from 'react'
import { DocumentDuplicateIcon, CheckIcon } from '@heroicons/react/24/outline'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function DevelopersPage() {
  const [copiedSection, setCopiedSection] = useState<string | null>(null)
  const [selectedExample, setSelectedExample] = useState('quotes')

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedSection(section)
      setTimeout(() => setCopiedSection(null), 2000)
    })
  }

  const examples = {
    quotes: {
      title: 'Obtener Cotizaciones',
      description: 'Obtén cotizaciones de múltiples paqueterías',
      code: `curl -X POST https://envios-platform.vercel.app/api/v1/quotes \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: sk_live_1234567890abcdef" \\
  -d '{
    "from": {
      "city": "Ciudad de México",
      "state": "CDMX", 
      "zip": "01000"
    },
    "to": {
      "city": "Guadalajara",
      "state": "JAL",
      "zip": "44100"
    },
    "packages": [
      {
        "weight": 2.5,
        "dimensions": {
          "length": 30,
          "width": 20,
          "height": 15
        },
        "description": "Productos electrónicos",
        "declared_value": 1500
      }
    ]
  }'`,
      response: `{
  "success": true,
  "data": {
    "quotes": [
      {
        "quote_id": "consolidated_FEDEX_1693834567890",
        "carrier": "FedEx",
        "service": "FedEx Express", 
        "total_price": 245,
        "currency": "MXN",
        "delivery_time": "1-2 días hábiles",
        "tracking_included": true,
        "insurance_included": true
      }
    ],
    "quote_count": 4,
    "valid_until": "2024-09-03T15:30:00Z"
  }
}`
    },
    
    shipment: {
      title: 'Crear Envío',
      description: 'Crea un envío usando una cotización',
      code: `curl -X POST https://envios-platform.vercel.app/api/v1/shipments \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: sk_live_1234567890abcdef" \\
  -d '{
    "quote_id": "consolidated_FEDEX_1693834567890",
    "sender": {
      "name": "Juan Pérez",
      "company": "Mi Empresa SA",
      "address": "Av. Reforma 123",
      "city": "Ciudad de México",
      "state": "CDMX",
      "zip": "01000",
      "phone": "+52 55 1234 5678",
      "email": "juan@miempresa.com"
    },
    "recipient": {
      "name": "Ana García",
      "address": "Calle Principal 456", 
      "city": "Guadalajara",
      "state": "JAL",
      "zip": "44100",
      "phone": "+52 33 9876 5432",
      "email": "ana@cliente.com"
    },
    "package_info": {
      "weight": 2.5,
      "description": "Productos electrónicos",
      "declared_value": 1500
    },
    "options": {
      "webhook_url": "https://tu-sitio.com/webhook"
    }
  }'`,
      response: `{
  "success": true,
  "data": {
    "shipment_id": "SH-API-1693834567890",
    "tracking_number": "API123456789",
    "status": "created",
    "urls": {
      "tracking": "https://envios-platform.vercel.app/tracking/API123456789",
      "label_pdf": "https://envios-platform.vercel.app/api/v1/shipments/SH-API-1693834567890/label"
    },
    "estimated_delivery": "2024-09-06T00:00:00Z"
  }
}`
    },

    tracking: {
      title: 'Rastrear Envío',
      description: 'Obtén el estado actual de un envío',
      code: `curl -X GET https://envios-platform.vercel.app/api/v1/tracking/API123456789 \\
  -H "X-API-Key: sk_live_1234567890abcdef"`,
      response: `{
  "success": true,
  "data": {
    "tracking_number": "API123456789",
    "status": "in_transit",
    "info": {
      "carrier": "FedEx Express",
      "estimated_delivery": "2024-09-06"
    },
    "events": [
      {
        "status": "in_transit",
        "timestamp": "2024-09-05T14:30:00Z",
        "location": "León, GTO",
        "description": "En tránsito hacia destino"
      }
    ]
  }
}`
    },

    javascript: {
      title: 'JavaScript SDK',
      description: 'Integración fácil con nuestro SDK',
      code: `<!-- Incluir SDK -->
<script src="https://envios-platform.vercel.app/sdk/shipmaster-sdk.js"></script>

<script>
// Inicializar SDK
const shipmaster = new ShipMasterSDK('sk_live_1234567890abcdef', {
  debug: true
});

// Obtener cotizaciones
async function getShippingQuotes() {
  const quotes = await shipmaster.getQuotes(
    { city: 'Ciudad de México', state: 'CDMX' },
    { city: 'Guadalajara', state: 'JAL' },
    [{ weight: 2.5, description: 'Productos' }]
  );
  
  console.log('Cotizaciones:', quotes.data.quotes);
}

// Crear widget automático
shipmaster.createShippingWidget('shipping-calculator', {
  onQuoteSelected: (quote) => {
    console.log('Quote seleccionado:', quote);
  }
});
</script>

<!-- Contenedor para el widget -->
<div id="shipping-calculator"></div>`,
      response: `// El widget se renderiza automáticamente
// y permite a los usuarios calcular envíos
// directamente en tu sitio web`
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary-600 rounded-xl flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-2xl">API</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            API para Desarrolladores
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Integra ShipMaster Pro en cualquier aplicación con nuestra API RESTful completa
          </p>
        </div>

        {/* Quick Start */}
        <div className="bg-white rounded-lg shadow border p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🚀 Quick Start</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Obtén API Key</h3>
              <p className="text-sm text-gray-600">Regístrate y genera tu API key gratis</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 font-bold">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Hacer Request</h3>
              <p className="text-sm text-gray-600">Usa nuestros endpoints RESTful</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-600 font-bold">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">¡Listo!</h3>
              <p className="text-sm text-gray-600">Cotizaciones y envíos automatizados</p>
            </div>
          </div>

          {/* API Key Demo */}
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
            <div className="text-gray-500"># Tu API key demo (funciona inmediatamente):</div>
            <div className="flex items-center justify-between">
              <span>sk_demo_shopify_integration</span>
              <button
                onClick={() => copyToClipboard('sk_demo_shopify_integration', 'apikey')}
                className="text-gray-400 hover:text-white ml-4"
              >
                {copiedSection === 'apikey' ? (
                  <CheckIcon className="h-4 w-4" />
                ) : (
                  <DocumentDuplicateIcon className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Examples */}
        <div className="bg-white rounded-lg shadow border p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📝 Ejemplos de Uso</h2>
          
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            {Object.keys(examples).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedExample(key)}
                className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                  selectedExample === key
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {examples[key as keyof typeof examples].title}
              </button>
            ))}
          </div>

          {/* Example Content */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {examples[selectedExample as keyof typeof examples].title}
              </h3>
              <p className="text-gray-600 mb-4">
                {examples[selectedExample as keyof typeof examples].description}
              </p>
            </div>

            {/* Request */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">Request:</h4>
                <button
                  onClick={() => copyToClipboard(examples[selectedExample as keyof typeof examples].code, 'request')}
                  className="flex items-center space-x-2 text-gray-500 hover:text-gray-700"
                >
                  {copiedSection === 'request' ? (
                    <CheckIcon className="h-4 w-4" />
                  ) : (
                    <DocumentDuplicateIcon className="h-4 w-4" />
                  )}
                  <span className="text-sm">Copiar</span>
                </button>
              </div>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{examples[selectedExample as keyof typeof examples].code}</code>
              </pre>
            </div>

            {/* Response */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">Response:</h4>
                <button
                  onClick={() => copyToClipboard(examples[selectedExample as keyof typeof examples].response, 'response')}
                  className="flex items-center space-x-2 text-gray-500 hover:text-gray-700"
                >
                  {copiedSection === 'response' ? (
                    <CheckIcon className="h-4 w-4" />
                  ) : (
                    <DocumentDuplicateIcon className="h-4 w-4" />
                  )}
                  <span className="text-sm">Copiar</span>
                </button>
              </div>
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{examples[selectedExample as keyof typeof examples].response}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* SDK Download */}
        <div className="bg-white rounded-lg shadow border p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📦 SDKs y Plugins</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-green-600 font-bold">JS</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">JavaScript SDK</h3>
                  <p className="text-sm text-gray-600">Para cualquier sitio web</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <a
                  href="/sdk/shipmaster-sdk.js"
                  download
                  className="block w-full btn-primary text-center"
                >
                  📥 Descargar SDK
                </a>
                <button
                  onClick={() => copyToClipboard('<script src="https://envios-platform.vercel.app/sdk/shipmaster-sdk.js"></script>', 'js-cdn')}
                  className="w-full btn-secondary flex items-center justify-center space-x-2"
                >
                  {copiedSection === 'js-cdn' ? (
                    <CheckIcon className="h-4 w-4" />
                  ) : (
                    <DocumentDuplicateIcon className="h-4 w-4" />
                  )}
                  <span>Copiar CDN</span>
                </button>
              </div>
            </div>

            <div className="border rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-purple-600 font-bold">🛒</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Plugin Shopify</h3>
                  <p className="text-sm text-gray-600">Integración nativa</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <a
                  href="/shopify-plugin/installation-guide.html"
                  target="_blank"
                  className="block w-full btn-primary text-center"
                >
                  📖 Guía de Instalación
                </a>
                <a
                  href="/shopify-plugin/shipmaster-plugin.js"
                  download
                  className="block w-full btn-secondary text-center"
                >
                  📥 Descargar Plugin
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Live Tester */}
        <div className="bg-white rounded-lg shadow border p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🧪 Probador en Vivo</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <p className="text-blue-900 mb-4">
              <strong>¡Prueba la API ahora mismo!</strong> Usa tu API key demo para hacer requests reales.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="/test-api"
                className="btn-primary text-center block"
              >
                🧪 Probador de API
              </a>
              <a
                href="/debug-api"
                className="btn-secondary text-center block"
              >
                🔧 Debug Tool
              </a>
            </div>
          </div>
        </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
