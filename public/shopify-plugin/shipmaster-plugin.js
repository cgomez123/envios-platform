/**
 * ShipMaster Pro - Plugin para Shopify
 * Instalación automática de cotizaciones de envío
 */

class ShipMasterShopify {
  constructor(apiKey, options = {}) {
    this.apiKey = apiKey
    this.baseUrl = options.baseUrl || 'https://envios-platform.vercel.app'
    this.debug = options.debug || false
    this.autoShow = options.autoShow !== false
    
    if (this.debug) {
      console.log('🚀 ShipMaster Shopify Plugin iniciado')
    }
    
    this.init()
  }

  async init() {
    // Esperar a que Shopify esté listo
    if (typeof Shopify === 'undefined') {
      setTimeout(() => this.init(), 100)
      return
    }

    if (this.autoShow && this.isCheckoutPage()) {
      this.injectShippingCalculator()
    }

    // Escuchar cambios en el carrito
    this.observeCartChanges()
  }

  isCheckoutPage() {
    return window.location.pathname.includes('/cart') || 
           window.location.pathname.includes('/checkout') ||
           document.querySelector('.cart-page, .checkout-page')
  }

  async getShopifyCart() {
    try {
      const response = await fetch('/cart.js')
      const cart = await response.json()
      
      // Transformar items de Shopify a nuestro formato
      const packages = cart.items.map(item => ({
        id: item.id.toString(),
        weight: (item.grams / 1000) || 0.5, // Convertir gramos a kg
        dimensions: {
          length: item.properties?.length || 20,
          width: item.properties?.width || 15, 
          height: item.properties?.height || 10
        },
        description: item.title,
        declared_value: item.price / 100, // Centavos a pesos
        quantity: item.quantity
      }))

      return {
        packages,
        total_weight: packages.reduce((sum, pkg) => sum + (pkg.weight * pkg.quantity), 0),
        total_value: cart.total_price / 100
      }
    } catch (error) {
      if (this.debug) console.error('Error obteniendo carrito Shopify:', error)
      return null
    }
  }

