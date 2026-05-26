import { Helmet } from 'react-helmet-async'

export default function SEO({
  title,
  description,
  keywords = 'luxury travel, bespoke journeys, Aurevia Travels',
  image = '/images/maldives.png',
  canonical,
  type = 'website',
  schema
}) {
  const defaultTitle = 'Aurevia Travels | Travel Beyond Expectations'
  const fullTitle = title ? `${title} | Aurevia Travels` : defaultTitle
  const fullCanonical = canonical || window.location.href
  const siteName = 'Aurevia Travels'

  return (
    <Helmet>
      {/* Base metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={fullCanonical} />

      {/* OpenGraph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content={type} />

      {/* Twitter Preview Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@AureviaTravels" />

      {/* Structured JSON-LD Schema */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  )
}
