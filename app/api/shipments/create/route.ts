import { NextRequest, NextResponse } from 'next/server'
import { NotificationService } from '@/lib/notifications'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      senderName, senderCompany, senderAddress, senderCity, senderState, senderZip, senderPhone, senderEmail,
      recipientName, recipientCompany, recipientAddress, recipientCity, recipientState, recipientZip, recipientPhone, recipientEmail,
      weight, length, width, height, description, value,
      selectedCarrier, serviceType, insurance, signature
    } = body

    // Validación básica
    if (!senderName || !recipientName || !weight || !selectedCarrier) {
      return NextResponse.json({
        success: false,
        error: 'Faltan campos obligatorios'
      }, { status: 400 })
    }

    // Generar ID único de envío
    const shipmentId = `SH-${Date.now()}`
    const trackingNumber = `${selectedCarrier.substring(0, 3).toUpperCase()}${Math.random().toString(36).substring(2, 10).toUpperCase()}`

    // Calcular costo base (simulado)
    let baseCost = parseFloat(weight) * 50 // $50 por kg base
    if (selectedCarrier === 'FedEx') baseCost *= 1.3
    else if (selectedCarrier === 'DHL') baseCost *= 1.2
    else if (selectedCarrier === 'UPS') baseCost *= 1.25
    
    if (insurance) baseCost += 15
    if (signature) baseCost += 10

    // Crear objeto de envío completo
    const shipment = {
      id: shipmentId,
      trackingNumber,
      carrier: selectedCarrier,
      service: serviceType || 'Express',
      status: 'created',
      
      // Sender
      senderName,
      senderCompany,
      senderAddress,
      senderCity,
      senderState,
      senderZip,
      senderPhone,
      senderEmail,
      
      // Recipient
      recipientName,
      recipientCompany,
      recipientAddress,
      recipientCity,
      recipientState,
      recipientZip,
      recipientPhone,
      recipientEmail,
      
      // Package
      weight: parseFloat(weight),
      dimensions: {
        length: parseFloat(length) || 20,
        width: parseFloat(width) || 15,
        height: parseFloat(height) || 10
      },
      description,
      value: value ? parseFloat(value) : undefined,
      
      // Shipping details
      cost: Math.round(baseCost),
      currency: 'MXN',
      createdDate: new Date().toISOString().split('T')[0],
      estimatedDelivery: new Date(Date.now() + (3 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0], // 3 días
      insurance,
      signature,
      
      // Metadata
      timeline: [
        {
          status: 'created',
          date: new Date().toISOString(),
          location: `${senderCity}, ${senderState}`,
          description: 'Envío creado y etiqueta generada'
        }
      ]
    }

    // En producción aquí iríamos a la API real de la paquetería
    console.log('🚚 Envío creado (modo demo):', shipment.id)

    // Simular delay de procesamiento
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Enviar notificaciones automáticas
    try {
      await NotificationService.notifyShipmentCreated({
        shipmentId: shipment.id,
        trackingNumber: shipment.trackingNumber,
        recipientName: shipment.recipientName,
        recipientEmail: shipment.recipientEmail,
        recipientPhone: shipment.recipientPhone,
        carrier: shipment.carrier,
        status: 'created',
        estimatedDelivery: shipment.estimatedDelivery
      })
      console.log('✅ Notificaciones enviadas')
    } catch (error) {
      console.error('⚠️ Error enviando notificaciones:', error)
      // No fallar el envío por error en notificaciones
    }

    return NextResponse.json({
      success: true,
      shipment,
      message: 'Envío creado exitosamente',
      labelReady: true,
      trackingUrl: `${process.env.NEXT_PUBLIC_APP_URL}/tracking/${trackingNumber}`
    })

  } catch (error) {
    console.error('Error creando envío:', error)
    return NextResponse.json({
      success: false,
      error: 'Error interno del servidor'
    }, { status: 500 })
  }
}
