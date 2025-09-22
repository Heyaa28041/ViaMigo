import { Router } from 'express';
import { requireAuth } from '../middlewares/auth';
import { createItinerary, getMyItineraries, generateItinerary } from '../controllers/itineraryController';

const router = Router();

router.post('/', requireAuth, createItinerary);
router.get('/mine', requireAuth, getMyItineraries);
router.post('/generate', requireAuth, generateItinerary);

export default router;
