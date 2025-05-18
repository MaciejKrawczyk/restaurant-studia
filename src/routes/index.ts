import { Router } from 'express';
import { getHome } from '../controllers/home.controller';
import restaurantRoutes from './restaurant.routes';
import cartRoutes from './cart.routes';
import registerRoutes from "./register.routes";
import loginRoutes from "./login.routes";
import checkoutRoutes from "./checkout.routes";
import mapRoutes from "./map.routes";

const router = Router();

router.get('/', getHome);
router.use('/restaurant', restaurantRoutes);
router.use('/cart', cartRoutes);
router.use('/register', registerRoutes);
router.use('/login', loginRoutes);
router.use('/checkout', checkoutRoutes);
router.use('/map', mapRoutes);

export default router;
