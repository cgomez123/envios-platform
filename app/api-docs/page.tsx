'use client'

import { useState } from 'react'
import { ClipboardDocumentIcon, CheckIcon } from '@heroicons/react/24/outline'

const apiEndpoints = [
  {
    method: 'POST',
    endpoint: '/api/shipping/quote',
    description: 'Obtener cotizaciones de envío',
    parameters: {
      from: 'string - Ciudad origen (ej: "Ciudad de México, CDMX")',
      to: 'string - Ciudad destino (ej: "Guadalajara, JAL")',
      weight: 'number - Peso en kilogramos',
      dimensions: 'object - {length: number, width: number, height: number} en cm'
    },
    example: `{
  "from": "Ciudad de México, CDMX",
  "to": "Guadalajara, JAL", 
  "weight": "2.5",
  "dimensions": {
    "length": "30",
    "width": "20", 
    "height": "15"
  }
}`
  }
]

export default function ApiDocs() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Documentación API
          </h1>
          <p className="text-xl text-gray-600">
            Integra nuestra API en tu aplicación en minutos
          </p>
        </div>

        {/* Quick Start */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Inicio Rápido</h2>
          <div className="bg-gray-900 rounded-lg p-4 relative">
            <button
              onClick={() => copyToClipboard('curl -X POST https://tu-app.vercel.app/api/shipping/quote \\  -H "Content-Type: application/json" \\  -d \'{"from": "CDMX", "to": "GDL", "weight": "2.5"}\'', 'curl-example')}
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
            >
              {copiedCode === 'curl-example' ? (
                <CheckIcon className="h-5 w-5 text-green-400" />
              ) : (
                <ClipboardDocumentIcon className="h-5 w-5" />
              )}
            </button>
            <pre className="text-green-400 text-sm overflow-x-auto">
{`curl -X POST https://tu-app.vercel.app/api/shipping/quote \\
  -H "Content-Type: application/json" \\
  -d '{"from": "CDMX", "to": "GDL", "weight": "2.5"}'`}
            </pre>
          </div>
        </div>

        {/* API Endpoints */}
        <div className="space-y-8">
          {apiEndpoints.map((endpoint, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  endpoint.method === 'POST' ? 'bg-green-100 text-green-800' : 
                  endpoint.method === 'GET' ? 'bg-blue-100 text-blue-800' : 
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {endpoint.method}
                </span>
                <code className="text-lg font-mono text-gray-900">
                  {endpoint.endpoint}
                </code>
              </div>

              <p className="text-gray-600 mb-6">{endpoint.description}</p>

              {/* Parameters */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Parámetros</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <dl className="space-y-2">
                    {Object.entries(endpoint.parameters).map(([key, value]) => (
                      <div key={key}>
                        <dt className="font-mono text-sm text-primary-600">{key}</dt>
                        <dd className="text-sm text-gray-700 ml-4">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              {/* Example */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">Ejemplo de Request</h4>
                  <button
                    onClick={() => copyToClipboard(endpoint.example, `example-${index}`)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {copiedCode === `example-${index}` ? (
                      <CheckIcon className="h-5 w-5 text-green-500" />
                    ) : (
                      <ClipboardDocumentIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <div className="bg-gray-900 rounded-lg p-4">
                  <pre className="text-green-400 text-sm overflow-x-auto">
                    {endpoint.example}
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Response Example */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Ejemplo de Respuesta</h3>
          <div className="bg-gray-900 rounded-lg p-4">
            <pre className="text-green-400 text-sm overflow-x-auto">
{`{
  "success": true,
  "quotes": [
    {
      "id": "quote_0",
      "carrier": "Estafeta",
      "service": "Estafeta Express",
      "price": 145.00,
      "currency": "MXN",
      "deliveryTime": "2-4 días hábiles",
      "trackingIncluded": true,
      "insuranceIncluded": false,
      "features": ["Rastreo incluido", "Precio competitivo"]
    },
    {
      "carrier": "DHL",
      "service": "DHL Express", 
      "price": 180.75,
      "deliveryTime": "2-3 días hábiles",
      "features": ["Rastreo incluido", "Seguro incluido"]
    }
  ],
  "requestId": "mienvio_1693766400000",
  "timestamp": "2024-09-03T21:00:00.000Z"
}`}
            </pre>
          </div>
        </div>

        {/* Authentication */}
        <div className="bg-primary-50 rounded-lg p-6 mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Autenticación</h3>
          <p className="text-gray-700 mb-4">
            Para usar la API en producción, necesitarás un API Key. 
          </p>
          <div className="bg-white rounded-lg p-4 border border-primary-200">
            <code className="text-sm text-gray-700">
              Authorization: Bearer tu-api-key-aqui
            </code>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            <strong>Nota:</strong> En modo demo, no se requiere autenticación.
          </p>
        </div>
      </div>
    </div>
  )
}
