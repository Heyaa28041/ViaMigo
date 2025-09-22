import { Router } from 'express';
import { listDestinations, getDestination, searchDestinations } from '../controllers/destinationController';

const router = Router();

router.get('/', listDestinations);
router.get('/search', searchDestinations);
router.get('/:id', getDestination);

export default router;
