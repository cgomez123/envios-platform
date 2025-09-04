import { NextRequest, NextResponse } from 'next/server';
import { mienvioAPI } from '@/lib/mienvio-api';

export async function POST(request: NextRequest) {
  try {
    console.log('🧪 INICIANDO TEST DE API REAL DE MIENVÍO');

    // Request de prueba seguro - Ciudad de México a Guadalajara
    const testRequest = {
      from_address: {
        zipcode: "06100",
        city: "Ciudad de México",
        state: "CDMX",
        country: "MX"
      },
      to_address: {
        zipcode: "44100",
        city: "Guadalajara",
        state: "Jalisco", 
        country: "MX"
      },
      parcel: {
        weight: 1, // 1 kg
        length: 20, // 20 cm
        width: 15, // 15 cm
        height: 10 // 10 cm
      },
      packing_mode: "package"
    };

    console.log('📤 Enviando request de prueba:', testRequest);

    const result = await mienvioAPI.getQuotes(testRequest);

    return NextResponse.json({
      success: true,
      test_mode: true,
      credentials_detected: !!process.env.MIENVIO_API_KEY,
      api_response: result,
      test_request: testRequest,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error en test de API real:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
      test_mode: true,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
