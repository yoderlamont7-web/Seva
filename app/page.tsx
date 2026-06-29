import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Advantages from '@/components/Advantages'
import Services from '@/components/Services'
import ForWhom from '@/components/ForWhom'
import Trust from '@/components/Trust'
import HowWeWork from '@/components/HowWeWork'
import Gallery from '@/components/Gallery'
import Faq from '@/components/Faq'
import LeadForm from '@/components/LeadForm'
import MapSection from '@/components/MapSection'
import Footer from '@/components/Footer'
import { site } from '@/lib/site'
import { faq } from '@/lib/content'

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: site.name,
        url: site.url,
        description: site.description,
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'ул. Деловая, 11с12',
          addressLocality: 'Москва',
          addressCountry: 'RU',
        },
        sameAs: [site.telegram.url, site.vk],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <Hero />
        <Advantages />
        <Services />
        <ForWhom />
        <Trust />
        <HowWeWork />
        <Gallery />
        <Faq />
        <LeadForm />
        <MapSection />
      </main>
      <Footer />
    </>
  )
}
