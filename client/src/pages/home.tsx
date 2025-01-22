import { SearchBar } from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { HotelCard } from "@/components/hotel-card";
import { Link } from "wouter";
import { Loader2 } from "lucide-react";
import type { Hotel } from "@db/schema";

export default function Home() {
  const { data: hotels, isLoading } = useQuery<Hotel[]>({
    queryKey: ["/api/hotels"],
  });

  return (
    <div className="min-h-screen">
      <div 
        className="relative h-[500px] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1598227891897-23cc8627dd44')"
        }}
      >
        <div className="text-center text-white space-y-6 p-4">
          <h1 className="text-4xl md:text-6xl font-bold">
            Descubre Medellín
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            Encuentra el hotel perfecto en el barrio que prefieras
          </p>
          <SearchBar />
        </div>
      </div>

      <div className="container mx-auto py-12">
        <h2 className="text-3xl font-bold mb-8">Hoteles Destacados</h2>

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
              Ver todos los hoteles
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-muted py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">Barrios Populares</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {["El Poblado", "Laureles", "Envigado"].map((neighborhood) => (
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
                    <h3 className="text-2xl font-bold text-white">{neighborhood}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}