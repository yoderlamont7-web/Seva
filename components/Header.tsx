'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { nav, site } from '@/lib/site'
import { IconClock } from './Icons'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-colors ${
        scrolled
          ? 'border-purple/10 bg-white/90 backdrop-blur-md'
          : 'border-transparent bg-white'
      }`}
    >
      <div className="container-content flex h-[72px] items-center justify-between gap-4">
        <Link href="#top" className="flex items-center gap-2" aria-label={site.name}>
          <Image
            src="/images/logo-transparent.svg"
            alt={site.name}
            width={150}
            height={40}
            priority
            className="h-9 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-purple-deep/80 transition-colors hover:text-purple"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <span className="flex items-center gap-1.5 text-sm font-semibold text-purple-deep/70">
            <IconClock className="h-4 w-4 text-accent" />
            {site.hours}
          </span>
          <Link href="#lead" className="btn-accent px-5 py-2.5 text-sm">
            Оставить заявку
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-purple lg:hidden"
          aria-label="Меню"
          aria-expanded={open}
        >
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 top-0 h-0.5 w-6 bg-current transition-transform ${
                open ? 'translate-y-[7px] rotate-45' : ''
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] h-0.5 w-6 bg-current transition-opacity ${
                open ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] h-0.5 w-6 bg-current transition-transform ${
                open ? '-translate-y-[7px] -rotate-45' : ''
              }`}
            />
          </span>
        </button>
      </div>

      {open && (
        <div className="border-t border-purple/10 bg-white lg:hidden">
          <nav className="container-content flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-base font-semibold text-purple-deep/80 hover:bg-cloud"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex items-center gap-1.5 px-2 text-sm font-semibold text-purple-deep/70">
              <IconClock className="h-4 w-4 text-accent" />
              Работаем {site.hours}
            </div>
            <Link
              href="#lead"
              onClick={() => setOpen(false)}
              className="btn-accent mt-3"
            >
              Оставить заявку
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
