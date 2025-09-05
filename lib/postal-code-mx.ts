// 🇲🇽 API de Códigos Postales Mexicanos (SEPOMEX)
// Integración para autocompletar direcciones

export interface PostalCodeData {
  codigo_postal: string;
  estado: string;
  municipio: string;
  ciudad: string;
  asentamiento: string[];
  tipo_asentamiento: string;
}

export class PostalCodeMX {
  // API gratuita de códigos postales mexicanos
  private baseUrl = 'https://api.copomex.com/query';

  async getAddressByPostalCode(postalCode: string): Promise<PostalCodeData[]> {
    try {
      const response = await fetch(`${this.baseUrl}/info/${postalCode}?token=pruebas`);
      
      if (!response.ok) {
        throw new Error(`Error en API: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error_message || 'Código postal no encontrado');
      }

      return data;

    } catch (error) {
      console.error('❌ Error obteniendo dirección por CP:', error);
      
      // Fallback con datos mock para desarrollo
      return this.getMockDataByPostalCode(postalCode);
    }
  }

  // Datos mock para códigos postales comunes (fallback)
  private getMockDataByPostalCode(postalCode: string): PostalCodeData[] {
    const mockData: Record<string, PostalCodeData> = {
      '06100': {
        codigo_postal: '06100',
        estado: 'Ciudad de México',
        municipio: 'Cuauhtémoc',
        ciudad: 'Ciudad de México',
        asentamiento: ['Centro'],
        tipo_asentamiento: 'Colonia'
      },
      '44100': {
        codigo_postal: '44100',
        estado: 'Jalisco',
        municipio: 'Guadalajara',
        ciudad: 'Guadalajara',
        asentamiento: ['Centro'],
        tipo_asentamiento: 'Colonia'
      },
      '64000': {
        codigo_postal: '64000',
        estado: 'Nuevo León',
        municipio: 'Monterrey',
        ciudad: 'Monterrey',
        asentamiento: ['Centro'],
        tipo_asentamiento: 'Colonia'
      },
      '22000': {
        codigo_postal: '22000',
        estado: 'Baja California',
        municipio: 'Tijuana',
        ciudad: 'Tijuana',
        asentamiento: ['Centro'],
        tipo_asentamiento: 'Colonia'
      }
    };

    const found = mockData[postalCode];
    return found ? [found] : [];
  }

  // Función para formatear dirección completa
  formatAddress(data: PostalCodeData, asentamiento?: string): string {
    const selectedAsentamiento = asentamiento || data.asentamiento[0] || '';
    return `${selectedAsentamiento}, ${data.ciudad}, ${data.estado} ${data.codigo_postal}`;
  }
}

export const postalCodeMX = new PostalCodeMX();
