import { AdminSidebar } from "@/components/admin/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Building2, MessageSquare, Star } from "lucide-react";
import type { Hotel, Review } from "@db/schema";

export default function AdminDashboard() {
  const { data: hotels } = useQuery<Hotel[]>({
    queryKey: ["/api/hotels"],
  });

  const { data: pendingReviews } = useQuery<Review[]>({
    queryKey: ["/api/reviews/pending"],
  });

  const stats = [
    {
      title: "Total de Hoteles",
      value: hotels?.length ?? 0,
      icon: Building2,
    },
    {
      title: "Reseñas Pendientes",
      value: pendingReviews?.length ?? 0,
      icon: MessageSquare,
    },
    {
      title: "Calificación Promedio",
      value: "4.5",
      icon: Star,
    },
  ];

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-4 md:grid-cols-2 mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Últimos Hoteles Agregados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {hotels?.slice(0, 5).map((hotel) => (
                  <div key={hotel.id} className="flex items-center">
                    <Building2 className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{hotel.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reseñas Pendientes de Aprobación</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingReviews?.slice(0, 5).map((review) => (
                  <div key={review.id} className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{review.authorName}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
