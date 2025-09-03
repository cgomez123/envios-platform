const testimonials = [
  {
    content: "ShipMaster Pro redujo nuestros costos de envío en un 40%. La integración con Shopify fue súper fácil.",
    author: "María González",
    role: "CEO, TiendaOnline MX",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b776?w=64&h=64&fit=crop&crop=face"
  },
  {
    content: "La API es increíblemente fácil de usar. En 2 horas ya teníamos todo funcionando en nuestro sistema.",
    author: "Carlos Ruiz",
    role: "CTO, LogísticaPro",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face"
  },
  {
    content: "El dashboard es súper intuitivo. Ahora controlamos todos nuestros envíos desde un solo lugar.",
    author: "Ana Martínez",
    role: "Gerente Operaciones, FastDelivery",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face"
  }
]

export function Testimonials() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-lg text-gray-600">
            Más de 5,000 empresas confían en nuestra plataforma
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <p className="text-gray-700 mb-6 italic">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center space-x-3">
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={testimonial.avatar}
                  alt={testimonial.author}
                />
                <div>
                  <div className="font-medium text-gray-900">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
