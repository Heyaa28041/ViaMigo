import { Request, Response } from 'express';
import prisma from '../prismaClient';

type DestinationType = {
  id: number;
  name: string;
  description?: string | null;
  tags?: string[];
  avgCost?: number | null;
  country?: string | null;
  createdAt?: Date;
  lat?: number | null;
  lon?: number | null;
};

// List up to 50 destinations
export async function listDestinations(req: Request, res: Response) {
  try {
    const items = await prisma.destination.findMany({ take: 50 });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Get a single destination by ID
export async function getDestination(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

  try {
    const dest = await prisma.destination.findUnique({ where: { id } });
    if (!dest) return res.status(404).json({ error: 'Not found' });
    res.json(dest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Search destinations by query, minCost, tags
export async function searchDestinations(req: Request, res: Response) {
  try {
    const q = (req.query.q as string) || '';
    const minCost = req.query.minCost ? Number(req.query.minCost) : undefined;
    const tags = req.query.tags ? (req.query.tags as string).split(',') : [];

    const results = await prisma.destination.findMany({
      where: {
        AND: [
          q
            ? {
                OR: [
                  { name: { contains: q, mode: 'insensitive' } },
                  { description: { contains: q, mode: 'insensitive' } },
                ],
              }
            : {},
          minCost ? { avgCost: { gte: minCost } } : {},
        ],
      },
      take: 50,
    });

    const filtered = tags.length
      ? results.filter((r) => r.tags && tags.every((t) => r.tags!.includes(t)))
      : results;

    res.json(filtered);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
