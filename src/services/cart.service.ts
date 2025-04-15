import {Request} from 'express';
import prisma from "../../prisma/client";
import {CartItem} from "../types";


export class CartService {
    private getSessionCart(req: Request): CartItem[] {
        if (!req.session.cart) {
            req.session.cart = [];
        }
        return req.session.cart;
    }

    async addToCart(req: Request, dishId: number, restaurantId: number) {
        const cart = this.getSessionCart(req);
        const dish = await prisma.dish.findUnique({
            where: {id: dishId},
            select: {
                id: true,
                name: true,
                timeToPrepare: true,
                price: true,
            }
        });

        if (!dish) {
            throw new Error('Dish not found');
        }

        const existingItem = cart.find(item =>
            item.dishId === dishId && item.restaurantId === restaurantId
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                dishId,
                restaurantId,
                quantity: 1,
                name: dish.name,
                price: 10, // Replace with actual price from dish
                timeToPrepare: dish.timeToPrepare
            });
        }

        req.session.cart = cart;
    }

    removeFromCart(req: Request, dishId: number, restaurantId: number) {
        const cart = this.getSessionCart(req);
        req.session.cart = cart.filter(item =>
            !(item.dishId === dishId && item.restaurantId === restaurantId)
        );
    }

    updateQuantity(req: Request, dishId: number, restaurantId: number, quantity: number) {
        const cart = this.getSessionCart(req);
        const item = cart.find(item =>
            item.dishId === dishId && item.restaurantId === restaurantId
        );

        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(req, dishId, restaurantId);
            } else {
                item.quantity = quantity;
            }
        }

        req.session.cart = cart;
    }

    getCart(req: Request) {
        return this.getSessionCart(req);
    }

    clearCart(req: Request) {
        req.session.cart = [];
    }
}

export const cartService = new CartService();
