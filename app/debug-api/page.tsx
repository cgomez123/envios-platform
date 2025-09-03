'use client'

import { useState } from 'react'
import { CheckCircleIcon, XCircleIcon, CogIcon } from '@heroicons/react/24/outline'

export default function DebugAPI() {
  const [debugResult, setDebugResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const runDebug = async () => {
    setLoading(true)
    setDebugResult(null)

    try {
      const response = await fetch('/api/debug-mienvio')
      const data = await response.json()
      setDebugResult(data)
    } catch (error) {
      setDebugResult({
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
            🔧 Debug Avanzado - Mienvío API
          </h1>
          <p className="text-xl text-gray-600">
            Encuentra automáticamente el formato correcto para tus credenciales
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
            <div className="flex items-center space-x-2">
              <CogIcon className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-blue-800">DEBUG INTELIGENTE</span>
            </div>
            <p className="text-blue-700 text-sm mt-2">
              Prueba automáticamente diferentes valores de packing_mode hasta encontrar el correcto
            </p>
          </div>
        </div>

        {/* Debug Button */}
        <div className="text-center mb-8">
          <button
            onClick={runDebug}
            disabled={loading}
            className="bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Ejecutando debug inteligente...</span>
              </div>
            ) : (
              '🔍 Ejecutar Debug Automático'
            )}
          </button>
        </div>

        {/* Results */}
        {debugResult && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-6">
              {debugResult.success ? (
                <CheckCircleIcon className="h-8 w-8 text-green-500" />
              ) : (
                <XCircleIcon className="h-8 w-8 text-red-500" />
              )}
              <h2 className="text-2xl font-bold text-gray-900">
                {debugResult.success ? '🎉 ¡Formato Encontrado!' : '🔧 Resultados del Debug'}
              </h2>
            </div>

            {debugResult.success ? (
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="font-bold text-green-900 text-lg mb-2">
                    ✅ Configuración que Funciona
                  </h3>
                  <div className="bg-green-100 rounded-lg p-4">
                    <code className="text-green-800 font-mono">
                      packing_mode: "{debugResult.working_packing_mode}"
                    </code>
                  </div>
                  <p className="text-green-700 mt-3">
                    Se encontraron <strong>{debugResult.quotes_found}</strong> cotizaciones
                  </p>
                </div>

                {debugResult.sample_response && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Ejemplo de Respuesta</h4>
                    <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-green-400 text-sm">
                        {JSON.stringify(debugResult.sample_response, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-semibold text-red-900 mb-2">Ningún packing_mode funcionó</h3>
                  <p className="text-red-700">{debugResult.message}</p>
                </div>
              </div>
            )}

            {/* All Tests Results */}
            {debugResult.all_tests && (
              <div className="mt-6">
                <h4 className="font-semibold text-gray-900 mb-3">Resultados de Todas las Pruebas</h4>
                <div className="space-y-2">
                  {debugResult.all_tests.map((test: any, index: number) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        test.success 
                          ? 'bg-green-50 border border-green-200' 
                          : 'bg-red-50 border border-red-200'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        {test.success ? (
                          <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircleIcon className="h-5 w-5 text-red-500" />
                        )}
                        <code className="font-mono text-sm">
                          packing_mode: "{test.packing_mode}"
                        </code>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm ${test.success ? 'text-green-700' : 'text-red-700'}`}>
                          Status: {test.status}
                        </div>
                        {!test.success && test.response && (
                          <div className="text-xs text-red-600 mt-1 max-w-md truncate">
                            {test.response}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Instructions */}
        {!debugResult && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h3 className="font-semibold text-purple-900 mb-3">¿Qué hace este debug?</h3>
            <ul className="space-y-2 text-purple-800">
              <li>🔄 Prueba automáticamente 6 valores diferentes de packing_mode</li>
              <li>🎯 Se detiene cuando encuentra uno que funciona</li>
              <li>📊 Te muestra resultados de todas las pruebas</li>
              <li>✅ SOLO cotizaciones - NO crea envíos reales</li>
              <li>🔒 100% seguro - NO genera cargos</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
