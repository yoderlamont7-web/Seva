import { trust } from '@/lib/content'

export default function Trust() {
  return (
    <section className="relative overflow-hidden bg-brand-gradient-deep py-16 text-white sm:py-24">
      <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
      <div className="container-content relative">
        <p className="eyebrow text-accent-light">Доверие</p>
        <h2 className="mt-3 max-w-3xl text-3xl font-extrabold sm:text-4xl">
          {trust.title}
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-white/75">{trust.subtitle}</p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {trust.clients.map((c) => (
            <div
              key={c.tag}
              className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm"
            >
              <span className="inline-block rounded-full bg-accent-gradient px-3.5 py-1 text-xs font-bold uppercase tracking-wide text-white">
                {c.tag}
              </span>
              <p className="mt-4 text-lg leading-relaxed text-white/85">{c.text}</p>
            </div>
          ))}
        </div>

        <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-white/10 pt-10 lg:grid-cols-4">
          {trust.stats.map((s) => (
            <div key={s.label}>
              <dt className="text-3xl font-extrabold text-accent-light sm:text-4xl">
                {s.value}
                <span className="text-xl font-bold text-white/90">{s.suffix}</span>
              </dt>
              <dd className="mt-1 text-sm text-white/70">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
