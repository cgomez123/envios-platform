import jsPDF from 'jspdf'
import QRCode from 'qrcode'

export interface ShipmentData {
  id: string
  trackingNumber: string
  carrier: string
  service: string
  
  // Sender
  senderName: string
  senderCompany?: string
  senderAddress: string
  senderCity: string
  senderState: string
  senderZip: string
  senderPhone: string
  
  // Recipient
  recipientName: string
  recipientCompany?: string
  recipientAddress: string
  recipientCity: string
  recipientState: string
  recipientZip: string
  recipientPhone: string
  
  // Package
  weight: number
  dimensions: {
    length: number
    width: number
    height: number
  }
  description: string
  value?: number
  
  // Shipping details
  cost: number
  currency: string
  createdDate: string
  estimatedDelivery: string
}

export class LabelGenerator {
  private static async generateQRCode(text: string): Promise<string> {
    try {
      return await QRCode.toDataURL(text, {
        width: 100,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      })
    } catch (error) {
      console.error('Error generando QR:', error)
      return ''
    }
  }

  private static generateBarcode(trackingNumber: string): string {
    // Simulación de código de barras usando caracteres ASCII
    const barcodeChars = '|||  |  ||  |  |||  ||  |  |||  |  ||'
    return barcodeChars.repeat(3)
  }

  static async generateLabel(shipmentData: ShipmentData): Promise<Blob> {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [100, 150] // Tamaño estándar de etiqueta de envío
    })

    // Configuración de colores y fuentes
    pdf.setFontSize(8)
    
    let yPos = 10

    // Header con logo de la empresa
    pdf.setFontSize(12)
    pdf.setTextColor(59, 130, 246) // Azul primary
    pdf.text('SHIPMASTER PRO', 50, yPos, { align: 'center' })
    
    yPos += 6
    pdf.setFontSize(6)
    pdf.setTextColor(100, 100, 100)
    pdf.text('Plataforma de Envíos Inteligente', 50, yPos, { align: 'center' })
    
    yPos += 8
    
    // Línea separadora
    pdf.setDrawColor(200, 200, 200)
    pdf.line(5, yPos, 95, yPos)
    yPos += 5

    // Información del envío
    pdf.setFontSize(7)
    pdf.setTextColor(0, 0, 0)
    pdf.text(`ID: ${shipmentData.id}`, 8, yPos)
    pdf.text(`${shipmentData.createdDate}`, 65, yPos)
    yPos += 5

    // Tracking number con código de barras
    pdf.setFontSize(9)
    pdf.text(`TRACKING: ${shipmentData.trackingNumber}`, 8, yPos)
    yPos += 5
    
    // Código de barras simulado
    pdf.setFont('courier', 'normal')
    pdf.setFontSize(6)
    const barcode = this.generateBarcode(shipmentData.trackingNumber)
    pdf.text(barcode, 8, yPos)
    yPos += 8

    // Paquetería y servicio
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(8)
    pdf.text(`${shipmentData.carrier} - ${shipmentData.service}`, 8, yPos)
    yPos += 8

    // FROM section
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(7)
    pdf.setTextColor(100, 100, 100)
    pdf.text('DESDE:', 8, yPos)
    yPos += 4
    
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(0, 0, 0)
    pdf.setFontSize(6)
    
    if (shipmentData.senderCompany) {
      pdf.text(shipmentData.senderCompany, 8, yPos)
      yPos += 3
    }
    pdf.text(shipmentData.senderName, 8, yPos)
    yPos += 3
    pdf.text(shipmentData.senderAddress, 8, yPos)
    yPos += 3
    pdf.text(`${shipmentData.senderCity}, ${shipmentData.senderState} ${shipmentData.senderZip}`, 8, yPos)
    yPos += 3
    pdf.text(`Tel: ${shipmentData.senderPhone}`, 8, yPos)
    yPos += 6

    // TO section (más prominente)
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(8)
    pdf.setTextColor(220, 38, 38) // Rojo para destacar
    pdf.text('PARA:', 8, yPos)
    yPos += 5
    
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(0, 0, 0)
    pdf.setFontSize(8)
    
    if (shipmentData.recipientCompany) {
      pdf.text(shipmentData.recipientCompany, 8, yPos)
      yPos += 4
    }
    pdf.text(shipmentData.recipientName, 8, yPos)
    yPos += 4
    
    pdf.setFontSize(7)
    pdf.text(shipmentData.recipientAddress, 8, yPos)
    yPos += 4
    pdf.text(`${shipmentData.recipientCity}, ${shipmentData.recipientState}`, 8, yPos)
    yPos += 4
    
    // Código postal destacado
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'bold')
    pdf.text(shipmentData.recipientZip, 8, yPos)
    yPos += 5
    
    pdf.setFontSize(6)
    pdf.setFont('helvetica', 'normal')
    pdf.text(`Tel: ${shipmentData.recipientPhone}`, 8, yPos)
    yPos += 6

    // Package details
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(7)
    pdf.setTextColor(100, 100, 100)
    pdf.text('PAQUETE:', 8, yPos)
    yPos += 4
    
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(0, 0, 0)
    pdf.setFontSize(6)
    pdf.text(`Peso: ${shipmentData.weight}kg`, 8, yPos)
    pdf.text(`${shipmentData.dimensions.length}x${shipmentData.dimensions.width}x${shipmentData.dimensions.height}cm`, 55, yPos)
    yPos += 3
    pdf.text(`Contenido: ${shipmentData.description}`, 8, yPos)
    if (shipmentData.value) {
      yPos += 3
      pdf.text(`Valor: $${shipmentData.value} ${shipmentData.currency}`, 8, yPos)
    }
    yPos += 6

    // QR Code en la esquina superior derecha
    try {
      const qrCodeData = await this.generateQRCode(`${shipmentData.trackingNumber}|${shipmentData.id}|${shipmentData.carrier}`)
      if (qrCodeData) {
        pdf.addImage(qrCodeData, 'PNG', 70, 15, 20, 20)
      }
    } catch (error) {
      console.error('Error agregando QR:', error)
    }

    // Footer
    yPos = 140
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(5)
    pdf.setTextColor(150, 150, 150)
    pdf.text('Etiqueta generada por ShipMaster Pro', 50, yPos, { align: 'center' })
    pdf.text(`Costo: $${shipmentData.cost} ${shipmentData.currency} | Entrega estimada: ${shipmentData.estimatedDelivery}`, 50, yPos + 3, { align: 'center' })

    // Convertir a Blob
    const pdfBlob = pdf.output('blob')
    return pdfBlob
  }

  static async downloadLabel(shipmentData: ShipmentData): Promise<void> {
    try {
      const pdfBlob = await this.generateLabel(shipmentData)
      
      // Crear enlace de descarga
      const url = window.URL.createObjectURL(pdfBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `etiqueta-${shipmentData.id}.pdf`
      
      // Triggear descarga
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // Limpiar URL
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error descargando etiqueta:', error)
      alert('Error al generar la etiqueta PDF')
    }
  }
}
