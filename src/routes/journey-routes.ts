import { Router } from 'express';
import journeyController from '../controllers/journey-controller';

const router = Router();

// Create journey route
router.post('/', journeyController.createJourney);
router.get('/', journeyController.getJourney);
router.delete('/:id', journeyController.deleteJourney);
router.put('/:id', journeyController.updateJourney);
// Add other routes for updating, deleting, fetching journeys, etc.

export default router;
