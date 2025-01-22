import { SearchBar } from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { HotelCard } from "@/components/hotel-card";
import { Link } from "wouter";
import { Loader2, DollarSign, Map, Calendar, Coffee } from "lucide-react";
import type { Hotel } from "@db/schema";
import { Head } from "@/components/seo-head";
import { ExpenseCalculator } from "@/components/expense-calculator";

export default function Home() {
  const { data: hotels, isLoading } = useQuery<Hotel[]>({
    queryKey: ["/api/hotels"],
  });

  return (
    <>
      <Head
        title="Hoteles Baratos en Medellín - Alojamiento Económico y Asequible"
        description="Encuentra los mejores hoteles baratos y alojamientos económicos en Medellín. Hospedaje asequible en todos los barrios de la ciudad. ¡Reserva tu estadía al mejor precio!"
      />

      <div className="min-h-screen">
        <div
          className="relative h-[500px] bg-cover bg-center flex items-center justify-center"
          style={{
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1598227891897-23cc8627dd44')"
          }}
        >
          <div className="text-center text-white space-y-6 p-4">
            <h1 className="text-4xl md:text-6xl font-bold">
              Hoteles Económicos en Medellín
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Encuentra alojamiento asequible en el barrio que prefieras
            </p>
            <SearchBar />
          </div>
        </div>

        <div className="container mx-auto py-12">
          <h2 className="text-3xl font-bold mb-8">Hoteles Más Económicos</h2>

          {isLoading ? (
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels?.slice(0, 6).map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/hotels">
              <Button variant="secondary" size="lg" className="cursor-pointer">
                Ver todos los hoteles baratos
              </Button>
            </Link>
          </div>
        </div>

        {/* Nueva sección: Consejos de Viaje Económico */}
        <div className="bg-muted py-12">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8">Consejos para Viajar Económico en Medellín</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <DollarSign className="h-8 w-8 mb-4 text-primary" />
                <h3 className="font-bold mb-2">Temporada Baja</h3>
                <p className="text-muted-foreground">
                  Viaja durante temporada baja para encontrar las mejores tarifas en hospedaje y vuelos.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <Map className="h-8 w-8 mb-4 text-primary" />
                <h3 className="font-bold mb-2">Ubicación Estratégica</h3>
                <p className="text-muted-foreground">
                  Elige hoteles cercanos al metro para ahorrar en transporte.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <Calendar className="h-8 w-8 mb-4 text-primary" />
                <h3 className="font-bold mb-2">Reserva con Anticipación</h3>
                <p className="text-muted-foreground">
                  Asegura las mejores tarifas reservando con al menos 2 meses de anticipación.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <Coffee className="h-8 w-8 mb-4 text-primary" />
                <h3 className="font-bold mb-2">Desayuno Incluido</h3>
                <p className="text-muted-foreground">
                  Busca hoteles con desayuno incluido para ahorrar en comidas.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Nueva sección: Calculadora de Gastos */}
        <div className="bg-background py-12">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Planifica tu Presupuesto</h2>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              Utiliza nuestra calculadora para estimar los gastos de tu viaje a Medellín. 
              Incluye alojamiento económico, transporte, comidas y actividades turísticas.
            </p>
            <ExpenseCalculator />
          </div>
        </div>

        <div className="bg-background py-12">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8">Barrios con Alojamiento Económico</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {["Boston", "La Candelaria", "Aranjuez"].map((neighborhood) => (
                <Link
                  key={neighborhood}
                  href={`/hotels?neighborhood=${encodeURIComponent(neighborhood)}`}
                >
                  <div
                    className="relative h-48 rounded-lg overflow-hidden cursor-pointer"
                    style={{
                      backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1656111530002-138e82f1e7a6')"
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 className="text-2xl font-bold text-white">
                        Hoteles en {neighborhood}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}