import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const apiKey = process.env.MIENVIO_API_KEY
    const username = process.env.MIENVIO_USERNAME  
    const password = process.env.MIENVIO_PASSWORD
    const apiUrl = process.env.MIENVIO_API_URL

    if (!apiKey || !username || !password || !apiUrl) {
      return NextResponse.json({
        success: false,
        error: 'Credenciales faltantes',
      }, { status: 400 })
    }

    // Vamos a hacer un request mínimo para ver qué campos necesitamos
    const minimalRequest = {
      from_address: {
        zipcode: "01000"
      },
      to_address: {
        zipcode: "44100"
      }
    }

    console.log('🧪 Probando request mínimo para análisis de campos requeridos')

    const response = await fetch(`${apiUrl}/shipments/rates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'X-Api-Key': apiKey,
        'X-Username': username,
        'X-Password': password
      },
      body: JSON.stringify(minimalRequest),
    })

    const responseText = await response.text()
    let parsedResponse = null
    
    try {
      parsedResponse = JSON.parse(responseText)
    } catch {
      parsedResponse = responseText
    }

    // También vamos a probar diferentes endpoints documentados
    const endpoints = [
      '/shipments/rates',
      '/quotes',
      '/rates', 
      '/shipment/rates'
    ]

    const endpointResults = []

    for (const endpoint of endpoints) {
      try {
        const testResponse = await fetch(`${apiUrl}${endpoint}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'X-Api-Key': apiKey,
          }
        })
        
        endpointResults.push({
          endpoint,
          status: testResponse.status,
          exists: testResponse.status !== 404
        })
      } catch (error) {
        endpointResults.push({
          endpoint,
          status: 'ERROR',
          exists: false,
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }

    return NextResponse.json({
      success: false, // Porque aún no encontramos el formato correcto
      analysis: {
        main_request: {
          endpoint: '/shipments/rates',
          status: response.status,
          response: parsedResponse
        },
        endpoint_analysis: endpointResults,
        credentials_status: {
          api_key_length: apiKey.length,
          api_key_preview: `${apiKey.substring(0, 8)}...`,
          username: `${username.substring(0, 3)}...`,
          api_url: apiUrl
        },
        next_steps: [
          'El error indica que necesitamos consultar la documentación oficial',
          'O contactar soporte técnico de Mienvío',
          'Mientras tanto, podemos usar modo DEMO que es muy realista'
        ]
      },
      recommendation: 'Activar modo DEMO mientras resolvemos formato de API real'
    })

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Error en análisis',
      details: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 })
  }
}
