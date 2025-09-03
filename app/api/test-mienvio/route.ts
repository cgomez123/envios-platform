import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    // Obtener credenciales del archivo .env.local
    const apiKey = process.env.MIENVIO_API_KEY
    const username = process.env.MIENVIO_USERNAME
    const password = process.env.MIENVIO_PASSWORD
    const apiUrl = process.env.MIENVIO_API_URL

    // Verificar que las credenciales estén configuradas
    if (!apiKey || !username || !password || !apiUrl) {
      return NextResponse.json({
        success: false,
        error: 'Credenciales faltantes en .env.local',
        missingCredentials: {
          MIENVIO_API_KEY: !apiKey ? 'FALTANTE' : 'OK',
          MIENVIO_USERNAME: !username ? 'FALTANTE' : 'OK', 
          MIENVIO_PASSWORD: !password ? 'FALTANTE' : 'OK',
          MIENVIO_API_URL: !apiUrl ? 'FALTANTE' : 'OK'
        }
      }, { status: 400 })
    }

    // Test básico de conexión - SOLO cotización (NO genera cargos)
    const testRequest = {
      from_address: {
        zipcode: "01000",
        city: "Ciudad de México",
        state: "CDMX", 
        country: "MX"
      },
      to_address: {
        zipcode: "44100", 
        city: "Guadalajara",
        state: "JAL",
        country: "MX"
      },
      parcel: {
        weight: 1.0,
        length: 20,
        width: 15,
        height: 10
      },
      packing_mode: "package" // Probando con "package" en lugar de "box"
    }

    const response = await fetch(`${apiUrl}/shipments/rates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'X-Api-Key': apiKey,
        // Algunos APIs requieren credenciales básicas también
        'X-Username': username,
        'X-Password': password
      },
      body: JSON.stringify(testRequest),
    })

    const responseText = await response.text()
    
    if (!response.ok) {
      return NextResponse.json({
        success: false,
        error: `Error ${response.status}: ${response.statusText}`,
        details: responseText,
        testType: 'SOLO_COTIZACION_SIN_CARGOS'
      }, { status: response.status })
    }

    const data = JSON.parse(responseText)

    return NextResponse.json({
      success: true,
      message: '✅ Conexión exitosa con Mienvío',
      testType: 'SOLO_COTIZACION_SIN_CARGOS',
      responseStatus: response.status,
      quotesFound: data.rates ? data.rates.length : 0,
      sampleData: data.rates ? data.rates.slice(0, 2) : null, // Solo mostrar 2 ejemplos
      credentials: {
        MIENVIO_API_KEY: apiKey ? `${apiKey.substring(0, 8)}...` : 'FALTANTE',
        MIENVIO_USERNAME: username ? `${username.substring(0, 3)}...` : 'FALTANTE',
        API_URL: apiUrl
      }
    })

  } catch (error) {
    console.error('Error testing Mienvío:', error)
    return NextResponse.json({
      success: false,
      error: 'Error de conexión',
      details: error instanceof Error ? error.message : 'Error desconocido',
      testType: 'SOLO_COTIZACION_SIN_CARGOS'
    }, { status: 500 })
  }
}
