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

      <div className="container-content relative pt-14 pb-10 sm:pt-20">
        <p className="eyebrow text-accent-light">{hero.kicker}</p>
        <h1 className="mt-4 max-w-4xl text-balance text-3xl font-extrabold leading-[1.1] sm:text-4xl md:text-5xl lg:text-6xl">
          {hero.titleBefore}
          <span className="text-accent">{hero.titleAccent}</span>
          {hero.titleAfter}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
          {hero.subtitle}
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link href="#lead" className="btn-accent">
            Рассчитать стоимость
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
              className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-semibold text-white/90"
            >
              {m}
            </span>
          ))}
        </div>

        {/* Крупное фото склада во всю ширину */}
        <div className="relative mt-10 aspect-[16/10] w-full overflow-hidden rounded-3xl border border-white/10 shadow-card sm:aspect-[16/8] md:aspect-[16/6.5]">
          <Image
            src="/images/hero-warehouse.svg"
            alt="Склад фулфилмента «Фулфилмент Sell»: загрузка и отгрузка товара на маркетплейсы"
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
          />
          <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-accent-gradient px-4 py-2 text-sm font-bold text-white shadow-accent sm:bottom-6 sm:left-6">
            <IconCheck className="h-4 w-4" />
            {hero.badge}
          </div>
        </div>
      </div>
    </section>
  )
}
