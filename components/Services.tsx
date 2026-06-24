import { services } from '@/lib/content'

export default function Services() {
  return (
    <section id="services" className="bg-cloud py-16 sm:py-24">
      <div className="container-content">
        <p className="eyebrow">Услуги</p>
        <h2 className="mt-3 max-w-3xl text-3xl font-extrabold text-purple-deep sm:text-4xl">
          Полный цикл подготовки товара к продаже
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-purple-deep/70">
          Закрываем все операции — от забора у поставщика до отгрузки на склад
          маркетплейса. Берёте отдельную услугу или весь цикл «под ключ».
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div
              key={s.num}
              className="flex flex-col rounded-3xl border border-purple/10 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:border-accent/40"
            >
              <span className="text-2xl font-extrabold text-accent">{s.num}</span>
              <h3 className="mt-3 text-lg font-bold leading-snug text-purple-deep">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-purple-deep/70">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
