#!/usr/bin/env node

/**
 * 🚨 SMOKE TEST - Verificación de funcionalidades críticas
 * Ejecuta: node tests/smoke-test.js
 */

const BASE_URL = 'http://localhost:3000';

// Colores para output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

// Tests a ejecutar
const tests = [
  {
    name: '🏠 Página Principal',
    url: '/',
    shouldContain: ['ShipMaster Pro', 'Cotizar Envío', 'Rastrear Paquete']
  },
  {
    name: '💰 Pricing',
    url: '/pricing',
    shouldContain: ['Starter', 'Professional', 'Enterprise']
  },
  {
    name: '👨‍💻 Developers',
    url: '/developers',
    shouldContain: ['API para Desarrolladores', 'Quick Start', 'sk_demo']
  },
  {
    name: '📊 Dashboard',
    url: '/dashboard',
    shouldContain: ['Bienvenido, Carlos', 'Nuevo Envío', 'Dashboard Pro']
  },
  {
    name: '⚡ Dashboard Avanzado',
    url: '/dashboard/advanced',
    shouldContain: ['Dashboard Avanzado', 'Métricas en tiempo real', 'Alertas Activas']
  },
  {
    name: '📦 Nuevo Envío',
    url: '/dashboard/new-shipment',
    shouldContain: ['Crear Nuevo Envío', 'Información del Remitente']
  },
  {
    name: '🚀 Tracking Avanzado',
    url: '/dashboard/tracking-advanced',
    shouldContain: ['Tracking Inteligente', 'IA predictiva']
  },
  {
    name: '📋 Envíos Masivos',
    url: '/dashboard/bulk-shipments',
    shouldContain: ['Envíos Masivos', 'Plantilla CSV', 'Arrastrar archivo']
  },
  {
    name: '🔔 Notificaciones',
    url: '/dashboard/notifications',
    shouldContain: ['Centro de Notificaciones', 'Configurar alertas']
  },
  {
    name: '⚙️ Configuración',
    url: '/dashboard/settings',
    shouldContain: ['Configuración', 'API Keys', 'Integración Mienvío']
  }
];

// Test API endpoints
const apiTests = [
  {
    name: '📡 API Health Check',
    endpoint: '/api/health',
    method: 'GET'
  },
  {
    name: '💰 API Quotes (Demo)',
    endpoint: '/api/shipping/quote',
    method: 'POST',
    body: {
      from: 'Ciudad de México, CDMX',
      to: 'Monterrey, Nuevo León',
      weight: 1,
      dimensions: { length: 10, width: 10, height: 10 }
    },
    headers: { 'X-Demo-Mode': 'true' }
  }
];

let passedTests = 0;
let totalTests = 0;

async function runTest(test) {
  totalTests++;
  try {
    console.log(`${colors.blue}🧪 Testing: ${test.name}${colors.reset}`);
    
    const response = await fetch(`${BASE_URL}${test.url}`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} - ${response.statusText}`);
    }
    
    const html = await response.text();
    
    // Verificar contenido requerido
    for (const content of test.shouldContain) {
      if (!html.includes(content)) {
        throw new Error(`Contenido faltante: "${content}"`);
      }
    }
    
    console.log(`${colors.green}✅ PASS: ${test.name}${colors.reset}`);
    passedTests++;
    
  } catch (error) {
    console.log(`${colors.red}❌ FAIL: ${test.name}${colors.reset}`);
    console.log(`${colors.red}   Error: ${error.message}${colors.reset}`);
  }
}

async function runApiTest(test) {
  totalTests++;
  try {
    console.log(`${colors.blue}🔌 API Testing: ${test.name}${colors.reset}`);
    
    const options = {
      method: test.method,
      headers: {
        'Content-Type': 'application/json',
        ...(test.headers || {})
      }
    };
    
    if (test.body) {
      options.body = JSON.stringify(test.body);
    }
    
    const response = await fetch(`${BASE_URL}${test.endpoint}`, options);
    
    if (!response.ok && response.status !== 404) {
      throw new Error(`HTTP ${response.status} - ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`${colors.green}✅ API PASS: ${test.name}${colors.reset}`);
    passedTests++;
    
  } catch (error) {
    console.log(`${colors.red}❌ API FAIL: ${test.name}${colors.reset}`);
    console.log(`${colors.red}   Error: ${error.message}${colors.reset}`);
  }
}

async function main() {
  console.log(`${colors.bold}${colors.blue}`);
  console.log('🚀 SHIPMASTER PRO - SMOKE TESTING');
  console.log('==================================');
  console.log(`${colors.reset}`);
  
  // Test páginas
  console.log(`${colors.yellow}📄 Testing Páginas Web...${colors.reset}`);
  for (const test of tests) {
    await runTest(test);
  }
  
  console.log('');
  
  // Test APIs
  console.log(`${colors.yellow}🔌 Testing API Endpoints...${colors.reset}`);
  for (const test of apiTests) {
    await runApiTest(test);
  }
  
  console.log('');
  console.log(`${colors.bold}📊 RESULTADOS:${colors.reset}`);
  console.log(`${colors.green}✅ Passed: ${passedTests}${colors.reset}`);
  console.log(`${colors.red}❌ Failed: ${totalTests - passedTests}${colors.reset}`);
  console.log(`${colors.blue}📈 Success Rate: ${Math.round((passedTests/totalTests) * 100)}%${colors.reset}`);
  
  if (passedTests === totalTests) {
    console.log(`${colors.green}${colors.bold}🎉 ¡TODOS LOS TESTS PASARON!${colors.reset}`);
    console.log(`${colors.green}🚀 La aplicación está lista para lanzamiento${colors.reset}`);
  } else {
    console.log(`${colors.red}🚨 Hay ${totalTests - passedTests} tests fallando${colors.reset}`);
    console.log(`${colors.yellow}🔧 Revisa los errores antes de continuar${colors.reset}`);
  }
}

// Verificar que el servidor esté corriendo
fetch(`${BASE_URL}/`)
  .then(() => {
    console.log(`${colors.green}✅ Servidor detectado en ${BASE_URL}${colors.reset}`);
    main();
  })
  .catch(() => {
    console.log(`${colors.red}❌ Servidor no disponible en ${BASE_URL}${colors.reset}`);
    console.log(`${colors.yellow}💡 Ejecuta: npm run dev${colors.reset}`);
    process.exit(1);
  });
