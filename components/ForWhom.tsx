import { forWhom } from '@/lib/content'
import { IconCheck } from './Icons'

export default function ForWhom() {
  return (
    <section id="for-whom" className="bg-white py-16 sm:py-24">
      <div className="container-content">
        <p className="eyebrow">{forWhom.title}</p>
        <h2 className="mt-3 max-w-3xl text-3xl font-extrabold text-purple-deep sm:text-4xl">
          Кому подходит фулфилмент Sell
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-purple-deep/70">{forWhom.subtitle}</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {forWhom.items.map((item) => (
            <div
              key={item.title}
              className="flex gap-4 rounded-3xl border border-purple/10 bg-cloud p-6"
            >
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-accent-gradient text-white">
                <IconCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-purple-deep">{item.title}</h3>
                <p className="mt-1.5 leading-relaxed text-purple-deep/70">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
