import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { hotels, reviews } from "@db/schema";
import { eq, desc } from "drizzle-orm";

export function registerRoutes(app: Express): Server {
  // Hotels API
  app.get("/api/hotels", async (req, res) => {
    try {
      const { neighborhood } = req.query;

      if (neighborhood && typeof neighborhood === 'string') {
        const decodedNeighborhood = decodeURIComponent(neighborhood);

        // Log para depuración
        console.log("Buscando hoteles en el barrio:", decodedNeighborhood);

        const filteredHotels = await db
          .select()
          .from(hotels)
          .where(eq(hotels.neighborhood, decodedNeighborhood));

        // Log para depuración
        console.log("Hoteles encontrados:", filteredHotels.map(h => ({
          id: h.id,
          name: h.name,
          neighborhood: h.neighborhood
        })));

        return res.json(filteredHotels);
      }

      const allHotels = await db.select().from(hotels);
      return res.json(allHotels);
    } catch (error) {
      console.error("Error fetching hotels:", error);
      res.status(500).send("Error fetching hotels");
    }
  });

  // Hotel Details API
  app.get("/api/hotels/:id", async (req, res) => {
    try {
      const [hotel] = await db
        .select()
        .from(hotels)
        .where(eq(hotels.id, parseInt(req.params.id)))
        .limit(1);

      if (!hotel) {
        return res.status(404).send("Hotel not found");
      }

      const hotelReviews = await db
        .select()
        .from(reviews)
        .where(eq(reviews.hotelId, hotel.id))
        .where(eq(reviews.isApproved, true))
        .orderBy(desc(reviews.createdAt));

      res.json({ ...hotel, reviews: hotelReviews });
    } catch (error) {
      console.error("Error fetching hotel details:", error);
      res.status(500).send("Error fetching hotel details");
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
      const [review] = await db
        .insert(reviews)
        .values({
          ...req.body,
          hotelId,
        })
        .returning();
      res.json(review);
    } catch (error) {
      console.error("Error creating review:", error);
      res.status(500).send("Error creating review");
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