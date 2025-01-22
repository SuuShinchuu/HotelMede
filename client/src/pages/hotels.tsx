import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { HotelCard } from "@/components/hotel-card";
import { SearchBar } from "@/components/search-bar";
import { Loader2 } from "lucide-react";
import type { Hotel } from "@db/schema";
import { Head } from "@/components/seo-head";

export default function Hotels() {
  const [location] = useLocation();
  const params = new URLSearchParams(location.split("?")[1]);
  const neighborhood = params.get("neighborhood");

  const { data: hotels, isLoading } = useQuery<Hotel[]>({
    queryKey: ["/api/hotels", neighborhood],
    queryFn: async () => {
      const url = new URL("/api/hotels", window.location.origin);
      if (neighborhood) {
        url.searchParams.set("neighborhood", neighborhood);
      }
      console.log("DEBUG - Requesting URL:", url.toString());

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log("DEBUG - API Response:", data);
      return data;
    }
  });

  return (
    <div className="container mx-auto py-8">
      <Head
        title={neighborhood ? `Hoteles en ${neighborhood} - Medellín` : "Todos los Hoteles en Medellín"}
        description={neighborhood 
          ? `Encuentra los mejores hoteles económicos en ${neighborhood}, Medellín` 
          : "Explora todos los hoteles económicos disponibles en Medellín"}
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">
          {neighborhood 
            ? `Hoteles en ${neighborhood}`
            : "Todos los Hoteles"
          }
        </h1>
        <SearchBar />
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels?.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
          {hotels?.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No se encontraron hoteles {neighborhood && `en ${neighborhood}`}
            </div>
          )}
        </div>
      )}
    </div>
  );
}