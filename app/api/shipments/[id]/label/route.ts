import { NextRequest, NextResponse } from 'next/server'
import { LabelGenerator, ShipmentData } from '@/lib/label-generator'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const shipmentId = params.id

    // En producción: obtener datos del envío desde BD
    // Por ahora usamos datos de ejemplo
    const mockShipmentData: ShipmentData = {
      id: shipmentId,
      trackingNumber: `FDX${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      carrier: 'FedEx',
      service: 'FedEx Express',
      
      senderName: 'Juan Pérez',
      senderCompany: 'Mi Empresa SA',
      senderAddress: 'Av. Reforma 123, Col. Centro',
      senderCity: 'Ciudad de México',
      senderState: 'CDMX',
      senderZip: '06000',
      senderPhone: '+52 55 1234 5678',
      
      recipientName: 'Ana García',
      recipientCompany: 'Distribuidora Norte',
      recipientAddress: 'Calle Principal 456, Col. Americana',
      recipientCity: 'Guadalajara',
      recipientState: 'JAL', 
      recipientZip: '44160',
      recipientPhone: '+52 33 9876 5432',
      
      weight: 2.5,
      dimensions: { length: 30, width: 20, height: 15 },
      description: 'Productos electrónicos',
      value: 1500,
      
      cost: 245,
      currency: 'MXN',
      createdDate: new Date().toISOString().split('T')[0],
      estimatedDelivery: new Date(Date.now() + (3 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0]
    }

    // Generar PDF
    const pdfBlob = await LabelGenerator.generateLabel(mockShipmentData)
    const arrayBuffer = await pdfBlob.arrayBuffer()

    // Retornar PDF como respuesta
    return new NextResponse(arrayBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="etiqueta-${shipmentId}.pdf"`
      }
    })

  } catch (error) {
    console.error('Error generando etiqueta:', error)
    return NextResponse.json({
      success: false,
      error: 'Error generando etiqueta PDF'
    }, { status: 500 })
  }
}
