'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { marketplaceOptions } from '@/lib/content'
import { site } from '@/lib/site'
import { IconTelegram, IconClock, IconCheck } from './Icons'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function LeadForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string>('')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    // Простая клиентская валидация
    const name = String(data.get('name') || '').trim()
    const phone = String(data.get('phone') || '').trim()
    const consent = data.get('consent')

    if (name.length < 2) return setError('Укажите имя'), setStatus('error')
    if (phone.replace(/\D/g, '').length < 10)
      return setError('Укажите корректный телефон'), setStatus('error')
    if (!consent)
      return setError('Нужно согласие на обработку данных'), setStatus('error')

    setStatus('loading')
    setError('')

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          marketplace: String(data.get('marketplace') || ''),
          message: String(data.get('message') || ''),
          // honeypot
          company: String(data.get('company') || ''),
        }),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        throw new Error(j.error || 'Не удалось отправить заявку')
      }
      setStatus('success')
      form.reset()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка отправки')
      setStatus('error')
    }
  }

  return (
    <section id="lead" className="relative overflow-hidden bg-brand-gradient-deep py-16 text-white sm:py-24">
      <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
      <div className="container-content relative grid gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <p className="eyebrow text-accent-light">Заявка</p>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            Рассчитать стоимость фулфилмента
          </h2>
          <p className="mt-4 max-w-md text-lg text-white/75">
            Оставьте заявку — рассчитаем стоимость под ваш товар, объём и
            маркетплейс. Свяжемся в рабочее время {site.hours}.
          </p>

          <div className="mt-8 space-y-3 text-white/85">
            <Link
              href={site.telegram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 transition-colors hover:text-accent-light"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <IconTelegram className="h-5 w-5" />
              </span>
              Telegram {site.telegram.handle}
            </Link>
            <Link
              href={site.vk}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 transition-colors hover:text-accent-light"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-sm font-bold">
                VK
              </span>
              Сообщество ВКонтакте
            </Link>
            <p className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <IconClock className="h-5 w-5" />
              </span>
              {site.address} · {site.hours}
            </p>
          </div>

          <Link
            href={site.telegram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent mt-8"
          >
            <IconTelegram className="h-5 w-5" />
            Написать в Telegram
          </Link>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white p-6 text-purple-deep shadow-card sm:p-8">
          {status === 'success' ? (
            <div className="flex flex-col items-center py-10 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-gradient text-white shadow-accent">
                <IconCheck className="h-8 w-8" />
              </div>
              <h3 className="mt-5 text-xl font-bold">Заявка принята</h3>
              <p className="mt-2 text-purple-deep/70">
                Свяжемся в рабочее время {site.hours}.
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="btn-outline mt-6"
              >
                Отправить ещё одну
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4" noValidate>
              {/* Honeypot — скрытое поле против ботов */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
                aria-hidden="true"
              />

              <Field label="Имя" htmlFor="name">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Как к вам обращаться"
                  className="input"
                />
              </Field>

              <Field label="Телефон" htmlFor="phone">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="+7 (___) ___-__-__"
                  className="input"
                />
              </Field>

              <Field label="Маркетплейс" htmlFor="marketplace">
                <select id="marketplace" name="marketplace" className="input" defaultValue="">
                  <option value="" disabled>
                    Выберите площадку
                  </option>
                  {marketplaceOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Кратко о задаче и объёме" htmlFor="message">
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  placeholder="Например: 500 ед. одежды в неделю, нужна упаковка и маркировка для WB"
                  className="input resize-none"
                />
              </Field>

              <label className="flex cursor-pointer items-start gap-2.5 text-sm text-purple-deep/70">
                <input
                  type="checkbox"
                  name="consent"
                  required
                  className="mt-0.5 h-4 w-4 flex-none accent-accent"
                />
                <span>
                  Согласен на обработку персональных данных (152-ФЗ)
                </span>
              </label>

              {status === 'error' && error && (
                <p className="rounded-xl bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-accent w-full disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === 'loading' ? 'Отправляем…' : 'Рассчитать стоимость'}
              </button>

              <p className="text-center text-xs text-purple-deep/50">
                Заявка уходит напрямую к нам в Telegram и на email.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-purple-deep">
        {label}
      </label>
      {children}
    </div>
  )
}
