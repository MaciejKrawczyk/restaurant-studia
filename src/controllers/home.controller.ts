import { Request, Response } from 'express';
import prisma from "../db/client";

export const getHome = async (req: Request, res: Response) => {
    try {
        const restaurants = await prisma.restaurant.findMany({
            include: {
                menu: true
            }
        });
        res.render('home', {
            restaurants,
            cart: req.session.cart || []
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
