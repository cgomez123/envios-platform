// Integración con API de Mienvío
interface MienvioQuoteRequest {
  from_address: {
    zipcode: string;
    city: string;
    state: string;
    country: string;
  };
  to_address: {
    zipcode: string;
    city: string;
    state: string;
    country: string;
  };
  parcel: {
    weight: number; // en kg
    length: number; // en cm
    width: number;  // en cm
    height: number; // en cm
  };
  packing_mode: string;
}

interface MienvioQuoteResponse {
  success: boolean;
  data: Array<{
    carrier: string;
    service: string;
    price: number;
    currency: string;
    delivery_time: string;
    carrier_code: string;
    service_code: string;
    tracking_included: boolean;
    insurance_included: boolean;
  }>;
  error?: string;
}

export class MienvioAPI {
  private baseUrl = process.env.MIENVIO_API_URL || 'https://production.mienvio.mx/api/v2';
  private apiKey = process.env.MIENVIO_API_KEY;
  private username = process.env.MIENVIO_USERNAME;
  private password = process.env.MIENVIO_PASSWORD;

  private isRealCredentials(): boolean {
    console.log('🔍 Verificando credenciales:', {
      hasApiKey: !!this.apiKey,
      apiKeyLength: this.apiKey?.length || 0,
      apiKeyStart: this.apiKey?.substring(0, 10) || 'NO_KEY',
      baseUrl: this.baseUrl
    });
    
    const isReal = !!(this.apiKey && 
              this.apiKey !== 'demo-key' && 
              this.apiKey !== 'REEMPLAZA_CON_TU_API_KEY' &&
              this.apiKey.length > 10);
              
    console.log('🎯 Resultado credenciales reales:', isReal);
    return isReal;
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (this.isRealCredentials()) {
      // Mienvío API V2 usa API Key en Authorization header
      if (this.apiKey) {
        headers['Authorization'] = `Bearer ${this.apiKey}`;
      }
    }

    return headers;
  }

  async getQuotes(request: MienvioQuoteRequest): Promise<MienvioQuoteResponse> {
    try {
      // Si no tenemos credenciales reales, usar modo demo
      if (!this.isRealCredentials()) {
        console.log('🧪 Usando modo DEMO - No hay credenciales reales configuradas')
        return this.getDemoQuotes(request);
      }

      console.log('🔑 Usando API REAL de Mienvío - Flujo completo (solo cotización)');

      // PASO 1: Crear dirección de origen
      const fromAddressData = {
        name: "Envío desde",
        street: "Calle Principal 123",
        street2: request.from_address.city,
        zipcode: request.from_address.zipcode,
        city: request.from_address.city,
        state: request.from_address.state,
        country: request.from_address.country || 'MX',
        email: "origen@test.com",
        phone: "5551234567"
      };

      const fromAddressResponse = await fetch(`${this.baseUrl}/addresses`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(fromAddressData),
      });

      if (!fromAddressResponse.ok) {
        throw new Error(`Error creando dirección origen: ${fromAddressResponse.status}`);
      }

      const fromAddress = await fromAddressResponse.json();
      const fromAddressId = fromAddress.data?.object_id;

      // PASO 2: Crear dirección de destino  
      const toAddressData = {
        name: "Envío hacia",
        street: "Calle Destino 456",
        street2: request.to_address.city,
        zipcode: request.to_address.zipcode,
        city: request.to_address.city,
        state: request.to_address.state,
        country: request.to_address.country || 'MX',
        email: "destino@test.com",
        phone: "5551234568"
      };

      const toAddressResponse = await fetch(`${this.baseUrl}/addresses`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(toAddressData),
      });

      if (!toAddressResponse.ok) {
        throw new Error(`Error creando dirección destino: ${toAddressResponse.status}`);
      }

      const toAddress = await toAddressResponse.json();
      const toAddressId = toAddress.data?.object_id;

      // PASO 3: Crear shipment para cotización
      const shipmentData = {
        address_from: fromAddressId,
        address_to: toAddressId,
        parcels: [{
          weight: request.parcel.weight,
          height: request.parcel.height,
          length: request.parcel.length,
          width: request.parcel.width
        }],
        content_description: "Paquete de prueba",
        declared_value: 100,
        insurance: false
      };