  async getQuotes(destination) {
    try {
      const cart = await this.getShopifyCart()
      if (!cart) return []

      // Obtener dirección del store (en producción desde Shopify Admin)
      const storeAddress = {
        city: 'Ciudad de México',
        state: 'CDMX',
        zip: '01000'
      }

      const response = await fetch(`${this.baseUrl}/api/v1/quotes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this.apiKey,
          'X-Source': 'shopify'
        },
        body: JSON.stringify({
          from: storeAddress,
          to: destination,
          packages: cart.packages,
          options: {
            source: 'shopify_checkout',
            store_domain: window.location.hostname
          }
        })
      })

      const data = await response.json()
      return data.success ? data.data.quotes : []
    } catch (error) {
      if (this.debug) console.error('Error obteniendo cotizaciones:', error)
      return []
    }
  }

  injectShippingCalculator() {
    // Buscar contenedor de shipping en checkout
    const shippingContainer = document.querySelector('.shipping-calculator, .cart-shipping, .checkout-shipping') ||
                            document.querySelector('.cart-totals') ||
                            document.querySelector('.cart__footer')

    if (!shippingContainer) {
      if (this.debug) console.log('⚠️ No se encontró contenedor de shipping')
      return
    }

    // Crear calculadora de envío
    const calculatorHtml = `
      <div id="shipmaster-calculator" class="shipmaster-shipping-calculator" style="
        border: 1px solid #e1e1e1;
        border-radius: 8px;
        padding: 20px;
        margin: 20px 0;
        background: white;
        font-family: Arial, sans-serif;
      ">
        <div style="display: flex; align-items: center; margin-bottom: 15px;">
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
            <h3 style="margin: 0; color: #1f2937; font-size: 18px;">Opciones de Envío</h3>
            <p style="margin: 0; color: #6b7280; font-size: 14px;">Powered by ShipMaster Pro</p>
          </div>
        </div>
        
        <div id="shipping-form" style="margin-bottom: 20px;">
          <div style="margin-bottom: 15px;">
            <label style="display: block; font-weight: bold; margin-bottom: 5px; color: #374151;">
              Código Postal de Entrega:
            </label>
            <input 
              type="text" 
              id="destination-zip"
              placeholder="Ej: 44100"
              maxlength="5"
              style="
                width: 100%;
                padding: 10px;
                border: 1px solid #d1d5db;
                border-radius: 6px;
                font-size: 16px;
              "
            />
          </div>
          
          <button 
            id="calculate-shipping"
            style="
              background: #3b82f6;
              color: white;
              padding: 12px 24px;
              border: none;
              border-radius: 6px;
              font-weight: bold;
              cursor: pointer;
              width: 100%;
              font-size: 16px;
            "
            onmouseover="this.style.background='#2563eb'"
            onmouseout="this.style.background='#3b82f6'"
          >
            Calcular Opciones de Envío
          </button>
        </div>
        
        <div id="shipping-results" style="display: none;">
          <div id="shipping-quotes"></div>
        </div>
        
        <div id="shipping-loading" style="display: none; text-align: center; padding: 20px;">
          <div style="
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid #f3f3f3;
            border-top: 3px solid #3b82f6;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          "></div>
          <p style="margin-top: 10px; color: #6b7280;">Obteniendo mejores opciones...</p>
        </div>
      </div>
      
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .shipmaster-quote-option {
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          padding: 15px;
          margin-bottom: 10px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .shipmaster-quote-option:hover {
          border-color: #3b82f6;
          background: #f8fafc;
        }
        .shipmaster-quote-selected {
          border-color: #3b82f6;
          background: #eff6ff;
        }
      </style>
    `

    // Insertar calculadora
    shippingContainer.insertAdjacentHTML('beforeend', calculatorHtml)

    // Agregar event listeners
    this.attachEventListeners()
  }

  attachEventListeners() {
    const calculateBtn = document.getElementById('calculate-shipping')
    const zipInput = document.getElementById('destination-zip')

    if (calculateBtn) {
      calculateBtn.addEventListener('click', async () => {
        const zip = zipInput?.value?.trim()
        if (!zip || zip.length !== 5) {
          alert('Por favor ingresa un código postal válido de 5 dígitos')
          return
        }

        await this.calculateShipping(zip)
      })
    }

    // Enter key en input
    if (zipInput) {
      zipInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          calculateBtn?.click()
        }
      })
    }
  }

  async calculateShipping(destinationZip) {
    const loadingDiv = document.getElementById('shipping-loading')
    const resultsDiv = document.getElementById('shipping-results')
    
    if (loadingDiv) loadingDiv.style.display = 'block'
    if (resultsDiv) resultsDiv.style.display = 'none'

    // Mapear CP a ciudad (simplificado)
    const zipToCityMap = {
      '44100': { city: 'Guadalajara', state: 'JAL' },
      '64000': { city: 'Monterrey', state: 'NL' },
      '77500': { city: 'Cancún', state: 'QR' },
      '20000': { city: 'Aguascalientes', state: 'AGS' }
    }

    const destination = zipToCityMap[destinationZip] || {
      city: 'Ciudad destino',
      state: 'Estado',
      zip: destinationZip
    }

    const quotes = await this.getQuotes(destination)
    
    if (loadingDiv) loadingDiv.style.display = 'none'
    
    this.displayQuotes(quotes)
  }

  displayQuotes(quotes) {
    const resultsDiv = document.getElementById('shipping-results')
    const quotesContainer = document.getElementById('shipping-quotes')
    
    if (!resultsDiv || !quotesContainer) return

    if (quotes.length === 0) {
      quotesContainer.innerHTML = `
        <div style="text-align: center; padding: 20px; color: #6b7280;">
          No se encontraron opciones de envío disponibles
        </div>
      `
    } else {
      const quotesHtml = quotes.map(quote => `
        <div class="shipmaster-quote-option" data-quote-id="${quote.quote_id}">
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
              <div style="font-size: 24px; font-weight: bold; color: #1f2937;">
                $${quote.total_price}
              </div>
              <div style="font-size: 12px; color: #6b7280;">
                ${quote.currency}
              </div>
            </div>
          </div>
          
          <div style="margin-top: 10px; display: flex; gap: 8px;">
            ${quote.tracking_included ? '<span style="background: #dcfce7; color: #166534; padding: 2px 8px; border-radius: 12px; font-size: 12px;">✓ Rastreo</span>' : ''}
            ${quote.insurance_included ? '<span style="background: #dbeafe; color: #1d4ed8; padding: 2px 8px; border-radius: 12px; font-size: 12px;">✓ Seguro</span>' : ''}
          </div>
        </div>
      `).join('')

      quotesContainer.innerHTML = quotesHtml

      // Agregar funcionalidad de selección
      const quoteOptions = document.querySelectorAll('.shipmaster-quote-option')
      quoteOptions.forEach(option => {
        option.addEventListener('click', () => {
          // Remover selección previa
          quoteOptions.forEach(opt => opt.classList.remove('shipmaster-quote-selected'))
          // Agregar selección actual
          option.classList.add('shipmaster-quote-selected')
          
          const quoteId = option.getAttribute('data-quote-id')
          this.selectShippingOption(quoteId, quotes.find(q => q.quote_id === quoteId))
        })
      })
    }

    resultsDiv.style.display = 'block'
  }

  selectShippingOption(quoteId, quoteData) {
    if (this.debug) {
      console.log('📦 Opción de envío seleccionada:', quoteData)
    }

    // En producción: integrar con Shopify checkout
    // Shopify.Checkout.updateShippingRate(quoteData)
    
    // Por ahora mostrar confirmación
    const confirmMsg = `✅ Envío seleccionado: ${quoteData.carrier} - $${quoteData.total_price} MXN`
    
    // Crear notificación visual
    this.showNotification(confirmMsg)
  }

  showNotification(message) {
    // Crear notificación temporal
    const notification = document.createElement('div')
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        z-index: 9999;
        font-family: Arial, sans-serif;
        max-width: 300px;
      ">
        ${message}
      </div>
    `
    
    document.body.appendChild(notification)
    
    // Auto-remover después de 3 segundos
    setTimeout(() => {
      notification.remove()
    }, 3000)
  }

  observeCartChanges() {
    // Observar cambios en el carrito
    let lastCartCount = 0
    
    const checkCart = async () => {
      try {
        const response = await fetch('/cart.js')
        const cart = await response.json()
        
        if (cart.item_count !== lastCartCount) {
          lastCartCount = cart.item_count
          
          if (this.debug) {
            console.log('🛒 Carrito actualizado:', cart.item_count, 'items')
          }
          
          // Re-calcular envío si ya hay cotizaciones mostradas
          const quotesContainer = document.getElementById('shipping-quotes')
          if (quotesContainer && quotesContainer.innerHTML.trim() !== '') {
            const zipInput = document.getElementById('destination-zip')
            if (zipInput?.value) {
              this.calculateShipping(zipInput.value)
            }
          }
        }
      } catch (error) {
        // Silencioso - no es crítico
      }
    }

    // Verificar cada 2 segundos
    setInterval(checkCart, 2000)
  }

  // Métodos públicos para desarrolladores
  async createShipment(orderData) {
    try {
      const response = await fetch(`${this.baseUrl}/api/v1/shipments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this.apiKey
        },
        body: JSON.stringify({
          ...orderData,
          options: {
            source: 'shopify_order',
            webhook_url: orderData.webhook_url
          }
        })
      })

      const result = await response.json()
      
      if (this.debug) {
        console.log('📦 Envío creado vía API:', result)
      }
      
      return result
    } catch (error) {
      console.error('Error creando envío:', error)
      return { success: false, error: error.message }
    }
  }

  async trackShipment(trackingNumber) {
    try {
      const response = await fetch(`${this.baseUrl}/api/v1/tracking/${trackingNumber}`)
      return await response.json()
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
}

// Auto-inicializar si hay API key en meta tags
document.addEventListener('DOMContentLoaded', () => {
  const apiKeyMeta = document.querySelector('meta[name="shipmaster-api-key"]')
  
  if (apiKeyMeta) {
    const apiKey = apiKeyMeta.getAttribute('content')
    const debug = document.querySelector('meta[name="shipmaster-debug"]')?.getAttribute('content') === 'true'
    
    window.ShipMaster = new ShipMasterShopify(apiKey, { debug })
    
    console.log('🚀 ShipMaster Plugin auto-iniciado')
  }
})

// Exportar para uso manual
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ShipMasterShopify
} else {
  window.ShipMasterShopify = ShipMasterShopify
}
