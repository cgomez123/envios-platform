'use client'

import { useState } from 'react'
import { CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function TestAPI() {
  const [testResult, setTestResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testMienvioConnection = async () => {
    setLoading(true)
    setTestResult(null)

    try {
      const response = await fetch('/api/test-mienvio')
      const data = await response.json()
      setTestResult(data)
    } catch (error) {
      setTestResult({
        success: false,
        error: 'Error de conexión',
        details: error instanceof Error ? error.message : 'Error desconocido'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🧪 Testing de API Mienvío
          </h1>
          <p className="text-xl text-gray-600">
            Verifica que tus credenciales funcionen correctamente
          </p>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
            <div className="flex items-center space-x-2">
              <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600" />
              <span className="font-medium text-yellow-800">SOLO TESTING - NO GENERA CARGOS</span>
            </div>
            <p className="text-yellow-700 text-sm mt-2">
              Este test solo hace cotizaciones. NO crea envíos reales ni genera costos.
            </p>
          </div>
        </div>

        {/* Test Button */}
        <div className="text-center mb-8">
          <button
            onClick={testMienvioConnection}
            disabled={loading}
            className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Probando conexión...</span>
              </div>
            ) : (
              '🔍 Probar Conexión con Mienvío'
            )}
          </button>
        </div>

        {/* Results */}
        {testResult && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-6">
              {testResult.success ? (
                <CheckCircleIcon className="h-8 w-8 text-green-500" />
              ) : (
                <XCircleIcon className="h-8 w-8 text-red-500" />
              )}
              <h2 className="text-2xl font-bold text-gray-900">
                {testResult.success ? '✅ Conexión Exitosa' : '❌ Error de Conexión'}
              </h2>
            </div>

            {testResult.success ? (
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-2">Estado de la Conexión</h3>
                  <p className="text-green-700">{testResult.message}</p>
                  <p className="text-sm text-green-600 mt-1">
                    Tipo de test: {testResult.testType}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Credenciales</h4>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">API Key:</span>
                        <span className="font-mono text-sm">{testResult.credentials?.MIENVIO_API_KEY}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Usuario:</span>
                        <span className="font-mono text-sm">{testResult.credentials?.MIENVIO_USERNAME}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">URL:</span>
                        <span className="font-mono text-sm text-blue-600">{testResult.credentials?.API_URL}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Resultados</h4>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status HTTP:</span>
                        <span className="font-semibold text-green-600">{testResult.responseStatus}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cotizaciones encontradas:</span>
                        <span className="font-semibold text-green-600">{testResult.quotesFound}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {testResult.sampleData && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Muestra de Cotizaciones</h4>
                    <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-green-400 text-sm">
                        {JSON.stringify(testResult.sampleData, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-semibold text-red-900 mb-2">Error Detectado</h3>
                  <p className="text-red-700">{testResult.error}</p>
                  {testResult.details && (
                    <div className="mt-3">
                      <p className="text-sm text-red-600 font-medium">Detalles técnicos:</p>
                      <div className="bg-red-100 rounded p-2 mt-1">
                        <code className="text-xs text-red-800">{testResult.details}</code>
                      </div>
                    </div>
                  )}
                </div>

                {testResult.missingCredentials && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Estado de Credenciales</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(testResult.missingCredentials).map(([key, status]) => (
                        <div key={key} className="flex items-center space-x-2">
                          {status === 'OK' ? (
                            <CheckCircleIcon className="h-5 w-5 text-green-500" />
                          ) : (
                            <XCircleIcon className="h-5 w-5 text-red-500" />
                          )}
                          <span className="text-sm">{key}: {status as string}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Instructions */}
        {!testResult && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-3">¿Qué hace este test?</h3>
            <ul className="space-y-2 text-blue-800">
              <li>✅ Verifica que tus credenciales sean válidas</li>
              <li>✅ Prueba conexión con la API de Mienvío</li>
              <li>✅ Obtiene cotizaciones de prueba (CDMX → Guadalajara)</li>
              <li>⚠️ NO crea envíos reales ni genera cargos</li>
              <li>⚠️ SOLO testing de conectividad</li>
            </ul>
          </div>
        )}

        {/* Credenciales Help */}
        <div className="bg-gray-100 rounded-lg p-6 mt-8">
          <h3 className="font-semibold text-gray-900 mb-3">📝 Configuración de .env.local</h3>
          <p className="text-gray-700 mb-3">
            Asegúrate de tener estas variables en tu archivo `.env.local`:
          </p>
          <div className="bg-gray-900 rounded-lg p-4">
            <pre className="text-green-400 text-sm">
{`MIENVIO_API_KEY="tu-api-key-real"
MIENVIO_USERNAME="tu-usuario-real"
MIENVIO_PASSWORD="tu-password-real"
MIENVIO_API_URL="https://production.mienvio.mx/api/v2"`}
            </pre>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            <strong>Nota:</strong> Nunca compartas estas credenciales públicamente.
          </p>
        </div>
      </div>
    </div>
  )
}
