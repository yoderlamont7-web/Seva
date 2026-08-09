/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Отдаём картинки напрямую из /public, без серверной оптимизации.
    // На этом хостинге нет sharp (нативный модуль несовместим), а фото уже
    // подготовлены в webp — оптимизатор не нужен и только ломал запуск.
    unoptimized: true,
    formats: ['image/webp'],
    // Брендовые SVG-плейсхолдеры лежат в /public/images.
    // Когда замените их на реальные JPG/PNG-фото — можно убрать dangerouslyAllowSVG.
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
}

export default nextConfig
