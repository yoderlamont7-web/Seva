import Link from 'next/link'
import { site } from '@/lib/site'
import { IconTelegram, IconClock, IconPin } from './Icons'

export default function MapSection() {
  const routeUrl =
    'https://yandex.ru/maps/?rtext=~' + encodeURIComponent(site.address)

  return (
    <section id="location" className="bg-cloud py-16 sm:py-24">
      <div className="container-content">
        <p className="eyebrow">Контакты</p>
        <h2 className="mt-3 max-w-3xl text-3xl font-extrabold text-purple-deep sm:text-4xl">
          Как нас найти
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-purple-deep/70">
          Склад в Москве рядом с ключевыми логистическими маршрутами. Приезжайте
          или напишите — ответим в рабочее время {site.hours}.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Инфо-карточка */}
          <div className="flex flex-col gap-5 rounded-3xl border border-purple/10 bg-white p-7 shadow-card">
            <div className="flex gap-3">
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-accent-gradient text-white">
                <IconPin className="h-5 w-5" />
              </span>
              <div>
                <div className="text-sm font-semibold text-purple-deep/60">Адрес</div>
                <div className="font-bold text-purple-deep">{site.address}</div>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-accent-gradient text-white">
                <IconClock className="h-5 w-5" />
              </span>
              <div>
                <div className="text-sm font-semibold text-purple-deep/60">Часы работы</div>
                <div className="font-bold text-purple-deep">Ежедневно, {site.hours}</div>
              </div>
            </div>

            <div className="mt-1 flex flex-col gap-3">
              <Link
                href={routeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent"
              >
                Построить маршрут
                <span aria-hidden>→</span>
              </Link>
              <Link
                href={site.telegram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <IconTelegram className="h-5 w-5" />
                Написать в Telegram
              </Link>
            </div>
          </div>

          {/* Виджет Яндекс.Карт */}
          <div className="relative h-[320px] overflow-hidden rounded-3xl border border-purple/10 shadow-card sm:h-[400px] lg:h-auto lg:min-h-[420px]">
            <iframe
              src={site.yandexMapSrc}
              title={`Карта: ${site.address}`}
              className="absolute inset-0 h-full w-full"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
