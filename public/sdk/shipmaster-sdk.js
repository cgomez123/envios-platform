/**
 * ShipMaster Pro SDK v1.0
 * SDK universal para integrar ShipMaster en cualquier sitio web
 */

class ShipMasterSDK {
  constructor(apiKey, options = {}) {
    this.apiKey = apiKey
    this.baseUrl = options.baseUrl || 'https://envios-platform.vercel.app'
    this.debug = options.debug || false
    this.version = '1.0.0'
    
    if (!apiKey) {
      throw new Error('API key es requerida')
    }
    
    if (this.debug) {
      console.log('🚀 ShipMaster SDK v' + this.version + ' iniciado')
    }
  }

  // Autenticación
  async authenticate(clientName = 'SDK Client') {
    try {
      const response = await fetch(`${this.baseUrl}/api/v1/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: this.apiKey,
          client_name: clientName
        })
      })

      const result = await response.json()
      
      if (result.success) {
        this.token = result.data.token
        if (this.debug) console.log('✅ Autenticado exitosamente')
        return result.data
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error('❌ Error de autenticación:', error)
      throw error
    }
  }

  // Obtener cotizaciones
  async getQuotes(fromAddress, toAddress, packages, options = {}) {
    try {
      const response = await fetch(`${this.baseUrl}/api/v1/quotes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this.apiKey
        },
        body: JSON.stringify({
          from: fromAddress,
          to: toAddress, 
          packages: Array.isArray(packages) ? packages : [packages],
          options: {
            ...options,
            source: options.source || 'sdk_v1'
          }
        })
      })

      const result = await response.json()
      
      if (this.debug) {
        console.log('💰 Cotizaciones obtenidas:', result.data?.quotes?.length || 0)
      }
      
