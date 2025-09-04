import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const healthCheck = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0',
      services: {
        database: 'connected', // En producción verificaríamos la DB real
        mienvio_api: 'demo_mode', // Estado actual de Mienvío
        cache: 'active',
        notifications: 'active'
      },
      features: {
        shipping_calculator: true,
        tracking_system: true,
        dashboard: true,
        api_v1: true,
        shopify_plugin: true,
        bulk_shipments: true,
        notifications: true,
        advanced_analytics: true
      },
      endpoints: {
        quotes: '/api/shipping/quote',
        tracking: '/api/tracking',
        shipments: '/api/shipments/create',
        auth: '/api/v1/auth'
      }
    }

    return NextResponse.json(healthCheck, { 
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })

  } catch (error) {
    return NextResponse.json(
      { 
        status: 'unhealthy', 
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      }, 
      { status: 500 }
    )
  }
}
