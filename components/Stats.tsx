const stats = [
  { id: 1, name: 'Envíos Procesados', value: '2M+' },
  { id: 2, name: 'Empresas Activas', value: '5,000+' },
  { id: 3, name: 'Paqueterías Conectadas', value: '50+' },
  { id: 4, name: 'Ahorro Promedio', value: '35%' },
]

export function Stats() {
  return (
    <section className="py-16 bg-primary-600">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.id} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-primary-100 text-sm lg:text-base">
                {stat.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
