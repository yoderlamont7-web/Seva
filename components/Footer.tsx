import Image from 'next/image'
import Link from 'next/link'
import { nav, site } from '@/lib/site'
import { IconTelegram } from './Icons'

export default function Footer() {
  return (
    <footer className="bg-purple-deep text-white/80">
      <div className="container-content grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Image
            src="/images/logo-full.svg"
            alt={site.name}
            width={200}
            height={64}
            className="h-16 w-auto"
          />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            Фулфилмент для маркетплейсов в Москве: приёмка, маркировка, упаковка,
            хранение и отгрузка на Wildberries, Ozon и Яндекс Маркет.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-white">
            Навигация
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-accent-light">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="#lead" className="transition-colors hover:text-accent-light">
                Оставить заявку
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-white">
            Контакты
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link
                href={site.telegram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-accent-light"
              >
                <IconTelegram className="h-4 w-4" />
                Telegram {site.telegram.handle}
              </Link>
            </li>
            <li>
              <Link
                href={site.vk}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-accent-light"
              >
                ВКонтакте
              </Link>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-accent-light">
                {site.email}
              </a>
            </li>
            <li className="text-white/60">{site.address}</li>
            <li className="text-white/60">Работаем {site.hours}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-content flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. Все права защищены.</p>
          <p>Фулфилмент в Москве · {site.hours}</p>
        </div>
      </div>
    </footer>
  )
}
