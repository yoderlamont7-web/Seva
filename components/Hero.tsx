import Image from 'next/image'
import Link from 'next/link'
import { hero } from '@/lib/content'
import { site } from '@/lib/site'
import { IconTelegram, IconCheck } from './Icons'

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-brand-gradient-deep text-white">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-purple-light/20 blur-3xl" />

      <div className="container-content relative grid items-center gap-10 pt-14 pb-16 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        {/* Левая колонка — текст */}
        <div>
          <p className="eyebrow text-accent-light">{hero.kicker}</p>
          <h1 className="mt-4 max-w-2xl text-balance text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-6xl">
            {hero.titleBefore}
            <span className="text-accent">{hero.titleAccent}</span>
            {hero.titleAfter}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            {hero.subtitle}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link href="#lead" className="btn-accent">
              Рассчитать стоимость
              <span aria-hidden>→</span>
            </Link>
            <Link
              href={site.telegram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <IconTelegram className="h-5 w-5" />
              Telegram
            </Link>
          </div>

          <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-accent-light">
            <IconCheck className="h-4 w-4" />
            {hero.note}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-2.5">
            {hero.marketplaces.map((m) => (
              <span
                key={m}
                className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-semibold text-white/90"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {m}
              </span>
            ))}
          </div>
        </div>

        {/* Правая колонка — фото-карточка с плашкой */}
        <div className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/10 shadow-card sm:aspect-[5/5] lg:aspect-[4/5]">
            <Image
              src="/images/photo_2026-05-28_15-14-46.jpg"
              alt="Склад фулфилмента «Фулфилмент Sell»: паллеты и стеллажи с товаром для маркетплейсов"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover"
            />
          </div>

          {/* Белая плашка «2–3 дня — полный цикл» внахлёст */}
          <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl bg-white px-5 py-3.5 text-purple-deep shadow-card sm:left-6 lg:-left-6">
            <span className="font-heading text-3xl font-extrabold leading-none text-accent sm:text-4xl">
              {hero.badgeNumber}
            </span>
            <span className="max-w-[10rem] text-xs font-semibold leading-snug text-purple-deep/80 sm:text-sm">
              {hero.badgeCaption}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
