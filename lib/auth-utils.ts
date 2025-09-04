import { NextRequest } from 'next/server'

// API keys válidas para el sistema
const validApiKeys = new Set([
  'sk_live_1234567890abcdef',
  'sk_test_abcdef1234567890',
  'sk_demo_shopify_integration',
  'sk_demo_shipmaster_integration'
])

// Función para validar autenticación en rutas API
export function validateAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get('Authorization')
  const apiKey = request.headers.get('X-API-Key')
  
  if (!authHeader && !apiKey) {
    return false
  }

  // Verificar Bearer token o API key directa
  const token = authHeader?.replace('Bearer ', '') || apiKey
  
  if (!token) return false
  
  // Verificar si es una API key válida
  return validApiKeys.has(token)
}

// Helper para extraer API key de request
export function getApiKey(request: NextRequest): string | null {
  const authHeader = request.headers.get('Authorization')
  const apiKey = request.headers.get('X-API-Key')
  
  return authHeader?.replace('Bearer ', '') || apiKey || null
}

// Verificar si API key es de demo
export function isDemoKey(apiKey: string): boolean {
  return apiKey.includes('demo')
}

// Obtener información de la API key
export function getApiKeyInfo(apiKey: string) {
  if (apiKey.includes('demo')) {
    return {
      type: 'demo',
      environment: 'sandbox',
      permissions: ['quotes', 'tracking'],
      rate_limit: 60
    }
  }
  
  if (apiKey.includes('test')) {
    return {
      type: 'test',
      environment: 'sandbox',
      permissions: ['quotes', 'shipments', 'tracking'],
      rate_limit: 100
    }
  }
  
  return {
    type: 'live',
    environment: 'production',
    permissions: ['quotes', 'shipments', 'tracking', 'webhooks', 'reports'],
    rate_limit: 1000
  }
}
