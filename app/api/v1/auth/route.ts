import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'

// Simulación de API keys válidas
const validApiKeys = new Set([
  'sk_live_1234567890abcdef',
  'sk_test_abcdef1234567890',
  'sk_demo_shopify_integration'
])

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { api_key, client_name } = body

    if (!api_key) {
      return NextResponse.json({
        success: false,
        error: 'API key requerida'
      }, { status: 401 })
    }

    // Validar API key
    if (!validApiKeys.has(api_key)) {
      return NextResponse.json({
        success: false,
        error: 'API key inválida'
      }, { status: 401 })
    }

    // Generar token temporal (en producción usar JWT)
    const token = `${api_key}_${Date.now()}_${Math.random().toString(36).substring(2)}`

    return NextResponse.json({
      success: true,
      data: {
        token,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 horas
        client_name: client_name || 'Cliente API',
        permissions: ['quotes', 'shipments', 'tracking', 'webhooks'],
        rate_limits: {
          requests_per_minute: 100,
          requests_per_day: 10000
        }
      }
    })

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Error interno del servidor'
    }, { status: 500 })
  }
}

// Middleware para validar autenticación en otras rutas API
export function validateAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get('Authorization')
  const apiKey = request.headers.get('X-API-Key')
  
  if (!authHeader && !apiKey) {
    return false
  }

  // Verificar Bearer token o API key directa
  const token = authHeader?.replace('Bearer ', '') || apiKey
  
  return token ? validApiKeys.has(token.split('_')[0] + '_' + token.split('_')[1] + '_' + token.split('_')[2]) : false
}
