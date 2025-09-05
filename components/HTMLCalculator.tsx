'use client'

export function HTMLCalculator() {
  return (
    <div 
      dangerouslySetInnerHTML={{
        __html: `
<div style="background: white; padding: 40px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); max-width: 800px; margin: 0 auto;">
  <h2 style="text-align: center; color: #1e40af; font-size: 32px; margin-bottom: 30px; font-weight: bold;">
    🎯 Cotizador Inteligente ⚡ VERSIÓN PURA
  </h2>
  
  <form id="cotizadorForm" onsubmit="enviarCotizacion(event)">
    <!-- Direcciones -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px;">
      <div>
        <label style="display: block; font-size: 18px; font-weight: bold; color: #1e40af; margin-bottom: 10px;">
          🏠 DESDE (Origen) *
        </label>
        <input 
          type="text" 
          id="origen" 
          value="Ciudad de México, CDMX"
          style="width: 100%; padding: 15px; font-size: 18px; font-weight: bold; border: 4px solid #3b82f6; border-radius: 12px; background: #dbeafe; color: #1e40af; outline: none;"
          onclick="this.select()"
          required
        />
      </div>
      <div>
        <label style="display: block; font-size: 18px; font-weight: bold; color: #1e40af; margin-bottom: 10px;">
          🎯 HASTA (Destino) *
        </label>
        <input 
          type="text" 
          id="destino" 
          value="Guadalajara, JAL"
          style="width: 100%; padding: 15px; font-size: 18px; font-weight: bold; border: 4px solid #3b82f6; border-radius: 12px; background: #dbeafe; color: #1e40af; outline: none;"
          onclick="this.select()"
          required
        />
      </div>
    </div>

    <!-- Dimensiones -->
    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 20px; margin-bottom: 30px;">
      <div>
        <label style="display: block; font-size: 18px; font-weight: bold; color: #059669; margin-bottom: 10px;">
          ⚖️ PESO (kg) *
        </label>
        <input 
          type="number" 
          id="peso" 
          value="2.5"
          min="0.1"
          max="100"
          step="0.1"
          style="width: 100%; padding: 15px; font-size: 20px; font-weight: bold; border: 4px solid #10b981; border-radius: 12px; background: #d1fae5; color: #047857; text-align: center; outline: none;"
          onclick="this.select()"
          required
        />
      </div>
      <div>
        <label style="display: block; font-size: 18px; font-weight: bold; color: #7c3aed; margin-bottom: 10px;">
          📏 LARGO (cm)
        </label>
        <input 
          type="number" 
          id="largo" 
          value="20"
          style="width: 100%; padding: 15px; font-size: 20px; font-weight: bold; border: 4px solid #8b5cf6; border-radius: 12px; background: #ede9fe; color: #5b21b6; text-align: center; outline: none;"
          onclick="this.select()"
        />
      </div>
      <div>
        <label style="display: block; font-size: 18px; font-weight: bold; color: #ea580c; margin-bottom: 10px;">
          📐 ANCHO (cm)
        </label>
        <input 
          type="number" 
          id="ancho" 
          value="30"
          style="width: 100%; padding: 15px; font-size: 20px; font-weight: bold; border: 4px solid #f97316; border-radius: 12px; background: #fed7aa; color: #c2410c; text-align: center; outline: none;"
          onclick="this.select()"
        />
      </div>
      <div>
        <label style="display: block; font-size: 18px; font-weight: bold; color: #dc2626; margin-bottom: 10px;">
          📦 ALTO (cm)
        </label>
        <input 
          type="number" 
          id="alto" 
          value="15"
          style="width: 100%; padding: 15px; font-size: 20px; font-weight: bold; border: 4px solid #ef4444; border-radius: 12px; background: #fecaca; color: #b91c1c; text-align: center; outline: none;"
          onclick="this.select()"
        />
      </div>
    </div>

    <button 
      type="submit" 
      id="btnCotizar"
      style="width: 100%; padding: 20px; font-size: 20px; font-weight: bold; background: linear-gradient(45deg, #3b82f6, #8b5cf6); color: white; border: none; border-radius: 15px; cursor: pointer; margin-bottom: 20px; transition: transform 0.2s;"
      onmouseover="this.style.transform='scale(1.02)'"
      onmouseout="this.style.transform='scale(1)'"
    >
      🚀 COTIZAR ENVÍO
    </button>
  </form>

  <!-- Resultados -->
  <div id="resultados" style="display: none; margin-top: 30px;">
    <h3 style="font-size: 24px; font-weight: bold; color: #047857; margin-bottom: 20px;">💰 Cotizaciones Disponibles:</h3>
    <div id="listaResultados"></div>
  </div>

  <!-- Loading -->
  <div id="loading" style="display: none; text-align: center; padding: 30px;">
    <div style="font-size: 24px; color: #3b82f6;">⏳ Obteniendo cotizaciones...</div>
  </div>
</div>

<script>
async function enviarCotizacion(e) {
  e.preventDefault();
  
  const btnCotizar = document.getElementById('btnCotizar');
  const loading = document.getElementById('loading');
  const resultados = document.getElementById('resultados');
  
  // Obtener valores
  const datos = {
    from: document.getElementById('origen').value,
    to: document.getElementById('destino').value,
    weight: document.getElementById('peso').value,
    dimensions: {
      length: document.getElementById('largo').value,
      width: document.getElementById('ancho').value,
      height: document.getElementById('alto').value
    }
  };
  
  console.log('📤 Enviando datos:', datos);
  
  // Mostrar loading
  btnCotizar.disabled = true;
  btnCotizar.innerHTML = '⏳ Cotizando...';
  loading.style.display = 'block';
  resultados.style.display = 'none';
  
  try {
    const response = await fetch('/api/shipping/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });
    
    const result = await response.json();
    console.log('📥 Respuesta:', result);
    
    if (result.success && result.quotes) {
      mostrarResultados(result.quotes);
    } else {
      alert('Error: ' + (result.error || 'No se encontraron cotizaciones'));
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
    alert('Error de conexión. Inténtalo de nuevo.');
  } finally {
    btnCotizar.disabled = false;
    btnCotizar.innerHTML = '🚀 COTIZAR ENVÍO';
    loading.style.display = 'none';
  }
}

function mostrarResultados(quotes) {
  const resultados = document.getElementById('resultados');
  const lista = document.getElementById('listaResultados');
  
  let html = '';
  quotes.forEach(quote => {
    html += \`
      <div style="border: 4px solid #10b981; border-radius: 15px; padding: 20px; margin-bottom: 15px; background: #f0fff4;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-size: 20px; font-weight: bold; color: #047857;">
              \${quote.carrier} - \${quote.service}
            </div>
            <div style="font-size: 16px; color: #059669;">
              \${quote.deliveryTime}
            </div>
          </div>
          <div style="font-size: 28px; font-weight: bold; color: #047857;">
            $\${quote.price} \${quote.currency}
          </div>
        </div>
      </div>
    \`;
  });
  
  lista.innerHTML = html;
  resultados.style.display = 'block';
  
  // Scroll suave a resultados
  resultados.scrollIntoView({ behavior: 'smooth' });
}
</script>
        `
      }}
    />
  )
}
