import { NextRequest, NextResponse } from 'next/server'
import { mienvioAPI } from '@/lib/mienvio-api'

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

    // Parsear direcciones usando el formato correcto de Mienvío
    const parseAddress = (address: string) => {
      const parts = address.split(',').map(p => p.trim())
      return {
        city: parts[0] || address,
        state: parts[1] || 'CDMX',
        zipcode: '01000', // Por ahora usamos un CP genérico
        country: 'MX'
      }
    }

    // Preparar request para Mienvío con formato correcto
    const mienvioRequest = {
      from_address: parseAddress(from),
      to_address: parseAddress(to),
      parcel: {
        weight: parseFloat(weight) || 1,
        length: parseFloat(dimensions?.length) || 20,
        width: parseFloat(dimensions?.width) || 15,
        height: parseFloat(dimensions?.height) || 10,
      },
      packing_mode: 'package'
    }

    // Llamar a API de Mienvío
    const mienvioResponse = await mienvioAPI.getQuotes(mienvioRequest)

    if (!mienvioResponse.success) {
      return NextResponse.json(
        { error: mienvioResponse.error || 'Error al obtener cotizaciones' },
        { status: 500 }
      )
    }

    // Transformar respuesta al formato de nuestro frontend
    const quotes = mienvioResponse.data.map((quote, index) => ({
      id: `quote_${index}`,
      carrier: quote.carrier,
      service: quote.service,
      price: quote.price,
      currency: quote.currency,
      deliveryTime: quote.delivery_time,
      trackingIncluded: quote.tracking_included,
      insuranceIncluded: quote.insurance_included,
      carrierCode: quote.carrier_code,
      serviceCode: quote.service_code,
      // Asignar colores para UI
      color: index % 3 === 0 ? 'green' : index % 3 === 1 ? 'blue' : 'purple',
      icon: quote.carrier_code.substring(0, 2).toUpperCase(),
      features: [
        quote.tracking_included ? 'Rastreo incluido' : '',
        quote.insurance_included ? 'Seguro incluido' : '',
        quote.delivery_time.includes('1-2') ? 'Entrega rápida' : 'Precio competitivo'
      ].filter(Boolean)
    }))

    return NextResponse.json({
      success: true,
      quotes: quotes,
      requestId: `mienvio_${Date.now()}`,
      timestamp: new Date().toISOString(),
      source: 'mienvio_api'
    })

  } catch (error) {
    console.error('Error en cotización:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
