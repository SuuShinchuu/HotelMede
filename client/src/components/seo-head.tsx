import { Helmet } from "react-helmet";

interface HeadProps {
  title: string;
  description?: string;
  image?: string;
  type?: string;
}

export function Head({ title, description, image, type = "website" }: HeadProps) {
  const siteTitle = "Hoteles Baratos en Medellín";
  const fullTitle = `${title} | ${siteTitle}`;
  const defaultDescription = "Encuentra los mejores hoteles baratos y alojamientos económicos en Medellín. Hospedaje asequible y hostales económicos en la ciudad de la eterna primavera.";
  const defaultImage = "https://images.unsplash.com/photo-1598227891897-23cc8627dd44";
  const keywords = "hoteles baratos en Medellín, alojamientos económicos Medellín, hostales asequibles en Medellín, hospedaje económico Medellín";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || defaultImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image || defaultImage} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="google" content="notranslate" />
      <link rel="canonical" href={`https://hoteles-medellin.com${window.location.pathname}`} />
    </Helmet>
  );
}