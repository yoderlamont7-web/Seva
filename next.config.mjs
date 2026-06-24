/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/webp'],
    // Брендовые SVG-плейсхолдеры лежат в /public/images.
    // Когда замените их на реальные JPG/PNG-фото — можно убрать dangerouslyAllowSVG.
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
}

export default nextConfig
