import { NextRequest, NextResponse } from 'next/server'
import { mienvioAPI } from '@/lib/mienvio-api'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('📥 Datos recibidos:', body)
    
    // Soportar múltiples formatos de entrada
    const fromAddress = body.from_address || body.from
    const toAddress = body.to_address || body.to  
    const parcelWeight = body.parcel?.weight || body.weight
    const dimensions = body.parcel || body.dimensions

    // Validar datos requeridos
    if (!fromAddress || !toAddress || !parcelWeight) {
      console.log('❌ Validación falló:', {
        fromAddress: !!fromAddress,
        toAddress: !!toAddress, 
        parcelWeight: !!parcelWeight
      })
      return NextResponse.json(
        { error: 'Faltan datos requeridos: origen, destino y peso' },
        { status: 400 }
      )
    }

    console.log('✅ Validación exitosa:', {
      from: fromAddress,
      to: toAddress,
      weight: parcelWeight
    })

    // Verificar si se solicita API real (por defecto usar real)
    const useRealAPI = request.headers.get('X-Real-API') === 'true' || !request.headers.get('X-Demo-Mode')

    // Parsear direcciones usando el formato correcto de Mienvío
    const parseAddress = (addressInput: any) => {
      // Si viene del test-editable (formato correcto)
      if (typeof addressInput === 'object' && addressInput.zipcode) {
        console.log('📍 Dirección parseada:', addressInput)
        return {
          city: addressInput.city || "Ciudad",
          state: addressInput.state || "Estado",
          zipcode: addressInput.zipcode,
          country: addressInput.country || 'MX'
        }
      }
      
      // Si viene como string, parsearlo
      const parts = String(addressInput).split(',').map(p => p.trim())
      return {
        city: parts[0] || String(addressInput),
        state: parts[1] || 'CDMX', 
        zipcode: '01000', // Por ahora usamos un CP genérico
        country: 'MX'
      }
    }

    // Preparar request para Mienvío con formato correcto
    const mienvioRequest = {
      from_address: parseAddress(fromAddress),
      to_address: parseAddress(toAddress),
      parcel: {
        weight: parseFloat(parcelWeight) || 1,
        length: parseFloat(dimensions?.length) || 20,
        width: parseFloat(dimensions?.width) || 15,
        height: parseFloat(dimensions?.height) || 10,
      },
      packing_mode: 'package'
    }

    console.log('🔍 Request procesado:', mienvioRequest);

    // Llamar a API de Mienvío (usar real por defecto, demo solo si se fuerza)
    const mienvioResponse = useRealAPI 
      ? await mienvioAPI.getQuotes(mienvioRequest)
      : await mienvioAPI.getDemoQuotes(mienvioRequest)

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
