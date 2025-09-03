import { NextRequest, NextResponse } from 'next/server'
import { NotificationService } from '@/lib/notifications'

export async function POST(request: NextRequest) {
  try {
    // Validar autenticación
    const authHeader = request.headers.get('Authorization')
    const apiKey = request.headers.get('X-API-Key')
    
    if (!authHeader && !apiKey) {
      return NextResponse.json({
        success: false,
        error: 'Autenticación requerida',
        documentation: `${process.env.NEXT_PUBLIC_APP_URL}/api-docs#authentication`
      }, { status: 401 })
    }

    const body = await request.json()
    const { quote_id, sender, recipient, package_info, options = {} } = body

    // Validación de campos obligatorios
    const requiredFields = ['quote_id', 'sender', 'recipient', 'package_info']
    const missingFields = requiredFields.filter(field => !body[field])
    
    if (missingFields.length > 0) {
      return NextResponse.json({
        success: false,
        error: 'Campos obligatorios faltantes',
        missing_fields: missingFields,
        documentation: `${process.env.NEXT_PUBLIC_APP_URL}/api-docs#create-shipment`
      }, { status: 400 })
    }

    // Validar estructura de sender
    if (!sender.name || !sender.address || !sender.city) {
      return NextResponse.json({
        success: false,
        error: 'Información de remitente incompleta: name, address, city son requeridos'
      }, { status: 400 })
    }

    // Validar estructura de recipient
    if (!recipient.name || !recipient.address || !recipient.city) {
      return NextResponse.json({
        success: false,
        error: 'Información de destinatario incompleta: name, address, city son requeridos'
      }, { status: 400 })
    }

    // Generar shipment
    const shipmentId = `SH-API-${Date.now()}`
    const trackingNumber = `API${Math.random().toString(36).substring(2, 10).toUpperCase()}`

    // Calcular costo (en producción viene del quote_id)
    const baseCost = (package_info.weight || 1) * 50
    
    const shipment = {
      shipment_id: shipmentId,
      tracking_number: trackingNumber,
      status: 'created',
      quote_id,
      
      // Información del envío
      sender: {
        name: sender.name,
        company: sender.company,
        address: sender.address,
        city: sender.city,
        state: sender.state || 'CDMX',
        zip: sender.zip || '01000',
        country: sender.country || 'MX',
        phone: sender.phone,
        email: sender.email
      },
      
      recipient: {
        name: recipient.name,
        company: recipient.company,
        address: recipient.address,
        city: recipient.city,
        state: recipient.state || 'CDMX',
        zip: recipient.zip || '01000',
        country: recipient.country || 'MX',
        phone: recipient.phone,
        email: recipient.email
      },
      
      package: {
        weight: package_info.weight,
        dimensions: {
          length: package_info.dimensions?.length || 20,
          width: package_info.dimensions?.width || 15,
          height: package_info.dimensions?.height || 10
        },
        description: package_info.description || 'Mercancía general',
        value: package_info.declared_value
      },
      
      shipping: {
        carrier: 'FedEx', // En producción viene del quote_id
        service: 'Express',
        cost: Math.round(baseCost),
        currency: 'MXN',
        estimated_delivery: new Date(Date.now() + (3 * 24 * 60 * 60 * 1000)).toISOString(),
        insurance: options.insurance || false,
        signature_required: options.signature || false
      },
      
      // Metadata
      created_at: new Date().toISOString(),
      created_via: 'api_v1',
      source: options.source || 'external_integration',
      webhook_url: options.webhook_url,
      
      // URLs útiles
      urls: {
        tracking: `${process.env.NEXT_PUBLIC_APP_URL}/tracking/${trackingNumber}`,
        label_pdf: `${process.env.NEXT_PUBLIC_APP_URL}/api/v1/shipments/${shipmentId}/label`,
        webhook_test: `${process.env.NEXT_PUBLIC_APP_URL}/api/v1/webhooks/test`
      }
    }

    // Simular procesamiento
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Enviar notificaciones si hay emails
    if (recipient.email || recipient.phone) {
      try {
        await NotificationService.notifyShipmentCreated({
          shipmentId: shipment.shipment_id,
          trackingNumber: shipment.tracking_number,
          recipientName: recipient.name,
          recipientEmail: recipient.email,
          recipientPhone: recipient.phone,
          carrier: shipment.shipping.carrier,
          status: 'created',
          estimatedDelivery: shipment.shipping.estimated_delivery.split('T')[0]
        })
      } catch (error) {
        console.log('⚠️ Error en notificaciones (no crítico):', error)
      }
    }

    // Enviar webhook si está configurado
    if (options.webhook_url) {
      try {
        await fetch(options.webhook_url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'shipment.created',
            data: shipment,
            timestamp: new Date().toISOString()
          })
        })
        console.log('✅ Webhook enviado:', options.webhook_url)
      } catch (error) {
        console.log('⚠️ Error enviando webhook:', error)
      }
    }

    return NextResponse.json({
      success: true,
      data: shipment
    })

  } catch (error) {
    console.error('Error API v1 shipments:', error)
    return NextResponse.json({
      success: false,
      error: 'Error interno del servidor',
      error_id: `err_${Date.now()}`,
      support: 'developers@shipmaster.pro'
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    // Validar autenticación
    const authHeader = request.headers.get('Authorization')
    const apiKey = request.headers.get('X-API-Key')
    
    if (!authHeader && !apiKey) {
      return NextResponse.json({
        success: false,
        error: 'Autenticación requerida'
      }, { status: 401 })
    }

    // Parámetros de consulta
    const { searchParams } = new URL(request.url)
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100)
    const offset = parseInt(searchParams.get('offset') || '0')
    const status = searchParams.get('status')

    // Simulación de shipments
    const mockShipments = [
      {
        shipment_id: 'SH-API-001',
        tracking_number: 'API123456789',
        status: 'delivered',
        created_at: '2024-09-01T10:00:00Z',
        recipient: { name: 'Juan Pérez', city: 'Guadalajara' },
        shipping: { carrier: 'FedEx', cost: 245 }
      },
      {
        shipment_id: 'SH-API-002', 
        tracking_number: 'API987654321',
        status: 'in_transit',
        created_at: '2024-09-03T14:30:00Z',
        recipient: { name: 'Ana López', city: 'Monterrey' },
        shipping: { carrier: 'DHL', cost: 189 }
      }
    ]

    let filteredShipments = mockShipments
    if (status) {
      filteredShipments = mockShipments.filter(s => s.status === status)
    }

    const paginatedShipments = filteredShipments.slice(offset, offset + limit)

    return NextResponse.json({
      success: true,
      data: {
        shipments: paginatedShipments,
        pagination: {
          total: filteredShipments.length,
          limit,
          offset,
          has_more: offset + limit < filteredShipments.length
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
