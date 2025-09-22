import { Request, Response } from 'express';
import prisma from '../prismaClient';

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

// Simple rule-based recommender
export async function getRecommendations(req: Request, res: Response) {
  try {
    const pref = req.query.pref as string | undefined;
    const tags: string[] = pref ? pref.split(',').map((s) => s.trim()) : [];

    const all: DestinationType[] = await prisma.destination.findMany();

    if (tags.length === 0) return res.json(all.slice(0, 10));

    const scored = all
      .map((d) => ({
        dest: d,
        score: tags.reduce((acc, t) => acc + (d.tags.includes(t) ? 1 : 0), 0),
      }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score);

    const recommended: DestinationType[] = scored.map((s) => s.dest);
    res.json(recommended);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