      return result
    } catch (error) {
      console.error('❌ Error obteniendo cotizaciones:', error)
      throw error
    }
  }

  // Crear envío
  async createShipment(shipmentData) {
    try {
      const response = await fetch(`${this.baseUrl}/api/v1/shipments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this.apiKey
        },
        body: JSON.stringify(shipmentData)
      })

      const result = await response.json()
      
      if (this.debug) {
        console.log('📦 Envío creado:', result.data?.shipment_id)
      }
      
      return result
    } catch (error) {
      console.error('❌ Error creando envío:', error)
      throw error
    }
  }

  // Rastrear envío
  async trackShipment(trackingNumber) {
    try {
      const response = await fetch(`${this.baseUrl}/api/v1/tracking/${trackingNumber}`, {
        headers: {
          'X-API-Key': this.apiKey
        }
      })

      const result = await response.json()
      
      if (this.debug) {
        console.log('🔍 Tracking obtenido:', trackingNumber)
      }
      
      return result
    } catch (error) {
      console.error('❌ Error obteniendo tracking:', error)
      throw error
    }
  }

  // Utilidades para UI
  createQuoteSelector(quotes, containerId, onSelect) {
    const container = document.getElementById(containerId)
    if (!container) {
      console.error('❌ Contenedor no encontrado:', containerId)
      return
    }

    const quotesHtml = quotes.map(quote => `
      <div class="shipmaster-quote" data-quote-id="${quote.quote_id}" style="
        border: 2px solid #e5e7eb;
        border-radius: 8px;
        padding: 16px;
        margin-bottom: 12px;
        cursor: pointer;
        transition: all 0.2s;
      " onclick="selectQuote('${quote.quote_id}')">
        <div style="display: flex; justify-between; align-items: center;">
          <div>
            <div style="font-weight: bold; color: #1f2937; margin-bottom: 4px;">
              ${quote.carrier} - ${quote.service}
            </div>
            <div style="color: #6b7280; font-size: 14px;">
              ${quote.delivery_time}
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 20px; font-weight: bold; color: #1f2937;">
              $${quote.total_price}
            </div>
            <div style="font-size: 12px; color: #6b7280;">
              ${quote.currency}
            </div>
          </div>
        </div>
      </div>
    `).join('')

    container.innerHTML = `
      <h3 style="margin-bottom: 20px; color: #1f2937;">Selecciona tu opción de envío:</h3>
      ${quotesHtml}
      <style>
        .shipmaster-quote:hover {
          border-color: #3b82f6;
          background: #f8fafc;
        }
        .shipmaster-quote.selected {
          border-color: #3b82f6;
          background: #eff6ff;
        }
      </style>
    `

    // Función global para selección
    window.selectQuote = (quoteId) => {
      // Remover selección previa
      document.querySelectorAll('.shipmaster-quote').forEach(el => {
        el.classList.remove('selected')
      })
      
      // Seleccionar nueva
      const selectedQuote = document.querySelector(`[data-quote-id="${quoteId}"]`)
      if (selectedQuote) {
        selectedQuote.classList.add('selected')
        
        const quote = quotes.find(q => q.quote_id === quoteId)
        if (onSelect && quote) {
          onSelect(quote)
        }
      }
    }
  }

  // Widget embebible para cualquier sitio
  createShippingWidget(containerId, options = {}) {
    const container = document.getElementById(containerId)
    if (!container) {
      console.error('❌ Contenedor no encontrado:', containerId)
      return
    }

    container.innerHTML = `
      <div style="
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        padding: 24px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        max-width: 500px;
        margin: 0 auto;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      ">
        <div style="display: flex; align-items: center; margin-bottom: 20px;">
          <div style="
            width: 40px;
            height: 40px;
            background: #3b82f6;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            margin-right: 12px;
          ">S</div>
          <div>
            <h3 style="margin: 0; color: #1f2937;">Calculadora de Envío</h3>
            <p style="margin: 0; color: #6b7280; font-size: 14px;">Powered by ShipMaster Pro</p>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
          <div>
            <label style="display: block; font-weight: 600; margin-bottom: 6px; color: #374151;">Desde:</label>
            <input type="text" id="sdk-from" placeholder="Ciudad origen" style="
              width: 100%;
              padding: 10px;
              border: 1px solid #d1d5db;
              border-radius: 6px;
              font-size: 14px;
            " />
          </div>
          <div>
            <label style="display: block; font-weight: 600; margin-bottom: 6px; color: #374151;">Hacia:</label>
            <input type="text" id="sdk-to" placeholder="Ciudad destino" style="
              width: 100%;
              padding: 10px;
              border: 1px solid #d1d5db;
              border-radius: 6px;
              font-size: 14px;
            " />
          </div>
        </div>

        <div style="margin-bottom: 20px;">
          <label style="display: block; font-weight: 600; margin-bottom: 6px; color: #374151;">Peso (kg):</label>
          <input type="number" id="sdk-weight" placeholder="2.5" min="0.1" step="0.1" style="
            width: 100%;
            padding: 10px;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            font-size: 14px;
          " />
        </div>

        <button id="sdk-calculate" style="
          width: 100%;
          background: #3b82f6;
          color: white;
          padding: 12px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          font-size: 16px;
          margin-bottom: 20px;
        " onmouseover="this.style.background='#2563eb'" onmouseout="this.style.background='#3b82f6'">
          Calcular Envío
        </button>

        <div id="sdk-results" style="display: none;"></div>
      </div>
    `

    // Agregar funcionalidad
    document.getElementById('sdk-calculate').addEventListener('click', async () => {
      const from = document.getElementById('sdk-from').value.trim()
      const to = document.getElementById('sdk-to').value.trim()
      const weight = document.getElementById('sdk-weight').value

      if (!from || !to || !weight) {
        alert('Por favor completa todos los campos')
        return
      }

      const resultsDiv = document.getElementById('sdk-results')
      resultsDiv.innerHTML = '<div style="text-align: center; padding: 20px;">Obteniendo cotizaciones...</div>'
      resultsDiv.style.display = 'block'

      try {
        const quotes = await this.getQuotes(
          { city: from },
          { city: to },
          [{ weight: parseFloat(weight) }]
        )

        if (quotes.success && quotes.data.quotes.length > 0) {
          this.createQuoteSelector(quotes.data.quotes, 'sdk-results', (selectedQuote) => {
            if (options.onQuoteSelected) {
              options.onQuoteSelected(selectedQuote)
            }
          })
        } else {
          resultsDiv.innerHTML = '<div style="text-align: center; padding: 20px; color: #ef4444;">No se encontraron cotizaciones</div>'
        }
      } catch (error) {
        resultsDiv.innerHTML = '<div style="text-align: center; padding: 20px; color: #ef4444;">Error obteniendo cotizaciones</div>'
      }
    })
  }
}

// Exportar para diferentes entornos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ShipMasterSDK
} else {
  window.ShipMasterSDK = ShipMasterSDK
}