      const shipmentResponse = await fetch(`${this.baseUrl}/shipments`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(shipmentData),
      });

      if (!shipmentResponse.ok) {
        const errorText = await shipmentResponse.text();
        throw new Error(`Error creando shipment: ${shipmentResponse.status} - ${errorText}`);
      }

      const shipment = await shipmentResponse.json();
      const shipmentId = shipment.data?.object_id;

      // PASO 4: Obtener cotizaciones
      const ratesResponse = await fetch(`${this.baseUrl}/shipments/${shipmentId}/rates`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!ratesResponse.ok) {
        throw new Error(`Error obteniendo cotizaciones: ${ratesResponse.status}`);
      }

      const ratesData = await ratesResponse.json();
      console.log('📥 Cotizaciones de Mienvío:', ratesData);

      // Transformar respuesta de Mienvío API V2 al formato estándar
      const transformedData = ratesData.data ? ratesData.data.map((rate: any) => ({
        carrier: rate.carrier || rate.carrier_name,
        service: rate.service || rate.service_name || rate.service_type,
        price: rate.rate || rate.price || rate.total_price,
        currency: rate.currency || 'MXN',
        delivery_time: rate.estimated_delivery || rate.delivery_time || rate.estimated_days || '2-3 días',
        carrier_code: rate.carrier_code || rate.carrier,
        service_code: rate.service_code || rate.service,
        tracking_included: rate.tracking_included !== false,
        insurance_included: rate.insurance_included || false,
      })) : [];

      return {
        success: true,
        data: transformedData
      };

    } catch (error) {
      console.error('❌ Error en API Real Mienvío:', error);
      
      // 🚨 FORZAR MODO REAL - NO USAR FALLBACK DEMO
      if (process.env.NEXT_PUBLIC_FORCE_REAL_API === 'true' || process.env.NODE_ENV === 'production') {
        console.log('🚫 MODO REAL FORZADO - Sin fallback a demo');
        return {
          success: false,
          error: `Error en API Real de Mienvío: ${error instanceof Error ? error.message : 'Error desconocido'}`,
          data: []
        };
      }
      
      // Fallback solo en desarrollo
      console.log('🔄 Fallback a modo DEMO (solo desarrollo)');
      return this.getDemoQuotes(request);
    }
  }

  async getDemoQuotes(request: MienvioQuoteRequest): Promise<MienvioQuoteResponse> {
    // Simulación SÚPER realista basada en peso, distancia y ubicación
    const baseWeight = request.parcel.weight || 1;
    const isInternational = request.to_address.country !== 'MX';
    
    // Calcular distancia aproximada entre ciudades para precios más realistas
    const fromCity = request.from_address.city.toLowerCase();
    const toCity = request.to_address.city.toLowerCase();
    
    let distanceMultiplier = 1;
    if (fromCity.includes('méxico') && toCity.includes('guadalajara')) distanceMultiplier = 1.2;
    else if (fromCity.includes('méxico') && toCity.includes('monterrey')) distanceMultiplier = 1.4;
    else if (fromCity.includes('méxico') && toCity.includes('cancún')) distanceMultiplier = 1.8;
    else if (Math.abs(fromCity.length - toCity.length) > 3) distanceMultiplier = 1.3;
    
    // Simular delay realista de API
    await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 800));

    const quotes = [
      {
        carrier: 'FedEx',
        service: 'FedEx Express',
        price: Math.round((120 + (baseWeight * 15)) * distanceMultiplier * (isInternational ? 2.5 : 1)),
        currency: 'MXN',
        delivery_time: isInternational ? '3-5 días hábiles' : '1-2 días hábiles',
        carrier_code: 'FEDEX',
        service_code: 'EXPRESS',
        tracking_included: true,
        insurance_included: true,
      },
      {
        carrier: 'DHL',
        service: 'DHL Express',
        price: Math.round((95 + (baseWeight * 12)) * distanceMultiplier * (isInternational ? 2.2 : 1)),
        currency: 'MXN',
        delivery_time: isInternational ? '4-6 días hábiles' : '2-3 días hábiles',
        carrier_code: 'DHL',
        service_code: 'EXPRESS',
        tracking_included: true,
        insurance_included: true,
      },
      {
        carrier: 'Estafeta',
        service: 'Estafeta Express',
        price: Math.round((75 + (baseWeight * 8)) * distanceMultiplier * (isInternational ? 1.8 : 1)),
        currency: 'MXN',
        delivery_time: isInternational ? '5-7 días hábiles' : '2-4 días hábiles',
        carrier_code: 'ESTAFETA',
        service_code: 'EXPRESS',
        tracking_included: true,
        insurance_included: false,
      },
      {
        carrier: 'UPS',
        service: 'UPS Express',
        price: Math.round((110 + (baseWeight * 13)) * distanceMultiplier * (isInternational ? 2.3 : 1)),
        currency: 'MXN',
        delivery_time: isInternational ? '3-5 días hábiles' : '1-3 días hábiles',
        carrier_code: 'UPS',
        service_code: 'EXPRESS',
        tracking_included: true,
        insurance_included: true,
      },
    ];

    // Si es nacional, agregar opciones económicas REALES
    if (!isInternational) {
      quotes.push({
        carrier: 'Estafeta',
        service: 'Estafeta Día Siguiente',
        price: Math.round(65 + (baseWeight * 8)),
        currency: 'MXN',
        delivery_time: '1-2 días hábiles',
        carrier_code: 'ESTAFETA',
        service_code: 'EXPRESS',
        tracking_included: true,
        insurance_included: true,
      });
    }

    return {
      success: true,
      data: quotes.sort((a, b) => a.price - b.price) // Ordenar por precio
    };
  }

  async trackShipment(trackingNumber: string, carrier: string) {
    // Implementar tracking real cuando tengas credenciales
    return {
      success: true,
      tracking: {
        status: 'in_transit',
        location: 'Centro de distribución México',
        estimated_delivery: '2024-09-05',
        history: [
          { date: '2024-09-03', status: 'picked_up', location: 'Origen' },
          { date: '2024-09-04', status: 'in_transit', location: 'Centro de distribución' }
        ]
      }
    };
  }
}

export const mienvioAPI = new MienvioAPI();
