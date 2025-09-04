import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { trackingNumber: string } }
) {
  try {
    // Validar autenticación (opcional para tracking público)
    const isPublicAccess = !request.headers.get('Authorization') && !request.headers.get('X-API-Key')
    
    const trackingNumber = params.trackingNumber

    if (!trackingNumber || trackingNumber.length < 5) {
      return NextResponse.json({
        success: false,
        error: 'Número de tracking inválido'
      }, { status: 400 })
    }

    // Simulación de datos de tracking súper realista
    const mockTrackingData = {
      tracking_number: trackingNumber,
      status: 'in_transit',
      shipment_id: 'SH-001',
      
      // Información básica
      info: {
        carrier: 'FedEx Express',
        service: 'Express',
        from: {
          city: 'Ciudad de México',
          state: 'CDMX',
          country: 'MX'
        },
        to: {
          city: 'Guadalajara', 
          state: 'JAL',
          country: 'MX'
        },
        estimated_delivery: '2024-09-06',
        package: {
          weight: '2.5 kg',
          description: isPublicAccess ? 'Paquete' : 'Productos electrónicos'
        }
      },
      
      // Timeline de eventos
      events: [
        {
          status: 'in_transit',
          timestamp: '2024-09-05T14:30:00Z',
          location: 'León, GTO - Centro de clasificación',
          description: 'Paquete en tránsito hacia destino final',
          is_current: true
        },
        {
          status: 'in_transit',
          timestamp: '2024-09-04T23:20:00Z', 
          location: 'Querétaro, QRO - Hub central',
          description: 'Paquete procesado en centro de clasificación',
          is_current: false
        },
        {
          status: 'picked_up',
          timestamp: '2024-09-03T16:30:00Z',
          location: 'Ciudad de México, CDMX',
          description: 'Paquete recolectado del remitente',
          is_current: false
        },
        {
          status: 'created',
          timestamp: '2024-09-03T10:15:00Z',
          location: 'Ciudad de México, CDMX', 
          description: 'Envío creado y etiqueta generada',
          is_current: false
        }
      ],
      
      // Información adicional para API
      api_metadata: {
        last_updated: new Date().toISOString(),
        data_source: 'shipmaster_tracking_system',
        refresh_interval: '5 minutes',
        public_access: isPublicAccess
      }
    }

    // Si es acceso público, limitar información sensible
    if (isPublicAccess) {
      // Remover información sensible en acceso público
      mockTrackingData.shipment_id = undefined as any
      mockTrackingData.events.forEach(event => {
        if (event.description.includes('electrónicos')) {
          event.description = 'Paquete en proceso'
        }
      })
    }

    return NextResponse.json({
      success: true,
      data: mockTrackingData
    })

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Error interno del servidor'
    }, { status: 500 })
  }
}
