import { Request, Response } from 'express';
import prisma from '../prismaClient';

// Create a new group
export async function createGroup(req: any, res: Response) {
  const { name, isFemaleOnly } = req.body;
  const userId = req.user.userId;

  const group = await prisma.group.create({
    data: {
      name,
      isFemaleOnly: !!isFemaleOnly,
      creatorId: userId,
    },
  });

  // Add creator as member
  await prisma.groupMember.create({
    data: { groupId: group.id, userId },
  });

  res.json(group);
}

// Join an existing group
export async function joinGroup(req: any, res: Response) {
  const userId = req.user.userId;
  const groupId = Number(req.params.id);
  if (isNaN(groupId)) return res.status(400).json({ error: 'Invalid group ID' });

  const existing = await prisma.groupMember.findFirst({ where: { groupId, userId } });
  if (existing) return res.status(400).json({ error: 'Already a member' });

  const gm = await prisma.groupMember.create({ data: { groupId, userId } });
  res.json(gm);
}

// List groups with members and creator
export async function listGroups(req: Request, res: Response) {
  const groups = await prisma.group.findMany({
    include: { members: { include: { user: true } }, creator: true },
  });
  res.json(groups);
}
