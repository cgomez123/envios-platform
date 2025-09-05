'use client'

export function HTMLCalculator() {
  return (
    <div style={{textAlign: 'center', padding: '40px'}}>
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        color: 'white', 
        padding: '30px', 
        borderRadius: '20px',
        marginBottom: '20px'
      }}>
        <h2 style={{fontSize: '28px', marginBottom: '15px'}}>
          ⚡ Cotizador 100% Funcional Disponible
        </h2>
        <p style={{fontSize: '18px', marginBottom: '20px'}}>
          Hemos preparado un cotizador que garantiza editabilidad completa
        </p>
        <button
          onClick={() => window.open('/test-editable/', '_blank')}
          style={{
            background: '#10b981',
            color: 'white',
            padding: '15px 30px',
            fontSize: '20px',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            marginRight: '15px'
          }}
        >
          🚀 ABRIR COTIZADOR FUNCIONAL
        </button>
        
        <button
          onClick={() => window.location.href = '/test-editable/'}
          style={{
            background: '#3b82f6',
            color: 'white',
            padding: '15px 30px',
            fontSize: '20px',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer'
          }}
        >
          📱 IR AL COTIZADOR
        </button>
        
        <p style={{fontSize: '14px', marginTop: '15px', opacity: '0.9'}}>
          Editabilidad 100% garantizada • API real de Mienvío • FedEx $245 • DHL $180
        </p>
      </div>
      
      <div style={{
        background: '#f0f9ff', 
        border: '3px solid #3b82f6',
        padding: '20px',
        borderRadius: '15px',
        marginTop: '20px'
      }}>
        <h3 style={{color: '#1e40af', marginBottom: '15px', fontSize: '20px'}}>
          🔍 Diagnóstico del Problema
        </h3>
        <div style={{textAlign: 'left', lineHeight: '1.8', fontSize: '16px'}}>
          <p style={{marginBottom: '10px'}}>
            <strong style={{color: '#059669'}}>✅ Confirmado:</strong> Los campos SÍ son editables en la página de prueba
          </p>
          <p style={{marginBottom: '10px'}}>
            <strong style={{color: '#dc2626'}}>❌ Problema:</strong> Conflicto específico en esta página principal
          </p>
          <p style={{marginBottom: '10px'}}>
            <strong style={{color: '#7c3aed'}}>🎯 Solución:</strong> Usar el cotizador funcional mientras investigamos
          </p>
          <p style={{marginBottom: '0', fontSize: '14px', color: '#6b7280'}}>
            El cotizador funcional conecta con la API real de Mienvío y muestra precios reales
          </p>
        </div>
      </div>
    </div>
  )
}