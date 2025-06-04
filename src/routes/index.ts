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
router.use('/p12/restaurant', restaurantRoutes);
router.use('/p12/cart', cartRoutes);
router.use('/p12/register', registerRoutes);
router.use('/p12/login', loginRoutes);
router.use('/p12/checkout', checkoutRoutes);
router.use('/p12/map', mapRoutes);

export default router;
