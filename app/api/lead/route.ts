import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { marketplaceOptions } from '@/lib/content'

export const runtime = 'nodejs'

// ── Простой in-memory rate limit (защита от частых повторов) ──
// Для продакшена за несколькими инстансами замените на Redis/Upstash.
const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const arr = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS)
  arr.push(now)
  hits.set(ip, arr)
  return arr.length > MAX_PER_WINDOW
}

function marketplaceLabel(value: string): string {
  return marketplaceOptions.find((o) => o.value === value)?.label || 'не указан'
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

async function sendTelegram(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) {
    throw new Error('Telegram не настроен (TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID)')
  }
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`Telegram API ${res.status}: ${body}`)
  }
}

async function sendEmail(subject: string, html: string): Promise<void> {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_TO } = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !MAIL_TO) {
    throw new Error('SMTP не настроен')
  }
  const port = Number(SMTP_PORT) || 465
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })
  await transporter.sendMail({
    from: `"Заявка с сайта" <${SMTP_USER}>`,
    to: MAIL_TO,
    subject,
    html,
  })
}

export async function POST(req: Request) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: 'Слишком много заявок подряд. Попробуйте через минуту.' },
      { status: 429 }
    )
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Некорректный запрос' }, { status: 400 })
  }

  // Honeypot: если заполнено скрытое поле — это бот.
  if (typeof body.company === 'string' && body.company.trim() !== '') {
    return NextResponse.json({ ok: true }) // тихо «принимаем»
  }

  const name = String(body.name || '').trim().slice(0, 120)
  const phone = String(body.phone || '').trim().slice(0, 40)
  const marketplace = String(body.marketplace || '').trim()
  const message = String(body.message || '').trim().slice(0, 2000)

  if (name.length < 2) {
    return NextResponse.json({ error: 'Укажите имя' }, { status: 400 })
  }
  if (phone.replace(/\D/g, '').length < 10) {
    return NextResponse.json({ error: 'Укажите корректный телефон' }, { status: 400 })
  }

  const mpLabel = marketplaceLabel(marketplace)
  const time = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })

  const tgText =
    `🟣 <b>Новая заявка — Фулфилмент Sell</b>\n\n` +
    `👤 <b>Имя:</b> ${escapeHtml(name)}\n` +
    `📞 <b>Телефон:</b> ${escapeHtml(phone)}\n` +
    `🛒 <b>Маркетплейс:</b> ${escapeHtml(mpLabel)}\n` +
    (message ? `📝 <b>Задача:</b> ${escapeHtml(message)}\n` : '') +
    `\n🕒 ${escapeHtml(time)} (МСК)`

  const emailHtml =
    `<h2>Новая заявка с сайта «Фулфилмент Sell»</h2>` +
    `<p><b>Имя:</b> ${escapeHtml(name)}</p>` +
    `<p><b>Телефон:</b> ${escapeHtml(phone)}</p>` +
    `<p><b>Маркетплейс:</b> ${escapeHtml(mpLabel)}</p>` +
    (message ? `<p><b>Задача и объём:</b><br>${escapeHtml(message)}</p>` : '') +
    `<p style="color:#888">${escapeHtml(time)} (МСК), IP: ${escapeHtml(ip)}</p>`

  // Telegram — основной канал; email — дубль. Шлём параллельно.
  const results = await Promise.allSettled([
    sendTelegram(tgText),
    sendEmail('Новая заявка — Фулфилмент Sell', emailHtml),
  ])

  const telegramOk = results[0].status === 'fulfilled'
  const emailOk = results[1].status === 'fulfilled'

  results.forEach((r, i) => {
    if (r.status === 'rejected') {
      console.error(i === 0 ? '[lead] Telegram error:' : '[lead] Email error:', r.reason)
    }
  })

  // Считаем заявку принятой, если сработал хотя бы один канал.
  if (!telegramOk && !emailOk) {
    return NextResponse.json(
      { error: 'Не удалось отправить заявку. Напишите нам в Telegram.' },
      { status: 502 }
    )
  }

  return NextResponse.json({ ok: true, telegramOk, emailOk })
}
