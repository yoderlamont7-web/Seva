import { faq } from '@/lib/content'

export default function Faq() {
  return (
    <section id="faq" className="bg-cloud py-16 sm:py-24">
      <div className="container-content max-w-3xl">
        <p className="eyebrow">FAQ</p>
        <h2 className="mt-3 text-3xl font-extrabold text-purple-deep sm:text-4xl">
          Частые вопросы
        </h2>

        <div className="mt-10 space-y-3">
          {faq.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-purple/10 bg-white p-5 shadow-card [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-bold text-purple-deep">
                {item.q}
                <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-cloud text-accent transition-transform group-open:rotate-45">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-purple-deep/70">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
