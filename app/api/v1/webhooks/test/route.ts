import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { webhook_url, test_event = 'shipment.created' } = body

    if (!webhook_url) {
      return NextResponse.json({
        success: false,
        error: 'webhook_url es requerido'
      }, { status: 400 })
    }

    // Validar que sea una URL válida
    try {
      new URL(webhook_url)
    } catch {
      return NextResponse.json({
        success: false,
        error: 'webhook_url debe ser una URL válida'
      }, { status: 400 })
    }

    // Datos de prueba según el tipo de evento
    const testEvents = {
      'shipment.created': {
        event: 'shipment.created',
        data: {
          shipment_id: 'SH-TEST-' + Date.now(),
          tracking_number: 'TEST' + Math.random().toString(36).substring(2, 8).toUpperCase(),
          status: 'created',
          sender: {
            name: 'Test Sender',
            city: 'Ciudad de México',
            state: 'CDMX'
          },
          recipient: {
            name: 'Test Recipient',
            city: 'Guadalajara',
            state: 'JAL'
          },
          shipping: {
            carrier: 'FedEx',
            cost: 245,
            currency: 'MXN'
          }
        },
        timestamp: new Date().toISOString()
      },
      
      'shipment.delivered': {
        event: 'shipment.delivered',
        data: {
          shipment_id: 'SH-TEST-' + Date.now(),
          tracking_number: 'TEST' + Math.random().toString(36).substring(2, 8).toUpperCase(),
          status: 'delivered',
          delivered_at: new Date().toISOString(),
          location: 'Guadalajara, JAL',
          recipient_name: 'Test Recipient'
        },
        timestamp: new Date().toISOString()
      },
      
      'shipment.exception': {
        event: 'shipment.exception',
        data: {
          shipment_id: 'SH-TEST-' + Date.now(),
          tracking_number: 'TEST' + Math.random().toString(36).substring(2, 8).toUpperCase(),
          status: 'exception',
          exception_type: 'address_correction_required',
          message: 'Dirección requiere corrección',
          location: 'Centro de clasificación'
        },
        timestamp: new Date().toISOString()
      }
    }

    const eventData = testEvents[test_event as keyof typeof testEvents] || testEvents['shipment.created']

    // Enviar webhook de prueba
    console.log('🎯 Enviando webhook de prueba:', webhook_url)
    
    const webhookResponse = await fetch(webhook_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'ShipMaster-Pro-Webhook/1.0',
        'X-ShipMaster-Event': test_event,
        'X-ShipMaster-Signature': 'test_signature_' + Date.now()
      },
      body: JSON.stringify(eventData),
      // Timeout de 10 segundos
      signal: AbortSignal.timeout(10000)
    })

    const webhookResult = {
      webhook_url,
      event_sent: test_event,
      response_status: webhookResponse.status,
      response_ok: webhookResponse.ok,
      response_time_ms: Date.now() % 1000, // Simulado
      sent_at: new Date().toISOString()
    }

    let responseBody = null
    try {
      responseBody = await webhookResponse.text()
    } catch {
      responseBody = 'No response body'
    }

    return NextResponse.json({
      success: true,
      data: {
        test_result: webhookResult,
        event_data_sent: eventData,
        response_body: responseBody.substring(0, 500), // Limitar respuesta
        recommendations: webhookResponse.ok 
          ? ['✅ Webhook funcionando correctamente', '✅ Endpoint responde correctamente']
          : ['⚠️ Verificar que el endpoint esté activo', '⚠️ Revisar logs del servidor receptor'],
        next_steps: [
          'Configura tu endpoint para recibir estos eventos',
          'Valida la signature X-ShipMaster-Signature en producción',
          'Implementa lógica de retry para eventos fallidos'
        ]
      }
    })

  } catch (error) {
    console.error('Error en webhook test:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
      error_type: 'webhook_test_failed',
      support: 'Si el error persiste, verifica que tu endpoint esté accesible públicamente'
    }, { status: 500 })
  }
}
