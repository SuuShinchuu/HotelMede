import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "wouter";
import { ReviewCard } from "@/components/review-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
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
import { Loader2, MapPin, Wifi, Coffee, Car } from "lucide-react";
import type { Hotel, Review } from "@db/schema";

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

  const amenityIcons: Record<string, any> = {
    wifi: Wifi,
    parking: Car,
    coffee: Coffee,
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">{hotel.name}</h1>
          <div className="flex items-center text-muted-foreground mb-4">
            <MapPin className="h-4 w-4 mr-2" />
            {hotel.address} - {hotel.neighborhood}
          </div>
          <p className="text-lg mb-6">{hotel.description}</p>

          <h2 className="text-2xl font-semibold mb-4">Amenidades</h2>
          <div className="grid grid-cols-2 gap-4">
            {hotel.amenities.map((amenity) => {
              const Icon = amenityIcons[amenity.toLowerCase()] || Coffee;
              return (
                <div key={amenity} className="flex items-center">
                  <Icon className="h-5 w-5 mr-2" />
                  {amenity}
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          {hotel.photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`${hotel.name} - Foto ${index + 1}`}
              className="rounded-lg w-full"
            />
          ))}
        </div>
      </div>

      <div className="mt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Reseñas</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Escribir reseña</Button>
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
                          <Input type="number" min="1" max="5" {...field} />
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

        <div className="grid md:grid-cols-2 gap-4">
          {hotel.reviews?.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
          {hotel.reviews?.length === 0 && (
            <Card className="col-span-full p-6 text-center text-muted-foreground">
              No hay reseñas todavía. ¡Sé el primero en comentar!
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}