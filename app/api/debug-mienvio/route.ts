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

    // Probar diferentes valores de packing_mode
    const packingModes = ['package', 'envelope', 'box', 'parcel', 'small_package', 'document']
    const results = []

    const baseRequest = {
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
      }
    }

    for (const packingMode of packingModes) {
      try {
        console.log(`🧪 Probando packing_mode: ${packingMode}`)
        
        const testRequest = {
          ...baseRequest,
          packing_mode: packingMode
        }

        const response = await fetch(`${apiUrl}/shipments/rates`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'X-Api-Key': apiKey,
            'X-Username': username,
            'X-Password': password
          },
          body: JSON.stringify(testRequest),
        })

        const responseText = await response.text()
        
        results.push({
          packing_mode: packingMode,
          status: response.status,
          success: response.ok,
          response: response.ok ? 'SUCCESS' : responseText.substring(0, 200) + '...'
        })

        // Si encontramos uno que funciona, paramos
        if (response.ok) {
          const data = JSON.parse(responseText)
          return NextResponse.json({
            success: true,
            message: `✅ ¡Funciona con packing_mode: "${packingMode}"!`,
            working_packing_mode: packingMode,
            quotes_found: data.rates ? data.rates.length : 0,
            all_tests: results,
            sample_response: data.rates ? data.rates.slice(0, 2) : null
          })
        }

        // Pequeña pausa entre requests
        await new Promise(resolve => setTimeout(resolve, 500))

      } catch (error) {
        results.push({
          packing_mode: packingMode,
          status: 'ERROR',
          success: false,
          response: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }

    return NextResponse.json({
      success: false,
      message: 'Ningún packing_mode funcionó',
      all_tests: results,
      recommendation: 'Verifica las credenciales o contacta soporte de Mienvío'
    })

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Error general en debug',
      details: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 })
  }
}
