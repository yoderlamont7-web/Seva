export const site = {
  name: 'Фулфилмент Sell',
  shortName: 'Фулфилмент Sell',
  title: 'Фулфилмент Sell — фулфилмент для маркетплейсов в Москве',
  description:
    'Фулфилмент для маркетплейсов в Москве: приёмка, маркировка, упаковка, хранение и отгрузка на склады Wildberries, Ozon и Яндекс Маркет. Полный цикл за 2–3 дня. Прозрачная цена.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://fulfillment-sell.ru',
  hours: '10:00–20:00',
  address: 'Москва, ул. Деловая, 11с12',
  telegram: {
    handle: '@fulffmsk',
    url: 'https://t.me/fulffmsk',
  },
  vk: 'https://vk.com/club232898007',
  // Email только для отображения в UI. Реальный приём заявок — через env (MAIL_TO).
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'zayavki@fulfillment-sell.ru',
}

export const nav = [
  { label: 'Услуги', href: '#services' },
  { label: 'Для кого', href: '#for-whom' },
  { label: 'Как работаем', href: '#how' },
  { label: 'FAQ', href: '#faq' },
]
