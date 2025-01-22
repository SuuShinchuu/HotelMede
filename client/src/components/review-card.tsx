import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star } from "lucide-react";
import type { Review } from "@db/schema";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card className="h-full">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">{review.authorName}</h3>
            <time className="text-sm text-muted-foreground">
              {format(new Date(review.createdAt), "d 'de' MMMM, yyyy", { locale: es })}
            </time>
          </div>
          <div className="flex -space-x-1">
            {Array.from({ length: review.rating }).map((_, i) => (
              <Star 
                key={i} 
                className="h-4 w-4 text-yellow-400 fill-yellow-400" 
              />
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
      </CardContent>
    </Card>
  );
}