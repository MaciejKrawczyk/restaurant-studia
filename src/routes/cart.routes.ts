import { Router } from 'express';
import {
    getCart,
    addToCart,
    removeFromCart,
    updateCartItem,
    clearCart
} from '../controllers/cart.controller';

const router = Router();

router.get('/', getCart);
router.post('/add', addToCart);
router.post('/remove', removeFromCart);
router.post('/update', updateCartItem);
router.post('/clear', clearCart);

export default router;
