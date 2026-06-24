import Image from 'next/image'
import { gallery } from '@/lib/content'

export default function Gallery() {
  return (
    <section id="gallery" className="bg-white py-16 sm:py-24">
      <div className="container-content">
        <p className="eyebrow">Галерея</p>
        <h2 className="mt-3 max-w-3xl text-3xl font-extrabold text-purple-deep sm:text-4xl">
          Наш склад и процессы
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-purple-deep/70">
          Реальные фото приёмки, упаковки, хранения и отгрузки товара.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {gallery.map((img, i) => (
            <div
              key={img.src}
              className={`relative overflow-hidden rounded-2xl border border-purple/10 ${
                i === 0 ? 'col-span-2 aspect-[16/10] lg:col-span-2 lg:row-span-2 lg:aspect-auto' : 'aspect-square'
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                loading="lazy"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
