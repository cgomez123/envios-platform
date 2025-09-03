# 🚀 ShipMaster Pro - Plataforma de Envíos

Una plataforma completa que integra múltiples paqueterías, permite comparar precios en tiempo real y gestionar envíos a través de API, plugins para e-commerce y dashboard web.

## ✨ Características Principales

- **🚛 Múltiples Paqueterías**: FedEx, DHL, UPS, Estafeta y más
- **💰 Comparación de Precios**: Encuentra la mejor tarifa al instante  
- **🔌 API Robusta**: Integración fácil con cualquier sistema
- **🛍️ Plugins E-commerce**: Shopify, WooCommerce, Magento
- **📊 Analytics**: Reportes avanzados y métricas de rendimiento
- **🌐 Global**: Envíos nacionales e internacionales

## 🛠️ Stack Tecnológico

- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Backend**: Next.js API Routes + Prisma ORM
- **Database**: PostgreSQL (Vercel Postgres)
- **Auth**: NextAuth.js
- **Payments**: Stripe
- **Deploy**: Vercel
- **UI**: Headless UI + Heroicons

## 🚀 Inicio Rápido

### Prerequisitos
- Node.js 18+
- npm o yarn
- Cuenta de Vercel
- Cuenta de GitHub

### Instalación

1. **Clona el repositorio**
\`\`\`bash
git clone https://github.com/tu-usuario/envios-platform.git
cd envios-platform
\`\`\`

2. **Instala dependencias**
\`\`\`bash
npm install
\`\`\`

3. **Configura variables de entorno**
\`\`\`bash
cp .env.example .env.local
# Edita .env.local con tus credenciales
\`\`\`

4. **Ejecuta en desarrollo**
\`\`\`bash
npm run dev
\`\`\`

5. **Abre tu navegador**
Ve a [http://localhost:3000](http://localhost:3000)

## 📁 Estructura del Proyecto

\`\`\`
envios-platform/
├── app/                    # Next.js 14 App Router
│   ├── api/               # API endpoints
│   ├── dashboard/         # Dashboard privado
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx          # Página de inicio
├── components/            # Componentes reutilizables
├── lib/                  # Utilidades y configuración
├── prisma/               # Schema de base de datos
└── public/               # Assets estáticos
\`\`\`

## 🔌 Integraciones Disponibles

### Paqueterías
- ✅ FedEx (API v2)
- ✅ DHL Express
- ✅ UPS Developer API
- ✅ Estafeta
- 🔄 Correos de México (próximamente)

### E-commerce
- ✅ Shopify App
- ✅ WooCommerce Plugin
- 🔄 Magento Extension (desarrollo)

## 📚 Documentación

- [Guía de Inicio](./docs/getting-started.md)
- [Documentación API](./docs/api.md)
- [Plugins E-commerce](./docs/plugins.md)
- [Deploy en Vercel](./docs/deployment.md)

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit tus cambios (\`git commit -m 'Add some AmazingFeature'\`)
4. Push al branch (\`git push origin feature/AmazingFeature\`)
5. Abre un Pull Request

## 📞 Soporte

¿Necesitas ayuda? Contáctanos:
- Email: support@shipmaster.pro
- Discord: [Únete a nuestra comunidad](https://discord.gg/shipmaster)
- Documentación: [docs.shipmaster.pro](https://docs.shipmaster.pro)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver [LICENSE](LICENSE) para detalles.

---

Hecho con ❤️ por el equipo de ShipMaster Pro
