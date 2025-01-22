import { db } from "@db";
import { hotels } from "@db/schema";

const HOTELS_DATA = [
  // El Poblado
  {
    name: "Hotel Poblado Alejandría",
    description: "Ubicado en el corazón del exclusivo barrio El Poblado, este hotel boutique ofrece una experiencia única con su arquitectura moderna y servicios personalizados. Disfrute de habitaciones elegantes, restaurante gourmet y terraza con vista panorámica de la ciudad.",
    address: "Calle 10A #40-12",
    neighborhood: "El Poblado",
    photos: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791"
    ],
    amenities: [
      "WiFi Gratis",
      "Piscina",
      "Gimnasio",
      "Restaurante",
      "Bar",
      "Servicio a la habitación",
      "Spa",
      "Terraza panorámica"
    ]
  },
  {
    name: "Marquee El Poblado",
    description: "Hotel de lujo que combina el confort moderno con la calidez de la hospitalidad paisa. A pasos de Provenza y el Parque Lleras, ofrece una ubicación perfecta para explorar la vida nocturna y gastronómica de Medellín.",
    address: "Carrera 43A #9-12",
    neighborhood: "El Poblado",
    photos: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061"
    ],
    amenities: [
      "WiFi Gratis",
      "Centro de negocios",
      "Gimnasio 24/7",
      "Restaurante",
      "Bar lounge",
      "Servicio de concierge",
      "Estacionamiento",
      "Desayuno buffet"
    ]
  },
  // Laureles
  {
    name: "Laureles Comfort Hotel",
    description: "Un oasis de tranquilidad en el tradicional barrio Laureles. Nuestro hotel combina la calidez de un hogar con servicios de primera clase. Perfecto para viajeros de negocios y familias que buscan una ubicación central con fácil acceso a restaurantes y comercio.",
    address: "Carrera 76 #35-29",
    neighborhood: "Laureles",
    photos: [
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9",
      "https://images.unsplash.com/photo-1587985064135-0366536eab42",
      "https://images.unsplash.com/photo-1601565415267-ec24f9d12872"
    ],
    amenities: [
      "WiFi Gratis",
      "Desayuno incluido",
      "Estacionamiento",
      "Business Center",
      "Lavandería",
      "Café 24 horas",
      "Sala de reuniones"
    ]
  },
  // Estadio
  {
    name: "Stadium Hotel Laureles",
    description: "Ubicado cerca al Estadio Atanasio Girardot, este hotel moderno es perfecto para los amantes del deporte y quienes buscan estar cerca de la zona comercial de Laureles. Habitaciones contemporáneas con vistas al estadio y la ciudad.",
    address: "Calle 48 #74-58",
    neighborhood: "Estadio",
    photos: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461",
      "https://images.unsplash.com/photo-1521783988139-89397d761dce",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a"
    ],
    amenities: [
      "WiFi Gratis",
      "Gimnasio",
      "Restaurante deportivo",
      "Bar",
      "Estacionamiento",
      "Terraza",
      "Alquiler de bicicletas"
    ]
  },
  // Envigado
  {
    name: "Envigado Green Hotel",
    description: "Un hotel eco-friendly en el corazón de Envigado, rodeado de naturaleza y tranquilidad. Nuestras instalaciones sostenibles y jardines orgánicos crean un ambiente perfecto para desconectar, mientras mantiene la proximidad a la vida urbana.",
    address: "Calle 37 Sur #34-40",
    neighborhood: "Envigado",
    photos: [
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7",
      "https://images.unsplash.com/photo-1586611292717-f828b167408c",
      "https://images.unsplash.com/photo-1615460549969-36fa19521a4f"
    ],
    amenities: [
      "WiFi Gratis",
      "Jardín orgánico",
      "Yoga deck",
      "Bicicletas",
      "Desayuno orgánico",
      "Spa natural",
      "Huerta propia"
    ]
  },
  // La Candelaria
  {
    name: "Hotel Candelaria Real",
    description: "Ubicado en el centro histórico de Medellín, este hotel boutique ofrece una experiencia auténtica en un edificio restaurado del siglo XX. Disfrute de la rica historia de La Candelaria mientras se hospeda con todas las comodidades modernas.",
    address: "Calle 49 #50-21",
    neighborhood: "La Candelaria",
    photos: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6"
    ],
    amenities: [
      "WiFi Gratis",
      "Restaurante",
      "Bar histórico",
      "Tours guiados",
      "Servicio de conserjería",
      "Museo interno",
      "Biblioteca"
    ]
  },
  // Belén
  {
    name: "Belén Parque Hotel",
    description: "Situado frente al parque principal de Belén, este hotel familiar ofrece una auténtica experiencia paisa. Con su arquitectura tradicional y ambiente acogedor, es perfecto para quienes buscan experimentar la verdadera hospitalidad antioqueña.",
    address: "Calle 30A #76-12",
    neighborhood: "Belén",
    photos: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791"
    ],
    amenities: [
      "WiFi Gratis",
      "Parqueadero",
      "Desayuno típico",
      "Terraza",
      "Lavandería",
      "Juegos infantiles",
      "Cafetería"
    ]
  },
  // Boston
  {
    name: "Casa Hotel Boston",
    description: "Hotel boutique que celebra la arquitectura tradicional de Medellín en el histórico barrio de Boston. Cada habitación cuenta una historia diferente, decorada con elementos locales y mobiliario artesanal.",
    address: "Calle 49 #25-100",
    neighborhood: "Boston",
    photos: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
      "https://images.unsplash.com/photo-1554647286-f365d7defc2d",
      "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa"
    ],
    amenities: [
      "WiFi Gratis",
      "Desayuno típico",
      "Patio colonial",
      "Biblioteca",
      "Galería de arte local",
      "Café artesanal"
    ]
  },
  // Aranjuez
  {
    name: "Hotel Jardines de Aranjuez",
    description: "Encantador hotel boutique en el tradicional barrio de Aranjuez, conocido por sus hermosos jardines y ambiente tranquilo. Disfrute de la auténtica hospitalidad antioqueña en un entorno lleno de historia y cultura.",
    address: "Carrera 45 #93-12",
    neighborhood: "Aranjuez",
    photos: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945"
    ],
    amenities: [
      "WiFi Gratis",
      "Jardines",
      "Desayuno típico",
      "Terraza",
      "Parqueadero",
      "Salón de eventos"
    ]
  },
  // Manrique
  {
    name: "Hotel Vista Manrique",
    description: "Ubicado en las alturas de Manrique, este hotel ofrece impresionantes vistas de la ciudad y el valle. Un refugio urbano que combina la tranquilidad de la zona con fácil acceso al centro de la ciudad.",
    address: "Calle 67 #45-89",
    neighborhood: "Manrique",
    photos: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945"
    ],
    amenities: [
      "WiFi Gratis",
      "Mirador",
      "Cafetería",
      "Parqueadero",
      "Desayuno incluido",
      "Terraza panorámica"
    ]
  },
  // Popular
  {
    name: "Hotel Mirador del Popular",
    description: "Descubra la verdadera esencia de Medellín en este acogedor hotel ubicado en el barrio Popular. Disfrute de vistas panorámicas de la ciudad mientras experimenta la calidez de la comunidad local.",
    address: "Calle 108 #33-45",
    neighborhood: "Popular",
    photos: [
      "https://images.unsplash.com/photo-1561501900-3701fa6a0864",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7"
    ],
    amenities: [
      "WiFi Gratis",
      "Terraza mirador",
      "Cafetería local",
      "Tours culturales",
      "Desayuno típico"
    ]
  },
  // Robledo
  {
    name: "Hotel Campestre Robledo",
    description: "Un remanso de paz en medio de la ciudad, este hotel en Robledo ofrece amplios espacios verdes y un ambiente campestre. Ideal para quienes buscan tranquilidad sin alejarse demasiado del centro urbano.",
    address: "Carrera 80 #65-120",
    neighborhood: "Robledo",
    photos: [
      "https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd"
    ],
    amenities: [
      "WiFi Gratis",
      "Jardines extensos",
      "Piscina",
      "Restaurante campestre",
      "Parqueadero",
      "Zona BBQ"
    ]
  },
  // Castilla
  {
    name: "Hotel Plaza Castilla",
    description: "Moderno hotel ubicado en el corazón de Castilla, perfecto para viajeros que buscan una experiencia auténtica en un barrio tradicional de Medellín. Cerca de importantes vías de acceso y centros comerciales.",
    address: "Carrera 68 #96-50",
    neighborhood: "Castilla",
    photos: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945"
    ],
    amenities: [
      "WiFi Gratis",
      "Restaurante",
      "Business Center",
      "Gimnasio",
      "Parqueadero",
      "Sala de reuniones"
    ]
  },
  // San Javier
  {
    name: "Hotel Mirador San Javier",
    description: "Ubicado cerca del Metrocable, este hotel ofrece una perspectiva única de la transformación social de Medellín. Disfrute de vistas espectaculares y fácil acceso a las atracciones culturales de la Comuna 13.",
    address: "Calle 44 #95-63",
    neighborhood: "San Javier",
    photos: [
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945"
    ],
    amenities: [
      "WiFi Gratis",
      "Tours Comuna 13",
      "Cafetería",
      "Terraza mirador",
      "Guía turístico",
      "Desayuno incluido"
    ]
  },
  // Itagüí
  {
    name: "Hotel Business Itagüí",
    description: "Hotel ejecutivo ubicado en el centro empresarial de Itagüí, diseñado para viajeros de negocios y compradores del sector textil. Ofrece fácil acceso a los principales centros comerciales y fábricas de la zona.",
    address: "Carrera 50A #85-21",
    neighborhood: "Itagüí",
    photos: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945"
    ],
    amenities: [
      "WiFi Gratis",
      "Centro de negocios",
      "Sala de conferencias",
      "Restaurante",
      "Parqueadero",
      "Servicio de lavandería",
      "Transporte ejecutivo"
    ]
  },
  // La América
  {
    name: "Hotel Central América",
    description: "Ubicado en el corazón de La América, este hotel familiar ofrece una experiencia acogedora con fácil acceso a los principales puntos de interés de la ciudad. Perfecto para quienes buscan una estadía tranquila en un barrio tradicional.",
    address: "Calle 44 #84-77",
    neighborhood: "La América",
    photos: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791"
    ],
    amenities: [
      "WiFi Gratis",
      "Desayuno casero",
      "Parqueadero",
      "Terraza",
      "Cafetería",
      "Lavandería"
    ]
  }
];

async function seed() {
  console.log("🌱 Seeding database...");

  try {
    // Clear existing hotels
    await db.delete(hotels);

    // Insert hotels
    await db.insert(hotels).values(HOTELS_DATA);
    console.log(`✅ Successfully seeded ${HOTELS_DATA.length} hotels`);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seed();