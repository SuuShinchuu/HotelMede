import { Helmet } from "react-helmet";

interface HeadProps {
  title: string;
  description?: string;
  image?: string;
  type?: string;
}

export function Head({ title, description, image, type = "website" }: HeadProps) {
  const siteTitle = "Hoteles en Medellín";
  const fullTitle = `${title} | ${siteTitle}`;
  const defaultDescription = "Encuentra los mejores hoteles en Medellín. Reserva tu estadía ideal en la ciudad de la eterna primavera.";
  const defaultImage = "https://images.unsplash.com/photo-1598227891897-23cc8627dd44";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />

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
    </Helmet>
  );
}
