# Фулфилмент Sell — лендинг

Одностраничный лендинг фулфилмент-компании «Фулфилмент Sell» (lead-gen).
Главное действие — форма **«Рассчитать стоимость»**. Заявки уходят в **Telegram**
(основной канал) и дублируются на **email**.

**Стек:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · nodemailer.

---

## Быстрый старт

```bash
npm install
cp .env.example .env.local   # заполните переменные (см. ниже)
npm run dev                  # http://localhost:3000
```

Сборка и продакшен-запуск:

```bash
npm run build
npm run start
```

---

## Переменные окружения

Скопируйте `.env.example` в `.env.local` и заполните:

| Переменная            | Назначение                                                        |
| --------------------- | ----------------------------------------------------------------- |
| `TELEGRAM_BOT_TOKEN`  | Токен бота от @BotFather                                           |
| `TELEGRAM_CHAT_ID`    | ID чата/группы, куда падают заявки                                 |
| `SMTP_HOST`           | SMTP-сервер (по умолчанию `smtp.yandex.ru`)                       |
| `SMTP_PORT`           | Порт SMTP (`465` — SSL)                                            |
| `SMTP_USER`           | Логин/адрес ящика отправителя                                     |
| `SMTP_PASS`           | **Пароль приложения** (не основной пароль!)                       |
| `MAIL_TO`             | Адрес получателя заявок                                            |
| `NEXT_PUBLIC_SITE_URL`| Публичный адрес сайта (для sitemap / Open Graph), без слэша в конце|

> Заявка считается принятой, если сработал **хотя бы один** канал (Telegram или email).
> Логи ошибок каждого канала пишутся в консоль сервера.

### Как создать Telegram-бота и получить `TELEGRAM_CHAT_ID`

1. В Telegram откройте **@BotFather** → `/newbot` → задайте имя → получите **токен**
   (`TELEGRAM_BOT_TOKEN`).
2. Куда слать заявки:
   - **Личные сообщения:** напишите своему боту любое сообщение, затем откройте
     `https://api.telegram.org/bot<ТОКЕН>/getUpdates` — в ответе найдите
     `chat.id` (положительное число).
   - **Группа:** добавьте бота в группу, напишите там сообщение, откройте тот же
     `getUpdates` — `chat.id` группы будет **отрицательным** (например, `-100...`).
3. Подставьте найденный id в `TELEGRAM_CHAT_ID`.

> Альтернатива: напишите боту **@getidsbot** или **@userinfobot**, чтобы быстро
> узнать chat_id.

### SMTP для России (Яндекс)

1. Заведите ящик на Яндексе (рекомендуется отдельный, напр. `zayavki@вашдомен`).
2. Включите доступ по протоколу IMAP/SMTP и создайте **пароль приложения**
   в настройках безопасности Яндекс ID.
3. `SMTP_HOST=smtp.yandex.ru`, `SMTP_PORT=465`, `SMTP_USER` — полный адрес,
   `SMTP_PASS` — пароль приложения.

Для Mail.ru: `SMTP_HOST=smtp.mail.ru`, `SMTP_PORT=465`, тоже пароль приложения.

---

## Брендовые ассеты (логотипы и фото)

Сейчас в `public/images/` и `public/og/` лежат **SVG-плейсхолдеры** с правильными
именами — сайт собирается и работает на них. Замените их реальными файлами,
сохранив имена (или поправьте пути в коде):

| Файл                              | Где используется               |
| --------------------------------- | ------------------------------ |
| `public/images/logo-transparent.svg` | Логотип в шапке (на светлом фоне) |
| `public/images/logo-full.svg`        | Полный логотип в футере           |
| `public/images/hero-warehouse.svg`   | Крупное фото склада в Hero        |
| `public/images/gallery-1…6.svg`      | Сетка фото в галерее              |
| `public/og/og-image.svg`             | Open Graph превью (1200×630)      |
| `app/icon.svg`                       | Favicon                           |

> Реальные фото лучше класть в формате **WebP/JPG**. После замены на растровые
> форматы можно убрать `dangerouslyAllowSVG` из `next.config.mjs`. Если меняете
> расширения (`.svg` → `.webp`), обновите пути в `lib/content.ts`, `components/Hero.tsx`,
> `components/Header.tsx`, `components/Footer.tsx` и `app/layout.tsx`.

---

## Структура

```
app/
  layout.tsx        # шрифты (Unbounded + Manrope, кириллица), SEO-метаданные, OG
  page.tsx          # сборка секций + JSON-LD (Organization + FAQPage)
  globals.css       # Tailwind + утилиты (.btn, .input, .eyebrow)
  api/lead/route.ts # приём заявки: Telegram + email, honeypot, rate-limit
  robots.ts         # robots.txt
  sitemap.ts        # sitemap.xml
  icon.svg          # favicon
components/         # Header, Hero, Advantages, Services, ForWhom, Trust,
                   # HowWeWork, Gallery, Faq, LeadForm, Footer, Icons
lib/
  site.ts           # контакты, навигация, домен
  content.ts        # все тексты секций
public/images, public/og  # ассеты
```

Тексты и контент вынесены в `lib/content.ts` и `lib/site.ts` — правьте там.

---

## Форма и защита от спама

- Поля: Имя, Телефон, Маркетплейс (select), Кратко о задаче и объёме, чекбокс
  согласия (152-ФЗ).
- **Honeypot** — скрытое поле `company`: если заполнено, заявка тихо отбрасывается.
- **Rate-limit** — не более 5 заявок в минуту с одного IP (in-memory; для
  нескольких инстансов замените на Redis/Upstash).
- Состояния формы: загрузка → успех / ошибка, с клиентской и серверной валидацией.

---

## Деплой

### Vercel (рекомендуется)

1. Залейте репозиторий на GitHub.
2. На [vercel.com](https://vercel.com) → **Add New → Project** → импортируйте репозиторий.
3. В **Settings → Environment Variables** добавьте все переменные из `.env.example`.
4. Deploy. Vercel сам определит Next.js.

### Netlify

1. **Add new site → Import an existing project**.
2. Build command: `npm run build`, при необходимости поставьте плагин
   `@netlify/plugin-nextjs`.
3. Добавьте переменные окружения в **Site settings → Environment variables**.

### Подключение домена

- **Vercel:** Project → **Settings → Domains** → добавьте домен и пропишите у
  регистратора указанные A/CNAME-записи (или делегируйте NS).
- **Netlify:** **Domain management → Add domain** → настройте DNS по инструкции.
- После подключения домена обновите `NEXT_PUBLIC_SITE_URL` в переменных окружения
  (на нём строятся `sitemap.xml` и Open Graph).

---

## Контакты компании

- Telegram: [@fulffmsk](https://t.me/fulffmsk)
- ВКонтакте: <https://vk.com/club232898007>
- Адрес: Москва, ул. Деловая, 11с12 · Часы работы: 10:00–20:00
