import { NextRequest, NextResponse } from 'next/server';
import { mienvioAPI } from '@/lib/mienvio-api';

export async function POST(request: NextRequest) {
  try {
    console.log('🧪 INICIANDO API REAL DE MIENVÍO CON DATOS DEL USUARIO');

    // Obtener datos reales del usuario
    const body = await request.json();
    console.log('📥 Datos recibidos del usuario:', body);

    const testRequest = {
      from_address: {
        zipcode: body.from_address?.zipcode || "06100",
        city: body.from_address?.city || "Ciudad",
        state: body.from_address?.state || "Estado",
        country: body.from_address?.country || "MX"
      },
      to_address: {
        zipcode: body.to_address?.zipcode || "44100", 
        city: body.to_address?.city || "Ciudad",
        state: body.to_address?.state || "Estado",
        country: body.to_address?.country || "MX"
      },
      parcel: {
        weight: body.parcel?.weight || 1,
        length: body.parcel?.length || 20,
        width: body.parcel?.width || 15,
        height: body.parcel?.height || 10
      },
      packing_mode: body.packing_mode || "package"
    };

    console.log('📤 Request con datos del usuario:', testRequest);

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
