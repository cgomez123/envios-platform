# 🚚 ShipMaster Pro - Plataforma de Envíos Inteligente

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-14.0-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vercel-Ready-black?style=for-the-badge&logo=vercel" alt="Vercel Ready" />
</div>

## 🌟 Descripción

**ShipMaster Pro** es una plataforma completa de gestión de envíos que conecta múltiples paqueterías mexicanas e internacionales, permitiendo a empresas de todos los tamaños optimizar sus operaciones logísticas con una sola integración.

### 🎯 ¿Qué hace única a ShipMaster Pro?

- **🔗 Multi-carrier:** Integra múltiples paqueterías desde una sola API
- **💰 Comparación inteligente:** Encuentra siempre el mejor precio
- **📦 E-commerce ready:** Plugins nativos para Shopify, WooCommerce, Magento
- **📊 Analytics avanzados:** Dashboards con IA y métricas en tiempo real
- **🌍 Global:** Envíos nacionales e internacionales
- **⚡ Developer-friendly:** API RESTful completa + SDK JavaScript

---

## 🚀 Demo en Vivo

**🌐 Website:** [https://envios-platform.vercel.app](https://envios-platform.vercel.app)

### 📱 Prueba las funcionalidades:

| Funcionalidad | URL | Descripción |
|--------------|-----|-------------|
| 🏠 **Landing** | [`/`](https://envios-platform.vercel.app) | Cotizador + Tracking público |
| 💰 **Pricing** | [`/pricing`](https://envios-platform.vercel.app/pricing) | Planes y precios |
| 👨‍💻 **API Docs** | [`/developers`](https://envios-platform.vercel.app/developers) | Documentación completa |
| 📊 **Dashboard** | [`/dashboard`](https://envios-platform.vercel.app/dashboard) | Panel de usuario |
| ⚡ **Dashboard Pro** | [`/dashboard/advanced`](https://envios-platform.vercel.app/dashboard/advanced) | Métricas en tiempo real |
| 🛒 **Demo Shopify** | [`/demo/shopify-simulation`](https://envios-platform.vercel.app/demo/shopify-simulation) | Simulación completa |
| 🧪 **Test API** | [`/test-api`](https://envios-platform.vercel.app/test-api) | Probador de API en vivo |

---

## 🛠 Tecnologías

### Frontend
- **Next.js 14** con App Router
- **React 18** con TypeScript
- **Tailwind CSS** para styling
- **Framer Motion** para animaciones
- **Heroicons** para iconografía

### Backend  
- **Next.js API Routes**
- **Prisma ORM** (listo para PostgreSQL)
- **NextAuth.js** para autenticación
- **Stripe** para pagos

### Integraciones
- **Mienvío API v2.0** (multi-carrier)
- **Shopify Partners API**
- **SendGrid** (emails)
- **Twilio** (SMS)

### Deploy & DevOps
- **Vercel** (hosting + edge functions)
- **GitHub** (version control)
- **Vercel Postgres** (database)
- **Vercel Analytics** (métricas)

---

## ⚡ Quick Start

### 1. Desarrollo Local

```bash
# Clonar repositorio
git clone https://github.com/cgomez123/envios-platform.git
cd envios-platform

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales

# Iniciar desarrollo
npm run dev

# Abrir en navegador
http://localhost:3000
```

### 2. Testing

```bash
# Smoke test completo
node tests/smoke-test.js

# Build de producción
npm run build

# Preview local
npm run start
```

### 3. Deploy a Vercel

```bash
# Conectar con Vercel
vercel --prod

# O deploy automático via GitHub
git push origin main
```

---

## 📦 Funcionalidades Principales

### 🎯 Para Usuarios Finales

| Funcionalidad | Estado | Descripción |
|--------------|--------|-------------|
| 💰 **Cotizador** | ✅ | Compara precios de múltiples paqueterías |
| 🔍 **Tracking** | ✅ | Seguimiento en tiempo real con IA |
| 📄 **Etiquetas** | ✅ | Generación automática de etiquetas PDF |
| 📊 **Dashboard** | ✅ | Panel completo con analytics |
| 📈 **Reportes** | ✅ | Exportación Excel/PDF |
| 📦 **Envíos Masivos** | ✅ | Carga por CSV |
| 🔔 **Notificaciones** | ✅ | Email + SMS automáticos |

### 👨‍💻 Para Desarrolladores

| Funcionalidad | Estado | Descripción |
|--------------|--------|-------------|
| 🔌 **API RESTful** | ✅ | v1.0 completa y documentada |
| 🛒 **Plugin Shopify** | ✅ | Instalación en 1 clic |
| ⚡ **JavaScript SDK** | ✅ | Universal para cualquier web |
| 🔗 **Webhooks** | ✅ | Notificaciones en tiempo real |
| 📚 **Documentación** | ✅ | Interactiva con ejemplos |
| 🧪 **Sandbox** | ✅ | Testing seguro |

### 🏢 Para Empresas

| Funcionalidad | Estado | Descripción |
|--------------|--------|-------------|
| 🌍 **Multi-región** | ✅ | Nacional + Internacional |
| 📈 **Escalabilidad** | ✅ | Edge functions globales |
| 🔐 **Seguridad** | ✅ | API Keys + Auth completo |
| 📊 **BI Dashboard** | ✅ | Métricas avanzadas |
| 👥 **Multi-usuario** | ✅ | Equipos y roles |
| 🎨 **White-label** | 🔄 | Personalización completa |

---

## 🔗 Integraciones Disponibles

### 📦 Paqueterías (vía Mienvío)
- **DHL Express** 🌍
- **FedEx** 🚚  
- **UPS** 📦
- **Correos de México** 🇲🇽
- **Redpack** 🔴
- **Paquetexpress** 📮
- **99minutos** ⏰
- **Estafeta** 💌

### 🛒 E-commerce Platforms
- **Shopify** ✅ (Plugin nativo)
- **WooCommerce** ✅ (SDK)
- **Magento** ✅ (SDK)
- **PrestaShop** ✅ (SDK)
- **Tienda Nube** 🔄
- **Mercado Libre** 🔄
- **Amazon FBA** 🔄

---

## 📡 API Reference

### Base URL
```
Production: https://envios-platform.vercel.app/api/v1
Development: http://localhost:3000/api/v1
```

### Authentication
```bash
# Incluir en headers
X-API-Key: sk_live_1234567890abcdef
```

### Endpoints Principales

```javascript
// Obtener cotizaciones
POST /api/v1/quotes
{
  "from": { "city": "CDMX", "state": "CDMX", "zip": "01000" },
  "to": { "city": "Monterrey", "state": "NL", "zip": "64000" },
  "parcel": { "weight": 1.5, "length": 20, "width": 15, "height": 10 }
}

// Crear envío
POST /api/v1/shipments
{
  "quote_id": "qte_1234567890",
  "sender": { "name": "Juan", "email": "juan@empresa.com" },
  "recipient": { "name": "María", "phone": "+525512345678" }
}

// Tracking
GET /api/v1/tracking/{tracking_number}
```

---

## 🏆 Comparativa vs Competencia

| Característica | ShipMaster Pro | Envia.com | Mienvío.mx | WeShip.com | Skydropx.com |
|----------------|----------------|-----------|------------|------------|--------------|
| 🔗 **Multi-carrier** | ✅ 8+ carriers | ✅ | ✅ | ✅ | ✅ |
| 💰 **Pricing** | 🆓 → $299 | $399+ | $199+ | $299+ | $499+ |
| 🛒 **Shopify Plugin** | ✅ Nativo | ❌ | ✅ | ❌ | ✅ |
| 📊 **BI Dashboard** | ✅ IA + Real-time | ✅ Básico | ❌ | ✅ | ✅ Básico |
| 👨‍💻 **Developer API** | ✅ v1.0 + SDK | ✅ | ✅ | ✅ | ✅ |
| 📦 **Bulk Shipping** | ✅ CSV + UI | ✅ | ❌ | ✅ | ✅ |
| 🔔 **Notifications** | ✅ Email+SMS | ✅ Email | ✅ | ✅ | ✅ |
| 🌍 **Internacional** | ✅ | ✅ | ✅ | ❌ | ✅ |
| ⚡ **Performance** | ✅ Edge Functions | ✅ | ✅ | ✅ | ✅ |

### 🏅 Ventajas Competitivas
1. **🆓 Plan gratuito generoso** (100 envíos/mes)
2. **⚡ Next.js 14** - Performance superior
3. **🎨 UI/UX moderna** - Diseño 2024
4. **🤖 IA integrada** - Predicciones y optimizaciones
5. **🛠 Developer Experience** - SDK universal + docs interactivas
6. **🔄 Real-time everything** - Dashboards + notificaciones

---

## 📞 Soporte y Contacto

### 🌐 Recursos
- **📚 Documentación:** [/developers](https://envios-platform.vercel.app/developers)
- **🧪 Playground:** [/test-api](https://envios-platform.vercel.app/test-api)
- **🛒 Demo Shopify:** [/demo/shopify-simulation](https://envios-platform.vercel.app/demo/shopify-simulation)

### 📧 Contacto
- **Email:** hola@shipmaster.mx
- **API Support:** developers@shipmaster.mx
- **Sales:** sales@shipmaster.mx

### 🚀 Próximas Funcionalidades
- [ ] Integración Mercado Libre nativa
- [ ] App móvil (React Native)
- [ ] Integración Amazon FBA
- [ ] IA avanzada para optimización de rutas
- [ ] Marketplace de carriers independientes
- [ ] White-label completo

---

## 📜 Licencia

MIT License - Ve el archivo [LICENSE](LICENSE) para más detalles.

---

<div align="center">
  <p><strong>🏆 Desarrollado en 7 días intensivos</strong></p>
  <p>De 0 a plataforma empresarial completa</p>
  <br>
  <p>
    <a href="https://envios-platform.vercel.app">🌐 Demo en Vivo</a> • 
    <a href="/developers">📚 API Docs</a> • 
    <a href="/pricing">💰 Pricing</a> • 
    <a href="mailto:hola@shipmaster.mx">📧 Contacto</a>
  </p>
</div># FORCE VERCEL DEPLOY - Thu Sep  4 17:27:24 CST 2025
# FORCE VERCEL DEPLOY - jueves,  4 de septiembre de 2025, 17:30:13 CST
