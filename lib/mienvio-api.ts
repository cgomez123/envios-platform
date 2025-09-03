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
    return !!(this.apiKey && this.username && this.password && 
              this.apiKey !== 'demo-key' && 
              this.apiKey !== 'REEMPLAZA_CON_TU_API_KEY');
  }

  private getHeaders() {
    if (!this.isRealCredentials()) {
      return {
        'Content-Type': 'application/json',
      };
    }

    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
      'X-Api-Key': this.apiKey,
      'X-Username': this.username,
      'X-Password': this.password
    };
  }

  async getQuotes(request: MienvioQuoteRequest): Promise<MienvioQuoteResponse> {
    try {
      // Si no tenemos credenciales reales, usar modo demo
      if (!this.isRealCredentials()) {
        console.log('🧪 Usando modo DEMO - No hay credenciales reales configuradas')
        return this.getDemoQuotes(request);
      }

      console.log('🔑 Usando API REAL de Mienvío - Solo cotización (sin cargos)');

      const requestBody = {
        from_address: request.from_address,
        to_address: request.to_address,
        parcel: request.parcel,
        packing_mode: request.packing_mode || 'package'
      };

      console.log('📤 Request a Mienvío:', JSON.stringify(requestBody, null, 2));

      const response = await fetch(`${this.baseUrl}/shipments/rates`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(requestBody),
      });

      const responseText = await response.text();
      console.log('📥 Respuesta de Mienvío:', response.status, responseText);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}. Response: ${responseText}`);
      }

      const data = JSON.parse(responseText);
      
      // Transformar respuesta de Mienvío al formato estándar
      const transformedData = data.rates ? data.rates.map((rate: any) => ({
        carrier: rate.carrier_name || rate.carrier,
        service: rate.service_name || rate.service,
        price: rate.price || rate.total_price,
        currency: rate.currency || 'MXN',
        delivery_time: rate.delivery_time || rate.estimated_days,
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
      console.error('Error en API Mienvío:', error);
      return {
        success: false,
        data: [],
        error: error instanceof Error ? error.message : 'Error desconocido'
      };
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

    // Si es nacional, agregar opciones económicas
    if (!isInternational) {
      quotes.push({
        carrier: 'Correos de México',
        service: 'Mexpost',
        price: Math.round(45 + (baseWeight * 5)),
        currency: 'MXN',
        delivery_time: '5-8 días hábiles',
        carrier_code: 'CORREOS',
        service_code: 'STANDARD',
        tracking_included: true,
        insurance_included: false,
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
