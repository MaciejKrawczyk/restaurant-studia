import 'express-session';

declare module 'express-session' {
    interface SessionData {
        cart: CartItem[];
        userId: number;
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
