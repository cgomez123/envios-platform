import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { from, to, weight, dimensions } = body

    // Validar datos requeridos
    if (!from || !to || !weight) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos: origen, destino y peso' },
        { status: 400 }
      )
    }

    // Simular cotizaciones de diferentes paqueterías
    // En producción, aquí llamarías a las APIs reales
    const quotes = [
      {
        carrier: 'FedEx Express',
        service: 'Overnight',
        price: 245.50,
        currency: 'MXN',
        deliveryTime: '1-2 días hábiles',
        trackingIncluded: true,
        insuranceIncluded: true,
        carrierLogo: '/logos/fedex.png'
      },
      {
        carrier: 'DHL Express',
        service: 'Express Worldwide',
        price: 180.75,
        currency: 'MXN',
        deliveryTime: '2-3 días hábiles',
        trackingIncluded: true,
        insuranceIncluded: true,
        carrierLogo: '/logos/dhl.png'
      },
      {
        carrier: 'Estafeta',
        service: 'Express Nacional',
        price: 145.00,
        currency: 'MXN',
        deliveryTime: '3-4 días hábiles',
        trackingIncluded: true,
        insuranceIncluded: false,
        carrierLogo: '/logos/estafeta.png'
      },
      {
        carrier: 'UPS',
        service: 'UPS Express',
        price: 220.30,
        currency: 'MXN',
        deliveryTime: '1-3 días hábiles',
        trackingIncluded: true,
        insuranceIncluded: true,
        carrierLogo: '/logos/ups.png'
      }
    ]

    // Simular delay de API real
    await new Promise(resolve => setTimeout(resolve, 1000))

    return NextResponse.json({
      success: true,
      quotes: quotes.sort((a, b) => a.price - b.price), // Ordenar por precio
      requestId: `quote_${Date.now()}`,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error en cotización:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
