import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Building2, MapPin, Star } from "lucide-react";
import { Link } from "wouter";
import type { Hotel, Review } from "@db/schema";

interface HotelCardProps {
  hotel: Hotel & { reviews?: Review[] };
}

export function HotelCard({ hotel }: HotelCardProps) {
  const avgRating = hotel.reviews?.length 
    ? (hotel.reviews.reduce((acc, rev) => acc + rev.rating, 0) / hotel.reviews.length).toFixed(1)
    : null;

  return (
    <Link href={`/hotel/${hotel.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        <AspectRatio ratio={16 / 9}>
          <img
            src={hotel.photos[0]}
            alt={hotel.name}
            className="object-cover w-full h-full"
          />
        </AspectRatio>
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl">{hotel.name}</CardTitle>
            {avgRating && (
              <Badge variant="secondary" className="flex gap-1">
                <Star className="h-4 w-4" />
                {avgRating}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <MapPin className="h-4 w-4" />
            {hotel.address}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building2 className="h-4 w-4" />
            {hotel.neighborhood}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
