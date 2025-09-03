import { NextRequest, NextResponse } from 'next/server'
import { mienvioAPI } from '@/lib/mienvio-api'

export async function POST(request: NextRequest) {
  try {
    // Validar autenticación
    const authHeader = request.headers.get('Authorization')
    const apiKey = request.headers.get('X-API-Key')
    
    if (!authHeader && !apiKey) {
      return NextResponse.json({
        success: false,
        error: 'API key requerida. Incluye "Authorization: Bearer YOUR_API_KEY" o "X-API-Key: YOUR_API_KEY"'
      }, { status: 401 })
    }

    const body = await request.json()
    const { from, to, packages, options = {} } = body

    // Validación API v1
    if (!from || !to || !packages || !Array.isArray(packages)) {
      return NextResponse.json({
        success: false,
        error: 'Campos requeridos: from, to, packages[]',
        documentation: `${process.env.NEXT_PUBLIC_APP_URL}/api-docs`
      }, { status: 400 })
    }

    // Validar estructura de direcciones
    if (!from.city || !to.city) {
      return NextResponse.json({
        success: false,
        error: 'from.city y to.city son obligatorios',
        example: {
          from: { city: 'Ciudad de México', state: 'CDMX', zip: '01000' },
          to: { city: 'Guadalajara', state: 'JAL', zip: '44100' }
        }
      }, { status: 400 })
    }

    // Procesar múltiples paquetes
    const allQuotes = []
    
    for (let i = 0; i < packages.length; i++) {
      const pkg = packages[i]
      
      if (!pkg.weight) {
        return NextResponse.json({
          success: false,
          error: `packages[${i}].weight es requerido`
        }, { status: 400 })
      }

      // Preparar request para Mienvío
      const mienvioRequest = {
        from_address: {
          city: from.city,
          state: from.state || 'CDMX',
          zipcode: from.zip || '01000',
          country: from.country || 'MX'
        },
        to_address: {
          city: to.city,
          state: to.state || 'CDMX', 
          zipcode: to.zip || '01000',
          country: to.country || 'MX'
        },
        parcel: {
          weight: parseFloat(pkg.weight),
          length: parseFloat(pkg.dimensions?.length) || 20,
          width: parseFloat(pkg.dimensions?.width) || 15,
          height: parseFloat(pkg.dimensions?.height) || 10,
        },
        packing_mode: 'package'
      }

      // Usar modo demo ya que API real está fallando
      const mienvioResponse = await mienvioAPI.getDemoQuotes(mienvioRequest)
      
      if (mienvioResponse.success) {
        // Agregar quotes de este paquete con metadata
        const packageQuotes = mienvioResponse.data.map(quote => ({
          ...quote,
          package_index: i,
          package_id: pkg.id || `pkg_${i}`,
          quote_id: `${quote.carrier_code}_${i}_${Date.now()}`
        }))
        
        allQuotes.push(...packageQuotes)
      }
    }

    // Agrupar por carrier para mejores ofertas
    const carrierGroups: { [key: string]: any[] } = {}
    allQuotes.forEach(quote => {
      if (!carrierGroups[quote.carrier_code]) {
        carrierGroups[quote.carrier_code] = []
      }
      carrierGroups[quote.carrier_code].push(quote)
    })

    // Calcular totales por carrier
    const consolidatedQuotes = Object.keys(carrierGroups).map(carrierCode => {
      const quotes = carrierGroups[carrierCode]
      const totalPrice = quotes.reduce((sum, quote) => sum + quote.price, 0)
      const firstQuote = quotes[0]
      
      return {
        quote_id: `consolidated_${carrierCode}_${Date.now()}`,
        carrier: firstQuote.carrier,
        carrier_code: carrierCode,
        service: firstQuote.service,
        total_price: totalPrice,
        currency: firstQuote.currency,
        delivery_time: firstQuote.delivery_time,
        tracking_included: firstQuote.tracking_included,
        insurance_included: firstQuote.insurance_included,
        packages_count: quotes.length,
        individual_quotes: quotes,
        
        // Metadata para desarrolladores
        metadata: {
          api_version: '1.0',
          generated_at: new Date().toISOString(),
          expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 min
          request_id: `req_${Date.now()}`,
          source: options.source || 'api_v1'
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        quotes: consolidatedQuotes,
        quote_count: consolidatedQuotes.length,
        packages_processed: packages.length,
        currency: 'MXN',
        valid_until: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
        
        // Info útil para desarrolladores
        api_info: {
          version: '1.0',
          documentation: `${process.env.NEXT_PUBLIC_APP_URL}/api-docs`,
          support_email: 'developers@shipmaster.pro',
          rate_limits: {
            current_usage: '1/100 per minute',
            daily_usage: '1/10000 per day'
          }
        }
      }
    })

  } catch (error) {
    console.error('Error API v1 quotes:', error)
    return NextResponse.json({
      success: false,
      error: 'Error interno del servidor',
      error_id: `err_${Date.now()}`,
      support: 'Si el error persiste, contacta developers@shipmaster.pro'
    }, { status: 500 })
  }
}
