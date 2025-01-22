import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "wouter";
import { ReviewCard } from "@/components/review-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Head } from "@/components/seo-head";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, MapPin, Wifi, Coffee, Car, Star } from "lucide-react";
import type { Hotel, Review } from "@db/schema";
import { cn } from "@/lib/utils";

const reviewSchema = z.object({
  authorName: z.string().min(2, "Nombre requerido"),
  rating: z.coerce.number().min(1).max(5),
  comment: z.string().min(10, "El comentario debe tener al menos 10 caracteres"),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

export default function HotelPage() {
  const { id } = useParams();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: hotel, isLoading } = useQuery<Hotel & { reviews: Review[] }>({
    queryKey: [`/api/hotels/${id}`],
  });

  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      authorName: "",
      rating: 5,
      comment: "",
    },
  });

  const reviewMutation = useMutation({
    mutationFn: async (data: ReviewFormData) => {
      const res = await fetch(`/api/hotels/${id}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/hotels/${id}`] });
      toast({
        title: "¡Gracias por tu reseña!",
        description: "Tu comentario será revisado por nuestro equipo.",
      });
      form.reset();
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!hotel) {
    return <div>Hotel no encontrado</div>;
  }

  const avgRating = hotel.reviews?.length
    ? (hotel.reviews.reduce((acc, rev) => acc + rev.rating, 0) / hotel.reviews.length).toFixed(1)
    : null;

  // Structured data for search engines
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: hotel.name,
    description: hotel.description,
    image: hotel.photos,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Medellín",
      addressRegion: "Antioquia",
      addressCountry: "CO",
      streetAddress: hotel.address
    },
    aggregateRating: avgRating
      ? {
          "@type": "AggregateRating",
          ratingValue: avgRating,
          reviewCount: hotel.reviews.length,
        }
      : undefined,
  };

  return (
    <>
      <Head
        title={hotel.name}
        description={hotel.description}
        image={hotel.photos[0]}
        type="hotel"
      />
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      <div className="container mx-auto py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Photos Grid */}
            <div className="order-2 lg:order-1 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {hotel.photos.slice(0, 4).map((photo, index) => (
                  <div
                    key={index}
                    className={cn(
                      "relative rounded-lg overflow-hidden",
                      index === 0 && "col-span-2 aspect-video",
                      index !== 0 && "aspect-square"
                    )}
                  >
                    <img
                      src={photo}
                      alt={`${hotel.name} - Foto ${index + 1}`}
                      className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Hotel Info */}
            <div className="order-1 lg:order-2">
              <div className="sticky top-8">
                <div className="flex items-center gap-4 mb-4">
                  <h1 className="text-4xl font-bold">{hotel.name}</h1>
                  {avgRating && (
                    <div className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full">
                      <Star className="h-4 w-4 fill-primary" />
                      <span className="font-medium">{avgRating}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center text-muted-foreground mb-6">
                  <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{hotel.address} - {hotel.neighborhood}</span>
                </div>

                <div className="prose dark:prose-invert mb-8">
                  <p className="text-lg">{hotel.description}</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">Amenidades</h2>
                    <div className="grid grid-cols-2 gap-y-4">
                      {hotel.amenities.map((amenity) => {
                        const Icon = amenityIcons[amenity.toLowerCase()] || Coffee;
                        return (
                          <div key={amenity} className="flex items-center gap-2">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <Icon className="h-5 w-5 text-primary" />
                            </div>
                            <span>{amenity}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-16">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-semibold mb-1">Reseñas</h2>
                <p className="text-muted-foreground">
                  {hotel.reviews?.length
                    ? `${hotel.reviews.length} reseñas de huéspedes`
                    : "Sé el primero en dejar una reseña"}
                </p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg">Escribir reseña</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Escribe tu reseña</DialogTitle>
                  </DialogHeader>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit((data) => reviewMutation.mutate(data))}
                      className="space-y-4"
                    >
                      <FormField
                        control={form.control}
                        name="authorName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="rating"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Calificación</FormLabel>
                            <FormControl>
                              <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((rating) => (
                                  <Button
                                    key={rating}
                                    type="button"
                                    variant={field.value === rating ? "default" : "outline"}
                                    size="icon"
                                    onClick={() => field.onChange(rating)}
                                  >
                                    <Star
                                      className={cn(
                                        "h-4 w-4",
                                        field.value >= rating && "fill-current"
                                      )}
                                    />
                                  </Button>
                                ))}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="comment"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Comentario</FormLabel>
                            <FormControl>
                              <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full">
                        {reviewMutation.isPending && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Enviar reseña
                      </Button>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {hotel.reviews?.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
              {!hotel.reviews?.length && (
                <Card className="col-span-full p-8 text-center text-muted-foreground">
                  <p className="mb-4">No hay reseñas todavía.</p>
                  <p className="text-sm">¡Sé el primero en compartir tu experiencia!</p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const amenityIcons: Record<string, any> = {
  wifi: Wifi,
  parking: Car,
  coffee: Coffee,
};