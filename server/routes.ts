import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { db } from "@db";
import { hotels, reviews } from "@db/schema";
import { eq, like, desc } from "drizzle-orm";

function requireAdmin(req: any, res: any, next: any) {
  if (req.isAuthenticated() && req.user.isAdmin) {
    return next();
  }
  res.status(403).send("Unauthorized");
}

export function registerRoutes(app: Express): Server {
  setupAuth(app);

  // Hotels API
  app.get("/api/hotels", async (req, res) => {
    try {
      const { neighborhood } = req.query;
      console.log("Searching hotels for neighborhood:", neighborhood); // Debug log

      const query = db.select().from(hotels);

      if (neighborhood && typeof neighborhood === 'string') {
        const results = await query.where(eq(hotels.neighborhood, neighborhood));
        console.log("Found hotels:", results.length); // Debug log
        return res.json(results);
      }

      const allHotels = await query;
      res.json(allHotels);
    } catch (error) {
      console.error("Error fetching hotels:", error);
      res.status(500).send("Error fetching hotels");
    }
  });

  app.get("/api/hotels/:id", async (req, res) => {
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
    const review = await db
      .insert(reviews)
      .values({
        ...req.body,
        hotelId: parseInt(req.params.id),
      })
      .returning();
    res.json(review[0]);
  });

  // Admin Review Management
  app.get("/api/reviews/pending", requireAdmin, async (req, res) => {
    const pendingReviews = await db
      .select()
      .from(reviews)
      .where(eq(reviews.isApproved, false))
      .orderBy(desc(reviews.createdAt));
    res.json(pendingReviews);
  });

  app.put("/api/reviews/:id/approve", requireAdmin, async (req, res) => {
    const [review] = await db
      .update(reviews)
      .set({ isApproved: true })
      .where(eq(reviews.id, parseInt(req.params.id)))
      .returning();
    res.json(review);
  });

  app.delete("/api/reviews/:id", requireAdmin, async (req, res) => {
    await db.delete(reviews).where(eq(reviews.id, parseInt(req.params.id)));
    res.status(204).send();
  });

  const httpServer = createServer(app);
  return httpServer;
}