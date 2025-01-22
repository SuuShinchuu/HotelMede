import { useState, useEffect } from "react";
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

  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHotels() {
      try {
        setIsLoading(true);
        setError(null);

        const url = new URL("/api/hotels", window.location.origin);
        if (neighborhood) {
          url.searchParams.set("neighborhood", neighborhood);
        }

        const response = await fetch(url);
        const data = await response.json();

        console.log("URL:", url.toString());
        console.log("Response data:", data);

        setHotels(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching hotels');
      } finally {
        setIsLoading(false);
      }
    }

    fetchHotels();
  }, [neighborhood]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

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