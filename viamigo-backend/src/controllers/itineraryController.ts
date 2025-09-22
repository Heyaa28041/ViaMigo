import { Request, Response } from 'express';
import prisma from '../prismaClient';

interface ItineraryItemInput {
  day?: number;
  title: string;
  description?: string;
}

interface DestinationType {
  id: number;
  name: string;
  description?: string | null;
  tags: string[];
  country: string;
  lat?: number | null;
  lon?: number | null;
  avgCost?: number | null;
  createdAt: Date;
}

// Create a new itinerary
export async function createItinerary(req: any, res: Response) {
  const { title, startDate, endDate, items } = req.body;
  const userId = req.user.userId;

  const itinerary = await prisma.itinerary.create({
    data: {
      title,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      userId,
      items: {
        create: (items || []).map((it: ItineraryItemInput, idx: number) => ({
          day: it.day || 1,
          title: it.title,
          description: it.description || '',
          order: idx,
        })),
      },
    },
    include: { items: true },
  });

  res.json(itinerary);
}

// Get user's itineraries
export async function getMyItineraries(req: any, res: Response) {
  const userId = req.user.userId;
  const list = await prisma.itinerary.findMany({ where: { userId }, include: { items: true } });
  res.json(list);
}

// Generate simple itinerary based on preferences
export async function generateItinerary(req: any, res: Response) {
  const { days = 3, preferences = [] } = req.body;
  const tags: string[] = Array.isArray(preferences)
    ? preferences
    : typeof preferences === 'string'
    ? preferences.split(',').map((t) => t.trim())
    : [];

  const all: DestinationType[] = await prisma.destination.findMany();

  const scored = all
    .map((d) => ({
      d,
      score: tags.reduce((acc, t) => acc + (d.tags.includes(t) ? 1 : 0), 0),
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  const picked = scored.slice(0, days).map((s, i) => ({
    day: i + 1,
    title: `Visit ${s.d.name}`,
    description: s.d.description || '',
    order: 1,
    destinationId: s.d.id,
  }));

  const tempItinerary = {
    title: `Auto Plan - ${new Date().toISOString()}`,
    startDate: new Date(),
    endDate: new Date(Date.now() + days * 24 * 60 * 60 * 1000),
    items: picked,
  };

  res.json(tempItinerary);
}
