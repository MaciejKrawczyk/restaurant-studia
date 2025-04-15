import 'express-session';

declare module 'express-session' {
    interface SessionData {
        cart: CartItem[]
    }
}

export interface CartItem {
    dishId: number;
    restaurantId: number;
    quantity: number;
    name: string;
    price: number;
    timeToPrepare: number;
}
