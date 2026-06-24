import { advantages } from '@/lib/content'
import { advantageIcons } from './Icons'

export default function Advantages() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-content grid gap-5 md:grid-cols-3">
        {advantages.map((a) => {
          const Icon = advantageIcons[a.icon as keyof typeof advantageIcons]
          return (
            <div
              key={a.title}
              className="group rounded-3xl border border-purple/10 bg-cloud p-7 shadow-card transition-transform hover:-translate-y-1"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-gradient text-white shadow-accent">
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-purple-deep">{a.title}</h3>
              <p className="mt-2.5 leading-relaxed text-purple-deep/70">{a.text}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
