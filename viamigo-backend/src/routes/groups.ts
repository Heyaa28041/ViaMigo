import { Router } from 'express';
import { requireAuth } from '../middlewares/auth';
import { createGroup, joinGroup, listGroups } from '../controllers/groupController';

const router = Router();

router.post('/', requireAuth, createGroup);
router.post('/:id/join', requireAuth, joinGroup);
router.get('/', listGroups);

export default router;
