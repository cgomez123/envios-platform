interface NotificationData {
  shipmentId: string
  trackingNumber: string
  recipientName: string
  recipientEmail?: string
  recipientPhone?: string
  carrier: string
  status: string
  location?: string
  estimatedDelivery?: string
}

export class NotificationService {
  
  // Simulación de envío de email
  static async sendEmail(to: string, subject: string, body: string): Promise<boolean> {
    try {
      // En producción usarías un servicio como SendGrid, Resend, o Nodemailer
      console.log('📧 Email enviado (simulación):')
      console.log(`Para: ${to}`)
      console.log(`Asunto: ${subject}`)
      console.log(`Contenido: ${body}`)
      
      // Simular delay de envío
      await new Promise(resolve => setTimeout(resolve, 500))
      
      return true
    } catch (error) {
      console.error('Error enviando email:', error)
      return false
    }
  }

  // Simulación de envío de SMS
  static async sendSMS(to: string, message: string): Promise<boolean> {
    try {
      // En producción usarías un servicio como Twilio
      console.log('📱 SMS enviado (simulación):')
      console.log(`Para: ${to}`)
      console.log(`Mensaje: ${message}`)
      
      await new Promise(resolve => setTimeout(resolve, 300))
      
      return true
    } catch (error) {
      console.error('Error enviando SMS:', error)
      return false
    }
  }

  // Notificación de envío creado
  static async notifyShipmentCreated(data: NotificationData): Promise<void> {
    const emailSubject = `✅ Envío creado exitosamente - ${data.trackingNumber}`
    const emailBody = `
    Hola ${data.recipientName},

    Tu envío ha sido creado exitosamente:

    🏷️ Número de tracking: ${data.trackingNumber}
    📦 ID de envío: ${data.shipmentId}
    🚚 Paquetería: ${data.carrier}
    📅 Entrega estimada: ${data.estimatedDelivery}

    Puedes rastrear tu envío en tiempo real en:
    ${process.env.NEXT_PUBLIC_APP_URL}/tracking/${data.trackingNumber}

    ¡Gracias por usar ShipMaster Pro!
    
    Equipo ShipMaster Pro
    `

    const smsMessage = `📦 Tu envío ${data.trackingNumber} ha sido creado con ${data.carrier}. Rastrea en: shipmaster.pro/tracking/${data.trackingNumber}`

    // Enviar notificaciones
    const promises = []
    
    if (data.recipientEmail) {
      promises.push(this.sendEmail(data.recipientEmail, emailSubject, emailBody))
    }
    
    if (data.recipientPhone) {
      promises.push(this.sendSMS(data.recipientPhone, smsMessage))
    }

    await Promise.all(promises)
  }

  // Notificación de cambio de estado
  static async notifyStatusUpdate(data: NotificationData): Promise<void> {
    let statusEmoji = '📦'
    let statusMessage = ''

    switch (data.status) {
      case 'picked_up':
        statusEmoji = '🚚'
        statusMessage = 'Tu paquete ha sido recolectado'
        break
      case 'in_transit':
        statusEmoji = '🛫'
        statusMessage = 'Tu paquete está en tránsito'
        break
      case 'out_for_delivery':
        statusEmoji = '🚛'
        statusMessage = 'Tu paquete está en ruta de entrega'
        break
      case 'delivered':
        statusEmoji = '✅'
        statusMessage = '¡Tu paquete ha sido entregado!'
        break
    }

    const emailSubject = `${statusEmoji} Actualización de envío - ${data.trackingNumber}`
    const emailBody = `
    Hola ${data.recipientName},

    ${statusMessage}

    🏷️ Tracking: ${data.trackingNumber}
    🚚 Paquetería: ${data.carrier}
    📍 Ubicación: ${data.location || 'En tránsito'}
    
    Ve el estado completo en:
    ${process.env.NEXT_PUBLIC_APP_URL}/tracking/${data.trackingNumber}

    Equipo ShipMaster Pro
    `

    const smsMessage = `${statusEmoji} ${statusMessage}. Tracking ${data.trackingNumber} - ${data.location || 'En tránsito'}. Ver: shipmaster.pro/tracking/${data.trackingNumber}`

    // Enviar notificaciones
    const promises = []
    
    if (data.recipientEmail) {
      promises.push(this.sendEmail(data.recipientEmail, emailSubject, emailBody))
    }
    
    if (data.recipientPhone) {
      promises.push(this.sendSMS(data.recipientPhone, smsMessage))
    }

    await Promise.all(promises)
  }

  // Notificación de entrega
  static async notifyDelivered(data: NotificationData): Promise<void> {
    const emailSubject = `🎉 ¡Paquete entregado! - ${data.trackingNumber}`
    const emailBody = `
    Hola ${data.recipientName},

    ¡Excelentes noticias! Tu paquete ha sido entregado exitosamente.

    🏷️ Tracking: ${data.trackingNumber}
    📍 Entregado en: ${data.location}
    📅 Fecha de entrega: ${new Date().toLocaleDateString('es-MX')}

    ¿Cómo fue tu experiencia? Nos encantaría conocer tu opinión.

    Gracias por confiar en ShipMaster Pro para tus envíos.

    Equipo ShipMaster Pro
    `

    const smsMessage = `🎉 ¡Tu paquete ${data.trackingNumber} ha sido entregado exitosamente! Gracias por usar ShipMaster Pro.`

    // Enviar notificaciones
    const promises = []
    
    if (data.recipientEmail) {
      promises.push(this.sendEmail(data.recipientEmail, emailSubject, emailBody))
    }
    
    if (data.recipientPhone) {
      promises.push(this.sendSMS(data.recipientPhone, smsMessage))
    }

    await Promise.all(promises)
  }
}
