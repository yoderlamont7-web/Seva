import { steps } from '@/lib/content'

export default function HowWeWork() {
  return (
    <section id="how" className="bg-cloud py-16 sm:py-24">
      <div className="container-content">
        <p className="eyebrow">Как мы работаем</p>
        <h2 className="mt-3 max-w-3xl text-3xl font-extrabold text-purple-deep sm:text-4xl">
          5 шагов от заявки до полки маркетплейса
        </h2>

        <ol className="mt-10 grid gap-4 md:grid-cols-5">
          {steps.map((step, i) => (
            <li
              key={step.num}
              className="relative rounded-3xl border border-purple/10 bg-white p-6 shadow-card"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-gradient text-lg font-extrabold text-white shadow-accent">
                {step.num}
              </div>
              <h3 className="mt-4 text-base font-bold text-purple-deep">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-purple-deep/70">
                {step.text}
              </p>
              {i < steps.length - 1 && (
                <span className="absolute right-4 top-9 hidden text-accent/40 md:block">
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
