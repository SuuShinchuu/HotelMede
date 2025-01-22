typescript
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { HotelCard } from "@/components/hotel-card";
import { SearchBar } from "@/components/search-bar";
import { Loader2, AlertCircle } from "lucide-react";
import type { Hotel } from "@db/schema";
import { Head } from "@/components/seo-head";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Error al buscar hoteles');
        }

        const data = await response.json();
        setHotels(data);
      } catch (err) {
        console.error('Error fetching hotels:', err);
        setError(err instanceof Error ? err.message : 'Error al buscar hoteles');
      } finally {
        setIsLoading(false);
      }
    }

    fetchHotels();
  }, [neighborhood]);

  return (
    <div className="container mx-auto py-8">
      <Head
        title={neighborhood ? `Hoteles en ${neighborhood} - Medellín` : "Todos los Hoteles en Medellín"}
        description={neighborhood 
          ? `Encuentra los mejores hoteles económicos en ${neighborhood}, Medellín` 
          : "Explora todos los hoteles económicos disponibles en Medellín"}
      />

      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold">
          {neighborhood 
            ? `Hoteles en ${neighborhood}`
            : "Todos los Hoteles"
          }
        </h1>
        <SearchBar initialValue={neighborhood || ''} />

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels?.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
          {hotels?.length === 0 && !error && (
            <div className="col-span-full text-center py-12">
              <div className="max-w-md mx-auto space-y-4">
                <p className="text-lg font-medium">
                  No se encontraron hoteles {neighborhood && `en ${neighborhood}`}
                </p>
                <p className="text-muted-foreground">
                  Intenta buscar en otro barrio o verifica el nombre del barrio ingresado.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}