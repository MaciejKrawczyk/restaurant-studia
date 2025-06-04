import prisma from "../db/client";
import {generateFile} from "./receipts.service";


export type CartItem = {
    dishId: number;
    quantity: number;
    restaurantId: number;
};

export const createOrderFromCart = async (cart: CartItem[]) => {
    if (cart.length === 0) {
        throw new Error('Koszyk nie może być pusty przy tworzeniu zamówienia.');
    }

    const newOrder = await prisma.order.create({
        data: {
            items: {
                create: cart.map(item => ({
                    dishId: item.dishId,
                    quantity: item.quantity,
                    restaurantId: item.restaurantId,
                })),
            },
        },
        include: {
            items: {
                include: {
                    dish: true,
                    restaurant: true,
                },
            },
        },
    });

    const downloadUrl = await generateFile(newOrder)

    return {
        order: newOrder,
        downloadUrl,
    };
};

export const getOrderById = async (orderId: number) => {
    return prisma.order.findUnique({
        where: {id: orderId},
        include: {items: true},
    });
};
