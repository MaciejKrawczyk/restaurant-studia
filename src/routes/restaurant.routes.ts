import {Router} from 'express';
import {getRestaurant} from '../controllers/restaurant.controller';

const router = Router();

router.get('/:id', getRestaurant);

export default router;
