import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { hotels, reviews } from "@db/schema";
import { eq, desc, ilike } from "drizzle-orm";

export function registerRoutes(app: Express): Server {
  // Hotels API
  app.get("/api/hotels", async (req, res) => {
    try {
      const { neighborhood } = req.query;

      // Si no hay barrio, retornar todos los hoteles
      if (!neighborhood || typeof neighborhood !== 'string') {
        const allHotels = await db
          .select()
          .from(hotels)
          .orderBy(hotels.name);
        return res.json(allHotels);
      }

      // Búsqueda por barrio usando ILIKE
      const searchTerm = decodeURIComponent(neighborhood).trim();
      const filteredHotels = await db
        .select()
        .from(hotels)
        .where(ilike(hotels.neighborhood, `%${searchTerm}%`))
        .orderBy(hotels.name);

      return res.json(filteredHotels);
    } catch (error) {
      console.error("Error al buscar hoteles:", error);
      res.status(500).json({
        error: "Error al buscar hoteles",
        details: error instanceof Error ? error.message : "Error desconocido"
      });
    }
  });

  // Hotel Details API
  app.get("/api/hotels/:id", async (req, res) => {
    try {
      const hotelId = parseInt(req.params.id);

      if (isNaN(hotelId)) {
        return res.status(400).json({
          error: "ID de hotel inválido"
        });
      }

      const hotel = await db.query.hotels.findFirst({
        where: eq(hotels.id, hotelId),
        with: {
          reviews: {
            where: eq(reviews.isApproved, true),
            orderBy: desc(reviews.createdAt)
          }
        }
      });

      if (!hotel) {
        return res.status(404).json({
          error: "Hotel no encontrado"
        });
      }

      res.json(hotel);
    } catch (error) {
      console.error("Error al obtener detalles del hotel:", error);
      res.status(500).json({
        error: "Error al obtener detalles del hotel",
        details: error instanceof Error ? error.message : "Error desconocido"
      });
    }
  });

  // Admin Hotel Management
  app.post("/api/hotels", requireAdmin, async (req, res) => {
    const hotel = await db.insert(hotels).values(req.body).returning();
    res.json(hotel[0]);
  });

  app.put("/api/hotels/:id", requireAdmin, async (req, res) => {
    const [hotel] = await db
      .update(hotels)
      .set(req.body)
      .where(eq(hotels.id, parseInt(req.params.id)))
      .returning();
    res.json(hotel);
  });

  app.delete("/api/hotels/:id", requireAdmin, async (req, res) => {
    await db.delete(hotels).where(eq(hotels.id, parseInt(req.params.id)));
    res.status(204).send();
  });

  // Reviews API
  app.post("/api/hotels/:id/reviews", async (req, res) => {
    try {
      const hotelId = parseInt(req.params.id);

      if (isNaN(hotelId)) {
        return res.status(400).json({
          error: "ID de hotel inválido"
        });
      }

      const hotel = await db.query.hotels.findFirst({
        where: eq(hotels.id, hotelId)
      });

      if (!hotel) {
        return res.status(404).json({
          error: "Hotel no encontrado"
        });
      }

      const [review] = await db
        .insert(reviews)
        .values({
          ...req.body,
          hotelId,
        })
        .returning();

      res.json(review);
    } catch (error) {
      console.error("Error al crear reseña:", error);
      res.status(500).json({
        error: "Error al crear la reseña",
        details: error instanceof Error ? error.message : "Error desconocido"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

function requireAdmin(req: any, res: any, next: any) {
  if (req.isAuthenticated() && req.user.isAdmin) {
    return next();
  }
  res.status(403).send("Unauthorized");
}