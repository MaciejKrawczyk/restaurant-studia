import { Router } from 'express';
import { getHome } from '../controllers/home.controller';
import restaurantRoutes from './restaurant.routes';
import cartRoutes from './cart.routes';

const router = Router();

router.get('/', getHome);
router.use('/restaurant', restaurantRoutes);
router.use('/cart', cartRoutes);

export default router;
