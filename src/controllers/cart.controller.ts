import { Request, Response } from 'express';
import { cartService } from '../services/cart.service';

export const getCart = (req: Request, res: Response) => {
    const cart = cartService.getCart(req);
    res.render('cart', { cart });
};

export const addToCart = async (req: Request, res: Response) => {
    try {
        const { dishId, restaurantId } = req.body;
        await cartService.addToCart(req, parseInt(dishId), parseInt(restaurantId));

        const cartCount = req.session.cart?.reduce((sum, item) => sum + item.quantity, 0) || 0;

        if (req.accepts('json')) {
            res.json({
                success: true,
                cartCount
            });
        }
    } catch (error) {
        console.error(error);

        if (req.accepts('json')) {
            res.status(500).json({
                success: false,
                message: 'Error adding to cart'
            });
        }

        res.status(500).send('Error adding to cart');
    }
};

export const removeFromCart = (req: Request, res: Response) => {
    const { dishId, restaurantId } = req.body;
    cartService.removeFromCart(req, parseInt(dishId), parseInt(restaurantId));
    res.redirect('/cart');
};

export const updateCartItem = (req: Request, res: Response) => {
    const { dishId, restaurantId, quantity } = req.body;
    cartService.updateQuantity(req, parseInt(dishId), parseInt(restaurantId), parseInt(quantity));
    res.redirect('/cart');
};

export const clearCart = (req: Request, res: Response) => {
    cartService.clearCart(req);
    res.redirect('/cart');
};
